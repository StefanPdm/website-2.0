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

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

function extractErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

type ContactPayload = {
  name: string;
  email: string;
  projectType?: string; // web
  budget?: string;
  timeline?: string;
  message: string;
  privacy: string | boolean;
  // web extras
  company?: string;
  website?: string;
  scope?: string;
  // nlp extras
  phone?: string;
  topic?: string;
  sessionType?: string;
  preferredTime?: string;
  // Bot-Schutz (siehe lib/anti-spam.ts) – wird nie in die Mail übernommen
  [HONEYPOT_FIELD]?: string;
  [ELAPSED_FIELD]?: number | null;
};

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let data: Partial<ContactPayload> = {};

    if (contentType.includes('application/json')) {
      data = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await req.formData();
      form.forEach((value, key) => {
        (data as Record<string, unknown>)[key] = value as string;
      });
    } else {
      // try formData fallback
      try {
        const form = await req.formData();
        form.forEach((value, key) => {
          (data as Record<string, unknown>)[key] = value as string;
        });
      } catch {
        // ignore
      }
    }

    const {
      name,
      email,
      projectType,
      budget,
      timeline,
      message,
      privacy,
      company,
      website,
      scope,
      phone,
      topic,
      sessionType,
      preferredTime,
    } = (data || {}) as ContactPayload;

    if (!name || !email || !message || !privacy) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(String(email))) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

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
      honeypot: (data as ContactPayload)[HONEYPOT_FIELD],
      elapsedMs: (data as ContactPayload)[ELAPSED_FIELD],
      name: String(name),
      message: String(message),
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

    const world = contactWorld(data as Record<string, unknown>);
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
      name: String(name),
      email: String(email),
      rows,
      message: String(message),
      subjectHint: String(subjectHint),
      timestamp: formatTimestamp(),
      clientInfo,
      suspect: isSuspect ? { score: verdict.score, reasons: verdict.reasons } : undefined,
    });

    const customerMail = contactCustomerMail({
      world,
      name: String(name),
      rows,
      message: String(message),
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
      replyTo: String(email),
      subject: ownerMail.subject,
      text: ownerMail.text,
      html: ownerMail.html,
    });

    // Bestätigung an den Absender – nur bei unverdächtigen Anfragen.
    // Bei Verdacht bleibt der Lead für dich sichtbar, aber es geht keine Mail
    // an eine möglicherweise gefälschte fremde Adresse hinaus.
    if (!isSuspect) {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: String(email),
        replyTo: OWNER_EMAIL,
        subject: customerMail.subject,
        text: customerMail.text,
        html: customerMail.html,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('Contact error', err);
    const isProd = process.env.NODE_ENV === 'production';
    const message = isProd
      ? 'Versand fehlgeschlagen.'
      : `Versand fehlgeschlagen: ${extractErrorMessage(err)}`;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
