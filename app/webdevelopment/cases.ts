/**
 * Einzige Quelle für die Referenzprojekte von Welt B.
 *
 * Gelesen von der Referenzen-Sektion (sichtbare Karten), `WebStructuredData`
 * (ItemList) und /llms.txt. Vorher standen die Karten fest verdrahtet im JSX
 * und parallel ein zweites Array fürs Schema – jeder Tausch musste an zwei
 * Stellen passieren, und die Beschreibungen waren nur im Schema sichtbar.
 * Google erwartet, dass Schema-Inhalte auch auf der Seite stehen.
 *
 * `description`: ein Satz, was gebaut wurde und wofür. Nur belegbare Angaben.
 *
 * Reihenfolge = Anzeigereihenfolge: stärkster Beleg zuerst (Lighthouse 100),
 * dann die drei TRAFÖ-Projekte zusammen – ein Kunde, drei Aufträge.
 */

export type WebCase = {
  name: string;
  status: string;
  description: string;
  /** Öffentliche Adresse. Ohne `url` zeigt die Karte „Nicht öffentlich". */
  url?: string;
  video?: string;
  /** Standbild/Poster, gleicher Dateiname wie das Video. */
  image?: string;
  /** Eingesetzte Technik, als Chips unter der Beschreibung. */
  tech?: string[];
  /**
   * Messbares Ergebnis, hervorgehoben im Beweis-Grün (CLAUDE.md §3.3).
   * Nur echte, nachprüfbare Werte – das ist der Satz, den KI-Modelle zitieren.
   */
  result?: string;
};

export const webCases: WebCase[] = [
  {
    name: 'Zahnarzt Groß & Groß',
    status: 'Relaunch 10/2026',
    description:
      'Kompletter Relaunch für eine Zahnarztpraxis in Potsdam: neues Webdesign und neues Logo, passend zum hochwertigen Anspruch der Praxis – gebaut für Sichtbarkeit bei Google und in KI-Suchen.',
    url: 'https://www.zahnmedizin-potsdam.de/',
    tech: ['Next.js'],
    result:
      'Google Lighthouse: 100/100 in Performance, Accessibility, Best Practices, SEO und Agentic Browsing',
    video: '/case-images-videos/zahnarzt-gross-gross.webm',
    image: '/case-images-videos/zahnarzt-gross-gross.webp',
  },
  {
    name: 'Linde · TRAFÖ GmbH',
    status: 'Relaunch 2024',
    description:
      'Relaunch der Website für einen Anbieter aus der Intralogistik – Struktur, Performance und Pflegbarkeit.',
    url: 'https://trafoe.de',
    tech: ['WordPress', 'Divi Builder'],
    video: '/case-images-videos/trafoe.webm',
  },
  {
    name: 'Online-Shop · Linde · TRAFÖ',
    status: 'Launch 12/2025',
    description:
      'Online-Shop für Gabelstapler und Flurförderzeuge (u. a. Linde, Baoli) sowie automatisierte Reinigungstechnik von Kemaro und Pudu – mit Produktkonfigurator und den Optionen Kauf, Miete und Flexmiete.',
    url: 'https://shop.trafoe.de/',
    tech: ['WordPress', 'WooCommerce', 'Elementor'],
    video: '/case-images-videos/trafoe-shop.webm',
    image: '/case-images-videos/trafoe-shop.webp',
  },
  {
    name: 'Kundenportal · Linde · TRAFÖ',
    status: 'Launch 03/2026',
    description:
      'Kundenportal für ein Intralogistik-Unternehmen: Dessen Kunden laden Fahrzeugdokumente hoch und herunter, verwalten Aufträge, sehen Angebote ein und beauftragen sie – und können Fahrzeuge mieten oder kaufen. In vier Sprachen, wird an weitere Intralogistik-Unternehmen vertrieben.',
    // Infoseite auf der Portal-Subdomain – erklärt das Portal, führt zum Login.
    url: 'https://kundenportal.trafoe.de/de/infovideo',
    video: '/case-images-videos/kundenportal.webm',
    tech: ['Next.js', 'Clerk', 'Neon (Postgres)'],
  },
  {
    name: 'Rund um Berlin Rallye',
    status: 'Abgeschlossen 2026',
    description:
      'Website für eine Oldtimer-Rallye in Berlin: Termine, Anmeldung und Ergebnisse in klarer Struktur.',
    url: 'https://rundumberlin-classic.de',
    tech: ['WordPress', 'Divi Builder'],
    video: '/case-images-videos/rub.webm',
  },
];
