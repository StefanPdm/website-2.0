import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stefan Heinemann – Webdevelopment & NLP Coaching',
    short_name: 'Stefan H.',
    description:
      'Moderne Webentwicklung und NLP Coaching – wähle den Service, der dich weiterbringt.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1118',
    theme_color: '#0b1118',
    // Aus logos/logo-sh.svg gerastert. Das Manifest verlangt echte
    // Pixelgrößen – ein SVG mit falsch deklarierter Größe wird verworfen.
    icons: [
      {
        src: '/logos/logo-sh-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logos/logo-sh-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
