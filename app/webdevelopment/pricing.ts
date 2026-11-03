/**
 * Einzige Quelle für die Web-Preise.
 *
 * Wird von der Leistungs-Sektion (Anzeige), dem JSON-LD (Offer-Schema),
 * der FAQ und /llms.txt gelesen. Beträge nur hier ändern.
 *
 * Webentwicklung richtet sich an Unternehmen – alle Beträge sind **netto**
 * und werden sichtbar mit „zzgl. MwSt." ausgezeichnet (CLAUDE.md §14).
 *
 * `amount` ist der maschinenlesbare Einstiegspreis für schema.org
 * (`priceSpecification.minPrice`), `price` die deutsche Anzeigeform ohne „ab".
 */

export const VAT_NOTE = 'zzgl. MwSt.';

/** Regulärer Entwicklungs- und Beratungssatz. */
export const HOURLY_RATE = { amount: 190, label: '190 € pro Stunde' } as const;

export type WebServiceId = 'website' | 'webapp' | 'headless' | 'ux';

export type WebService = {
  id: WebServiceId;
  title: string;
  intro: string;
  price: string;
  amount: number;
  bullets: string[];
};

export const webServices: WebService[] = [
  {
    id: 'website',
    title: 'Websites & Landingpages',
    intro: 'Websites, die führen – nicht verwirren.',
    price: '2.900 €',
    amount: 2900,
    bullets: ['SEO-ready', 'Mobile-first', 'Saubere Informationsarchitektur', 'Schnelle Ladezeiten'],
  },
  {
    id: 'webapp',
    title: 'Web Apps & Kundenportale',
    intro: 'Individuelle Anwendungen statt Insellösungen.',
    price: '7.500 €',
    amount: 7500,
    bullets: ['Login-Bereiche', 'Dashboards', 'Dokumentenverwaltung', 'Rollen & Rechte'],
  },
  {
    id: 'headless',
    title: 'Headless & Schnittstellen',
    intro: 'Systeme, die miteinander sprechen.',
    price: '4.000 €',
    amount: 4000,
    bullets: ['Headless CMS', 'REST & GraphQL APIs', 'Automatisierungen', 'Entkoppelte Architekturen'],
  },
  {
    id: 'ux',
    title: 'UX & Struktur',
    intro: 'Technik folgt Klarheit.',
    price: '1.500 €',
    amount: 1500,
    bullets: ['UX-Konzeption', 'Seiten- & Datenstruktur', 'Klare Nutzerflüsse', 'Verständliche Logik'],
  },
];

/* --------------------------------------------------------------------------
 * Preis-Kompass (app/webdevelopment/components/PriceCompass.tsx)
 *
 * Richtwerte, von Stefan festgelegt (2026-11). Ergebnis ist immer ein
 * „ab“-Preis – der genaue Rahmen kommt nach dem Erstgespräch.
 * Rechnung: Preis nach Umfang × (1 + Aufschlag Inhalte + Aufschlag Sprachen),
 * gerundet auf volle 100 €.
 * ------------------------------------------------------------------------ */

export type WebsiteScope = 'small' | 'medium' | 'large' | 'xl';

/** Nur für Websites. `amount: null` = individuell, kein Richtwert. */
export const websiteScopes: { id: WebsiteScope; label: string; amount: number | null }[] = [
  { id: 'small', label: 'Bis 5 Seiten', amount: 2900 },
  { id: 'medium', label: '6–10 Seiten', amount: 4400 },
  { id: 'large', label: '11–20 Seiten', amount: 6400 },
  { id: 'xl', label: 'Mehr als 20 Seiten', amount: null },
];

export type ContentState = 'ready' | 'partly' | 'none';

export const contentSurcharges: { id: ContentState; label: string; rate: number }[] = [
  { id: 'ready', label: 'Texte und Bilder sind da', rate: 0 },
  { id: 'partly', label: 'Teilweise', rate: 0.15 },
  { id: 'none', label: 'Noch nichts', rate: 0.3 },
];

export type LanguageCount = 'one' | 'two' | 'more';

/** Übersetzungen selbst sind nicht enthalten – nur der technische Mehraufwand. */
export const languageSurcharges: { id: LanguageCount; label: string; rate: number }[] = [
  { id: 'one', label: 'Eine', rate: 0 },
  { id: 'two', label: 'Zwei', rate: 0.25 },
  { id: 'more', label: 'Drei oder mehr', rate: 0.4 },
];

const euro = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });

/** Deutsche Anzeigeform, z. B. 4400 → „4.400 €“. */
export function formatEuro(amount: number) {
  return `${euro.format(amount)} €`;
}

/**
 * Richtwert für den Kompass. `null` = individuell (z. B. Website > 20 Seiten).
 */
export function estimatePrice(opts: {
  service: WebServiceId;
  scope?: WebsiteScope;
  content: ContentState;
  languages: LanguageCount;
}): number | null {
  const base =
    opts.service === 'website'
      ? (websiteScopes.find((entry) => entry.id === (opts.scope ?? 'small'))?.amount ?? null)
      : (webServices.find((entry) => entry.id === opts.service)?.amount ?? null);
  if (base == null) return null;
  const rate =
    (contentSurcharges.find((entry) => entry.id === opts.content)?.rate ?? 0) +
    (languageSurcharges.find((entry) => entry.id === opts.languages)?.rate ?? 0);
  return Math.round((base * (1 + rate)) / 100) * 100;
}

/** Einstiegspreis einer Leistung, z. B. für FAQ-Antworten. */
export function priceOf(id: WebServiceId) {
  const service = webServices.find((entry) => entry.id === id);
  if (!service) throw new Error(`Unbekannte Leistung: ${id}`);
  return service.price;
}
