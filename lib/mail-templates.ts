/**
 * E-Mail-Vorlagen für Kontaktformular und Leitfaden-Versand.
 *
 * Mail-Programme sind kein Browser: kein externes CSS, kein Flexbox, kaum
 * Gradients (Outlook), SVG oft gar nicht. Deshalb Tabellen-Layout, Inline-Styles,
 * PNG-Logos und für jeden Verlauf eine Vollfarbe als Rückfall (`bgcolor`).
 *
 * SICHERHEIT: Jede Nutzereingabe läuft durch `esc()`. Ungefiltert konnte jemand
 * über das Nachrichtenfeld HTML (Links, Buttons) in die Bestätigungsmail
 * schreiben – die dann von unserer Adresse an eine frei wählbare Adresse ging.
 */

import { absoluteUrl, OWNER } from '@/lib/site';

export type MailWorld = 'nlp' | 'web' | 'root';

type Brand = {
  name: string;
  tagline: string;
  logo: { src: string; width: number; height: number; alt: string };
  /** Kopfzeile */
  dark: string;
  /** Akzentverlauf von → bis; `accent` ist zugleich die Vollfarbe für Outlook */
  accent: string;
  accent2: string;
  buttonText: string;
  /** Textlinks auf Weiß – dunkel genug für 4.5:1 (CLAUDE.md §11) */
  link: string;
  /** Zeile unter dem Namen in der Signatur */
  role: string;
  replyTo: string;
  home: string;
  imprint: string;
  privacy: string;
};

const BRANDS: Record<MailWorld, Brand> = {
  nlp: {
    name: 'NLP Coaching',
    tagline: 'Stefan Heinemann · Potsdam & Berlin',
    logo: { src: '/logos/logo-nlp-256.png', width: 48, height: 48, alt: 'NLP Coaching' },
    dark: '#050b12',
    accent: '#00b8cc',
    accent2: '#22c55e',
    buttonText: '#001018',
    link: '#0e7490',
    role: 'NLP Coach · Potsdam & Berlin',
    replyTo: OWNER.emailCoaching,
    home: '/nlp',
    imprint: '/nlp/impressum',
    privacy: '/nlp/datenschutz',
  },
  web: {
    name: 'Stefan Heinemann',
    tagline: 'Webentwicklung · Potsdam & Berlin',
    logo: { src: '/logos/logo-web-340.png', width: 82, height: 48, alt: 'Stefan Heinemann Webentwicklung' },
    dark: '#0b1b2b',
    accent: '#1d6fa8',
    accent2: '#7a2c8e',
    buttonText: '#ffffff',
    link: '#1d6fa8',
    role: 'Webentwickler · Potsdam & Berlin',
    replyTo: OWNER.email,
    home: '/webdevelopment',
    imprint: '/webdevelopment/impressum',
    privacy: '/webdevelopment/datenschutz',
  },
  root: {
    name: 'Stefan Heinemann',
    tagline: 'NLP Coach & Webentwickler · Potsdam',
    logo: { src: '/logos/logo-sh-192.png', width: 48, height: 48, alt: 'Stefan Heinemann' },
    dark: '#070b12',
    accent: '#1d6fa8',
    accent2: '#f6b35a',
    buttonText: '#ffffff',
    link: '#1d6fa8',
    role: 'NLP Coach & Webentwickler · Potsdam',
    replyTo: OWNER.email,
    home: '/',
    imprint: '/webdevelopment/impressum',
    privacy: '/webdevelopment/datenschutz',
  },
};

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const C = {
  page: '#eef2f6',
  card: '#ffffff',
  text: '#0f172a',
  body: '#334155',
  muted: '#64748b',
  line: '#e2e8f0',
  soft: '#f8fafc',
};

/** HTML-Sonderzeichen maskieren – für JEDE Nutzereingabe. */
export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Maskiert und erhält Zeilenumbrüche. */
const escMultiline = (value: unknown) => esc(value).replace(/\r?\n/g, '<br />');

/** Ordnet eine Anfrage anhand ihrer Felder einer Welt zu (Vertrag: CLAUDE.md §8). */
export function contactWorld(data: Record<string, unknown>): MailWorld {
  if (data.sessionType || data.topic || data.preferredTime || data.phone) return 'nlp';
  if (data.scope || data.company) return 'web';
  return 'root';
}

