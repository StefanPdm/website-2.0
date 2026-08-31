/**
 * Einzige Quelle für die Coaching-Preise.
 *
 * Wird von der Preistabelle (Anzeige), dem JSON-LD (Offer-Schema) und
 * /llms.txt gelesen. Beträge nur hier ändern.
 *
 * Alle Preise sind **brutto** ausgezeichnet. Coaching richtet sich auch an
 * Privatkunden, und die Preisangabenverordnung verlangt dort Endpreise
 * inklusive Umsatzsteuer. Einzige Ausnahme auf der Seite ist der Workshop für
 * Firmenkunden, der in der Programme-Sektion netto genannt wird.
 *
 * `price` ist die deutsche Anzeigeform, `amount` der maschinenlesbare Wert für
 * schema.org (Punkt als Dezimaltrenner). Beide zusammen pflegen.
 */

export type OfferGroup = 'einstieg' | 'session' | 'mentoring';

export type CoachingOffer = {
  title: string;
  duration: string;
  price: string;
  amount: string;
  icon: string;
  group: OfferGroup;
  highlight: boolean;
  /** Nur bei Paketen: Preis je Session, macht die Ersparnis nachvollziehbar. */
  perSession?: string;
  bullets: string[];
  note: string;
};

export const coachingOffers: CoachingOffer[] = [
  // --- Einstieg -------------------------------------------------------------
  // Schließt die Lücke zwischen kostenlosem Erstgespräch und der 339-€-
  // Startersession. Bewusst nur per Telefon oder Video: kein Raum, keine
  // Anfahrt, kürzere Einheit – deshalb der niedrigere Absolutbetrag, ohne den
  // Stundensatz zu unterbieten.
  {
    title: 'Klarheits-Session',
    duration: 'ca. 60 min · Telefon oder Video',
    price: '149,00 €',
    amount: '149.00',
    icon: '📞',
    group: 'einstieg',
    highlight: false,
    bullets: [
      'Ein Thema, eine Session, ein konkreter nächster Schritt.',
      'Wir sortieren, was gerade im Weg steht – ohne langen Vorlauf.',
      'Ortsunabhängig: Telefon oder Videocall, Termin auch kurzfristig.',
    ],
    note: 'Der einfachste Einstieg, wenn du erst einmal ausprobieren willst.',
  },

  // --- Einzelsessions und Pakete -------------------------------------------
  {
    title: 'Startersession',
    duration: 'ca. 150 min',
    price: '339,15 €',
    amount: '339.15',
    icon: '🚀',
    group: 'session',
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
    group: 'session',
    highlight: false,
    bullets: [
      'Vertiefung & Feintuning deiner Ziele.',
      'Arbeit an Mustern, Entscheidungen, innerer Ruhe.',
      'Stabilisierung und Fortschrittskontrolle.',
    ],
    note: 'Perfekt für nachhaltige Umsetzung im Alltag.',
  },
  {
    title: '5er-Paket',
    duration: '5 Sessions à ca. 90 min',
    price: '1.011,50 €',
    amount: '1011.50',
    perSession: '202,30 € pro Session',
    icon: '📦',
    group: 'session',
    highlight: false,
    bullets: [
      'Fünf Sessions, flexibel abrufbar.',
      'Zusammenhängender Prozess statt Einzelterminen.',
      'Rund 11 % günstiger als einzeln gebucht.',
    ],
    note: 'Für alle, die ein Thema wirklich zu Ende bringen wollen.',
  },
  {
    title: '10er-Paket',
    duration: '10 Sessions à ca. 90 min',
    price: '1.785,00 €',
    amount: '1785.00',
    perSession: '178,50 € pro Session',
    icon: '🎒',
    group: 'session',
    highlight: false,
    bullets: [
      'Zehn Sessions über einen längeren Zeitraum.',
      'Raum für mehrere Themen und tiefere Musterarbeit.',
      'Bester Sessionpreis – rund 21 % günstiger als einzeln.',
    ],
    note: 'Die wirtschaftlichste Variante, wenn du ohne feste Taktung arbeiten willst.',
  },

  // --- Mentoring: Begleitung, kein Sessionpaket ----------------------------
  //
  // Preislogik (bewusst durchgängig, damit sie in einem Satz erklärbar ist):
  //   Sessions zum besten Satz (178,50 €) + 116 € pro Monat Begleitung.
  //     3 Monate: 12 × 178,50 = 2.142 € + 3 × 116 € =  348 €  → 2.490 €
  //     6 Monate: 24 × 178,50 = 4.284 € + 6 × 116 € =  696 €  → 4.980 €
  //
  // Vorher lagen hier 2.990 € und 4.990 €. Das implizierte für dieselbe
  // Leistung 283 €/Monat Begleitung im 3-Monats- und 118 €/Monat im
  // 6-Monats-Paket — und machte das 3-Monats-Mentoring pro Session teurer
  // als eine einzeln gebuchte Folgesession.
  {
    title: 'Mentoring 3 Monate',
    duration: '3 Monate Begleitung',
    price: '2.490,00 €',
    amount: '2490.00',
    icon: '⭐',
    group: 'mentoring',
    highlight: true,
    bullets: [
      '12 Sessions zum besten Sessionpreis.',
      '12/7 Support per WhatsApp oder Telefon – auch zwischen den Terminen.',
      'Strategische Zielarbeit & Identitäts-Alignment.',
      'Messbare Fortschritte mit klarer Roadmap.',
    ],
    note: 'Beliebt für Fokus, Klarheit und schnelle Ergebnisse.',
  },
  {
    title: 'Mentoring 6 Monate',
    duration: '6 Monate Begleitung',
    price: '4.980,00 €',
    amount: '4980.00',
    icon: '🏆',
    group: 'mentoring',
    highlight: false,
    bullets: [
      '24 Sessions zum besten Sessionpreis.',
      'Alles aus dem 3-Monats-Mentoring, doppelte Laufzeit.',
      'Langfristige Routinen und mentale Stärke.',
      'Verankerung neuer Gewohnheiten & Entscheidungen.',
    ],
    note: 'Für nachhaltige Veränderung und dauerhafte Wirkung.',
  },
];

/** Das Einstiegsangebot wird als eigene, breite Zeile über den Paketen gezeigt. */
export const entryOffer = coachingOffers.find((o) => o.group === 'einstieg')!;
export const sessionOffers = coachingOffers.filter((o) => o.group === 'session');
export const mentoringOffers = coachingOffers.filter((o) => o.group === 'mentoring');

/** Aufbereitet für schema.org/Offer. */
export const coachingOffersForSchema = coachingOffers.map((offer) => ({
  name: `${offer.title} – NLP Coaching`,
  price: offer.amount,
  description: `${offer.duration}. ${offer.bullets[0]} ${offer.note}`,
}));
