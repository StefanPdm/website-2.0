/**
 * Partnerschaftstest „Lebenspartner oder Lebenslektion?“ – einzige Quelle.
 * Die fünf Fragen gehen auf Kyle Fuller zurück; von Stefan übersetzt und
 * neutral formuliert (Zielgruppe: Unternehmer jeden Geschlechts).
 *
 * Je Frage zwei Antworten – sie werden nicht ausgewertet, sie helfen nur beim
 * ehrlichen Festlegen. Die Garantie ist Stefans bewusste Entscheidung (2026-11-08).
 */

export const INTRO =
  'Lass mich dir fünf Fragen stellen, und ich garantiere dir: Am Ende von Frage fünf wirst du wissen, ob dieser Mensch dein Lebenspartner ist oder nur eine weitere Lebenslektion. Bist du bereit?';

export const SOURCE = {
  label: 'Kyle Fuller',
  href: 'https://www.youtube.com/shorts/hDb1zhzgDy8',
};

export type PartnerQuestion = {
  question: string;
  yes: string;
  no: string;
};

export const partnerQuestions: PartnerQuestion[] = [
  {
    question:
      'Wenn dir jemand sagen würde, dass du genau so bist wie dein Partner oder deine Partnerin – wäre das ein Kompliment für dich?',
    yes: 'Ja, ein Kompliment',
    no: 'Eher nicht',
  },
  {
    question:
      'Gibt dir dieser Mensch ein Gefühl vollkommener Erfüllung – oder sorgt er nur dafür, dass du dich weniger einsam fühlst?',
    yes: 'Vollkommene Erfüllung',
    no: 'Ich fühle mich weniger einsam',
  },
  {
    question:
      'Bist du in den Menschen verliebt, der dein Partner oder deine Partnerin genau jetzt ist – oder in das Potenzial, das darin stecken könnte?',
    yes: 'In den Menschen, wie er jetzt ist',
    no: 'In das Potenzial',
  },
  {
    question:
      'Kannst du wirklich du selbst sein – mit all deinen Fehlern und peinlichen Seiten? Oder musst du dich manchmal verstellen, nur damit sich der andere wohlfühlt?',
    yes: 'Ich kann ganz ich sein',
    no: 'Ich verstelle mich manchmal',
  },
  {
    question:
      'Wenn dein Kind jemanden daten würde, der genau so ist wie dein Partner oder deine Partnerin – wärst du glücklich für dein Kind, oder würdest du sagen: Lauf?',
    yes: 'Ich wäre glücklich',
    no: 'Ich würde sagen: Lauf',
  },
];

/** Schluss statt Auswertung (Stefan, 2026-11-08): kein Urteil, der Besucher spürt es selbst. */
export const OUTRO =
  'Du hast dir diese fünf Fragen selbst und ehrlich beantwortet. Und ich garantiere dir: Jetzt spürst du selbst, ob es sich bei deiner Beziehung um einen Lebenspartner handelt – oder um eine Lebenslektion.';
