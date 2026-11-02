/**
 * FAQ von Welt A.
 *
 * Wortlaut aus dem ausgefüllten Fragenkatalog. Bewusst so gebaut, dass der
 * **erste Satz die Frage direkt beantwortet** — genau diesen Satz greifen
 * Google-Snippets und Sprachmodelle auf.
 *
 * Wird von der FAQ-Sektion und vom `FAQPage`-Schema gelesen. Ändert sich eine
 * Antwort, ändert sie sich an beiden Stellen gleichzeitig.
 */

import { offerByTitle } from '@/app/coaching/pricing';

export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqNlp: FaqEntry[] = [
  {
    question: 'Was kostet Coaching bei dir?',
    answer:
      // Preise aus pricing.ts – so kann die Antwort nicht mehr von der Preistabelle abweichen.
      `Eine Coaching-Session kostet ${offerByTitle('Folgesession').price} und dauert etwa 180 Minuten; die erste Session (Startersession) kostet ${offerByTitle('Startersession').price} und dauert rund vier Stunden. Alle Preise inkl. MwSt. Der Einstieg ist kostenlos: die Klarheits-Session (ca. 30 Minuten, per Telefon oder Video) ist zugleich das Erstgespräch. Wenn dein Anliegen eine intensivere Begleitung sinnvoll macht, vereinbaren wir nach dem Erstgespräch transparent einen passenden Rahmen – ohne dir mehr Termine zu verkaufen, als du tatsächlich brauchst.`,
  },
  {
    question: 'Wie viele Sessions brauche ich, bis sich etwas verändert?',
    answer:
      'Eine erste spürbare Veränderung ist häufig schon nach einer intensiven Session möglich; für eine nachhaltige Integration sind oft zwei bis vier Termine sinnvoll. Entscheidend ist nicht die Anzahl der Sitzungen, sondern ob du zwischen den Terminen neue Wahlmöglichkeiten wirklich im Alltag nutzt. Ich verspreche deshalb keinen garantierten Erfolg in einer festen Zeit, sondern arbeite ziel- und ergebnisorientiert mit dir.',
  },
  {
    question: 'Wie läuft eine Session konkret ab?',
    answer:
      'Eine Session beginnt mit einer präzisen Klärung deines Anliegens, deines gewünschten Zustands und der Frage, woran du eine echte Veränderung erkennen würdest. Danach arbeiten wir mit Gespräch, Wahrnehmung, Körpererleben und passenden NLP-Formaten an den Mustern, die dich bisher begrenzen. Zum Abschluss übersetzen wir die Erkenntnis in konkrete nächste Schritte und prüfen, ob die Veränderung für dein gesamtes Lebensumfeld stimmig ist.',
  },
  {
    question: 'Funktioniert Coaching per Video genauso gut wie vor Ort?',
    answer:
      'Coaching per Video kann ebenso fokussiert und wirksam erlebt werden wie ein Termin vor Ort, wenn du ungestört bist und dich gut auf den Prozess einlassen kannst. Viele Interventionen über Sprache, innere Bilder, Perspektivwechsel und Körperwahrnehmung lassen sich online sehr gut durchführen. Bei Methoden, die viel Bewegung oder eine besonders intensive persönliche Begleitung brauchen, entscheiden wir gemeinsam, ob ein Präsenztermin sinnvoller ist.',
  },
  {
    question: 'Was ist der Unterschied zwischen Coaching und Therapie – und wann ist Coaching das Falsche?',
    answer:
      'Coaching richtet sich an grundsätzlich psychisch stabile Menschen, die ein konkretes Ziel, einen Konflikt oder ein persönliches Entwicklungsthema bearbeiten möchten; es diagnostiziert und behandelt keine psychischen Erkrankungen. Bei akuten Krisen, Suizidgedanken, schweren Traumafolgen, Suchterkrankungen oder anderen Störungen mit Krankheitswert ist eine ärztliche oder psychotherapeutische Behandlung der richtige Weg. Coaching ersetzt weder Psychotherapie noch medizinische Behandlung und sollte eine notwendige Behandlung niemals verzögern.',
  },
  {
    question: 'Für wen ist mein Coaching nicht geeignet?',
    answer:
      'Coaching ist nicht geeignet, wenn du eine Diagnose oder Heilbehandlung erwartest, dich in einer akuten psychischen Krise befindest oder aktuell nicht in der Lage bist, eigenverantwortlich am Prozess mitzuwirken. Es passt auch nicht, wenn du nur eine schnelle Technik suchst, die andere Menschen verändert, ohne dass du deine eigene Haltung und deinen Anteil betrachten möchtest. Im Zweifel klären wir im Erstgespräch offen, ob Coaching der passende Rahmen ist.',
  },
  {
    question: 'Was passiert im kostenlosen Erstgespräch?',
    answer:
      'Im kostenlosen Erstgespräch klären wir dein Anliegen, dein gewünschtes Ergebnis und ob die Zusammenarbeit für uns beide stimmig ist. Du erfährst, wie ich arbeite, kannst alle Fragen stellen und bekommst eine ehrliche Einschätzung zum möglichen nächsten Schritt. Das Gespräch ist kein Verkaufstrick: Wenn ein anderer Weg passender ist, sage ich dir das ebenso klar.',
  },
  {
    question: 'Wo finden die Sessions statt?',
    answer:
      'Du hast drei Möglichkeiten: bei mir in Potsdam, bei dir vor Ort in Potsdam, Berlin oder Brandenburg, oder online per Video. Welcher Rahmen passt, klären wir im kostenlosen Erstgespräch – manche Themen lassen sich in vertrauter Umgebung leichter angehen, andere profitieren vom Abstand zum Alltag. Auch Unternehmen besuche ich vor Ort, wenn Rahmen, Anfahrt und Zielsetzung vorher abgestimmt sind. Den genauen Ort erhältst du mit deiner Terminbestätigung.',
  },
  {
    question: 'Muss ich an NLP „glauben“, damit es wirkt?',
    answer:
      'Du musst an NLP nicht glauben, sondern nur bereit sein, deine Wahrnehmung, Sprache und gewohnten Reaktionen neugierig zu untersuchen. NLP ist für mich kein Glaubenssystem, sondern ein praktisches Modell zur Arbeit mit subjektivem Erleben und Kommunikation. Entscheidend ist, ob die gewählte Intervention dir im konkreten Alltag mehr Freiheit und hilfreiche Wahlmöglichkeiten eröffnet.',
  },
  {
    question: 'Wie schnell bekomme ich einen Termin?',
    answer:
      'Wie schnell du einen Termin bekommst, hängt von der aktuellen Auslastung und davon ab, ob du online oder vor Ort arbeiten möchtest. Nach deiner Anfrage melde ich mich zeitnah mit den nächsten verfügbaren Optionen. Bei akuten psychischen Krisen ist Coaching nicht die richtige Soforthilfe; wende dich dann bitte an ärztliche, psychotherapeutische oder örtliche Krisendienste.',
  },
  {
    question: 'Was, wenn ich einen Termin absagen muss?',
    answer:
      'Wenn du einen Termin absagen musst, gib mir bitte so früh wie möglich Bescheid, damit wir eine faire Lösung und einen Ersatztermin finden können. Welche Stornofrist und mögliche Ausfallkosten für deinen Termin gelten, steht transparent in deiner Terminbestätigung beziehungsweise Coaching-Vereinbarung. Unvorhersehbare Situationen besprechen wir menschlich und direkt.',
  },
  {
    question: 'Ist das, was ich erzähle, vertraulich?',
    answer:
      'Ja, die Inhalte unserer Gespräche behandle ich vertraulich und gebe sie nicht ohne deine ausdrückliche Zustimmung weiter. Das gilt auch gegenüber Arbeitgebern, Angehörigen und anderen Auftraggebern; bei einem Unternehmenscoaching vereinbaren wir vorher klar, welche organisatorischen Informationen geteilt werden dürfen. Gesetzliche Offenlegungspflichten oder akute Gefahrenlagen können Grenzen der Vertraulichkeit begründen.',
  },
];

