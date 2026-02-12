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
const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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

    const expiresInSeconds = 7 * 24 * 60 * 60;
    const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const downloadToken = createDownloadToken(String(email), expiresAt);

    const guideUrl = `${SITE_URL}/api/nlp-guide/download?token=${encodeURIComponent(downloadToken)}`;
    const logoUrl = `${SITE_URL}/logos/nlp-logo.png`;

    const signaturePlain = '\n\nMit lieben Gruessen\nStefan\n\n\www.heinemann.berlin\n\n';

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
