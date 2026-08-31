import { absoluteUrl, AREA_SERVED, OWNER, SITE_URL } from '@/lib/site';

/**
 * JSON-LD für Suchmaschinen und KI-Crawler.
 *
 * Zweck ist doppelt: klassische Rich-Results (Knowledge-Panel, lokale Treffer,
 * Preis-Snippets) **und** maschinenlesbare Fakten für LLM-basierte Suche.
 * Sprachmodelle zitieren bevorzugt, was sie eindeutig zuordnen können —
 * deshalb hier alles explizit statt implizit aus dem Fließtext ableitbar.
 *
 * Server Component: Das Skript landet im initialen HTML und ist damit auch für
 * Crawler sichtbar, die kein JavaScript ausführen.
 */

type Json = Record<string, unknown>;

function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type='application/ld+json'
      // Inhalt ist statisch und stammt aus lib/site.ts – keine Nutzereingaben.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: OWNER.street,
  postalCode: OWNER.postalCode,
  addressLocality: OWNER.city,
  addressRegion: OWNER.region,
  addressCountry: OWNER.country,
};

/** Stabile @id, damit alle Graphen auf dieselbe Person verweisen. */
const PERSON_ID = `${SITE_URL}/#person`;

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: OWNER.name,
  url: SITE_URL,
  email: `mailto:${OWNER.email}`,
  image: absoluteUrl('/images-nlp/Stefan_01.webp'),
  // Eigene Haltung statt Leistungsbeschreibung: Sprachmodelle und Rich Results
  // greifen `description` bevorzugt auf, und eine erste Person mit klarer
  // Position ist unterscheidbarer als eine Aufzählung von Leistungen.
  description:
    'NLP Coach und Webentwickler aus Potsdam. Nach über 20 Jahren als Unternehmer im Interieur Design und einem Wechsel in die Fullstack-Entwicklung begleitet er seit 2025 Menschen als Coach. NLP versteht er nicht als Sammlung von Techniken, sondern als Haltung: bewusst wahrnehmen statt urteilen, wählen statt reagieren, Verantwortung für das eigene Leben übernehmen. Veränderung und Unsicherheit gehören für ihn zum Wesen des Lebens – es geht um Vertrauen in die eigene Fähigkeit, mit dem Unbekannten umzugehen, nicht um Kontrolle.',
  address: postalAddress,
  sameAs: [OWNER.linkedIn],
  jobTitle: ['NLP Coach', 'Webentwickler'],
  knowsAbout: [
    'Neuro-Linguistisches Programmieren',
    'Business Coaching',
    'Persönlichkeitsentwicklung',
    'Kommunikationstraining',
    'Webentwicklung',
    'Next.js',
    'React',
    'Angular',
    'TypeScript',
    'Headless CMS',
  ],
  knowsLanguage: ['de', 'en'],
};

// ---------------------------------------------------------------------------

