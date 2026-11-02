import { pageDates } from '@/app/sitemap';
import {
  FORMULA_LEAD,
  FORMULA_PATH,
  FORMULA_PLAIN,
  FORMULA_TITLE,
  howToSteps,
} from '@/app/coaching/formel-zum-glueck/data';
import {
  dimensions,
  results,
  typeHref,
  type Dimension,
} from '@/app/coaching/persoenlichkeitstest/data';
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
    'Life Coach für Unternehmer und Webentwickler aus Potsdam. Nach über 20 Jahren als Unternehmer im Interieur Design und einem Wechsel in die Fullstack-Entwicklung begleitet er seit 2025 Menschen als Coach. NLP versteht er nicht als Sammlung von Techniken, sondern als Haltung: bewusst wahrnehmen statt urteilen, wählen statt reagieren, Verantwortung für das eigene Leben übernehmen. Veränderung und Unsicherheit gehören für ihn zum Wesen des Lebens – es geht um Vertrauen in die eigene Fähigkeit, mit dem Unbekannten umzugehen, nicht um Kontrolle.',
  address: postalAddress,
  sameAs: [OWNER.linkedIn],
  jobTitle: ['Life Coach', 'NLP Coach', 'Webentwickler'],
  knowsAbout: [
    'Life Coaching',
    'Coaching für Unternehmer',
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
            name: `${OWNER.name} – Coaching & Webentwicklung`,
            inLanguage: 'de-DE',
            publisher: { '@id': PERSON_ID },
          },
          {
            '@type': 'ProfessionalService',
            '@id': `${SITE_URL}/#business`,
            name: `${OWNER.name} – Coaching & Webentwicklung`,
            description:
              'Life Coaching für Unternehmer und Webentwicklung aus Potsdam. Coaching für Klarheit, Entscheidungen und Selbstführung sowie Websites, Web Apps und Kundenportale für Unternehmen in Potsdam, Berlin und Brandenburg.',
            url: SITE_URL,
            email: `mailto:${OWNER.email}`,
            address: postalAddress,
            founder: { '@id': PERSON_ID },
            areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
            availableLanguage: ['Deutsch', 'Englisch'],
            knowsAbout: ['Life Coaching', 'NLP Coaching', 'Webentwicklung', 'Kommunikationstraining'],
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
            '@id': `${SITE_URL}/coaching#service`,
            name: 'Stefan Heinemann Coaching – Life Coaching für Unternehmer',
            serviceType: 'Life Coaching, Coaching für Unternehmer, Personal Coaching, Business Coaching, NLP Coaching',
            description:
              'Life Coaching für Unternehmer in Potsdam, Berlin und online: Klarheit im Kopf, Entscheidungen ohne Grübeln, Selbstwert und Grenzen, Emotionsregulation. Sessions in Potsdam, beim Klienten vor Ort oder per Video. Einzelcoaching, Mentoring und Workshops für Unternehmen.',
            url: absoluteUrl('/coaching'),
            provider: { '@id': PERSON_ID },
            // Welt A hat eine eigene Kontaktadresse.
            email: `mailto:${OWNER.emailCoaching}`,
            areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
            audience: {
              '@type': 'Audience',
              audienceType:
                'Unternehmer, Selbstständige und Führungskräfte mit persönlichen Themen',
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
                url: absoluteUrl('/coaching#preise'),
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
                name: 'Coaching',
                item: absoluteUrl('/coaching'),
              },
            ],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

/**
 * Forschungsstand-Seite.
 *
 * `Article` mit `citation` auf das DVNLP-Whitepaper: Für Sprachmodelle ist
 * eine benannte, verlinkte Quelle der Unterschied zwischen einer Behauptung
 * und einer zitierfähigen Aussage. `about` grenzt das Thema ein, damit die
 * Seite bei Fragen nach der Wissenschaftlichkeit von NLP gefunden wird.
 */
