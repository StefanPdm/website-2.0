/**
 * Psychografie-Selbsttest nach Dietmar Friedmann.
 *
 * Drei Grundtypen, die sich darin unterscheiden, welchen Lebensbereich ein
 * Mensch am selbstverständlichsten nutzt: Beziehung, Erkennen oder Handeln.
 *
 * **Wichtig für jede Änderung an dieser Datei:** Das Modell ist *kein*
 * wissenschaftlich validiertes Testverfahren. Der Hinweis darauf steht
 * bewusst dreimal auf der Seite — im Kopf, unter dem Ergebnis und in der
 * Quellenangabe. Er ist keine Floskel, sondern die Bedingung dafür, dass der
 * Test überhaupt angeboten werden kann (CLAUDE.md §10: Beweispflicht, keine
 * Erfolgsversprechen).
 *
 * Die Zuordnung jeder Antwort steht **explizit** an der Option, obwohl sie
 * einem Dreier-Rhythmus folgt. Eine Formel wäre kürzer, würde aber beim
 * Einfügen oder Umsortieren einer Frage still das gesamte Ergebnis
 * verfälschen — ohne dass ein Test das bemerkt.
 */

/** Die drei Lebensbereiche des Modells. */
export type Dimension = 'beziehung' | 'erkennen' | 'handeln';

export type Option = {
  text: string;
  dimension: Dimension;
};

export type Question = {
  text: string;
  options: Option[];
};

export const dimensions: Record<
  Dimension,
  { area: string; type: string; short: string }
> = {
  beziehung: {
    area: 'Beziehung',
    type: 'Beziehungstyp',
    short: 'Menschen, Gefühle, Verbundenheit',
  },
  erkennen: {
    area: 'Erkennen',
    type: 'Sachtyp',
    short: 'Zusammenhänge, Analyse, Verstehen',
  },
  handeln: {
    area: 'Handeln',
    type: 'Handlungstyp',
    short: 'Entscheidungen, Umsetzung, Ergebnisse',
  },
};

/** Reihenfolge für jede Anzeige — konstant, damit Balken nicht springen. */
export const dimensionOrder: Dimension[] = ['beziehung', 'erkennen', 'handeln'];

