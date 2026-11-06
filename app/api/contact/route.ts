import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import {
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  isRateLimited,
  logVerdict,
  scoreSubmission,
} from '@/lib/anti-spam';
import {
  FormError,
  LIMITS,
  assertConsent,
  assertSameOrigin,
  emailField,
  mayConfirm,
  readJsonBody,
  textField,
} from '@/lib/form-guard';
import {
  contactCustomerMail,
  contactOwnerMail,
  contactWorld,
  formatTimestamp,
  type Row,
} from '@/lib/mail-templates';

// SMTP configuration from environment
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_SECURE = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;
const OWNER_EMAIL = process.env.OWNER_EMAIL;

function extractErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}


export async function POST(req: Request) {
  try {
    // Eingangsprüfung (lib/form-guard.ts): eigene Seite, JSON, Größe,
    // Typen, Längen, genau eine E-Mail-Adresse, ausdrückliche Einwilligung.
    assertSameOrigin(req);
    const data = await readJsonBody(req);

    const name = textField(data, 'name', LIMITS.name, { required: true })!;
    const email = emailField(data);
    const message = textField(data, 'message', LIMITS.message, { required: true, multiline: true })!;
    assertConsent(data);
    const projectType = textField(data, 'projectType', LIMITS.short);
    const budget = textField(data, 'budget', LIMITS.short);
    const timeline = textField(data, 'timeline', LIMITS.short);
    const company = textField(data, 'company', LIMITS.short);
    const website = textField(data, 'website', LIMITS.website);
    const scope = textField(data, 'scope', LIMITS.scope, { multiline: true });
    const phone = textField(data, 'phone', LIMITS.phone);
    const topic = textField(data, 'topic', LIMITS.short);
    const sessionType = textField(data, 'sessionType', LIMITS.short);
    const preferredTime = textField(data, 'preferredTime', LIMITS.short);

    if (!OWNER_EMAIL) {
      return NextResponse.json(
        { error: 'Server ist nicht konfiguriert (OWNER_EMAIL fehlt).' },
        { status: 500 },
      );
    }

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      return NextResponse.json(
        { error: 'Server ist nicht konfiguriert (SMTP Zugangsdaten fehlen).' },
        { status: 500 },
      );
    }

    const headers = req.headers;
    const userAgent = headers.get('user-agent') || undefined;
    const acceptLanguage = headers.get('accept-language') || undefined;
    const referer = headers.get('referer') || undefined;
    const origin = headers.get('origin') || undefined;
    const forwardedFor = headers.get('x-forwarded-for') || undefined;
    const realIp = headers.get('x-real-ip') || undefined;
    const ip = (forwardedFor || realIp || '').split(',')[0]?.trim() || undefined;
    const country = headers.get('x-vercel-ip-country') || headers.get('cf-ipcountry') || undefined;
    const region = headers.get('x-vercel-ip-region') || undefined;
    const city = headers.get('x-vercel-ip-city') || undefined;
    const latitude = headers.get('x-vercel-ip-latitude') || undefined;
    const longitude = headers.get('x-vercel-ip-longitude') || undefined;
    const secChUa = headers.get('sec-ch-ua') || undefined;
    const secChUaMobile = headers.get('sec-ch-ua-mobile') || undefined;
    const secChUaPlatform = headers.get('sec-ch-ua-platform') || undefined;

    const locationParts = [city, region, country].filter(Boolean).join(', ');
    const locationCoords = latitude && longitude ? `${latitude}, ${longitude}` : undefined;
    const location = [locationParts, locationCoords].filter(Boolean).join(' • ');

    const clientInfo: Row[] = [
      ['IP', ip],
      ['Standort', location],
      ['Browser', userAgent],
      ['Sec-CH-UA', secChUa],
      ['Plattform', secChUaPlatform],
      ['Mobil', secChUaMobile],
      ['Sprache', acceptLanguage],
      ['Referer', referer],
      ['Origin', origin],
    ];

    // --- Bot-Schutz: greift, bevor irgendeine Mail das System verlässt -------
    // Wichtig, weil die Bestätigungsmail an eine frei wählbare (und damit
    // potenziell fremde) Adresse geht – ungefiltert wäre das ein Mail-Relay.
    const verdict = scoreSubmission({
      headers,
      honeypot: data[HONEYPOT_FIELD],
      elapsedMs: data[ELAPSED_FIELD],
      name,
      message,
      website,
    });
    logVerdict('/api/contact', verdict, ip);

    if (verdict.action === 'drop' || isRateLimited(ip)) {
      // Bewusst 200 mit Erfolgsform: Der Bot erhält kein Signal, dass er
      // erkannt wurde, und variiert seine Payload nicht.
      return NextResponse.json({ ok: true });
    }

    const isSuspect = verdict.action === 'suspect';
    // ------------------------------------------------------------------------

    const world = contactWorld(data);
    const subjectHint = sessionType || topic || projectType || 'Kontakt';

    // Reihenfolge = Anzeige in beiden Mails. Leere Felder fallen weg.
    const rows: Row[] = [
      ['Projektart', projectType],
      ['Format', sessionType],
      ['Thema', topic],
      ['Firma', company],
      ['Website', website],
      ['Umfang', scope],
      ['Budget', budget],
      ['Zeitrahmen', timeline],
      ['Telefon', phone],
      ['Bevorzugte Zeit', preferredTime],
    ];

    const ownerMail = contactOwnerMail({
      world,
      name: name,
      email: email,
      rows,
      message: message,
      subjectHint,
      timestamp: formatTimestamp(),
      clientInfo,
      suspect: isSuspect ? { score: verdict.score, reasons: verdict.reasons } : undefined,
    });

    const customerMail = contactCustomerMail({
      world,
      name: name,
      rows,
      message: message,
    });

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE || SMTP_PORT === 465,
      auth: {
        user: SMTP_USER as string,
        pass: SMTP_PASS as string,
      },
      tls: {
        rejectUnauthorized:
          String(process.env.SMTP_TLS_REJECT_UNAUTHORIZED || '').toLowerCase() === 'false'
            ? false
            : true,
      },
    });

    // Verify SMTP connection first (gives clearer errors)
    try {
      await transporter.verify();
    } catch (verifyErr: unknown) {
      console.error('SMTP verify failed', verifyErr);
      const isProd = process.env.NODE_ENV === 'production';
      const message = isProd
        ? 'E-Mail Versand nicht möglich (SMTP Verbindung fehlgeschlagen).'
        : `SMTP Verify Fehler: ${extractErrorMessage(verifyErr)}`;
      return NextResponse.json({ error: message }, { status: 500 });
    }

    // Send to owner
    await transporter.sendMail({
      from: SMTP_FROM,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: ownerMail.subject,
      text: ownerMail.text,
      html: ownerMail.html,
    });

    // Bestätigung an den Absender – nur bei unverdächtigen Anfragen.
    // Bei Verdacht bleibt der Lead für dich sichtbar, aber es geht keine Mail
    // an eine möglicherweise gefälschte fremde Adresse hinaus.
    // Zusätzlich je Empfängeradresse höchstens 2 Bestätigungen in 24 h (mayConfirm).
    if (!isSuspect && mayConfirm(email)) {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: email,
        replyTo: OWNER_EMAIL,
        subject: customerMail.subject,
        text: customerMail.text,
        html: customerMail.html,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('Contact error', err);
    const isProd = process.env.NODE_ENV === 'production';
    const message = isProd
      ? 'Versand fehlgeschlagen.'
      : `Versand fehlgeschlagen: ${extractErrorMessage(err)}`;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