export function formatTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  }).format(date);
}

// ---------------------------------------------------------------------------
// Bausteine
// ---------------------------------------------------------------------------

export type Row = [label: string, value: unknown];

function detailsTable(rows: Row[]) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '');
  if (!filled.length) return '';
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:0 0 24px">
      ${filled
        .map(
          ([label, value], i) => `
        <tr>
          <td style="padding:10px 12px 10px 0;width:150px;vertical-align:top;font:500 13px/1.5 ${FONT};color:${C.muted};${i ? `border-top:1px solid ${C.line};` : ''}">${esc(label)}</td>
          <td style="padding:10px 0;vertical-align:top;font:400 14px/1.5 ${FONT};color:${C.text};${i ? `border-top:1px solid ${C.line};` : ''}">${escMultiline(value)}</td>
        </tr>`,
        )
        .join('')}
    </table>`;
}

function messageBlock(title: string, text: unknown, brand: Brand) {
  return `
    <p style="margin:0 0 8px;font:600 13px/1.5 ${FONT};color:${C.muted};text-transform:uppercase;letter-spacing:.08em">${esc(title)}</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:0 0 24px">
      <tr>
        <td style="background:${C.soft};border-left:3px solid ${brand.accent};border-radius:0 8px 8px 0;padding:16px 18px;font:400 15px/1.65 ${FONT};color:${C.text}">${escMultiline(text)}</td>
      </tr>
    </table>`;
}

function button(href: string, label: string, brand: Brand) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:8px 0 24px">
      <tr>
        <td bgcolor="${brand.accent}" style="border-radius:999px;background:${brand.accent};background-image:linear-gradient(120deg,${brand.accent},${brand.accent2})">
          <a href="${esc(href)}" style="display:inline-block;padding:14px 28px;font:700 15px/1 ${FONT};color:${brand.buttonText};text-decoration:none;border-radius:999px">${esc(label)}</a>
        </td>
      </tr>
    </table>`;
}

function heading(text: string) {
  return `<h1 style="margin:0 0 12px;font:700 24px/1.3 ${FONT};color:${C.text};letter-spacing:-.01em">${text}</h1>`;
}

function paragraph(html: string) {
  return `<p style="margin:0 0 16px;font:400 15px/1.65 ${FONT};color:${C.body}">${html}</p>`;
}

function steps(items: string[], brand: Brand) {
  return `
    <p style="margin:8px 0 12px;font:600 13px/1.5 ${FONT};color:${C.muted};text-transform:uppercase;letter-spacing:.08em">So geht es weiter</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:0 0 24px">
      ${items
        .map(
          (item, i) => `
        <tr>
          <td style="width:36px;padding:0 0 12px;vertical-align:top">
            <div style="width:26px;height:26px;border-radius:999px;background:${brand.accent};color:${brand.buttonText};font:700 13px/26px ${FONT};text-align:center">${i + 1}</div>
          </td>
          <td style="padding:3px 0 12px;font:400 15px/1.5 ${FONT};color:${C.body}">${item}</td>
        </tr>`,
        )
        .join('')}
    </table>`;
}

/** Technische Metadaten für interne Mails – klein, grau, immer sichtbar
    (<details> wird von Gmail und Outlook nicht unterstützt). */
function techBlock(rows: Row[]) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '');
  if (!filled.length) return '';
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;background:${C.soft};border-radius:8px">
      <tr><td colspan="2" style="padding:12px 14px 4px;font:600 11px/1.5 ${FONT};color:${C.muted};text-transform:uppercase;letter-spacing:.08em">Technische Angaben</td></tr>
      ${filled
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:2px 8px 2px 14px;width:90px;vertical-align:top;font:500 11px/1.5 ${FONT};color:${C.muted}">${esc(label)}</td>
          <td style="padding:2px 14px 2px 0;vertical-align:top;font:400 11px/1.5 ${FONT};color:${C.body};word-break:break-all">${esc(value)}</td>
        </tr>`,
        )
        .join('')}
      <tr><td colspan="2" style="height:10px;line-height:10px;font-size:0">&nbsp;</td></tr>
    </table>`;
}

