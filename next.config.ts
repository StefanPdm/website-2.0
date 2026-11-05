import type { NextConfig } from 'next';

import { absoluteUrl } from './lib/site';

/** PDF in public/ → Inhaltsseite, die Google stattdessen zeigen soll. */
const pdfCanonicals: [string, string][] = [
  ['/dokumente/dvnlp-whitepaper-nlp-forschung.pdf', '/coaching/wissenschaft'],
  ['/dokumente/regeln-erfolgreiches-gluecklichsein.pdf', '/coaching/regeln/gluecklichsein'],
  ['/dokumente/regeln-erfolgreiches-ungluecklichsein.pdf', '/coaching/regeln/ungluecklichsein'],
];

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Content-Security-Policy.
 *
 * Die Seite lädt keine Ressourcen von fremden Servern – externe Adressen im
 * Code sind nur Links, Remote-Bilder laufen über /_next/image. Deshalb reicht
 * überall 'self'.
 *
 * 'unsafe-inline' bei Skripten ist nötig, weil Next.js die Seiten statisch
 * vorrendert und dabei Inline-Skripte einbettet. Nonces gingen nur mit
 * dynamischem Rendern jeder Seite. Der Schutz liegt trotzdem in den übrigen
 * Direktiven: keine fremden Skriptquellen, kein <object>, kein <base>-Kapern,
 * Formulare nur an die eigene Domain, kein Einbetten in fremde Seiten.
 *
 * Seit 2026-11 scharf geschaltet: Vorher alle Sitemap-Seiten mit Podcast,
 * Röntgenblick, KI-Check und WebGL-Effekten geprüft – kein Verstoß. Kommt
 * ein fremder Dienst dazu (Analytics, Karte, Video), hier die Quelle ergänzen,
 * sonst blockiert der Browser ihn. Notfall: auf false = nur melden.
 */
const CSP_ENFORCE = true;

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(CSP_ENFORCE ? ['upgrade-insecure-requests'] : []),
].join('; ');

const nextConfig: NextConfig = {
  // Version im Response-Header verschweigen.
  poweredByHeader: false,

  experimental: {
    // Kein dauerhafter Turbopack-Cache im Dev-Modus (.next/dev): Er blieb unter
    // Windows auf altem CSS hängen, auch über Neustarts hinweg. Ohne ihn startet
    // `pnpm dev` etwas langsamer, zeigt aber nach jedem Neustart den echten Stand.
    turbopackFileSystemCacheForDev: false,
  },

  images: {
    qualities: [100, 75],
    // Keine remotePatterns: Alle Bilder liegen lokal. Fremd geladene Bilder
    // gäben die IP der Besucher an Dritte weiter und bräuchten eine CSP-Ausnahme.
  },

  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      // Entfernte Altseiten: standen mit veralteter Marke ("Studio Fokus") und
      // einem Formular ohne Submit-Handler in der Sitemap. 301 statt 404,
      // damit bereits indexierte URLs ihre Signale an / weitergeben.
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#root-contact',
        permanent: true,
      },
      // Nie existierende Route, war aber aus den Altseiten verlinkt.
      {
        source: '/impressum',
        destination: '/webdevelopment/impressum',
        permanent: true,
      },
      // Welt A ist 2026-11 von /nlp nach /coaching umgezogen: Klienten suchen
      // „Coaching Potsdam“, nicht „NLP“. Diese beiden Regeln halten alte Links
      // aus Anzeigen, LinkedIn, Lesezeichen und Leitfaden-Mails am Leben.
      // Query-Parameter (utm_…, token) reicht Next.js automatisch durch,
      // Sprungmarken (#kontakt) übernimmt der Browser. Nie entfernen.
      {
        source: '/nlp',
        destination: '/coaching',
        permanent: true,
      },
      {
        source: '/nlp/:path*',
        destination: '/coaching/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Token-Landingpage des Lead-Magneten gehört nicht in den Index.
        // Sie ist eine Client Component und kann deshalb kein `metadata`
        // exportieren – der Header erledigt es zuverlässiger.
        source: '/coaching/guide-download',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      // PDFs verweisen per Canonical-Header auf ihre Inhaltsseite. Sonst zeigt
      // Google das PDF – ohne Navigation und ohne Kontaktweg – statt der Seite
      // (Search Console 2026-11: Whitepaper-PDF 32 Einblendungen, Seite 6).
      ...pdfCanonicals.map(([pdf, page]) => ({
        source: pdf,
        headers: [{ key: 'Link', value: `<${absoluteUrl(page)}>; rel="canonical"` }],
      })),
      {
        source: '/:path*',
        headers: [
          {
            key: CSP_ENFORCE
              ? 'Content-Security-Policy'
              : 'Content-Security-Policy-Report-Only',
            value: csp,
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
