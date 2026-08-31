import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Version im Response-Header verschweigen.
  poweredByHeader: false,

  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neon.com',
        pathname: '/brand/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
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
