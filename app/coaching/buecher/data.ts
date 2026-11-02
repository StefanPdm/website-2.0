/**
 * Buchempfehlungen – gruppiert nach den vier Säulen aus ApproachSection
 * plus „Entscheiden“ für die Zielgruppe Unternehmer.
 *
 * Bewusst ohne Shop-Links und ohne Cover (Bildrechte). `why` steht in
 * Stefans Stimme: ein Satz, warum genau dieses Buch.
 * ENTWURF 2026-11: Auswahl und Begründungen von Stefan zu bestätigen.
 */

export type Book = {
  title: string;
  author: string;
  why: string;
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
        title: 'Der Selbst-Entwickler',
        author: 'Jens Corssen',
        why: 'Das Buch, das mir klargemacht hat: Ich bin nicht verantwortlich für alles, was passiert – aber für meine Antwort darauf.',
      },
      {
        title: '… trotzdem Ja zum Leben sagen',
        author: 'Viktor E. Frankl',
        why: 'Zwischen Reiz und Reaktion liegt ein Raum. Kaum ein Buch zeigt so eindringlich, was in diesem Raum möglich ist.',
      },
    ],
  },
  {
    key: 'sinn',
    label: 'Sinn',
    intro: 'Warum Erfolg ohne Erfüllung nicht trägt.',
    books: [
      {
        title: 'Sieger erkennt man am Start – Verlierer auch',
        author: 'Dieter Lange',
        why: 'Für alle, die viel erreicht haben und sich trotzdem fragen, wofür. Selbstführung, bevor man andere führt.',
      },
      {
        title: 'Jetzt! Die Kraft der Gegenwart',
        author: 'Eckhart Tolle',
        why: 'Ein Gegengift zum Gedankenkarussell. Nicht jede Zeile muss man teilen, um vom Kern zu profitieren.',
      },
    ],
  },
  {
    key: 'werkzeug',
    label: 'Werkzeug',
    intro: 'Wie Denken, Sprache und innere Bilder Verhalten steuern.',
    books: [
      {
        title: 'Veränderung des subjektiven Erlebens',
        author: 'Richard Bandler',
        why: 'Vom Mitbegründer des NLP: wie sich die Art, wie wir uns etwas vorstellen, auf unser Erleben auswirkt.',
      },
      {
        title: 'Ein neues Ich',
        author: 'Joe Dispenza',
        why: 'Warum alte Gewohnheiten so zäh sind – und wie man sie Schritt für Schritt umlernt.',
      },
    ],
  },
  {
    key: 'energie',
    label: 'Energie',
    intro: 'Vom Wissen ins Handeln.',
    books: [
      {
        title: 'Das Robbins Power Prinzip',
        author: 'Tony Robbins',
        why: 'Entscheidungen, Zustand, Fokus: das Fundament seiner Arbeit, kompakt und alltagstauglich.',
      },
      {
        title: 'Du musst dich nicht entscheiden, wenn du tausend Träume hast',
        author: 'Barbara Sher',
        why: 'Für Menschen mit vielen Talenten – wie mich. Das Buch hinter meiner eigenen „Scanner“-Geschichte.',
      },
    ],
  },
  {
    key: 'entscheiden',
    label: 'Entscheiden',
    intro: 'Für Unternehmer, die täglich viel entscheiden müssen.',
    books: [
      {
        title: 'Schnelles Denken, langsames Denken',
        author: 'Daniel Kahneman',
        why: 'Warum kluge Menschen sich systematisch verschätzen – und wie du deine Entscheidungen davor schützt.',
      },
      {
        title: 'Die 7 Wege zur Effektivität',
        author: 'Stephen R. Covey',
        why: 'Der Klassiker über Prioritäten. Erst das Wichtige, dann das Dringende – leichter gesagt als gelebt.',
      },
    ],
  },
];

export const allBooks = bookGroups.flatMap((group) => group.books);

/**
 * Dateiname des Covers aus dem Titel: „Ein neues Ich“ → `ein-neues-ich`.
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
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const coverPath = (book: Book) => `/images-nlp/buecher/${bookSlug(book)}.webp`;