export const questions: Question[] = [
  {
    text: 'Du kommst in eine Gruppe, in der du noch niemanden kennst. Was machst du zuerst?',
    options: [
      {
        text: 'Ich nehme Kontakt auf und versuche, ein Gefühl für die Menschen zu bekommen.',
        dimension: 'beziehung',
      },
      {
        text: 'Ich beobachte zunächst, wie die Gruppe funktioniert und worum es geht.',
        dimension: 'erkennen',
      },
      {
        text: 'Ich beteilige mich möglichst schnell an einer konkreten Aktivität.',
        dimension: 'handeln',
      },
    ],
  },
  {
    text: 'Ein gemeinsames Projekt gerät ins Stocken. Was ist dein erster Impuls?',
    options: [
      { text: 'Ich schlage einen nächsten konkreten Schritt vor.', dimension: 'handeln' },
      {
        text: 'Ich spreche mit den Beteiligten darüber, was gerade zwischen ihnen passiert.',
        dimension: 'beziehung',
      },
      { text: 'Ich analysiere, wodurch das Problem entstanden ist.', dimension: 'erkennen' },
    ],
  },
  {
    text: 'Vor einer wichtigen Entscheidung möchtest du vor allem …',
    options: [
      {
        text: 'alle relevanten Informationen und Zusammenhänge verstehen.',
        dimension: 'erkennen',
      },
      { text: 'verschiedene Möglichkeiten praktisch ausprobieren.', dimension: 'handeln' },
      {
        text: 'berücksichtigen, wie sich die Entscheidung auf die beteiligten Menschen auswirkt.',
        dimension: 'beziehung',
      },
    ],
  },
  {
    text: 'Was gibt dir in deinem Alltag besonders viel Sicherheit?',
    options: [
      {
        text: 'Zu wissen, dass ich mit wichtigen Menschen verbunden bin.',
        dimension: 'beziehung',
      },
      {
        text: 'Eine Situation zu verstehen und gedanklich einordnen zu können.',
        dimension: 'erkennen',
      },
      { text: 'Selbst Einfluss nehmen und etwas bewirken zu können.', dimension: 'handeln' },
    ],
  },
  {
    text: 'Jemand erzählt dir von einem persönlichen Problem. Wie reagierst du meistens?',
    options: [
      { text: 'Ich überlege, was die Person jetzt konkret tun könnte.', dimension: 'handeln' },
      {
        text: 'Ich höre aufmerksam zu und versuche, ihre Gefühle nachzuvollziehen.',
        dimension: 'beziehung',
      },
      {
        text: 'Ich stelle Fragen, um Ursachen und Zusammenhänge zu verstehen.',
        dimension: 'erkennen',
      },
    ],
  },
  {
    text: 'Was stört dich bei einer Besprechung am meisten?',
    options: [
      {
        text: 'Wenn Aussagen unklar, widersprüchlich oder schlecht begründet sind.',
        dimension: 'erkennen',
      },
      {
        text: 'Wenn lange gesprochen wird, aber keine Entscheidung fällt.',
        dimension: 'handeln',
      },
      {
        text: 'Wenn die Stimmung angespannt ist und niemand darauf eingeht.',
        dimension: 'beziehung',
      },
    ],
  },
  {
    text: 'Wofür wirst du von anderen am ehesten geschätzt?',
    options: [
      {
        text: 'Für mein Einfühlungsvermögen und meine verbindliche Art.',
        dimension: 'beziehung',
      },
      {
        text: 'Für meine Klarheit und meine Fähigkeit, Dinge zu durchschauen.',
        dimension: 'erkennen',
      },
      {
        text: 'Für meine Entschlossenheit und meine Umsetzungsstärke.',
        dimension: 'handeln',
      },
    ],
  },
  {
    text: 'Du hast eine neue Idee. Was passiert als Nächstes?',
    options: [
      { text: 'Ich beginne möglichst schnell mit der Umsetzung.', dimension: 'handeln' },
      {
        text: 'Ich erzähle einer vertrauten Person davon und bespreche die Idee.',
        dimension: 'beziehung',
      },
      {
        text: 'Ich recherchiere und prüfe, ob die Idee logisch und sinnvoll ist.',
        dimension: 'erkennen',
      },
    ],
  },
  {
    text: 'In einem Konflikt versuchst du zuerst …',
    options: [
      { text: 'herauszufinden, worum es sachlich wirklich geht.', dimension: 'erkennen' },
      { text: 'eine Lösung oder klare Vereinbarung herbeizuführen.', dimension: 'handeln' },
      {
        text: 'die Gefühle und Bedürfnisse der Beteiligten zu verstehen.',
        dimension: 'beziehung',
      },
    ],
  },
  {
    text: 'Wann empfindest du einen Tag als besonders gelungen?',
    options: [
      {
        text: 'Wenn ich gute Gespräche geführt und echte Nähe erlebt habe.',
        dimension: 'beziehung',
      },
      { text: 'Wenn ich etwas Neues verstanden oder erkannt habe.', dimension: 'erkennen' },
      { text: 'Wenn ich sichtbare Ergebnisse erreicht habe.', dimension: 'handeln' },
    ],
  },
  {
    text: 'Du erhältst eine neue, anspruchsvolle Aufgabe. Wie gehst du vor?',
    options: [
      { text: 'Ich fange an und passe mein Vorgehen unterwegs an.', dimension: 'handeln' },
      {
        text: 'Ich kläre zunächst, wer beteiligt ist und mit wem ich mich abstimmen sollte.',
        dimension: 'beziehung',
      },
      {
        text: 'Ich verschaffe mir einen Überblick und entwickle einen durchdachten Plan.',
        dimension: 'erkennen',
      },
    ],
  },
  {
    text: 'Was fällt dir normalerweise am leichtesten?',
    options: [
      {
        text: 'Informationen zu strukturieren und Muster zu erkennen.',
        dimension: 'erkennen',
      },
      {
        text: 'Entscheidungen zu treffen und Dinge voranzubringen.',
        dimension: 'handeln',
      },
      {
        text: 'Vertrauen aufzubauen und Menschen miteinander zu verbinden.',
        dimension: 'beziehung',
      },
    ],
  },
  {
    text: 'Eine nahestehende Person verhält sich plötzlich anders. Was beschäftigt dich zuerst?',
    options: [
      { text: 'Ob zwischen uns etwas nicht stimmt.', dimension: 'beziehung' },
      {
        text: 'Welche Gründe oder Erklärungen es für das Verhalten geben könnte.',
        dimension: 'erkennen',
      },
      { text: 'Was ich jetzt konkret tun sollte.', dimension: 'handeln' },
    ],
  },
  {
    text: 'Du hast mehrere unerledigte Aufgaben vor dir. Was hilft dir am meisten?',
    options: [
      { text: 'Einfach mit einer Aufgabe anzufangen.', dimension: 'handeln' },
      {
        text: 'Mit jemandem über meine Belastung oder Prioritäten zu sprechen.',
        dimension: 'beziehung',
      },
      {
        text: 'Die Aufgaben zu ordnen und einen sinnvollen Ablauf festzulegen.',
        dimension: 'erkennen',
      },
    ],
  },
  {
    text: 'Was bedeutet für dich persönliche Entwicklung am ehesten?',
    options: [
      {
        text: 'Mich selbst und meine inneren Muster besser zu verstehen.',
        dimension: 'erkennen',
      },
      {
        text: 'Neue Erfahrungen zu machen und Herausforderungen aktiv anzugehen.',
        dimension: 'handeln',
      },
      {
        text: 'Ehrlicher, offener und verbundener mit mir und anderen zu leben.',
        dimension: 'beziehung',
      },
    ],
  },
  {
    text: 'Wenn sich Pläne kurzfristig ändern …',
    options: [
      { text: 'achte ich darauf, wie es allen Beteiligten damit geht.', dimension: 'beziehung' },
      {
        text: 'möchte ich zunächst verstehen, warum die Änderung notwendig ist.',
        dimension: 'erkennen',
      },
      {
        text: 'stelle ich mich um und kümmere mich um die neue Situation.',
        dimension: 'handeln',
      },
    ],
  },
  {
    text: 'Was löst bei dir am ehesten Ungeduld aus?',
    options: [
      { text: 'Wenn Menschen nicht ins Tun kommen.', dimension: 'handeln' },
      {
        text: 'Wenn menschliche oder emotionale Aspekte übergangen werden.',
        dimension: 'beziehung',
      },
      {
        text: 'Wenn ohne ausreichende Informationen vorschnell entschieden wird.',
        dimension: 'erkennen',
      },
    ],
  },
  {
    text: 'Welche Aussage beschreibt dich am besten?',
    options: [
      { text: 'Ich möchte die Welt und ihre Zusammenhänge verstehen.', dimension: 'erkennen' },
      { text: 'Ich möchte gestalten, entscheiden und etwas bewegen.', dimension: 'handeln' },
      {
        text: 'Ich möchte Menschen verstehen und Verbundenheit erleben.',
        dimension: 'beziehung',
      },
    ],
  },
];