export function WhitepaperStructuredData() {
  const url = absoluteUrl('/coaching/wissenschaft');
  const dates = pageDates('/coaching/wissenschaft');
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${url}#article`,
            headline: 'Warum NLP wirkt — und wo die Belege enden',
            description:
              'Zusammenfassung des DVNLP-Whitepapers zur empirischen Evidenz psychologischer Wirkmechanismen im NLP (2016–2026), inklusive der Annahmen, die die Forschung nicht stützt.',
            url,
            inLanguage: 'de-DE',
            datePublished: dates.published,
            dateModified: dates.modified,
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            isAccessibleForFree: true,
            about: [
              { '@type': 'Thing', name: 'Neuro-Linguistisches Programmieren' },
              { '@type': 'Thing', name: 'Wirksamkeitsforschung' },
            ],
            citation: {
              '@type': 'ScholarlyArticle',
              name: 'Wissenschaftliche Grundlagen wirksamer NLP-Interventionen',
              author: {
                '@type': 'Person',
                name: 'Martina Schmidt-Tanger',
              },
              publisher: {
                '@type': 'Organization',
                name: 'DVNLP – Deutscher Verband für Neuro-Linguistisches Programmieren e. V.',
                url: 'https://www.dvnlp.de/',
              },
              datePublished: '2026-08',
              url: 'https://www.dvnlp.de/ueber-nlp/nlp',
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Coaching', item: absoluteUrl('/coaching') },
              { '@type': 'ListItem', position: 3, name: 'Forschungsstand', item: url },
            ],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

type PersonalityTestInput = {
  title: string;
  description: string;
  questionCount: number;
  types: string[];
  disclaimer: string;
  sources: string[];
};

/**
 * Persönlichkeitstest als kostenlose Web-Anwendung.
 *
 * `WebApplication` statt `Quiz`: `Quiz` ist bei schema.org für Lernkontrollen
 * gedacht, hier wird nichts abgefragt, sondern ausgewertet. `offers` mit
 * Preis 0 und `isAccessibleForFree` beantworten die häufigste Suchfrage
 * („kostenlos? ohne Anmeldung?") maschinenlesbar. Der Disclaimer steht in
 * `description`, damit Sprachmodelle das Ergebnis nicht als Diagnostik zitieren.
 */
export function PersonalityTestStructuredData({ test }: { test: PersonalityTestInput }) {
  const url = absoluteUrl('/coaching/persoenlichkeitstest');
  const dates = pageDates('/coaching/persoenlichkeitstest');
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            '@id': `${url}#test`,
            name: test.title,
            description: `${test.description} ${test.disclaimer}`,
            url,
            inLanguage: 'de-DE',
            datePublished: dates.published,
            dateModified: dates.modified,
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Web',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            about: [
              { '@type': 'Thing', name: 'Psychografie' },
              { '@type': 'Person', name: 'Dietmar Friedmann' },
              ...test.types.map((name) => ({ '@type': 'Thing', name })),
            ],
            featureList: `${test.questionCount} Fragen, sofortige Auswertung, ohne Anmeldung`,
            citation: test.sources,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Coaching', item: absoluteUrl('/coaching') },
              { '@type': 'ListItem', position: 3, name: 'Persönlichkeitstest', item: url },
            ],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

/**
 * Typseite des Persönlichkeitstests: Article + Breadcrumb.
 *
 * `isPartOf` verbindet die Seite mit dem Test (WebApplication) – so ordnen
 * Suchmaschinen die drei Typseiten als Teil desselben Angebots ein.
 */
export function PersonalityTypeStructuredData({ dimension }: { dimension: Dimension }) {
  const path = typeHref(dimension);
  const url = absoluteUrl(path);
  const dates = pageDates(path);
  const { type } = dimensions[dimension];
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            '@id': `${url}#article`,
            headline: `Der ${type}: Stärken, Herausforderungen und Entwicklung`,
            description: results[dimension].lead,
            url,
            inLanguage: 'de-DE',
            datePublished: dates.published,
            dateModified: dates.modified,
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            isAccessibleForFree: true,
            isPartOf: { '@id': `${absoluteUrl('/coaching/persoenlichkeitstest')}#test` },
            about: [
              { '@type': 'Thing', name: type },
              { '@type': 'Thing', name: 'Psychografie' },
              { '@type': 'Person', name: 'Dietmar Friedmann' },
            ],
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Coaching', item: absoluteUrl('/coaching') },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Persönlichkeitstest',
                item: absoluteUrl('/coaching/persoenlichkeitstest'),
              },
              { '@type': 'ListItem', position: 4, name: type, item: url },
            ],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

/**
 * S-L-A-C-Formel: HowTo + Breadcrumb.
 *
 * Google zeigt für HowTo keine Rich Results mehr – für Sprachmodelle ist eine
 * sauber nummerierte Anleitung aber genau die Form, die sie zitieren.
 */