function signature(brand: Brand) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;border-top:1px solid ${C.line};margin-top:8px">
      <tr>
        <td style="padding-top:20px;font:400 15px/1.6 ${FONT};color:${C.body}">
          Mit lieben Grüßen<br />
          <strong style="color:${C.text}">${esc(OWNER.name)}</strong><br />
          <span style="font-size:13px;color:${C.muted}">${esc(brand.role)}</span><br />
          <a href="mailto:${esc(brand.replyTo)}" style="font-size:13px;color:${brand.link};text-decoration:none">${esc(brand.replyTo)}</a>
          <span style="font-size:13px;color:${C.muted}"> · </span>
          <a href="${absoluteUrl(brand.home)}" style="font-size:13px;color:${brand.link};text-decoration:none">heinemann.berlin</a>
        </td>
      </tr>
    </table>`;
}

function layout(opts: { world: MailWorld; preheader: string; content: string; footerNote: string; label?: string }) {
  const brand = BRANDS[opts.world];
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(brand.name)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(opts.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${C.page}" style="background:${C.page}">
    <tr>
      <td align="center" style="padding:32px 12px">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;background:${C.card};border-radius:16px;overflow:hidden;box-shadow:0 12px 32px rgba(15,23,42,.08)">
          <tr>
            <td bgcolor="${brand.dark}" style="background:${brand.dark};padding:24px 32px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="${brand.logo.width + 16}" style="vertical-align:middle">
                    <img src="${absoluteUrl(brand.logo.src)}" width="${brand.logo.width}" height="${brand.logo.height}" alt="${esc(brand.logo.alt)}" style="display:block;border:0;outline:none" />
                  </td>
                  <td style="vertical-align:middle">
                    <div style="font:700 17px/1.3 ${FONT};color:#ffffff">${esc(brand.name)}</div>
                    <div style="font:400 13px/1.4 ${FONT};color:rgba(255,255,255,.7)">${esc(brand.tagline)}</div>
                  </td>
                  ${
                    opts.label
                      ? `<td align="right" style="vertical-align:middle"><span style="display:inline-block;padding:5px 12px;border:1px solid rgba(255,255,255,.3);border-radius:999px;font:600 11px/1.2 ${FONT};color:#ffffff;letter-spacing:.08em;text-transform:uppercase">${esc(opts.label)}</span></td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="${brand.accent}" height="4" style="height:4px;line-height:4px;font-size:0;background:${brand.accent};background-image:linear-gradient(90deg,${brand.accent},${brand.accent2})">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px">${opts.content}</td>
          </tr>
        </table>
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px">
          <tr>
            <td align="center" style="padding:20px 24px 0;font:400 12px/1.6 ${FONT};color:${C.muted}">
              ${esc(OWNER.name)} · ${esc(OWNER.street)} · ${esc(OWNER.postalCode)} ${esc(OWNER.city)}<br />
              <a href="${absoluteUrl(brand.imprint)}" style="color:${C.muted}">Impressum</a> ·
              <a href="${absoluteUrl(brand.privacy)}" style="color:${C.muted}">Datenschutz</a><br />
              ${opts.footerNote}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plain-Text-Fassung: Label-Wert-Zeilen ohne leere Felder. */
function plainRows(rows: Row[]) {
  return rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([l, v]) => `${l}: ${String(v)}`)
    .join('\n');
}

const plainSignature = (brand: Brand) =>
  `\n\nMit lieben Grüßen\n${OWNER.name}\n${brand.role}\n${brand.replyTo} · ${absoluteUrl(brand.home)}\n`;

// ---------------------------------------------------------------------------
// Kontaktformular
// ---------------------------------------------------------------------------