/** Startseite: Person + beide Geschäftsbereiche als ProfessionalService. */
export function RootStructuredData() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          person,
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: `${OWNER.name} – NLP Coaching & Webentwicklung`,
            inLanguage: 'de-DE',
            publisher: { '@id': PERSON_ID },
          },
          {
            '@type': 'ProfessionalService',
            '@id': `${SITE_URL}/#business`,
            name: `${OWNER.name} – NLP Coaching & Webentwicklung`,
            description:
              'NLP Coaching und Webentwicklung aus Potsdam. Coaching für Klarheit, Entscheidungen und Selbstführung sowie Websites, Web Apps und Kundenportale für Unternehmen in Potsdam, Berlin und Brandenburg.',
            url: SITE_URL,
            email: `mailto:${OWNER.email}`,
            address: postalAddress,
            founder: { '@id': PERSON_ID },
            areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
            availableLanguage: ['Deutsch', 'Englisch'],
            knowsAbout: ['NLP Coaching', 'Webentwicklung', 'Kommunikationstraining'],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

type OfferInput = { name: string; price: string; description: string };

/** Welt A: Coaching-Angebot inklusive Preisen. */
export function NlpStructuredData({ offers }: { offers: OfferInput[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${SITE_URL}/nlp#service`,
            name: 'NLP Coaching',
            serviceType: 'NLP Coaching, Business Coaching, Kommunikationstraining',
            description:
              'NLP Coaching in Potsdam, Berlin und online: Klarheit im Kopf, Entscheidungen ohne Grübeln, Selbstwert und Grenzen, Emotionsregulation. Einzelcoaching, Mentoring und Workshops für Unternehmen.',
            url: absoluteUrl('/nlp'),
            provider: { '@id': PERSON_ID },
            // Welt A hat eine eigene Kontaktadresse.
            email: `mailto:${OWNER.emailCoaching}`,
            areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
            audience: {
              '@type': 'Audience',
              audienceType:
                'Unternehmer, Führungskräfte, Selbstständige und Privatpersonen mit Veränderungsabsicht',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Coaching-Programme',
              itemListElement: offers.map((offer) => ({
                '@type': 'Offer',
                name: offer.name,
                description: offer.description,
                price: offer.price,
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: absoluteUrl('/nlp#preise'),
              })),
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'NLP Coaching',
                item: absoluteUrl('/nlp'),
              },
            ],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

type RuleSetInput = {
  href: string;
  title: string;
  metaDescription: string;
  shortTitle: string;
  rules: string[];
};

/**
 * Welt A, Regel-Unterseiten: Artikel + nummerierte Liste.
 *
 * Die `ItemList` macht die zwanzig Sätze einzeln maschinenlesbar — genau die
 * Form, die Sprachmodelle zitieren und aus der Suchmaschinen Listen-Snippets
 * bauen. Die `description` trägt bei den Anti-Regeln die Ironie-Einordnung mit,
 * damit die Punkte nicht als Empfehlung missverstanden werden.
 */
export function RulesStructuredData({ ruleSet }: { ruleSet: RuleSetInput }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${absoluteUrl(ruleSet.href)}#article`,
            headline: ruleSet.title,
            description: ruleSet.metaDescription,
            url: absoluteUrl(ruleSet.href),
            inLanguage: 'de-DE',
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            isAccessibleForFree: true,
            about: { '@type': 'Thing', name: 'Persönlichkeitsentwicklung' },
          },
          {
            '@type': 'ItemList',
            name: ruleSet.title,
            numberOfItems: ruleSet.rules.length,
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            itemListElement: ruleSet.rules.map((rule, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: rule,
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'NLP Coaching',
                item: absoluteUrl('/nlp'),
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: ruleSet.shortTitle,
                item: absoluteUrl(ruleSet.href),
              },
            ],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

type CaseInput = { name: string; url?: string; description: string };

/** Welt B: Entwicklungsleistung + Referenzen. */
export function WebStructuredData({ cases }: { cases: CaseInput[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            '@id': `${SITE_URL}/webdevelopment#service`,
            name: 'Webentwicklung',
            serviceType:
              'Webentwicklung, Webdesign, Web-App-Entwicklung, Headless CMS, API-Entwicklung',
            description:
              'Webentwicklung aus Potsdam für Kunden in Berlin und Brandenburg: Websites und Landingpages, Web Apps und Kundenportale, Headless CMS und Schnittstellen. Umgesetzt mit Next.js, React, Angular, TypeScript und Node.js.',
            url: absoluteUrl('/webdevelopment'),
            provider: { '@id': PERSON_ID },
            areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
            audience: {
              '@type': 'Audience',
              audienceType:
                'Unternehmer, Selbstständige, kleine und mittlere Unternehmen, Coaches, Agenturen (White Label)',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Leistungen',
              itemListElement: [
                'Websites & Landingpages',
                'Web Apps & Kundenportale',
                'Headless CMS & Schnittstellen',
                'UX & Struktur',
              ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
            },
          },
          {
            '@type': 'ItemList',
            name: 'Referenzprojekte',
            itemListElement: cases.map((entry, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'CreativeWork',
                name: entry.name,
                description: entry.description,
                ...(entry.url ? { url: entry.url } : {}),
                creator: { '@id': PERSON_ID },
              },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Webdevelopment',
                item: absoluteUrl('/webdevelopment'),
              },
            ],
          },
        ],
      }}
    />
  );
}
