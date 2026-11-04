import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stefan Heinemann – Webdevelopment & Coaching',
    short_name: 'Stefan H.',
    description:
      'Moderne Webentwicklung und Life Coaching für Unternehmer – wähle den Service, der dich weiterbringt.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1118',
    theme_color: '#0b1118',
    // Aus logos/logo-zeichen.svg gerastert. Das Manifest verlangt echte
    // Pixelgrößen – ein SVG mit falsch deklarierter Größe wird verworfen.
    icons: [
      {
        src: '/logos/logo-zeichen-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logos/logo-zeichen-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
