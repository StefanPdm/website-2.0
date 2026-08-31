/**
 * Serverseitige Bot-Erkennung für die Formular-Routen.
 *
 * Bewusst ohne Drittanbieter: keine zusätzlichen Auftragsverarbeiter,
 * keine Cookies, keine Änderung an den Datenschutz-/Cookie-Texten.
 *
 * Grundprinzip: Es wird **kein Lead verworfen, solange Zweifel bestehen**.
 * Nur eindeutige Fälle (Honeypot, sehr hoher Score) werden still verworfen;
 * Grenzfälle gehen mit Warnhinweis an den Betreiber, aber ohne die
 * Bestätigungsmail an die (frei wählbare, evtl. fremde) Absenderadresse.
 */

export const HONEYPOT_FIELD = 'homepage';
export const ELAPSED_FIELD = '_elapsedMs';

/** Unter diesem Wert gilt das Formular als „zu schnell für einen Menschen". */
const MIN_FILL_MS = 3_000;

/** Ab hier: still verwerfen, keine Mail. */
const DROP_THRESHOLD = 6;
/** Ab hier: an den Betreiber, markiert, ohne Bestätigungsmail. */
const SUSPECT_THRESHOLD = 3;

export type SpamVerdict = {
  action: 'accept' | 'suspect' | 'drop';
  score: number;
  reasons: string[];
};

// ---------------------------------------------------------------------------
// Header-Plausibilität
// ---------------------------------------------------------------------------

/**
 * Echte Chromium-Browser halten User-Agent und Client-Hints synchron.
 * Headless-/Automations-Stacks setzen den UA-String, vergessen aber die Hints.
 * Beide Prüfungen greifen nur, wenn der jeweilige Hint überhaupt gesendet wird
 * (Firefox und Safari senden ihn nicht) — sonst gibt es kein Signal.
 */
function checkClientHints(headers: Headers): string[] {
  const reasons: string[] = [];
  const ua = headers.get('user-agent') || '';
  if (!ua) return ['kein User-Agent'];

  // --- Plattform: sec-ch-ua-platform gegen den UA-String ---
  const platformHint = (headers.get('sec-ch-ua-platform') || '').replace(/"/g, '').trim();
  if (platformHint) {
    let expected: string | null = null;
    if (/Android/i.test(ua)) expected = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) expected = null; // iOS sendet die Hints nicht zuverlässig
    else if (/CrOS/i.test(ua)) expected = 'Chrome OS';
    else if (/Windows NT/i.test(ua)) expected = 'Windows';
    else if (/Macintosh|Mac OS X/i.test(ua)) expected = 'macOS';
    else if (/Linux|X11/i.test(ua)) expected = 'Linux';

    if (expected && platformHint.toLowerCase() !== expected.toLowerCase()) {
      reasons.push(`Plattform-Widerspruch: UA sagt ${expected}, Hint sagt ${platformHint}`);
    }
  }

  // --- Version: sec-ch-ua gegen Chrome/xxx im UA-String ---
  const brandHint = headers.get('sec-ch-ua') || '';
  if (brandHint) {
    const brandMatch = brandHint.match(/"(?:Google Chrome|Chromium)";v="(\d+)"/i);
    const uaMatch = ua.match(/Chrome\/(\d+)/i);
    if (brandMatch && uaMatch) {
      const diff = Math.abs(Number(brandMatch[1]) - Number(uaMatch[1]));
      // Toleranz 1 für Randfälle; echte Browser stimmen exakt überein.
      if (diff > 1) {
        reasons.push(`Versions-Widerspruch: UA Chrome ${uaMatch[1]}, Hint Chromium ${brandMatch[1]}`);
      }
    }
  }

  return reasons;
}

// ---------------------------------------------------------------------------
// Textmuster
// ---------------------------------------------------------------------------

const VOWELS = /[aeiouäöüáéíóúàèìòùâêîôûAEIOUÄÖÜ]/g;