const NEXT_STEPS: Record<MailWorld, string[]> = {
  nlp: [
    'Ich lese deine Nachricht in Ruhe.',
    'Innerhalb von 24–48 Stunden melde ich mich bei dir.',
    'Wir vereinbaren ein kostenloses Erstgespräch und schauen, ob es passt.',
  ],
  web: [
    'Ich sehe mir dein Vorhaben an.',
    'Innerhalb von 24–48 Stunden bekommst du eine erste Einschätzung und meine Rückfragen.',
    'Wenn es passt, folgt ein kurzes Gespräch zu Zielen, Umfang und Zeitplan.',
  ],
  root: [
    'Ich lese deine Nachricht in Ruhe.',
    'Innerhalb von 24–48 Stunden melde ich mich mit einer ehrlichen Einschätzung.',
    'Wenn es passt, besprechen wir die nächsten Schritte.',
  ],
};

export function contactCustomerMail(opts: { world: MailWorld; name: string; rows: Row[]; message: string }) {
  const brand = BRANDS[opts.world];
  const content = [
    heading(`Danke, ${esc(opts.name)}!`),
    paragraph('Deine Nachricht ist bei mir angekommen. Ich melde mich in der Regel innerhalb von <strong>24–48 Stunden</strong> persönlich bei dir.'),
    steps(NEXT_STEPS[opts.world], brand),
    opts.rows.length ? `<p style="margin:0 0 4px;font:600 13px/1.5 ${FONT};color:${C.muted};text-transform:uppercase;letter-spacing:.08em">Deine Angaben</p>` : '',
    detailsTable(opts.rows),
    messageBlock('Deine Nachricht', opts.message, brand),
    paragraph('Falls dir noch etwas einfällt: Antworte einfach direkt auf diese E-Mail.'),
    signature(brand),
  ].join('');

  return {
    subject: 'Danke für deine Anfrage – ich melde mich',
    html: layout({
      world: opts.world,
      preheader: 'Deine Nachricht ist angekommen. Ich melde mich innerhalb von 24–48 Stunden.',
      content,
      footerNote: 'Du erhältst diese E-Mail, weil du das Kontaktformular auf heinemann.berlin genutzt hast.',
    }),
    text:
      `Hallo ${opts.name},\n\ndanke für deine Anfrage! Deine Nachricht ist angekommen. Ich melde mich in der Regel innerhalb von 24–48 Stunden persönlich bei dir.\n\n` +
      `So geht es weiter:\n${NEXT_STEPS[opts.world].map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n` +
      `${opts.rows.length ? `Deine Angaben:\n${plainRows(opts.rows)}\n\n` : ''}Deine Nachricht:\n${opts.message}` +
      plainSignature(brand),
  };
}

const WORLD_LABEL: Record<MailWorld, string> = {
  nlp: 'NLP Coaching',
  web: 'Webentwicklung',
  root: 'Startseite',
};