export function FormulaStructuredData() {
  const url = absoluteUrl(FORMULA_PATH);
  const dates = pageDates(FORMULA_PATH);
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'HowTo',
            '@id': `${url}#howto`,
            name: `${FORMULA_TITLE}: ${FORMULA_PLAIN} (S-L-A-C-Formel)`,
            description: FORMULA_LEAD,
            url,
            inLanguage: 'de-DE',
            datePublished: dates.published,
            dateModified: dates.modified,
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            isAccessibleForFree: true,
            step: howToSteps.map((step, index) => ({
              '@type': 'HowToStep',
              position: index + 1,
              name: step.name,
              text: step.text,
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Coaching', item: absoluteUrl('/coaching') },
              { '@type': 'ListItem', position: 3, name: 'Formel zum Glück', item: url },
            ],
          },
        ],
      }}
    />
  );
}

// ---------------------------------------------------------------------------

type FaqInput = { question: string; answer: string };

/**
 * FAQPage-Schema.
 *
 * Voraussetzung für Rich Results: Frage und Antwort müssen **auf der Seite
 * sichtbar** sein. Ein Akkordeon erfüllt das, solange der Antworttext auch
 * zugeklappt im HTML steht — deshalb `<details>` und kein bedingtes Rendern.
 *
 * Zweiter Nutzen: Sprachmodelle zitieren bevorzugt sauber ausgezeichnete
 * Frage-Antwort-Paare, weil die Zuordnung eindeutig ist.
 */
export function FaqStructuredData({ entries }: { entries: FaqInput[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: entries.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
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
  const dates = pageDates(ruleSet.href);
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
            datePublished: dates.published,
            dateModified: dates.modified,
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
                name: 'Coaching',
                item: absoluteUrl('/coaching'),
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
type WebServiceInput = { title: string; intro: string; amount: number; bullets: string[] };

/**
 * Welt B: Entwicklungsleistung + Referenzen.
 *
 * Preise als `minPrice` mit `valueAddedTaxIncluded: false`: Die Seite nennt
 * „ab"-Beträge netto. Ein fester `price` würde einen Festpreis behaupten.
 */
export function WebStructuredData({
  cases,
  services,
}: {
  cases: CaseInput[];
  services: WebServiceInput[];
}) {
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
              itemListElement: services.map((service) => ({
                '@type': 'Offer',
                url: absoluteUrl('/webdevelopment#leistungen'),
                priceCurrency: 'EUR',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: service.amount,
                  priceCurrency: 'EUR',
                  valueAddedTaxIncluded: false,
                },
                itemOffered: {
                  '@type': 'Service',
                  name: service.title,
                  description: `${service.intro} ${service.bullets.join(', ')}.`,
                  provider: { '@id': PERSON_ID },
                },
              })),
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

// ---------------------------------------------------------------------------

type ContentPageInput = {
  path: string;
  headline: string;
  description: string;
  /** Name der dritten Brotkrumen-Stufe – wie in der sichtbaren Navigation. */
  shortTitle: string;
  about: string;
  /** Optional: Bücherliste als ItemList aus `Book`-Einträgen. */
  books?: { title: string; subtitle?: string; authors: string[]; publisher: string }[];
};

/**
 * Welt A, einfache Inhaltsseiten (Session-Podcast, Bücher): Article +
 * BreadcrumbList, bei Büchern zusätzlich eine ItemList aus `Book`.
 */
export function ContentPageStructuredData({ page }: { page: ContentPageInput }) {
  const dates = pageDates(page.path);
  const url = absoluteUrl(page.path);
  const graph: Json[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: page.headline,
      description: page.description,
      url,
      inLanguage: 'de-DE',
      datePublished: dates.published,
      dateModified: dates.modified,
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      isAccessibleForFree: true,
      about: { '@type': 'Thing', name: page.about },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Coaching', item: absoluteUrl('/coaching') },
        { '@type': 'ListItem', position: 3, name: page.shortTitle, item: url },
      ],
    },
  ];
  if (page.books?.length) {
    graph.push({
      '@type': 'ItemList',
      name: page.headline,
      numberOfItems: page.books.length,
      itemListElement: page.books.map((book, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Book',
          name: book.subtitle ? `${book.title}. ${book.subtitle}` : book.title,
          author: book.authors.map((name) => ({ '@type': 'Person', name })),
          publisher: { '@type': 'Organization', name: book.publisher },
          inLanguage: 'de',
        },
      })),
    });
  }
  return <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />;
}
