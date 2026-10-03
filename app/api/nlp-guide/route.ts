import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

import {
  ELAPSED_FIELD,
  HONEYPOT_FIELD,
  isRateLimited,
  logVerdict,
  scoreSubmission,
} from '@/lib/anti-spam';
import { guideCustomerMail, guideOwnerMail, formatTimestamp, type Row } from '@/lib/mail-templates';
import { SITE_URL } from '@/lib/site';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_SECURE = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;
const OWNER_EMAIL = process.env.OWNER_EMAIL;
const DOWNLOAD_TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET;
function resolveSiteUrl(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return SITE_URL;
  }

  const envUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  const url = new URL(req.url);
  const forwardedHost = req.headers.get('x-forwarded-host');
  const host = forwardedHost || req.headers.get('host');
  if (host) {
    const forwardedProto = req.headers.get('x-forwarded-proto');
    const proto = forwardedProto || url.protocol.replace(':', '') || 'https';
    return `${proto}://${host}`;
  }

  return url.origin;
}

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

function extractErrorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

type GuidePayload = {
  name: string;
  email: string;
  /** Einwilligung in die Verarbeitung der E-Mail-Adresse (DSGVO Art. 6 Abs. 1 a). */
  privacy?: boolean;
  // Bot-Schutz (siehe lib/anti-spam.ts) – wird nie in die Mail übernommen
  [HONEYPOT_FIELD]?: string;
  [ELAPSED_FIELD]?: number | null;
};

function createDownloadToken(email: string, expiresAt: number) {
  if (!DOWNLOAD_TOKEN_SECRET) {
    throw new Error('DOWNLOAD_TOKEN_SECRET fehlt');
  }

  const payload = JSON.stringify({ e: email, exp: expiresAt });
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', DOWNLOAD_TOKEN_SECRET)
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let data: Partial<GuidePayload> = {};

    if (contentType.includes('application/json')) {
      data = await req.json();
    } else {
      const form = await req.formData();
      form.forEach((value, key) => {
        (data as Record<string, unknown>)[key] = value as string;
      });
    }

    const { name, email, privacy } = data as GuidePayload;

    if (!privacy) {
      return NextResponse.json(
        { error: 'Bitte stimme der Verarbeitung deiner Daten zu.' },
        { status: 400 },
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
        { status: 400 },
      );
    }

    if (!isValidEmail(String(email))) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      return NextResponse.json(
        { error: 'Server ist nicht konfiguriert (SMTP Zugangsdaten fehlen).' },
        { status: 500 },
      );
    }

    if (!DOWNLOAD_TOKEN_SECRET) {
      return NextResponse.json(
        { error: 'Server ist nicht konfiguriert (DOWNLOAD_TOKEN_SECRET fehlt).' },
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

    // --- Bot-Schutz: vor jedem Mailversand -----------------------------------
    // Die Leitfaden-Mail geht an eine frei waehlbare Adresse. Ungefiltert
    // waere das derselbe Relay-Vektor wie beim Kontaktformular.
    const verdict = scoreSubmission({
      headers,
      honeypot: (data as GuidePayload)[HONEYPOT_FIELD],
      elapsedMs: (data as GuidePayload)[ELAPSED_FIELD],
      name: String(name),
    });
    logVerdict('/api/nlp-guide', verdict, ip);

    if (verdict.action === 'drop' || isRateLimited(ip)) {
      // Still bestaetigen, damit der Bot kein Erkennungssignal bekommt.
      return NextResponse.json({ ok: true });
    }
    // -------------------------------------------------------------------------

    const expiresInSeconds = 7 * 24 * 60 * 60;
    const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const downloadToken = createDownloadToken(String(email), expiresAt);

    const siteUrl = resolveSiteUrl(req);
    const guideUrl = `${siteUrl}/nlp/guide-download?token=${encodeURIComponent(downloadToken)}`;

    const customerMail = guideCustomerMail({ name: String(name), guideUrl });
    const ownerMail = guideOwnerMail({
      name: String(name),
      email: String(email),
      guideUrl,
      timestamp: formatTimestamp(),
      clientInfo,
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

    try {
      await transporter.verify();
    } catch (verifyErr: unknown) {
      const isProd = process.env.NODE_ENV === 'production';
      const message = isProd
        ? 'E-Mail Versand nicht möglich (SMTP Verbindung fehlgeschlagen).'
        : `SMTP Verify Fehler: ${extractErrorMessage(verifyErr)}`;
      return NextResponse.json({ error: message }, { status: 500 });
    }

    if (OWNER_EMAIL) {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: OWNER_EMAIL,
        replyTo: String(email),
        subject: ownerMail.subject,
        text: ownerMail.text,
        html: ownerMail.html,
      });
    }

    await transporter.sendMail({
      from: SMTP_FROM,
      to: String(email),
      replyTo: OWNER_EMAIL || SMTP_FROM,
      subject: customerMail.subject,
      text: customerMail.text,
      html: customerMail.html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const isProd = process.env.NODE_ENV === 'production';
    const message = isProd
      ? 'Versand fehlgeschlagen.'
      : `Versand fehlgeschlagen: ${extractErrorMessage(err)}`;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