export function contactOwnerMail(opts: {
  world: MailWorld;
  name: string;
  email: string;
  rows: Row[];
  message: string;
  subjectHint: string;
  timestamp: string;
  clientInfo: Row[];
  suspect?: { score: number; reasons: string[] };
}) {
  const brand = BRANDS[opts.world];
  const replySubject = `Re: ${opts.subjectHint}`;
  const warning = opts.suspect
    ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px">
        <tr><td style="background:#fffbeb;border:1px solid #f59e0b;border-radius:10px;padding:14px 16px;font:400 14px/1.55 ${FONT};color:#78350f">
          <strong>Spam-Verdacht (Score ${opts.suspect.score})</strong>
          <ul style="margin:6px 0 0;padding-left:18px">${opts.suspect.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
          <div style="margin-top:6px;font-size:12px">An den Absender wurde <strong>keine</strong> Bestätigung versendet.</div>
        </td></tr>
      </table>`
    : '';

  const content = [
    warning,
    heading(`Neue Anfrage von ${esc(opts.name)}`),
    paragraph(`${esc(opts.timestamp)} · über ${esc(WORLD_LABEL[opts.world])}`),
    detailsTable([['Name', opts.name], ['E-Mail', opts.email], ...opts.rows]),
    messageBlock('Nachricht', opts.message, brand),
    button(`mailto:${opts.email}?subject=${encodeURIComponent(replySubject)}`, `${opts.name} antworten`, brand),
    opts.clientInfo.length
      ? techBlock(opts.clientInfo)
      : '',
  ].join('');

  return {
    subject: `${opts.suspect ? '[SPAM?] ' : ''}Neue Anfrage: ${opts.subjectHint} – ${opts.name}`,
    html: layout({
      world: opts.world,
      preheader: `${opts.name}: ${opts.message.slice(0, 120)}`,
      content,
      label: WORLD_LABEL[opts.world],
      footerNote: 'Interne Benachrichtigung aus dem Kontaktformular.',
    }),
    text:
      `Neue Anfrage über ${WORLD_LABEL[opts.world]}\n` +
      (opts.suspect
        ? `\n--- SPAM-VERDACHT (Score ${opts.suspect.score}) ---\n${opts.suspect.reasons.join('\n')}\nKeine Bestätigung an den Absender versendet.\n---\n`
        : '') +
      `\nZeitpunkt: ${opts.timestamp}\n\n${plainRows([['Name', opts.name], ['E-Mail', opts.email], ...opts.rows])}\n\nNachricht:\n${opts.message}\n` +
      (opts.clientInfo.length ? `\nTechnische Angaben:\n${plainRows(opts.clientInfo)}\n` : ''),
  };
}

// ---------------------------------------------------------------------------
// NLP-Leitfaden
// ---------------------------------------------------------------------------

export function guideCustomerMail(opts: { name: string; guideUrl: string }) {
  const brand = BRANDS.nlp;
  const content = [
    heading(`Hallo ${esc(opts.name)},`),
    paragraph('hier ist dein kostenloser NLP-Leitfaden. Ein Klick genügt:'),
    button(opts.guideUrl, 'Leitfaden herunterladen', brand),
    `<p style="margin:0 0 24px;font:400 13px/1.6 ${FONT};color:${C.muted}">Der Link ist <strong>7 Tage</strong> gültig. Falls der Button nicht funktioniert, kopiere diese Adresse in deinen Browser:<br />
      <a href="${esc(opts.guideUrl)}" style="color:${brand.link};word-break:break-all">${esc(opts.guideUrl)}</a></p>`,
    paragraph('Viel Freude beim Lesen. Wenn du beim Ausprobieren merkst, dass du ein Thema vertiefen willst: Antworte einfach auf diese E-Mail.'),
    signature(brand),
  ].join('');

  return {
    subject: 'Dein kostenloser NLP-Leitfaden',
    html: layout({
      world: 'nlp',
      preheader: 'Dein Download-Link – 7 Tage gültig.',
      content,
      footerNote: 'Du erhältst diese E-Mail, weil du den Leitfaden auf heinemann.berlin angefordert hast.',
    }),
    text:
      `Hallo ${opts.name},\n\nhier ist dein kostenloser NLP-Leitfaden:\n${opts.guideUrl}\n\nDer Link ist 7 Tage gültig.` +
      plainSignature(brand),
  };
}

export function guideOwnerMail(opts: {
  name: string;
  email: string;
  guideUrl: string;
  timestamp: string;
  clientInfo: Row[];
}) {
  const brand = BRANDS.nlp;
  const content = [
    heading('Neuer Leitfaden-Download'),
    paragraph(esc(opts.timestamp)),
    detailsTable([['Name', opts.name], ['E-Mail', opts.email]]),
    button(`mailto:${opts.email}?subject=${encodeURIComponent('Dein NLP-Leitfaden')}`, `${opts.name} schreiben`, brand),
    opts.clientInfo.length
      ? techBlock([...opts.clientInfo, ['Download-Link', opts.guideUrl]])
      : '',
  ].join('');

  return {
    subject: `Leitfaden angefordert – ${opts.name}`,
    html: layout({
      world: 'nlp',
      preheader: `${opts.name} (${opts.email}) hat den Leitfaden angefordert.`,
      content,
      label: 'Leitfaden',
      footerNote: 'Interne Benachrichtigung aus dem Leitfaden-Formular.',
    }),
    text:
      `Neuer NLP-Leitfaden Download\n\nZeitpunkt: ${opts.timestamp}\nName: ${opts.name}\nE-Mail: ${opts.email}\n\nDownload-Link:\n${opts.guideUrl}\n` +
      (opts.clientInfo.length ? `\nTechnische Angaben:\n${plainRows(opts.clientInfo)}\n` : ''),
  };
}
