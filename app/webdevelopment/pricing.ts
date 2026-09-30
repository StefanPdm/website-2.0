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
    price: '2.500 €',
    amount: 2500,
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

/** Einstiegspreis einer Leistung, z. B. für FAQ-Antworten. */
export function priceOf(id: WebServiceId) {
  const service = webServices.find((entry) => entry.id === id);
  if (!service) throw new Error(`Unbekannte Leistung: ${id}`);
  return service.price;
}