/**
 * Erkennt Zufalls-Token wie "HCDdgWPgxZUSxbYH".
 * Bewusst konservativ: echte einteilige Namen ("Konstantin", "Schmidt")
 * haben einen normalen Vokalanteil und höchstens einen Groß-/Kleinwechsel.
 */
function looksRandom(value: string): boolean {
  const token = value.trim();
  if (token.length < 8 || /\s/.test(token)) return false;

  const letters = token.replace(/[^a-zA-ZäöüÄÖÜ]/g, '');
  if (letters.length < 8) return false;

  const vowelRatio = (letters.match(VOWELS)?.length ?? 0) / letters.length;

  // Wechsel zwischen Groß- und Kleinschreibung ab Position 1 zählen.
  let caseSwitches = 0;
  for (let i = 2; i < letters.length; i += 1) {
    const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase();
    const currUpper = letters[i] === letters[i].toUpperCase();
    if (prevUpper !== currUpper) caseSwitches += 1;
  }

  return vowelRatio < 0.22 || caseSwitches >= 4;
}

/** Zufallsdomains wie "fqqbqsunzb.com". */
function looksRandomDomain(value: string): boolean {
  const host = value.trim().replace(/^https?:\/\//i, '').split('/')[0];
  const label = host.split('.')[0] || '';
  return looksRandom(label);
}

// ---------------------------------------------------------------------------
// Rate-Limit (bewusst einfach)
// ---------------------------------------------------------------------------

/**
 * In-Memory pro Lambda-Instanz. Bremst Bursts zuverlässig, ist über mehrere
 * Instanzen hinweg aber nur ein Näherungswert.
 *
 * Aufrüstpfad, falls das nicht reicht: diese Funktion auf @vercel/kv oder
 * Upstash Redis umstellen — der Rest des Moduls bleibt unverändert.
 */
const hits = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;

export function isRateLimited(ip: string | undefined): boolean {
  if (!ip) return false;

  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Gelegentlich aufräumen, damit die Map nicht unbegrenzt wächst.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_MAX;
}

// ---------------------------------------------------------------------------
// Gesamturteil
// ---------------------------------------------------------------------------

type ScoreInput = {
  headers: Headers;
  honeypot?: unknown;
  elapsedMs?: unknown;
  name?: string;
  message?: string;
  website?: string;
};

export function scoreSubmission({
  headers,
  honeypot,
  elapsedMs,
  name,
  message,
  website,
}: ScoreInput): SpamVerdict {
  const reasons: string[] = [];
  let score = 0;

  // Honeypot: ein Mensch sieht das Feld nie.
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return { action: 'drop', score: 100, reasons: ['Honeypot ausgefüllt'] };
  }

  const elapsed = Number(elapsedMs);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < MIN_FILL_MS) {
    score += 3;
    reasons.push(`Formular in ${elapsed} ms ausgefüllt`);
  }

  for (const reason of checkClientHints(headers)) {
    score += 3;
    reasons.push(reason);
  }

  // Eine echte Nachricht enthält Leerzeichen.
  if (message && message.trim().length >= 12 && !/\s/.test(message.trim())) {
    score += 3;
    reasons.push('Nachricht ohne jedes Leerzeichen');
  }

  if (name && looksRandom(name)) {
    score += 2;
    reasons.push('Name wirkt wie ein Zufallsstring');
  }

  if (website && looksRandomDomain(website)) {
    score += 1;
    reasons.push('Website wirkt wie eine Zufallsdomain');
  }

  const action = score >= DROP_THRESHOLD ? 'drop' : score >= SUSPECT_THRESHOLD ? 'suspect' : 'accept';

  return { action, score, reasons };
}

/** Einheitliches Log-Format, damit die Schwellen später nachjustierbar sind. */
export function logVerdict(route: string, verdict: SpamVerdict, ip?: string) {
  if (verdict.action === 'accept') return;
  console.warn(
    `[anti-spam] ${route} ${verdict.action} score=${verdict.score} ip=${ip ?? '?'} :: ${verdict.reasons.join(' | ')}`,
  );
}
