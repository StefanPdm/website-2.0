import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/**
 * KI-Crawler sind bewusst ausdrücklich erlaubt: Die Seite soll auch in
 * LLM-basierter Suche (ChatGPT, Claude, Perplexity, Google AI Overviews)
 * als Quelle auftauchen. Wird das später nicht mehr gewünscht, hier auf
 * disallow umstellen – und daran denken, dass ein Ausschluss zugleich die
 * Sichtbarkeit in KI-Antworten beendet.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
