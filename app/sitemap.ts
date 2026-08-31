import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

/**
 * Nur Seiten, die auch intern verlinkt sind. Die früheren Einträge /about und
 * /contact standen hier, obwohl kein Link auf sie zeigte und sie eine veraltete
 * Marke trugen – sie sind entfernt und werden per Redirect auf / geführt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: Array<{ path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }> = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/nlp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/webdevelopment', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/nlp/impressum', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/nlp/datenschutz', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/nlp/agb', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/nlp/cookies', priority: 0.1, changeFrequency: 'yearly' },
    { path: '/webdevelopment/impressum', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/webdevelopment/datenschutz', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/webdevelopment/cookies', priority: 0.1, changeFrequency: 'yearly' },
    { path: '/widerruf', priority: 0.2, changeFrequency: 'yearly' },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
