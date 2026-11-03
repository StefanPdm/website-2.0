import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

import { SITE_URL } from '@/lib/site';

/**
 * KI-Sichtbarkeits-Check (/webdevelopment/ki-check).
 *
 * Ruft eine fremde, öffentliche Website ab und prüft, wie gut Suchmaschinen
 * und Sprachmodelle sie lesen können. Läuft nur serverseitig (Node-Runtime).
 *
 * Sicherheit (SSRF): Jede Adresse – auch jedes Weiterleitungsziel – wird vor
 * dem Abruf per DNS aufgelöst; private, lokale und reservierte Adressen werden
 * abgelehnt. Nur http/https auf Standard-Ports, höchstens 4 Weiterleitungen,
 * 8 s Zeitlimit und 1,5 MB pro Antwort. Restrisiko: DNS-Rebinding zwischen
 * Prüfung und Abruf – für eine Seite, die nur öffentliche HTML-Seiten liest
 * und keine internen Dienste kennt, vertretbar.
 *
 * Gespeichert wird nichts.
 */

const USER_AGENT = `HeinemannKICheck/1.0 (+${SITE_URL}/webdevelopment/ki-check)`;
const TIMEOUT_MS = 8000;
const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 4;

export const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot'];

export class CheckError extends Error {}

// ---------------------------------------------------------------------------
// Adressprüfung
// ---------------------------------------------------------------------------

function isPrivateV4(ip: string) {
  const [a, b] = ip.split('.').map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateIp(ip: string) {
  if (isIP(ip) === 4) return isPrivateV4(ip);
  const v6 = ip.toLowerCase();
  if (v6 === '::' || v6 === '::1') return true;
  const mapped = v6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateV4(mapped[1]);
  return /^(fc|fd|fe8|fe9|fea|feb)/.test(v6);
}

async function assertPublic(url: URL) {
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new CheckError('Nur http- und https-Adressen sind erlaubt.');
  }
  if (url.port && url.port !== '80' && url.port !== '443') {
    throw new CheckError('Nur Standard-Ports (80 und 443) sind erlaubt.');
  }
  if (url.username || url.password) throw new CheckError('Adressen mit Zugangsdaten sind nicht erlaubt.');
  const host = url.hostname.replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new CheckError('Diese Adresse ist nicht öffentlich erreichbar.');
  }
  const addresses = isIP(host)
    ? [host]
    : await lookup(host, { all: true, verbatim: true })
        .then((list) => list.map((entry) => entry.address))
        .catch(() => {
          throw new CheckError('Die Domain konnte nicht gefunden werden.');
        });
  if (addresses.length === 0 || addresses.some(isPrivateIp)) {
    throw new CheckError('Diese Adresse ist nicht öffentlich erreichbar.');
  }
}

// ---------------------------------------------------------------------------
// Abruf
// ---------------------------------------------------------------------------

type Fetched = { url: URL; status: number; headers: Headers; body: string };

async function readLimited(response: Response) {
  const reader = response.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (size < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    chunks.push(value);
    size += value.length;
  }
  await reader.cancel().catch(() => {});
  return new TextDecoder('utf-8').decode(Buffer.concat(chunks).subarray(0, MAX_BYTES));
}

export async function safeFetch(start: URL, method: 'GET' | 'HEAD' = 'GET'): Promise<Fetched> {
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await assertPublic(url);
    const response = await fetch(url, {
      method,
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,text/plain;q=0.9,*/*;q=0.5' },
    }).catch((error: unknown) => {
      const timeout = error instanceof Error && error.name === 'TimeoutError';
      throw new CheckError(timeout ? 'Die Seite hat nicht rechtzeitig geantwortet.' : 'Die Seite ist nicht erreichbar.');
    });
    const location = response.headers.get('location');
    if (response.status >= 300 && response.status < 400 && location) {
      url = new URL(location, url);
      continue;
    }
    const body = method === 'HEAD' ? '' : await readLimited(response);
    return { url, status: response.status, headers: response.headers, body };
  }
  throw new CheckError('Zu viele Weiterleitungen.');
}

async function fetchOptional(url: URL) {
  try {
    return await safeFetch(url);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Auswertung
// ---------------------------------------------------------------------------

/** robots.txt: Ist der Bot von der Startseite ausgesperrt? */
export function isBlocked(robots: string, bot: string) {
  const groups: { agents: string[]; rules: [string, string][] }[] = [];
  let current: { agents: string[]; rules: [string, string][] } | null = null;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const match = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === 'user-agent') {
      if (!current || current.rules.length) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if (current && (key === 'allow' || key === 'disallow')) {
      current.rules.push([key, value]);
    }
  }
  const group =
    groups.find((g) => g.agents.includes(bot.toLowerCase())) ?? groups.find((g) => g.agents.includes('*'));
  if (!group) return false;
  const disallowAll = group.rules.some(([k, v]) => k === 'disallow' && v === '/');
  const allowAll = group.rules.some(([k, v]) => k === 'allow' && v === '/');
  return disallowAll && !allowAll;
}

function schemaTypes(html: string) {
  const types = new Set<string>();
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (node && typeof node === 'object') {
      const record = node as Record<string, unknown>;
      const t = record['@type'];
      if (typeof t === 'string') types.add(t);
      if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.add(x));
      Object.values(record).forEach(walk);
    }
  };
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      walk(JSON.parse(match[1]));
    } catch {
      /* ungültiges JSON-LD zählt nicht */
    }
  }
  return [...types];
}