export type ResultText = {
  headline: string;
  lead: string;
  strengths: string[];
  challenges: string[];
  impulse: string;
};

export const results: Record<Dimension, ResultText> = {
  beziehung: {
    headline: 'Dein bevorzugter Bereich ist Beziehung',
    lead: 'Du richtest deine Aufmerksamkeit besonders auf Menschen, Gefühle und zwischenmenschliche Verbindungen. Du spürst häufig schnell, wie es anderen geht, und legst Wert auf Vertrauen, Harmonie und Zugehörigkeit.',
    strengths: [
      'Empathie und Einfühlungsvermögen',
      'Aufbau vertrauensvoller Beziehungen',
      'Gespür für Stimmungen und Bedürfnisse',
      'Vermittlung und Verbindung innerhalb von Gruppen',
      'Loyalität und Hilfsbereitschaft',
    ],
    challenges: [
      'Konflikte oder Ablehnung können dich stark beschäftigen.',
      'Eigene Bedürfnisse geraten eventuell zugunsten anderer in den Hintergrund.',
      'Entscheidungen können schwerfallen, wenn sie andere enttäuschen könnten.',
      'Harmonie kann wichtiger werden als notwendige Klarheit.',
    ],
    impulse:
      'Was würdest du entscheiden, wenn du nicht für die Gefühle aller anderen verantwortlich sein müsstest?',
  },
  erkennen: {
    headline: 'Dein bevorzugter Bereich ist Erkennen',
    lead: 'Du richtest deine Aufmerksamkeit besonders auf Informationen, Zusammenhänge und nachvollziehbare Erklärungen. Du möchtest verstehen, bevor du urteilst oder handelst, und kannst komplexe Situationen häufig gut analysieren.',
    strengths: [
      'Analytisches und strukturiertes Denken',
      'Sachlichkeit und Beobachtungsfähigkeit',
      'Erkennen von Mustern und Zusammenhängen',
      'Gründliche Vorbereitung',
      'Differenzierte und überlegte Entscheidungen',
    ],
    challenges: [
      'Aus Nachdenken kann mitunter Grübeln werden.',
      'Gefühle lassen sich nicht immer logisch erklären.',
      'Entscheidungen können sich verzögern, wenn noch Informationen fehlen.',
      'Andere erleben deine Sachlichkeit möglicherweise als Distanz.',
    ],
    impulse: 'Was könntest du heute ausprobieren, obwohl du noch nicht alle Antworten kennst?',
  },
  handeln: {
    headline: 'Dein bevorzugter Bereich ist Handeln',
    lead: 'Du richtest deine Aufmerksamkeit besonders auf Entscheidungen, Möglichkeiten und sichtbare Ergebnisse. Du möchtest gestalten, Einfluss nehmen und Dinge voranbringen. Herausforderungen begegnest du häufig mit Aktivität und Lösungsorientierung.',
    strengths: [
      'Entschlossenheit und Umsetzungsstärke',
      'Mut zu Entscheidungen',
      'Pragmatismus und Lösungsorientierung',
      'Belastbarkeit in herausfordernden Situationen',
      'Fähigkeit, andere in Bewegung zu bringen',
    ],
    challenges: [
      'Geduld und ausführliche Reflexion können dir schwerfallen.',
      'Gefühle oder Zwischentöne werden eventuell übergangen.',
      'Aktivität kann dazu dienen, unangenehme Unsicherheit nicht spüren zu müssen.',
      'Andere können dein Tempo als Druck erleben.',
    ],
    impulse:
      'Was wäre gerade wichtig wahrzunehmen oder zu verstehen, bevor du den nächsten Schritt machst?',
  },
};

