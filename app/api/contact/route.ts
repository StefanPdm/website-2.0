import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    const ts = new Date().toISOString();
    const signaturePlain = '\n\nMit lieben Grüßen\nStefan';
    const signatureHtml = '<p style="margin-top:16px">Mit lieben Grüßen<br/>Stefan</p>';

    const subjectHint = sessionType || topic || projectType || 'Kontakt';

    const extraLines = [
      company ? `Firma: ${company}` : null,
      website ? `Website: ${website}` : null,
      scope ? `Umfang: ${scope}` : null,
      phone ? `Telefon: ${phone}` : null,
      preferredTime ? `Bevorzugte Zeit: ${preferredTime}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const plain = `Neue Anfrage über Webseite\n\nZeitpunkt: ${ts}\n\nName: ${name}\nE-Mail: ${email}\n${projectType ? `Projektart: ${projectType}\n` : ''}${sessionType ? `Format: ${sessionType}\n` : ''}${topic ? `Thema: ${topic}\n` : ''}${budget ? `Budget: ${budget}\n` : ''}${timeline ? `Zeitrahmen: ${timeline}\n` : ''}${extraLines ? `\nZusatz:\n${extraLines}\n` : ''}\nNachricht:\n${message}${signaturePlain}\n`;

    const htmlOwner = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu;line-height:1.6;color:#0B1B2B">
        <h2>Neue Anfrage über Webseite</h2>
        <p><strong>Zeitpunkt:</strong> ${ts}</p>
        <p><strong>Name:</strong> ${name}<br/>
        <strong>E-Mail:</strong> ${email}<br/>
        ${projectType ? `<strong>Projektart:</strong> ${projectType}<br/>` : ''}
        ${sessionType ? `<strong>Format:</strong> ${sessionType}<br/>` : ''}
        ${topic ? `<strong>Thema:</strong> ${topic}<br/>` : ''}
        ${company ? `<strong>Firma:</strong> ${company}<br/>` : ''}
        ${website ? `<strong>Website:</strong> ${website}<br/>` : ''}
        ${scope ? `<strong>Umfang:</strong> ${scope}<br/>` : ''}
        ${budget ? `<strong>Budget:</strong> ${budget}<br/>` : ''}
        ${timeline ? `<strong>Zeitrahmen:</strong> ${timeline}` : ''}</p>
        <p><strong>Nachricht</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>
        ${signatureHtml}
      </div>
    `;

    const htmlCustomer = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu;line-height:1.6;color:#0B1B2B">
        <h2>Danke für Deine Anfrage, ${name}!</h2>
        <p>Ich habe Deine Nachricht erhalten und melde mich in der Regel innerhalb von 24–48 Stunden zurück.</p>
        <hr style="border:none;height:1px;background:#e5e7eb;margin:16px 0" />
        <p><strong>Zusammenfassung</strong></p>
        <p>
        ${projectType ? `<strong>Projektart:</strong> ${projectType}<br/>` : ''}
        ${sessionType ? `<strong>Format:</strong> ${sessionType}<br/>` : ''}
        ${topic ? `<strong>Thema:</strong> ${topic}<br/>` : ''}
        ${budget ? `<strong>Budget:</strong> ${budget}<br/>` : ''}
        ${timeline ? `<strong>Zeitrahmen:</strong> ${timeline}<br/>` : ''}
        </p>
        <p><strong>Deine Nachricht</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>
        ${signatureHtml}
        <p style="color:#475569;font-size:12px;margin-top:16px">Diese E-Mail wurde automatisch gesendet. Antworte gerne direkt auf diese Nachricht.</p>
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
      subject: `Neue Anfrage: ${subjectHint} – ${name}`,
      text: plain,
      html: htmlOwner,
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: SMTP_FROM,
      to: String(email),
      replyTo: OWNER_EMAIL,
      subject: 'Danke für Deine Anfrage – ich melde mich',
      text: `Hallo ${name},\n\nDanke für Deine Anfrage! Ich melde mich in der Regel innerhalb von 24–48 Stunden mit einer Einschätzung zurück.${signaturePlain}`,
      html: htmlCustomer,
    });

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