const metaContent = (html: string, attr: string, name: string) =>
  html.match(new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]*>`, 'i'))?.[0].match(/content=["']([^"']*)["']/i)?.[1]?.trim() ?? '';

export type CheckItem = {
  id: string;
  label: string;
  ok: boolean;
  points: number;
  max: number;
  detail: string;
  /** Was zu tun ist – erscheint bei den drei größten Schwachstellen. */
  fix: string;
};

export type CheckResult = { url: string; score: number; items: CheckItem[]; weaknesses: CheckItem[] };

export async function runCheck(input: string): Promise<CheckResult> {
  const trimmed = input.trim();
  if (!trimmed || trimmed.length > 300) throw new CheckError('Bitte gib eine gültige Adresse ein.');
  let start: URL;
  try {
    start = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    throw new CheckError('Bitte gib eine gültige Adresse ein.');
  }

  const page = await safeFetch(start);
  if (page.status >= 400) throw new CheckError(`Die Seite antwortet mit Fehler ${page.status}.`);
  const html = page.body;
  const origin = new URL(page.url.origin);

  const [robotsRes, llmsRes, sitemapRes] = await Promise.all([
    fetchOptional(new URL('/robots.txt', origin)),
    fetchOptional(new URL('/llms.txt', origin)),
    fetchOptional(new URL('/sitemap.xml', origin)),
  ]);
  const robots = robotsRes && robotsRes.status < 400 ? robotsRes.body : '';

  const blockedBots = AI_BOTS.filter((bot) => isBlocked(robots, bot));
  const types = schemaTypes(html);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
  const description = metaContent(html, 'name', 'description');
  const robotsMeta = `${metaContent(html, 'name', 'robots')} ${page.headers.get('x-robots-tag') ?? ''}`;
  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  const lang = html.match(/<html[^>]*\slang=["']([^"']+)["']/i)?.[1] ?? '';
  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const llmsOk = Boolean(llmsRes && llmsRes.status === 200 && llmsRes.body.trim().startsWith('#'));
  const sitemapOk =
    /^\s*sitemap:/im.test(robots) || Boolean(sitemapRes && sitemapRes.status === 200 && /<(urlset|sitemapindex)/i.test(sitemapRes.body));
  const securityHeaders = [
    'strict-transport-security',
    'content-security-policy',
    'x-content-type-options',
    'referrer-policy',
  ].filter((key) => page.headers.get(key));
  const frameProtected =
    Boolean(page.headers.get('x-frame-options')) || /frame-ancestors/i.test(page.headers.get('content-security-policy') ?? '');
  const securityCount = securityHeaders.length + (frameProtected ? 1 : 0);

  const item = (i: Omit<CheckItem, 'points'> & { points?: number }): CheckItem => ({
    ...i,
    points: i.points ?? (i.ok ? i.max : 0),
  });

  const items: CheckItem[] = [
    item({
      id: 'index',
      label: 'Darf indexiert werden',
      ok: !/noindex/i.test(robotsMeta),
      max: 15,
      detail: /noindex/i.test(robotsMeta) ? 'Die Seite verbietet Suchmaschinen die Aufnahme (noindex).' : 'Kein noindex gefunden.',
      fix: 'noindex entfernen – sonst taucht die Seite weder bei Google noch in KI-Antworten auf.',
    }),
    item({
      id: 'ai-crawlers',
      label: 'KI-Crawler dürfen lesen',
      ok: blockedBots.length === 0,
      max: 20,
      points: Math.round(20 * (1 - blockedBots.length / AI_BOTS.length)),
      detail: blockedBots.length ? `Ausgesperrt: ${blockedBots.join(', ')}` : `Alle geprüften Bots erlaubt (${AI_BOTS.length}).`,
      fix: 'KI-Crawler in der robots.txt zulassen – wer sie aussperrt, wird von ChatGPT, Claude & Co. nicht zitiert.',
    }),
    item({
      id: 'schema',
      label: 'Strukturierte Daten (JSON-LD)',
      ok: types.length > 0,
      max: 15,
      detail: types.length ? `Gefunden: ${types.slice(0, 6).join(', ')}${types.length > 6 ? ' …' : ''}` : 'Keine strukturierten Daten gefunden.',
      fix: 'Strukturierte Daten ergänzen (z. B. LocalBusiness, Service, FAQPage) – daraus ziehen Google und KI ihre Fakten.',
    }),
    item({
      id: 'llms',
      label: 'llms.txt für Sprachmodelle',
      ok: llmsOk,
      max: 10,
      detail: llmsOk ? '/llms.txt vorhanden.' : 'Keine /llms.txt gefunden.',
      fix: 'Eine /llms.txt anlegen: eine kurze, faktische Beschreibung für Sprachmodelle.',
    }),
    item({
      id: 'meta',
      label: 'Titel und Beschreibung',
      ok: Boolean(title && description),
      max: 10,
      points: (title ? 5 : 0) + (description ? 5 : 0),
      detail: `${title ? 'Titel vorhanden' : 'Kein Titel'} · ${description ? 'Beschreibung vorhanden' : 'Keine Meta-Beschreibung'}`,
      fix: 'Titel und Meta-Beschreibung mit Leistung und Ort setzen – das ist das Snippet in Google.',
    }),
    item({
      id: 'https',
      label: 'HTTPS',
      ok: page.url.protocol === 'https:',
      max: 10,
      detail: page.url.protocol === 'https:' ? 'Verschlüsselt erreichbar.' : 'Die Seite läuft ohne Verschlüsselung.',
      fix: 'HTTPS aktivieren und alle http-Aufrufe darauf umleiten.',
    }),
    item({
      id: 'h1',
      label: 'Genau eine H1-Überschrift',
      ok: h1 === 1,
      max: 5,
      detail: `${h1}× H1 gefunden.`,
      fix: 'Genau eine H1 pro Seite – sie sagt Maschinen, worum es geht.',
    }),
    item({
      id: 'canonical',
      label: 'Canonical-Link',
      ok: canonical,
      max: 5,
      detail: canonical ? 'Vorhanden.' : 'Fehlt.',
      fix: 'Einen Canonical-Link setzen, damit Duplikate nicht konkurrieren.',
    }),
    item({
      id: 'sitemap',
      label: 'Sitemap',
      ok: sitemapOk,
      max: 5,
      detail: sitemapOk ? 'Gefunden.' : 'Keine Sitemap gefunden.',
      fix: 'Eine sitemap.xml bereitstellen und in der robots.txt verlinken.',
    }),
    item({
      id: 'lang',
      label: 'Sprache ausgezeichnet',
      ok: Boolean(lang),
      max: 5,
      detail: lang ? `lang="${lang}"` : 'Kein lang-Attribut.',
      fix: 'Die Seitensprache im <html lang> angeben.',
    }),
    item({
      id: 'security',
      label: 'Sicherheits-Header',
      ok: securityCount === 5,
      max: 10,
      points: securityCount * 2,
      detail: `${securityCount} von 5 (HSTS, CSP, MIME, Referrer, Frames).`,
      fix: 'Sicherheits-Header ergänzen (HSTS, Content-Security-Policy u. a.) – Vertrauenssignal und Schutz zugleich.',
    }),
  ];

  const max = items.reduce((sum, i) => sum + i.max, 0);
  const score = Math.round((items.reduce((sum, i) => sum + i.points, 0) / max) * 100);
  const weaknesses = items
    .filter((i) => i.points < i.max)
    .sort((a, b) => b.max - b.points - (a.max - a.points))
    .slice(0, 3);

  return { url: page.url.href, score, items, weaknesses };
}
