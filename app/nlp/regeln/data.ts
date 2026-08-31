/**
 * Die beiden Regelwerke von Stefan Heinemann.
 *
 * Wortlaut 1:1 aus den Original-PDFs übernommen — inklusive der bewusst
 * kleingeschriebenen Anti-Regeln. Wird von beiden Unterseiten, dem JSON-LD
 * (ItemList) und /llms.txt gelesen.
 */

export type RuleSet = {
  slug: string;
  /** Pfad relativ zur Domain. */
  href: string;
  eyebrow: string;
  title: string;
  /** Kurzform für Karten und Querverweise. */
  shortTitle: string;
  lead: string;
  /** Einordnung direkt unter dem Titel – bei den Anti-Regeln zwingend. */
  framing: string;
  /** Verlaufsfarben der Nummern-Badges. */
  badgeFrom: string;
  badgeTo: string;
  rules: string[];
  metaTitle: string;
  metaDescription: string;
  /** Text des Verweises auf die jeweils andere Seite. */
  crossLinkLabel: string;
  crossLinkText: string;
};

export const gluecklichsein: RuleSet = {
  slug: 'gluecklichsein',
  href: '/nlp/regeln/gluecklichsein',
  eyebrow: '20 Regeln',
  title: 'Regeln für erfolgreiches Glücklichsein',
  shortTitle: 'Regeln für erfolgreiches Glücklichsein',
  lead: 'Zwanzig Sätze, an denen ich mich selbst ausrichte. Keine Technik, keine Methode – eine Haltung, die man täglich neu wählt. Lies sie langsam. Der Wert liegt nicht im Zustimmen, sondern im Anwenden.',
  framing:
    'Nimm dir eine Regel für eine Woche vor, nicht alle zwanzig auf einmal. Veränderung entsteht durch Wiederholung, nicht durch Einsicht.',
  badgeFrom: 'var(--accent)',
  badgeTo: 'var(--accent-2)',
  rules: [
    'Akzeptiere, was ist, bevor du veränderst, was sein soll.',
    'Übernimm Verantwortung dafür, wie du die Welt erlebst.',
    'Übernimm Verantwortung für dein Wirken, dein Handeln und dein Leben.',
    'Erwarte weniger von anderen und mehr Bewusstheit von dir selbst.',
    'Erkenne: Die Welt ist polar. Licht entsteht nicht ohne Schatten.',
    'Unterscheide, was du beeinflussen kannst – und was nicht.',
    'Lebe im Jetzt, denn nur dort findet Leben wirklich statt.',
    'Übe täglich Stille: zweimal 15 Minuten ohne Ablenkung.',
    'Entziehe dich bewusst von digitalen und emotionalen Körperdrogen.',
    'Achte auf deine Sprache, denn Worte formen dein Erleben und Fühlen.',
    'Ersetze „Ich muss“ durch „Ich will“ oder „Ich entscheide mich“.',
    'Erkenne: Alles, was du tust, tust du immer für dich.',
    'Triff Entscheidungen im Vertrauen, nicht aus Angst vor Fehlern.',
    'Akzeptiere, dass es keine absolute Sicherheit gibt.',
    'Entdecke dein Urvertrauen: Du kannst dem Leben begegnen.',
    'Sorge für Schlaf, Bewegung und Nahrung, die dich stärken.',
    'Lies Bücher, die dein Denken weiten statt nur dein Wissen füllen.',
    'Trainiere täglich deinen Körper, damit dein Geist ein stabiles Zuhause hat.',
    'Frage nicht nur: „Was passiert mir?“, sondern: „Was macht das mit mir – und was mache ich daraus?“',
    'Erkenne deine Wahlfreiheit: Zwischen Reiz und Reaktion liegt dein Bewusstsein.',
  ],
  metaTitle: '20 Regeln für erfolgreiches Glücklichsein',
  metaDescription:
    '20 Regeln für ein erfülltes Leben von NLP Coach Stefan Heinemann aus Potsdam: Verantwortung übernehmen, im Jetzt leben, Sprache bewusst nutzen, Wahlfreiheit zwischen Reiz und Reaktion erkennen.',
  crossLinkLabel: 'Die Umkehrung lesen',
  crossLinkText:
    'Manchmal erkennt man den eigenen Weg leichter, wenn man sieht, wie man ihn zuverlässig verfehlt.',
};

export const ungluecklichsein: RuleSet = {
  slug: 'ungluecklichsein',
  href: '/nlp/regeln/ungluecklichsein',
  eyebrow: '20 Regeln · ironisch',
  title: 'Regeln für erfolgreiches Unglücklichsein',
  shortTitle: 'Regeln für erfolgreiches Unglücklichsein',
  lead: 'Diese Liste ist eine Umkehrung – und genau deshalb wirksam. Wer weiß, wie Unglück zuverlässig gelingt, erkennt die eigenen Muster oft schneller als in jeder Ratgeberliste.',
  framing:
    'Ironisch gemeint. Keine dieser Regeln ist ein Rat – jede beschreibt ein Muster, das sich leise einschleicht. Lies sie als Checkliste: Was davon tust du gerade, ohne es zu merken?',
  badgeFrom: '#fb7185',
  badgeTo: '#94a3b8',
  rules: [
    'vergleiche dich stets mit anderen',
    'habe an andere Erwartungen',
    'erfülle die unausgesprochenen Erwartungen anderer',
    'sei angsterfüllt und versuche alles zu kontrollieren',
    'glaube, dass Erfolg & Zielerreichung glücklich machen',
    'die Vergangenheit ist auch die Gegenwart & Zukunft',
    'die anderen sind für dein Wohl verantwortlich',
    'du bist da, um andere glücklich zu machen',
    'du hast recht & erzähle es dann auch jedem',
    'fokussiere dich immer auf den Mangel',
    'verlasse niemals deine Komfortzone – zu unbequem',
    'stehe gebeugt mit hängenden Schultern',
    'kompensiere Probleme mit Alkohol & Konsum',
    'lies keine Bücher',
    'vermeide Weiterbildungen',
    'gib anderen die Schuld an deinen Problemen',
    'sei dir sicher, dass du dein EGO bist',
    'wisse, du bist weder liebenswert noch gut genug',
    'vermeide jede Form der Dankbarkeit',
    'wisse, selbst bei diesen Regeln versagst du wieder',
  ],
  metaTitle: '20 Regeln für erfolgreiches Unglücklichsein (ironisch)',
  metaDescription:
    'Eine ironische Umkehrung von NLP Coach Stefan Heinemann aus Potsdam: 20 Muster, mit denen Unglücklichsein zuverlässig gelingt – und die man an sich selbst leichter erkennt als jeden guten Rat.',
  crossLinkLabel: 'Jetzt die Gegenrichtung',
  crossLinkText:
    'Wenn du weißt, wie es schiefgeht, kennst du auch die Richtung, in die es gehen kann.',
};

export const ruleSets = [gluecklichsein, ungluecklichsein];

/** Liefert zu einem Regelwerk das jeweils andere – für die Querverlinkung. */
export function otherRuleSet(current: RuleSet): RuleSet {
  return current.slug === gluecklichsein.slug ? ungluecklichsein : gluecklichsein;
}
