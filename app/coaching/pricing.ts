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

export type OfferIcon = 'phone' | 'rocket' | 'zap' | 'package' | 'backpack' | 'star' | 'trophy';

export type CoachingOffer = {
  title: string;
  duration: string;
  price: string;
  amount: string;
  /** Icon-Name – die Zuordnung zum Icon liegt in PriceTableSection (Daten bleiben JSX-frei). */
  icon: OfferIcon;
  group: OfferGroup;
  highlight: boolean;
  /** Text der Auszeichnung auf hervorgehobenen Karten. Default: 'Beliebt'. */
  badge?: string;
  /** Nur bei Paketen: Preis je Session, macht die Ersparnis nachvollziehbar. */
  perSession?: string;
  bullets: string[];
  note: string;
};

/**
 * Session-Podcast: auf Wunsch zu jeder Session inklusive (seit 2026-11).
 * Erklärt in PodcastSection und auf /coaching/session-podcast; Datenschutz
 * (Einwilligung, NotebookLM) in /coaching/datenschutz.
 */
const PODCAST_BULLET = 'Inklusive: dein persönlicher Session-Podcast (auf Wunsch).';

export const coachingOffers: CoachingOffer[] = [
  // --- Einstieg -------------------------------------------------------------
  // Schließt die Lücke zwischen kostenlosem Erstgespräch und der Startersession (449 €).
  // Bewusst nur per Telefon oder Video: kein Raum, keine
  // Anfahrt, kürzere Einheit – deshalb der niedrigere Absolutbetrag, ohne den
  // Stundensatz zu unterbieten.
  {
    title: 'Klarheits-Session',
    duration: 'ca. 60 min · Telefon oder Video',
    price: '149,00 €',
    amount: '149.00',
    icon: 'phone',
    group: 'einstieg',
    highlight: false,
    bullets: [
      'Ein Thema, eine Session, ein konkreter nächster Schritt.',
      'Wir sortieren, was gerade im Weg steht – ohne langen Vorlauf.',
      'Ortsunabhängig: Telefon oder Videocall, Termin auch kurzfristig.',
      PODCAST_BULLET,
    ],
    note: 'Der einfachste Einstieg, wenn du erst einmal ausprobieren willst.',
  },

  // --- Einzelsessions und Pakete -------------------------------------------
  {
    title: 'Startersession',
    duration: 'ca. 240 min',
    price: '449,00 €',
    amount: '449.00',
    icon: 'rocket',
    group: 'session',
    highlight: false,
    bullets: [
      'Tiefen-Check: Standort, Ziele, innere Blockaden.',
      'Erste Interventionen für sofortige Klarheit.',
      'Konkreter Umsetzungsplan für die nächsten 14 Tage.',
      PODCAST_BULLET,
    ],
    note: 'Ideal als intensiver Einstieg und Orientierung.',
  },
  {
    title: 'Folgesession',
    duration: 'ca. 180 min',
    price: '380,00 €',
    amount: '380.00',
    icon: 'zap',
    group: 'session',
    highlight: false,
    bullets: [
      'Vertiefung & Feintuning deiner Ziele.',
      'Arbeit an Mustern, Entscheidungen, innerer Ruhe.',
      'Stabilisierung und Fortschrittskontrolle.',
      PODCAST_BULLET,
    ],
    note: 'Perfekt für nachhaltige Umsetzung im Alltag.',
  },
  {
    title: '5er-Paket',
    duration: '5 Sessions à ca. 180 min',
    price: '1.690,00 €',
    amount: '1690.00',
    perSession: '338,00 € pro Session',
    icon: 'package',
    group: 'session',
    highlight: false,
    bullets: [
      'Fünf Sessions, flexibel abrufbar.',
      'Zusammenhängender Prozess statt Einzelterminen.',
      'Rund 11 % günstiger als einzeln gebucht.',
      PODCAST_BULLET,
    ],
    note: 'Für alle, die ein Thema wirklich zu Ende bringen wollen.',
  },
  {
    title: '10er-Paket',
    duration: '10 Sessions à ca. 180 min',
    price: '2.990,00 €',
    amount: '2990.00',
    perSession: '299,00 € pro Session',
    icon: 'backpack',
    group: 'session',
    highlight: true,
    // Eigene Auszeichnung statt „Beliebt": Zwei identische Badges auf einer
    // Seite relativieren sich gegenseitig. „Bester Preis" greift zudem den
    // Bullet unten auf, „Beliebt" bleibt dem Mentoring vorbehalten.
    badge: 'Bester Preis',
    bullets: [
      'Zehn Sessions über einen längeren Zeitraum.',
      'Raum für mehrere Themen und tiefere Musterarbeit.',
      'Bester Sessionpreis – rund 21 % günstiger als einzeln.',
      PODCAST_BULLET,
    ],
    note: 'Die wirtschaftlichste Variante, wenn du ohne feste Taktung arbeiten willst.',
  },

  // --- Mentoring: Begleitung, kein Sessionpaket ----------------------------
  //
  // Preislogik (Stand 2026-11, bewusst in einem Satz erklärbar):
  //   Sessions zum besten Satz (299 € = 10er-Paket) im Zwei-Wochen-Rhythmus
  //   + Begleitung pro Monat; die längere Laufzeit ist pro Monat günstiger.
  //     3 Monate:  6 × 299 = 1.794 € + ca. 165 €/Monat → 2.290 €
  //     6 Monate: 12 × 299 = 3.588 € + ca. 150 €/Monat → 4.490 €
  //   Zwei-Wochen-Rhythmus statt wöchentlich: Bei 180-min-Sessions wären
  //   wöchentliche Termine für Unternehmer neben der Firma kaum machbar.
  //   Referenz für alles: Folgesession 380 € / 3 h. Startersession bewusst
  //   günstiger pro Stunde (Einstieg). Pakete: rund 11 % bzw. 21 % Rabatt.
  {
    title: 'Mentoring 3 Monate',
    duration: '3 Monate Begleitung',
    price: '2.290,00 €',
    amount: '2290.00',
    icon: 'star',
    group: 'mentoring',
    highlight: true,
    bullets: [
      '6 Sessions à ca. 180 min im Zwei-Wochen-Rhythmus – zum besten Sessionpreis.',
      'Zwischen den Sessions erreichbar per WhatsApp oder Telefon – täglich von 8 bis 20 Uhr, auch am Wochenende.',
      'Strategische Zielarbeit & Identitäts-Alignment.',
      'Messbare Fortschritte mit klarer Roadmap.',
      PODCAST_BULLET,
    ],
    note: 'Beliebt für Fokus, Klarheit und schnelle Ergebnisse.',
  },
  {
    title: 'Mentoring 6 Monate',
    duration: '6 Monate Begleitung',
    price: '4.490,00 €',
    amount: '4490.00',
    icon: 'trophy',
    group: 'mentoring',
    highlight: false,
    bullets: [
      '12 Sessions à ca. 180 min im Zwei-Wochen-Rhythmus – zum besten Sessionpreis.',
      'Alles aus dem 3-Monats-Mentoring, doppelte Laufzeit.',
      'Langfristige Routinen und mentale Stärke.',
      'Verankerung neuer Gewohnheiten & Entscheidungen.',
      PODCAST_BULLET,
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
  name: `${offer.title} – Stefan Heinemann Coaching`,
  price: offer.amount,
  description: `${offer.duration}. ${offer.bullets[0]} ${offer.note}`,
}));

/** Angebot per Titel – für Texte (FAQ), die Preise zitieren, statt sie abzuschreiben. */
export function offerByTitle(title: string): CoachingOffer {
  const offer = coachingOffers.find((o) => o.title === title);
  if (!offer) throw new Error(`Unbekanntes Angebot: ${title}`);
  return offer;
}
