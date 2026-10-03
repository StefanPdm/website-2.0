import type { NextConfig } from 'next';

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
 * Läuft zunächst als Report-Only: Der Browser blockiert nichts, meldet
 * Verstöße aber in der Konsole. Wenn dort im Live-Betrieb nichts auftaucht,
 * CSP_ENFORCE auf true setzen.
 */
const CSP_ENFORCE = false;

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
    ];
  },

  async headers() {
    return [
      {
        // Token-Landingpage des Lead-Magneten gehört nicht in den Index.
        // Sie ist eine Client Component und kann deshalb kein `metadata`
        // exportieren – der Header erledigt es zuverlässiger.
        source: '/nlp/guide-download',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
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