/**
 * Fragen, die beide Geschäftsbereiche betreffen.
 *
 * Stehen bewusst am Ende **beider** FAQ-Sektionen: Wer auf einer der beiden
 * Weltenseiten landet, soll die jeweils andere überhaupt erst entdecken.
 * Das schließt zugleich eine Lücke in der internen Verlinkung — von /coaching
 * führte zuvor kein einziger Link nach /webdevelopment.
 */
export const faqBoth: FaqEntry[] = [
  {
    question: 'Warum machst du beides – Coaching und Webentwicklung?',
    answer:
      'Ich verbinde Coaching und Webentwicklung, weil nachhaltige Veränderung innen beginnt und außen eine passende Form braucht. Im Coaching geht es um Identität, Haltung und neue Wahlmöglichkeiten; in der Webentwicklung übersetze ich Klarheit in Struktur, Sprache und digitale Erlebnisse. Beides folgt derselben Frage: Welche Lösung schafft nicht nur mehr Erfolg, sondern auch mehr Stimmigkeit und Erfüllung?',
  },
  {
    question: 'Kann ich beides bei dir buchen?',
    answer:
      'Ja, du kannst Coaching und Webentwicklung einzeln oder sinnvoll miteinander verbunden buchen. Das ist besonders hilfreich, wenn eine neue Positionierung, ein unternehmerischer Wandel oder eine Website nicht nur äußerlich besser aussehen, sondern deine tatsächliche Haltung und Ausrichtung widerspiegeln soll. Wir trennen dabei Rollen, Ziele, Leistungsumfang und Vertraulichkeit klar voneinander.',
  },
];
