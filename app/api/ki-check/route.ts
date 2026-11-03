import { NextResponse } from 'next/server';

import { HONEYPOT_FIELD } from '@/lib/anti-spam';
import { CheckError, runCheck } from '@/lib/ki-check';

/** nodemailer-freie Route, aber `node:dns` → Node-Runtime (CLAUDE.md §15). */
export const runtime = 'nodejs';

/**
 * Eigenes, großzügigeres Limit als beim Kontaktformular: Wer mehrere
 * Domains vergleicht, soll nicht nach drei Versuchen gesperrt sein – und
 * Checks sollen das Kontakt-Limit derselben IP nicht verbrauchen.
 * In-Memory pro Instanz (siehe lib/anti-spam.ts, gleicher Aufrüstpfad).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_CHECKS = 8;
const hits = new Map<string, number[]>();

function limited(ip: string | undefined) {
  if (!ip) return false;
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_CHECKS;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || undefined;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  // Bot-Schutz (CLAUDE.md §8): gefüllter Honeypot → still abweisen.
  if (typeof body[HONEYPOT_FIELD] === 'string' && body[HONEYPOT_FIELD]) {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  if (limited(ip)) {
    return NextResponse.json(
      { error: 'Zu viele Prüfungen in kurzer Zeit. Bitte versuch es in ein paar Minuten noch einmal.' },
      { status: 429 },
    );
  }

  try {
    const result = await runCheck(String(body.url ?? ''));
    return NextResponse.json(result, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    const message = error instanceof CheckError ? error.message : 'Die Prüfung ist fehlgeschlagen.';
    if (!(error instanceof CheckError)) console.error('[ki-check]', error);
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
