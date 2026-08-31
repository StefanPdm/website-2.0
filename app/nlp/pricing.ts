/**
 * Einzige Quelle für die Coaching-Preise.
 *
 * Wird sowohl von der Preistabelle (Anzeige) als auch vom JSON-LD
 * (Offer-Schema für Suchmaschinen und KI) gelesen. Vorher standen die
 * Beträge nur im JSX – strukturierte Daten wären damit sofort veraltet.
 *
 * `amount` ist der maschinenlesbare Wert (Punkt als Dezimaltrenner),
 * `price` die deutsche Anzeigeform. Beide zusammen pflegen.
 */

export type CoachingOffer = {
  title: string;
  duration: string;
  /** Anzeigeform, z. B. '339,15 €' */
  price: string;
  /** Maschinenlesbar für schema.org, z. B. '339.15' */
  amount: string;
  icon: string;
  mentoring: boolean;
  highlight: boolean;
  bullets: string[];
  note: string;
};

export const coachingOffers: CoachingOffer[] = [
  {
    title: 'Startersession',
    duration: 'ca. 150 min',
    price: '339,15 €',
    amount: '339.15',
    icon: '🚀',
    mentoring: false,
    highlight: false,
    bullets: [
      'Tiefen-Check: Standort, Ziele, innere Blockaden.',
      'Erste NLP-Interventionen für sofortige Klarheit.',
      'Konkreter Umsetzungsplan für die nächsten 14 Tage.',
    ],
    note: 'Ideal als intensiver Einstieg und Orientierung.',
  },
  {
    title: 'Folgesession',
    duration: 'ca. 90 min',
    price: '226,10 €',
    amount: '226.10',
    icon: '⚡',
    mentoring: false,
    highlight: false,
    bullets: [
      'Vertiefung & Feintuning deiner Ziele.',
      'Arbeit an Mustern, Entscheidungen, innerer Ruhe.',
      'Stabilisierung und Fortschrittskontrolle.',
    ],
    note: 'Perfekt für nachhaltige Umsetzung im Alltag.',
  },
  {
    title: 'Mentoring 3 Monate',
    duration: '3 Monate Begleitung',
    price: '2.990,00 €',
    amount: '2990.00',
    icon: '⭐',
    mentoring: true,
    highlight: true,
    bullets: [
      'Strategische Zielarbeit & Identitäts-Alignment.',
      'Regelmäßige Sessions + WhatsApp-Support.',
      'Schnelle Interventionen bei Stress & Blockaden.',
      'Messbare Fortschritte mit klarer Roadmap.',
    ],
    note: 'Beliebt für Fokus, Klarheit und schnelle Ergebnisse.',
  },
  {
    title: 'Mentoring 6 Monate',
    duration: '6 Monate Begleitung',
    price: '4.990,00 €',
    amount: '4990.00',
    icon: '🏆',
    mentoring: true,
    highlight: false,
    bullets: [
      'Tiefe Transformation mit stabiler Umsetzung.',
      'Langfristige Routinen und mentale Stärke.',
      'Verankerung neuer Gewohnheiten & Entscheidungen.',
    ],
    note: 'Für nachhaltige Veränderung und dauerhafte Wirkung.',
  },
];

/** Aufbereitet für schema.org/Offer. */
export const coachingOffersForSchema = coachingOffers.map((offer) => ({
  name: `${offer.title} – NLP Coaching`,
  price: offer.amount,
  description: `${offer.duration}. ${offer.bullets[0]} ${offer.note}`,
}));
