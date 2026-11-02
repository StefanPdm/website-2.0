/**
 * Buchempfehlungen – Stefans Liste (Stand 2026-11, 24 Titel), gruppiert nach
 * Themen. Die ersten vier Gruppen folgen den Säulen aus ApproachSection.
 *
 * Bewusst ohne Shop-Links – verlinkt wird nur die Buchseite beim Verlag. `why` steht in Stefans Stimme: ein, zwei Sätze,
 * warum genau dieses Buch. ENTWURF: Begründungen von Stefan zu bestätigen.
 * `related` verlinkt auf eine eigene Seite, wenn das Buch dort Grundlage ist.
 */

export type Book = {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  /** Buchseite beim Verlag (sonst Verlags-Startseite). Kein Shop-Link. */
  publisherUrl?: string;
  why: string;
  related?: { href: string; label: string };
};

export type BookGroup = {
  key: string;
  label: string;
  intro: string;
  books: Book[];
};

export const bookGroups: BookGroup[] = [
  {
    key: 'haltung',
    label: 'Haltung',
    intro: 'Wie du vom Getriebenen zum Gestalter wirst.',
    books: [
      {
        title: 'Das Corssen-Prinzip',
        authors: ['Jens Corssen', 'Stephanie Ehrenschwendner'],
        publisher: 'Goldmann',
        publisherUrl: 'https://www.penguin.de/buecher/jens-corssen-das-corssen-prinzip/taschenbuch/9783442224456',
        why: 'Die Haltung des Selbst-Entwicklers: Ich bin nicht verantwortlich für alles, was passiert – aber für meine Antwort darauf. Für mich die Grundlage jedes Coachings.',
      },
      {
        title: 'Ich und die anderen',
        authors: ['Jens Corssen', 'Christiane Tramitz'],
        publisher: 'Knaur',
        publisherUrl: 'https://www.droemer-knaur.de/buch/jens-corssen-christiane-tramitz-ich-und-die-anderen-9783426787441',
        why: 'Corssens Haltung angewandt auf Mitarbeiter, Partner und Familie: Warum uns andere so oft aufregen – und wie wir aufhören, sie ändern zu wollen.',
      },
      {
        title: 'Die LET THEM Theorie',
        authors: ['Mel Robbins', 'Sawyer Robbins'],
        publisher: 'Goldmann',
        publisherUrl: 'https://www.penguin.de/buecher/mel-robbins-die-let-them-theorie/paperback/9783442180653',
        why: 'Zwei Wörter, die viel Energie zurückgeben: Lass die anderen machen – und kümmere dich um das, was in deiner Hand liegt.',
      },
      {
        title: 'Die vier Versprechen',
        authors: ['Don Miguel Ruiz'],
        publisher: 'Ullstein',
        publisherUrl: 'https://www.ullstein.de/werke/die-vier-versprechen/taschenbuch/9783548066424',
        why: 'Vier einfache Vereinbarungen mit dir selbst – etwa: Nimm nichts persönlich. Schnell gelesen, ein Leben lang zu üben.',
      },
    ],
  },
  {
    key: 'sinn',
    label: 'Sinn',
    intro: 'Warum Erfolg ohne Erfüllung nicht trägt.',
    books: [
      {
        title: 'Auf dem Weg zu deinem Nordstern',
        authors: ['Dieter Lange'],
        publisher: 'Next Level Verlag',
        publisherUrl: 'https://www.next-level-verlag.de/products/auf-dem-weg-zu-deinem-nordstern',
        why: 'Wofür stehst du morgens auf? Dieter Lange über die Ausrichtung, die bleibt, wenn Ziele erreicht sind und trotzdem etwas fehlt.',
      },
      {
        title: '… trotzdem Ja zum Leben sagen',
        authors: ['Viktor E. Frankl'],
        publisher: 'Kösel',
        publisherUrl: 'https://www.penguin.de/buecher/viktor-e-frankl-trotzdem-ja-zum-leben-sagen/buch/9783466373253',
        why: 'Zwischen Reiz und Reaktion liegt ein Raum. Kaum ein Buch zeigt so eindringlich, was in diesem Raum möglich ist.',
      },
      {
        title: 'The Big Five for Life',
        authors: ['John Strelecky'],
        publisher: 'dtv',
        publisherUrl: 'https://www.dtv.de/buch/the-big-five-for-life-34528',
        why: 'Eine Geschichte über einen Unternehmer, der sein Unternehmen nach dem Zweck seiner Mitarbeiter ausrichtet. Für Unternehmer die vielleicht wichtigste Frage: Wofür das alles?',
      },
      {
        title: 'Das Café am Rande der Welt',
        authors: ['John Strelecky'],
        publisher: 'dtv',
        publisherUrl: 'https://www.dtv.de/buch/das-cafe-am-rande-der-welt-20969',
        why: 'Drei Fragen auf einer Speisekarte – allen voran: Warum bist du hier? Ein kleines Buch, das schon viele große Entscheidungen angestoßen hat.',
      },
      {
        title: 'Ikigai',
        subtitle: 'Die japanische Lebenskunst',
        authors: ['Ken Mogi'],
        publisher: 'DuMont',
        publisherUrl: 'https://www.dumont-buchverlag.de/buch/ken-mogi-ikigai-9783832165161-t-5119',
        why: 'Sinn muss nicht groß sein. Ikigai findet sich oft in kleinen Dingen, die du mit Hingabe tust.',
      },
      {
        title: 'Last Lecture',
        subtitle: 'Die Lehren meines Lebens',
        authors: ['Randy Pausch', 'Jeffrey Zaslow'],
        publisher: 'Goldmann',
        why: 'Die letzte Vorlesung eines todkranken Professors – nicht traurig, sondern voller Lebensfreude. Rückt Prioritäten in Minuten gerade.',
      },
      {
        title: '25 letzte Sommer',
        authors: ['Stephan Schäfer'],
        publisher: 'park x ullstein',
        publisherUrl: 'https://www.ullstein.de/werke/25-letzte-sommer/hardcover/9783988160096',
        why: 'Wenn dir vielleicht noch 25 Sommer bleiben – wie willst du sie verbringen? Leise erzählt, und gerade deshalb ein Weckruf für alle, die nur noch funktionieren.',
      },
    ],
  },
  {
    key: 'verstehen',
    label: 'Menschen verstehen',
    intro: 'Wie wir ticken – und warum wir uns so oft selbst im Weg stehen.',
    books: [
      {
        title: 'Denken. Fühlen. Handeln.',
        authors: ['Dietmar Friedmann', 'Klaus Fritz'],
        publisher: 'Springer Gabler',
        publisherUrl: 'https://link.springer.com/book/10.1007/978-3-658-07666-5',
        why: 'Die drei Persönlichkeitstypen der Psychografie: Wer sie kennt, versteht Kunden, Mitarbeiter und sich selbst schneller.',
        related: {
          href: '/coaching/persoenlichkeitstest',
          label: 'Zum kostenlosen Persönlichkeitstest',
        },
      },
      {
        title: 'Anleitung zum Unglücklichsein',
        authors: ['Paul Watzlawick'],
        publisher: 'Piper',
        publisherUrl: 'https://www.piper.de/buecher/anleitung-zum-ungluecklichsein-isbn-978-3-492-31776-4',
        why: 'Mit Humor und Ironie gezeigt, wie wir uns selbst unglücklich machen. Wer sich darin wiedererkennt, hat den ersten Schritt schon getan.',
        related: {
          href: '/coaching/regeln/ungluecklichsein',
          label: 'Die 20 Regeln zum Unglücklichsein',
        },
      },
      {
        title: 'Den Menschen verstehen',
        authors: ['Erich Fromm'],
        publisher: 'dtv',
        publisherUrl: 'https://www.dtv.de/buch/den-menschen-verstehen-34928',
        why: 'Erich Fromm über das, was uns antreibt: Liebe, Freiheit, Haben und Sein. Tiefgang ohne Fachjargon.',
      },
    ],
  },
  {
    key: 'energie',
    label: 'Energie & Geist',
    intro: 'Vom Wissen ins Handeln – und zur Ruhe im Kopf.',
    books: [
      {
        title: 'Das Robbins Power Prinzip',
        authors: ['Tony Robbins'],
        publisher: 'Allegria / Ullstein',
        publisherUrl: 'https://www.ullstein.de/werke/das-robbins-power-prinzip/taschenbuch/9783548742267',
        why: 'Entscheidungen, Zustand, Fokus: das Fundament seiner Arbeit, kompakt und alltagstauglich.',
      },
      {
        title: 'Werde übernatürlich',
        authors: ['Joe Dispenza'],
        publisher: 'Koha',
        publisherUrl: 'https://www.koha-verlag.de/product/werde-uebernatuerlich/',
        why: 'Wie Meditation und innere Ausrichtung Körper und Geist verändern können. Nicht alles muss man teilen, um von der Praxis zu profitieren.',
      },
      {
        title: 'Das Think Like a Monk-Prinzip',
        authors: ['Jay Shetty'],
        publisher: 'Rowohlt',
        publisherUrl: 'https://www.rowohlt.de/buch/jay-shetty-ruhe-in-dir-9783499002267',
        why: 'Was ein ehemaliger Mönch über Fokus, Gelassenheit und Sinn gelernt hat – übersetzt in einen vollen Alltag.',
      },
    ],
  },
  {
    key: 'beziehung',
    label: 'Beziehung',
    intro: 'Weil persönliche Themen selten vor der Partnerschaft haltmachen.',
    books: [
      {
        title: 'Liebe dich selbst und es ist egal, wen du heiratest',
        authors: ['Eva-Maria Zurhorst'],
        publisher: 'Goldmann',
        publisherUrl: 'https://www.penguin.de/buecher/eva-maria-zurhorst-liebe-dich-selbst-und-es-ist-egal-wen-du-heir/taschenbuch/9783442223794',
        why: 'Die Krise in der Beziehung als Einladung, bei dir selbst anzufangen. Unbequem – und gerade deshalb hilfreich.',
      },
      {
        title: 'Jeder bekommt den Partner, den er verdient',
        authors: ['Hermann Meyer'],
        publisher: 'Goldmann',
        publisherUrl: 'https://www.penguin.de/buecher/hermann-meyer-jeder-bekommt-den-partner-den-er-verdient/taschenbuch/9783442218738',
        why: 'Der Partner als Spiegel: Was uns am anderen stört, hat oft mehr mit uns selbst zu tun, als uns lieb ist.',
      },
      {
        title: 'Die Sehnsucht der starken Frau nach dem starken Mann',
        authors: ['Maja Storch'],
        publisher: 'Goldmann',
        publisherUrl: 'https://www.penguin.de/autoren/maja-storch/54251',
        why: 'Eine Psychologin über Stärke, Nähe und die Muster, die wir in Beziehungen wiederholen – lesenswert für Frauen und Männer.',
      },
      {
        title: 'Tantra jenseits von Sex',
        authors: ['Marc Aurin'],
        publisher: 'tredition',
        publisherUrl: 'https://shop.tredition.com/booktitle/Tantra_jenseits_von_Sex/W-597-149-946',
        why: 'Tantra jenseits aller Klischees: eine Praxis der Annahme, die dich nicht aus dem Leben herausführt, sondern endlich wieder ganz hinein.',
      },
    ],
  },
  {
    key: 'weisheit',
    label: 'Zeitlose Weisheit',
    intro: 'Bücher, die man nicht einmal liest, sondern immer wieder.',
    books: [
      {
        title: 'Siddhartha',
        authors: ['Hermann Hesse'],
        publisher: 'Suhrkamp',
        publisherUrl: 'https://www.suhrkamp.de/buch/hermann-hesse-siddhartha-t-9783518366820',
        why: 'Weisheit lässt sich nicht lehren, nur erfahren. Hesses Geschichte einer Suche – in jedem Lebensabschnitt ein anderes Buch.',
      },
      {
        title: 'Der Prophet',
        authors: ['Khalil Gibran'],
        publisher: 'Patmos',
        publisherUrl: 'https://shop.verlagsgruppe-patmos.de/der-prophet-010175.html',
        why: 'Kurze Texte über Liebe, Arbeit, Kinder und Freiheit. Für die Momente, in denen ein einziger Absatz mehr sagt als ein Ratgeber.',
      },
      {
        title: 'Die Weisheit des Brahmanen',
        authors: ['Friedrich Rückert'],
        publisher: 'Wallstein',
        publisherUrl: 'https://www.wallstein-verlag.de/9783892440918-die-weisheit-des-brahmanen.html',
        why: 'Lebensweisheit in Versen, gut zum Aufschlagen an beliebiger Stelle. Ein Gedanke pro Tag genügt.',
      },
    ],
  },
];

export const allBooks = bookGroups.flatMap((group) => group.books);

/** „Jens Corssen & Christiane Tramitz“ */
export const authorLine = (book: Book) => book.authors.join(' & ');

/**
 * Dateiname des Covers aus dem Titel: „Das Corssen-Prinzip“ → `das-corssen-prinzip`.
 * Cover liegen als `public/images-nlp/buecher/<slug>.webp` (Hochformat,
 * ca. 400 px breit) – vorhandene Dateien zeigt die Seite automatisch.
 */
export function bookSlug(book: Book) {
  return book.title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const coverPath = (book: Book) => `/images-nlp/buecher/${bookSlug(book)}.webp`;
