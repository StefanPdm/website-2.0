import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';

/**
 * Nur Seiten, die auch intern verlinkt sind.
 *
 * `lastModified` steht bewusst als **echtes Datum je Seite**, nicht als
 * `new Date()`. Mit der Build-Zeit hätte jeder Deploy an Google gemeldet,
 * alle Seiten seien geändert worden — auch das Impressum. Google lernt daraus,
 * dass die lastmod-Angaben wertlos sind, und ignoriert sie anschließend.
 *
 * **Pflege:** Bei inhaltlicher Änderung einer Seite das Datum hier mitziehen.
 * Reine Refactorings, Styling oder Tippfehlerkorrekturen zählen nicht — das
 * Feld beschreibt, wann sich für den Leser etwas geändert hat.
 * Ausgangswerte stammen aus `git log -1 --format=%as -- <datei>`.
 */

type Page = {
  path: string;
  /** Letzte inhaltliche Änderung, ISO-Datum. */
  lastModified: string;
  priority: number;
  changeFrequency: 'monthly' | 'yearly';
};

const pages: Page[] = [
  // Kernseiten
  { path: '/', lastModified: '2026-09-01', priority: 1, changeFrequency: 'monthly' },
  { path: '/nlp', lastModified: '2026-09-01', priority: 0.9, changeFrequency: 'monthly' },
  {
    path: '/webdevelopment',
    lastModified: '2026-09-01',
    priority: 0.9,
    changeFrequency: 'monthly',
  },

  // Inhaltsseiten
  {
    path: '/nlp/regeln/gluecklichsein',
    lastModified: '2026-09-01',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/nlp/regeln/ungluecklichsein',
    lastModified: '2026-09-01',
    priority: 0.7,
    changeFrequency: 'monthly',
  },

  // Rechtliches – ändert sich selten, Datum entsprechend alt
  {
    path: '/nlp/impressum',
    lastModified: '2026-09-01',
    priority: 0.2,
    changeFrequency: 'yearly',
  },
  {
    path: '/nlp/datenschutz',
    lastModified: '2026-09-01',
    priority: 0.2,
    changeFrequency: 'yearly',
  },
  { path: '/nlp/agb', lastModified: '2026-09-01', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/nlp/cookies', lastModified: '2026-09-01', priority: 0.1, changeFrequency: 'yearly' },
  {
    path: '/webdevelopment/impressum',
    lastModified: '2026-02-12',
    priority: 0.2,
    changeFrequency: 'yearly',
  },
  {
    path: '/webdevelopment/datenschutz',
    lastModified: '2026-02-13',
    priority: 0.2,
    changeFrequency: 'yearly',
  },
  {
    path: '/webdevelopment/cookies',
    lastModified: '2026-02-13',
    priority: 0.1,
    changeFrequency: 'yearly',
  },
  { path: '/widerruf', lastModified: '2026-02-08', priority: 0.2, changeFrequency: 'yearly' },
];

/** Wird auch von scripts/indexnow.mjs gelesen. */
export const sitemapPaths = pages.map((page) => page.path);

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, lastModified, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(`${lastModified}T00:00:00Z`),
    changeFrequency,
    priority,
  }));
}
