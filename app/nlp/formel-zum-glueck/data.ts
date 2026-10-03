/**
 * Die S-L-A-C-Formel: S² + L + A + C³
 *
 * Einzige Quelle für Teaser-Sektion (/nlp), Unterseite, HowTo-Schema und
 * /llms.txt. Wortlaut nah an Stefans eigener Beschreibung – beim Ändern
 * überall gleichzeitig wirksam.
 */

export const FORMULA_PATH = '/nlp/formel-zum-glueck';

export const FORMULA_TITLE = 'Deine Formel zum Glück';

/** Die Formel in ihren vier Termen – so wird sie auch angezeigt. */
export const formulaTerms = [
  { base: 'S', power: '2' },
  { base: 'L' },
  { base: 'A' },
  { base: 'C', power: '3' },
] as const;

export const FORMULA_PLAIN = 'S² + L + A + C³';

export const FORMULA_LEAD =
  'Eine aus dem Coaching bekannte Technik für genau den Moment, in dem ein Thema, ein Problem oder ein unangenehmes Gefühl hochkommt: anhalten, hinsehen, annehmen – und dann bewusst wählen.';

/** Wann die Formel greift. */
export const triggers = [
  'Ein Thema, das dich nicht loslässt',
  'Ein Problem, bei dem du feststeckst',
  'Ein unangenehmes Gefühl, das hochkommt',
];

export type FormulaStep = {
  key: 's' | 'l' | 'a' | 'c';
  symbol: string;
  /** Hochgestellter Teil des Symbols (² / ³), falls vorhanden. */
  power?: string;
  title: string;
  /** Englische Begriffe hinter dem Buchstaben. */
  words: string[];
  short: string;
  body: string[];
};

export const steps: FormulaStep[] = [
  {
    key: 's',
    symbol: 'S',
    power: '2',
    title: 'Stop & Smile',
    words: ['Stop', 'Smile'],
    short: 'Sag laut „Stopp“ – und lächle kurz.',
    body: [
      'Sobald das Thema oder das Gefühl hochkommt, unterbrichst du den Automatismus: Sag laut „Stopp“.',
      'Dann fang an zu lächeln, nur kurz. Auch wenn es albern aussieht oder sinnlos erscheint – genau damit steigst du für einen Moment aus der gewohnten Reaktion aus.',
    ],
  },
  {
    key: 'l',
    symbol: 'L',
    title: 'Look',
    words: ['Look'],
    short: 'Sieh dir das Gefühl an, das in dir hochkommt.',
    body: [
      'Schau hin, statt wegzuschauen: Welches Gefühl ist da gerade in dir?',
      'Du beobachtest es, bevor du darauf reagierst – als würdest du es zum ersten Mal kennenlernen.',
    ],
  },
  {
    key: 'a',
    symbol: 'A',
    title: 'Accept',
    words: ['Accept'],
    short: 'Nimm das Gefühl an. Bekämpfe es nicht.',
    body: [
      'Akzeptiere dieses Gefühl und lass es da sein. Bekämpfe es auf keinen Fall.',
      'Es gehört zu dir, es ist wichtig, es ist echt – und es darf niemals unterdrückt werden.',
    ],
  },
  {
    key: 'c',
    symbol: 'C',
    power: '3',
    title: 'Challenge · Choices · Choose',
    words: ['Challenge', 'Choices', 'Choose'],
    short: 'Sieh die Herausforderung, finde drei Möglichkeiten, entscheide dich.',
    body: [],
  },
];

/** Die drei C – eigener Block, weil hier die eigentliche Entscheidung fällt. */
export const cSteps = [
  {
    word: 'Challenge',
    title: 'Nimm die Situation als Herausforderung',
    text: 'Betrachte die Situation, in der du gerade steckst, als Challenge. Nimm sie an, wie sie ist – als etwas, an dem du dich weiterentwickeln kannst.',
  },
  {
    word: 'Choices',
    title: 'Finde mindestens drei Wahlmöglichkeiten',
    text: 'Überlege dir, was du jetzt tun könntest. Mindestens drei Möglichkeiten – vorher hast du keine echte Wahl.',
  },
  {
    word: 'Choose',
    title: 'Entscheide dich – und tu es',
    text: 'Nimm die Möglichkeit, die dir am attraktivsten erscheint – beziehungsweise die, deren Preis du bereit bist zu zahlen. Dann entscheide dich und setze sie SOFORT um.',
  },
];

/** Warum es mindestens drei Möglichkeiten sein müssen. */
export const choiceRule = [
  { count: 1, label: 'Eine Möglichkeit', verdict: 'ist ein Zwang' },
  { count: 2, label: 'Zwei Möglichkeiten', verdict: 'sind ein Dilemma' },
  { count: 3, label: 'Drei Möglichkeiten', verdict: 'sind eine echte Wahl' },
];

export const STATUS_QUO =
  'Auch nichts zu tun ist eine Entscheidung – eine Entscheidung für den Status quo.';

/** Kurzfassung in Handlungsschritten – für die Merkkarte und das HowTo-Schema. */
export const howToSteps = [
  { name: 'Stop', text: 'Sag laut „Stopp“, sobald das Thema oder Gefühl hochkommt.' },
  { name: 'Smile', text: 'Lächle kurz – auch wenn es sich albern anfühlt.' },
  { name: 'Look', text: 'Sieh dir das Gefühl an, das in dir hochkommt.' },
  { name: 'Accept', text: 'Akzeptiere das Gefühl und lass es da sein, statt es zu bekämpfen.' },
  {
    name: 'Challenge',
    text: 'Nimm die Situation als Herausforderung an, an der du wachsen kannst.',
  },
  { name: 'Choices', text: 'Finde mindestens drei Wahlmöglichkeiten.' },
  {
    name: 'Choose',
    text: 'Wähle die Möglichkeit, deren Preis du bereit bist zu zahlen – und setze sie SOFORT um.',
  },
];

export const DISCLAIMER =
  'Die Formel ist eine Selbsthilfe-Technik aus dem Coaching für alltägliche Belastungen. Sie ersetzt keine psychotherapeutische oder ärztliche Behandlung. Wenn dich Gefühle dauerhaft überwältigen, hol dir bitte professionelle Hilfe.';
