import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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
    return 'https://heinemann.berlin';
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

    const { name, email } = data as GuidePayload;

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

    const ts = new Date().toISOString();
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

    const clientInfoLines = [
      ip ? `IP: ${ip}` : null,
      location ? `Standort: ${location}` : null,
      userAgent ? `Browser: ${userAgent}` : null,
      secChUa ? `Sec-CH-UA: ${secChUa}` : null,
      secChUaPlatform ? `Plattform: ${secChUaPlatform}` : null,
      secChUaMobile ? `Mobil: ${secChUaMobile}` : null,
      acceptLanguage ? `Sprache: ${acceptLanguage}` : null,
      referer ? `Referer: ${referer}` : null,
      origin ? `Origin: ${origin}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const expiresInSeconds = 7 * 24 * 60 * 60;
    const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const downloadToken = createDownloadToken(String(email), expiresAt);

    const siteUrl = resolveSiteUrl(req);
    const guideUrl = `${siteUrl}/nlp/guide-download?token=${encodeURIComponent(downloadToken)}`;
    const logoUrl = `${siteUrl}/logos/nlp-logo.png`;

    const signaturePlain = '\n\nMit lieben Gruessen\nStefan\n\nwww.heinemann.berlin\n\n';

    const subject = 'Dein kostenloser NLP-Leitfaden';

    const htmlCustomer = `
      <div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#0B1B2B;background:#f6f9fc;padding:28px">
        <div style="max-width:640px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 12px 30px rgba(15,23,42,0.08);font-family:Helvetica,Arial,sans-serif">
          <div style="padding:24px 26px;border-bottom:1px solid #e5e7eb;background:linear-gradient(135deg,#f5fbff,#eafaf1)">
            <img src="${logoUrl}" alt="SNAC Coaching" style="height:48px;width:48px;display:block" />
            <h1 style="margin:14px 0 6px;font-size:24px;letter-spacing:0.2px">Hallo ${name},</h1>
            <p style="margin:0;color:#475569">hier ist dein kostenloser NLP-Leitfaden.</p>
          </div>
          <div style="padding:24px 26px">
            <p style="margin:0 0 14px;color:#0f172a">Klicke auf den Button, um den Leitfaden herunterzuladen:</p>
            <div style="margin:18px 0">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;font-family:Helvetica,Arial,sans-serif">
                <tr>
                  <td style="border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#00e5ff,#22c55e);box-shadow:0 10px 24px rgba(0,229,255,0.25)">
                    <a href="${guideUrl}" style="display:inline-block;padding:14px 22px;color:#001018;text-decoration:none;font-weight:700;letter-spacing:0.2px;font-family:Helvetica,Arial,sans-serif">Leitfaden herunterladen</a>
                  </td>
                </tr>
              </table>
            </div>
            <p style="margin:0;color:#64748b;font-size:14px">Falls der Button nicht funktioniert, nutze diesen Link:<br/>
              <a href="${guideUrl}" style="color:#0ea5e9">${guideUrl}</a>
            </p>
            <p style="margin:12px 0 0;color:#64748b;font-size:12px">Der Link ist 7 Tage gueltig.</p>
            <p style="margin:18px 0 0">Viel Freude damit und bis vielleicht bald!${signaturePlain.replace(/\n/g, '<br/>')}</p>
          </div>
          <div style="padding:18px 26px;border-top:1px solid #eef2f7;background:#fafcff;text-align:center;font-family:Helvetica,Arial,sans-serif">
            <img src="${logoUrl}" alt="SNAC Coaching" style="height:48px;width:48px;display:inline-block" />
            <p style="margin:8px 0 0;color:#94a3b8;font-size:12px">SNAC Coaching · NLP fuer klare Entscheidungen</p>
          </div>
        </div>
        <p style="max-width:640px;margin:16px auto 0;color:#94a3b8;font-size:12px;font-family:Helvetica,Arial,sans-serif">Diese E-Mail wurde automatisch gesendet.</p>
      </div>
    `;

    const htmlOwner = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu;line-height:1.6;color:#0B1B2B">
        <h2>Neuer NLP-Leitfaden Download</h2>
        <p><strong>Zeitpunkt:</strong> ${ts}</p>
        <p><strong>Name:</strong> ${name}<br/>
        <strong>E-Mail:</strong> ${email}</p>
        ${clientInfoLines ? `<p><strong>Nutzerinfos</strong><br/>${clientInfoLines.replace(/\n/g, '<br/>')}</p>` : ''}
        <p><strong>Download-Link</strong><br/><a href="${guideUrl}">${guideUrl}</a></p>
      </div>
    `;

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
        subject: `NLP-Leitfaden Download – ${name}`,
        text: `Neuer NLP-Leitfaden Download\n\nZeitpunkt: ${ts}\nName: ${name}\nE-Mail: ${email}\n${clientInfoLines ? `\nNutzerinfos:\n${clientInfoLines}\n` : ''}\nDownload-Link: ${guideUrl}\n`,
        html: htmlOwner,
      });
    }

    await transporter.sendMail({
      from: SMTP_FROM,
      to: String(email),
      replyTo: OWNER_EMAIL || SMTP_FROM,
      subject,
      text: `Hallo ${name},\n\nhier ist dein kostenloser NLP-Leitfaden:\n${guideUrl}\n\nDer Link ist 7 Tage gueltig.${signaturePlain}`,
      html: htmlCustomer,
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
