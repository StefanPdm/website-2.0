/**
 * Eingangsprüfung für alle Formular-Routen (/api/contact, /api/nlp-guide).
 *
 * Ergänzt lib/anti-spam.ts: Dort geht es um *Bots*, hier um *Missbrauch*
 * durch präparierte Anfragen – vor allem darum, dass die Bestätigungsmail an
 * eine frei wählbare Adresse nie zum Spam-/Phishing-Relay mit unserem
 * Absender wird (CLAUDE.md §8).
 *
 * Reihenfolge in jeder Route: sameOrigin → readJsonBody → Felder prüfen →
 * anti-spam → Mail. Nichts davon darf nach einem sendMail stehen.
 */

/** Obergrenzen je Feld. Das Formular setzt dieselben Werte als maxLength. */
export const LIMITS = {
  name: 100,
  email: 254, // RFC 5321
  phone: 40,
  short: 160, // Selects, Firma, Thema …
  website: 200,
  scope: 2000,
  message: 5000,
} as const;

/** Größer kann ein ehrlich ausgefülltes Formular nicht werden. */
const MAX_BODY_BYTES = 16_000;

export class FormError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

/**
 * Nur Anfragen von der eigenen Seite. Browser senden bei POST per fetch
 * immer einen Origin-Header; fehlt er oder passt er nicht, kommt die
 * Anfrage von einem Skript oder einer fremden Seite (CSRF).
 */
export function assertSameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  let ok = false;
  try {
    ok = Boolean(origin && host && new URL(origin).host === host);
  } catch {
    ok = false;
  }
  if (!ok) throw new FormError('Anfrage nicht erlaubt.', 403);
}

/**
 * Nur JSON, nur kleine Bodies, nur ein flaches Objekt. Kein Form-Encoding
 * mehr: Ein klassisches <form> einer fremden Seite kann kein JSON senden,
 * und für fremdes fetch mit JSON verlangt der Browser eine CORS-Freigabe,
 * die es hier nicht gibt.
 */
export async function readJsonBody(req: Request): Promise<Record<string, unknown>> {
  if (!(req.headers.get('content-type') || '').includes('application/json')) {
    throw new FormError('Ungültiges Format.', 415);
  }
  const declared = Number(req.headers.get('content-length') || 0);
  if (declared > MAX_BODY_BYTES) throw new FormError('Anfrage zu groß.', 413);

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) throw new FormError('Anfrage zu groß.', 413);

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new FormError('Ungültiges Format.');
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new FormError('Ungültiges Format.');
  }
  return data as Record<string, unknown>;
}

/** Steuerzeichen raus (Header-Injection, unsichtbare Tricks); \n nur im Fließtext. */
function clean(value: string, multiline: boolean) {
  // Unsichtbare Zeichen: Zero-Width, Zeilentrenner, Bidi-Steuerung (Trojan-Source-Tricks)
  const stripped = multiline
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028-\u202E\u2066-\u2069]/g, '')
    : value.replace(/[\u0000-\u001F\u007F\u200B-\u200F\u2028-\u202E\u2066-\u2069]/g, ' ');
  return stripped.trim();
}

/**
 * Liest ein Textfeld. Kein String (Objekt, Array, Zahl) → Fehler; zu lang →
 * Fehler statt still kürzen, damit nichts unbemerkt abgeschnitten ankommt.
 */
export function textField(
  data: Record<string, unknown>,
  key: string,
  max: number,
  opts: { required?: boolean; multiline?: boolean } = {},
): string | undefined {
  const value = data[key];
  if (value === undefined || value === null || value === '') {
    if (opts.required) throw new FormError('Bitte fülle alle Pflichtfelder aus.');
    return undefined;
  }
  if (typeof value !== 'string') throw new FormError('Ungültige Eingabe.');
  const cleaned = clean(value, Boolean(opts.multiline));
  if (!cleaned) {
    if (opts.required) throw new FormError('Bitte fülle alle Pflichtfelder aus.');
    return undefined;
  }
  if (cleaned.length > max) throw new FormError('Eine Eingabe ist zu lang.');
  return cleaned;
}

/**
 * Genau **eine** Adresse. Die alte Prüfung `/.+@.+\..+/` ließ
 * „a@x.de, b@y.de, …“ durch – nodemailer hätte die Bestätigung an alle
 * geschickt. Darum: keine Kommas, Semikolons, Leer-, Anführungs- oder
 * Klammerzeichen, genau ein @, Domain mit Punkt und TLD.
 */
const EMAIL_RE = /^[A-Za-z0-9.!#$%&*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,63}$/;

export function emailField(data: Record<string, unknown>, key = 'email'): string {
  const value = textField(data, key, LIMITS.email, { required: true });
  if (!value || !EMAIL_RE.test(value) || value.includes('..')) {
    throw new FormError('Ungültige E-Mail-Adresse.');
  }
  return value;
}

/** Einwilligung muss ausdrücklich gesetzt sein – nicht nur „irgendein Wert“. */
export function assertConsent(data: Record<string, unknown>, key = 'privacy') {
  const v = data[key];
  if (!(v === true || v === 'on' || v === 'true')) {
    throw new FormError('Bitte stimme der Verarbeitung deiner Daten zu.');
  }
}

/**
 * Bestätigungsmails je Empfängeradresse begrenzen. Das IP-Limit in
 * anti-spam.ts hilft nicht, wenn jemand mit vielen IPs dieselbe fremde
 * Adresse zuschüttet. Die Anfrage selbst geht trotzdem an den Betreiber –
 * es entfällt nur die Bestätigung. In-Memory je Instanz (wie isRateLimited).
 */
const confirmations = new Map<string, number[]>();
const CONFIRM_WINDOW_MS = 24 * 60 * 60 * 1000;
const CONFIRM_MAX = 2;

export function mayConfirm(email: string): boolean {
  const key = email.toLowerCase();
  const now = Date.now();
  const recent = (confirmations.get(key) ?? []).filter((t) => now - t < CONFIRM_WINDOW_MS);
  if (recent.length >= CONFIRM_MAX) {
    confirmations.set(key, recent);
    return false;
  }
  recent.push(now);
  confirmations.set(key, recent);
  if (confirmations.size > 1000) {
    for (const [k, times] of confirmations) {
      if (times.every((t) => now - t >= CONFIRM_WINDOW_MS)) confirmations.delete(k);
    }
  }
  return true;
}