/** Fragen zur Selbstbeobachtung, wenn zwei Bereiche gleich stark sind. */
export const mixedProfileQuestions: string[] = [
  'Welcher Bereich fühlt sich besonders selbstverständlich an?',
  'Welchen Bereich nutzt du vor allem beruflich?',
  'Wie reagierst du unter Stress?',
  'Was vermisst du am stärksten, wenn es nicht vorhanden ist?',
  'Welcher Bereich kostet dich mehr bewusste Anstrengung?',
];

export const DISCLAIMER =
  'Dieser Test dient der Selbstreflexion und basiert auf dem psychografischen Persönlichkeitsmodell nach Dietmar Friedmann. Er ist kein wissenschaftlich validiertes Testverfahren und ersetzt keine psychologische, medizinische oder therapeutische Diagnostik. Menschen sind komplexer als jedes Typenmodell. Das Ergebnis beschreibt daher eine mögliche Bevorzugung und keine unveränderliche Persönlichkeit.';

export const SOURCES = [
  {
    label: 'Psychografie — Wikipedia',
    href: 'https://de.wikipedia.org/wiki/Psychografie',
  },
  { label: 'Dietmar Friedmann: Der Andere. Ehrenwirth, München 1990.' },
  {
    label:
      'Dietmar Friedmann: Die drei Persönlichkeitstypen und ihre Lebensstrategien. Primus, Darmstadt 2000.',
  },
] as const;
