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
    icons: [
      {
        src: '/Global-Logo-SH-1.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
      {
        src: '/Global-Logo-SH-1.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
    ],
  };
}
