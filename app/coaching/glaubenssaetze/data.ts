/**
 * Glaubenssatz-Check (/coaching/glaubenssaetze) – einzige Quelle der Sätze.
 * Gelesen von der Satz-Wand, dem Teaser auf /coaching und llms.txt.
 * Nummern sind fest (1–50): Sie sind der Schlüssel der Auswahl im Browser.
 */

export type BeliefArea = {
  id: string;
  title: string;
  /** Die Angst bzw. das Muster hinter dem Bereich – ein Satz. */
  fear: string;
  beliefs: Belief[];
};

export type Belief = {
  id: number;
  text: string;
  /**
   * Ein mögliches Gegenteil – wird in der Auswertung erst aufgedeckt, nachdem
   * man selbst überlegt hat. Kein Ersatz-Glaubenssatz, sondern eine Gegenprobe:
   * Könnte das hier genauso wahr sein?
   */
  opposite: string;
};

const area = (
  id: string,
  title: string,
  fear: string,
  start: number,
  pairs: [text: string, opposite: string][],
): BeliefArea => ({
  id,
  title,
  fear,
  beliefs: pairs.map(([text, opposite], index) => ({ id: start + index, text, opposite })),
});

// export const beliefAreas: BeliefArea[] = [
//   area('selbstwert', 'Selbstwert und Selbstliebe', 'Die Angst, nicht gut genug zu sein.', 1, [
//     ['Ich bin nicht gut genug.', 'Ich bin gut genug – so, wie ich heute bin.'],
//     ['Ich bin nicht liebenswert, so wie ich bin.', 'Ich bin liebenswert, so wie ich bin.'],
//     [
//       'Ich muss etwas leisten, um wertvoll zu sein.',
//       'Mein Wert steht fest, bevor ich irgendetwas leiste.',
//     ],
//     [
//       'Mit mir stimmt etwas nicht.',
//       'Mit mir ist alles in Ordnung – auch mit dem, was ich noch lerne.',
//     ],
//     [
//       'Ich bin nicht wichtig genug, um meine Bedürfnisse an erste Stelle zu setzen.',
//       'Meine Bedürfnisse sind wichtig genug, um an erster Stelle zu stehen.',
//     ],
//   ]),
//   area(
//     'anerkennung',
//     'Anerkennung und Zugehörigkeit',
//     'Die Angst, abgelehnt oder ausgeschlossen zu werden.',
//     6,
//     [
//       ['Ich muss es allen recht machen.', 'Ich darf es auch mir selbst recht machen.'],
//       [
//         'Ich darf niemanden enttäuschen.',
//         'Ich darf andere enttäuschen – sie können damit umgehen.',
//       ],
//       [
//         'Wenn ich mein wahres Ich zeige, werde ich abgelehnt.',
//         'Wenn ich mein wahres Ich zeige, finden mich die Menschen, die zu mir passen.',
//       ],
//       [
//         'Was andere über mich denken, ist wichtiger als das, was ich selbst fühle.',
//         'Was ich selbst fühle, ist wichtiger als das, was andere über mich denken.',
//       ],
//       [
//         'Ich muss mich anpassen, um dazuzugehören.',
//         'Ich gehöre dazu, gerade weil ich bin, wie ich bin.',
//       ],
//     ],
//   ),
//   area(
//     'fehler',
//     'Angst vor Fehlern und Versagen',
//     'Der Wunsch nach Sicherheit verhindert Entwicklung.',
//     11,
//     [
//       ['Ich darf keine Fehler machen.', 'Ich darf Fehler machen – genau so lerne ich.'],
//       [
//         'Wenn ich scheitere, bin ich ein Versager.',
//         'Wenn ich scheitere, habe ich es versucht – und weiß mehr als vorher.',
//       ],
//       [
//         'Ich muss perfekt sein, bevor ich etwas beginne.',
//         'Ich darf anfangen, bevor ich perfekt bin.',
//       ],
//       [
//         'Lieber nichts versuchen, als mich zu blamieren.',
//         'Lieber mich blamieren, als es nie versucht zu haben.',
//       ],
//       [
//         'Ich bin nicht fähig genug, um meine Ziele zu erreichen.',
//         'Ich bin fähig genug für den nächsten Schritt – und den danach.',
//       ],
//     ],
//   ),
//   area(
//     'berufung',
//     'Berufung und Selbstverwirklichung',
//     'Das eigene Leben wird auf später verschoben.',
//     16,
//     [
//       [
//         'Ich kann nicht von dem leben, was ich liebe.',
//         'Ich kann einen Weg finden, von dem zu leben, was ich liebe.',
//       ],
//       [
//         'Arbeit muss anstrengend sein, sonst ist sie nichts wert.',
//         'Arbeit darf leichtfallen und trotzdem viel wert sein.',
//       ],
//       [
//         'Es ist zu spät, noch einmal neu anzufangen.',
//         'Heute ist ein guter Tag, um noch einmal neu anzufangen.',
//       ],
//       [
//         'Meine Träume sind unrealistisch.',
//         'Meine Träume sind realistischer, als ich mir bisher zugestehe.',
//       ],
//       [
//         'Ich muss vernünftig sein, statt meinem Herzen zu folgen.',
//         'Ich darf meinem Herzen folgen – und meinen Verstand mitnehmen.',
//       ],
//     ],
//   ),
//   area(
//     'erfolg',
//     'Erfolg, Geld und Wohlstand',
//     'Unbewusste Überzeugungen über Erfolg und Fülle.',
//     21,
//     [
//       [
//         'Geld macht nicht glücklich.',
//         'Geld kann mir Freiheit schenken – und Freiheit kann mich glücklich machen.',
//       ],
//       ['Ich habe Erfolg und Wohlstand nicht verdient.', 'Ich darf Erfolg und Wohlstand haben.'],
//       [
//         'Wer viel Geld verdient, muss dafür hart arbeiten.',
//         'Geld kann auch leicht zu mir kommen, wenn ich anderen echten Wert bringe.',
//       ],
//       [
//         'Erfolg bedeutet, besser sein zu müssen als andere.',
//         'Erfolg bedeutet, besser zu werden, als ich gestern war.',
//       ],
//       [
//         'Wenn ich erfolgreich werde, verliere ich meine Freiheit oder meine Beziehungen.',
//         'Erfolg kann mir mehr Freiheit und mehr Zeit für meine Menschen geben.',
//       ],
//     ],
//   ),
//   area(
//     'verantwortung',
//     'Verantwortung und Selbstbestimmung',
//     'Das Gefühl, dem Leben ausgeliefert zu sein.',
//     26,
//     [
//       [
//         'Ich kann sowieso nichts ändern.',
//         'Ich kann immer etwas ändern – mindestens meine Haltung.',
//       ],
//       [
//         'Meine Vergangenheit bestimmt, wer ich heute bin.',
//         'Ich bestimme heute, was meine Vergangenheit für mich bedeutet.',
//       ],
//       [
//         'Andere Menschen sind dafür verantwortlich, wie ich mich fühle.',
//         'Ich bin dafür verantwortlich, wie ich mich fühle.',
//       ],
//       ['Ich habe keine Wahl.', 'Ich habe immer eine Wahl – auch wenn mir keine davon gefällt.'],
//       [
//         'Erst wenn sich meine Lebensumstände ändern, kann ich glücklich sein.',
//         'Ich kann glücklich sein, schon bevor sich meine Umstände ändern.',
//       ],
//     ],
//   ),
//   area(
//     'beziehung',
//     'Beziehungen, Liebe und Bindung',
//     'Die Angst, nicht geliebt zu werden oder andere zu verlieren.',
//     31,
//     [
//       [
//         'Ich brauche einen Partner, um vollständig zu sein.',
//         'Ich bin schon vollständig – ein Partner bereichert mein Leben, er ergänzt mich nicht.',
//       ],
//       [
//         'Ich muss mir Liebe verdienen.',
//         'Ich bin es wert, geliebt zu werden, ohne etwas dafür zu tun.',
//       ],
//       [
//         'Wenn ich Grenzen setze, verliere ich Menschen.',
//         'Wenn ich Grenzen setze, bleiben die Menschen, die es gut mit mir meinen.',
//       ],
//       [
//         'Meine Bedürfnisse sind weniger wichtig als die der anderen.',
//         'Meine Bedürfnisse sind genauso wichtig wie die der anderen.',
//       ],
//       [
//         'Wenn mich jemand wirklich liebt, muss er wissen, was ich brauche.',
//         'Wenn ich mich selbst ernst nehme, sage ich, was ich brauche.',
//       ],
//     ],
//   ),
//   area(
//     'kontrolle',
//     'Kontrolle, Sicherheit und Vertrauen',
//     'Die Angst vor Ungewissheit und Kontrollverlust.',
//     36,
//     [
//       [
//         'Ich muss immer alles unter Kontrolle haben.',
//         'Ich darf vertrauen, auch wenn ich nicht alles kontrolliere.',
//       ],
//       ['Ich darf keine Schwäche zeigen.', 'Schwäche zu zeigen, ist eine Form von Stärke.'],
//       ['Ich kann niemandem wirklich vertrauen.', 'Ich kann lernen, wem ich vertrauen kann.'],
//       [
//         'Wenn ich loslasse, geht alles schief.',
//         'Wenn ich loslasse, entsteht Raum für etwas, das ich nicht planen konnte.',
//       ],
//       [
//         'Ich muss erst wissen, wie alles funktioniert, bevor ich anfangen kann.',
//         'Ich lerne, wie es funktioniert, indem ich anfange.',
//       ],
//     ],
//   ),
//   area(
//     'identitaet',
//     'Identität und persönliche Freiheit',
//     'Die unsichtbaren Grenzen des eigenen Selbstbildes.',
//     41,
//     [
//       [
//         'So bin ich eben, und ich kann mich nicht ändern.',
//         'So war ich bisher – und ich kann mich verändern.',
//       ],
//       [
//         'Ich bin zu alt, zu jung oder zu unerfahren.',
//         'Ich bin genau im richtigen Alter für meinen nächsten Schritt.',
//       ],
//       [
//         'Ich darf nicht anders sein als meine Familie oder mein Umfeld.',
//         'Ich darf anders sein als meine Familie – und trotzdem dazugehören.',
//       ],
//       [
//         'Ich bin nicht mutig, kreativ oder intelligent genug.',
//         'Ich bin mutiger, kreativer und klüger, als ich mir bisher zutraue.',
//       ],
//       [
//         'Ich muss so bleiben, wie andere mich kennen.',
//         'Ich darf mich verändern, auch wenn andere mich anders kennen.',
//       ],
//     ],
//   ),
//   area(
//     'glueck',
//     'Glück, Erfüllung und Lebensfreude',
//     'Die Vorstellung, dass Glück erst verdient werden muss.',
//     46,
//     [
//       [
//         'Ich darf erst glücklich sein, wenn alles erledigt ist.',
//         'Ich darf glücklich sein, auch wenn noch nicht alles erledigt ist.',
//       ],
//       [
//         'Ich habe es nicht verdient, einfach glücklich zu sein.',
//         'Ich darf einfach glücklich sein – ohne es mir erst zu verdienen.',
//       ],
//       [
//         'Wenn es mir zu gut geht, passiert bestimmt etwas Schlimmes.',
//         'Wenn es mir gut geht, darf ich es einfach genießen.',
//       ],
//       [
//         'Ich muss erst alle meine Probleme lösen, bevor ich mein Leben genießen kann.',
//         'Ich kann mein Leben genießen, während ich meine Probleme löse.',
//       ],
//       [
//         'Ich bin für das Glück anderer verantwortlich.',
//         'Jeder ist für sein eigenes Glück verantwortlich – ich für meins.',
//       ],
//     ],
//   ),
// ];

export const beliefAreas: BeliefArea[] = [
  area('selbstwert', 'Selbstwert und Selbstliebe', 'Die Angst, nicht gut genug zu sein.', 1, [
    ['Ich bin nicht gut genug.', 'Ich bin gut genug, um meinen nächsten Schritt zu gehen.'],
    ['Ich bin nicht liebenswert, so wie ich bin.', 'Ich darf mich so annehmen, wie ich bin – und mich trotzdem weiterentwickeln.'],
    ['Ich muss etwas leisten, um wertvoll zu sein.', 'Mein Wert hängt nicht davon ab, was ich leiste.'],
    ['Mit mir stimmt etwas nicht.', 'Vielleicht stimmt mehr mit mir, als ich gerade sehen kann.'],
    ['Meine Bedürfnisse sind nicht wichtig genug.', 'Meine Bedürfnisse verdienen es, gehört und berücksichtigt zu werden.'],
  ]),
  area(
    'anerkennung',
    'Anerkennung und Zugehörigkeit',
    'Die Angst, abgelehnt oder ausgeschlossen zu werden.',
    6,
    [
      ['Ich muss es allen recht machen.', 'Ich darf prüfen, was für mich stimmig ist – auch wenn es nicht allen gefällt.'],
      ['Ich darf niemanden enttäuschen.', 'Andere dürfen enttäuscht sein, und ich darf trotzdem zu meiner Entscheidung stehen.'],
      ['Wenn ich mein wahres Ich zeige, werde ich abgelehnt.', 'Wenn ich mich zeige, können andere mich wirklich kennenlernen – und ich kann sehen, wer zu mir passt.'],
      ['Was andere über mich denken, ist wichtiger als das, was ich selbst fühle.', 'Ich kann die Meinung anderer hören und gleichzeitig mein eigenes Erleben ernst nehmen.'],
      ['Ich muss mich anpassen, um dazuzugehören.', 'Ich kann Zugehörigkeit erleben, ohne mich vollständig anzupassen.'],
    ],
  ),
  area(
    'fehler',
    'Angst vor Fehlern und Versagen',
    'Der Wunsch nach Sicherheit verhindert Entwicklung.',
    11,
    [
      ['Ich darf keine Fehler machen.', 'Ich darf Fehler machen und kann aus ihnen lernen.'],
      ['Wenn ich scheitere, bin ich ein Versager.', 'Ein gescheiterter Versuch beschreibt ein Ergebnis – nicht meinen Wert als Mensch.'],
      ['Ich muss perfekt sein, bevor ich etwas beginne.', 'Ich kann unvollkommen anfangen und unterwegs besser werden.'],
      ['Lieber nichts versuchen, als mich zu blamieren.', 'Ich kann die Möglichkeit einer Blamage in Kauf nehmen, wenn mir der Versuch wichtig ist.'],
      ['Ich bin nicht fähig genug, um meine Ziele zu erreichen.', 'Ich kann herausfinden, was mir noch fehlt, und den nächsten machbaren Schritt gehen.'],
    ],
  ),
  area(
    'berufung',
    'Berufung und Selbstverwirklichung',
    'Das eigene Leben wird auf später verschoben.',
    16,
    [
      ['Ich kann nicht von dem leben, was ich liebe.', 'Ich kann erkunden, ob und wie sich mit dem, was ich liebe, ein tragfähiger Weg entwickeln lässt.'],
      ['Arbeit muss anstrengend sein, sonst ist sie nichts wert.', 'Arbeit kann sich leicht anfühlen und trotzdem wertvoll und wirksam sein.'],
      ['Es ist zu spät, noch einmal neu anzufangen.', 'Ich kann heute prüfen, welcher neue Anfang in meiner jetzigen Lebenssituation möglich ist.'],
      ['Meine Träume sind unrealistisch.', 'Ich kann meine Träume ernst nehmen und prüfen, welche konkreten Schritte sie realistischer machen.'],
      ['Ich muss vernünftig sein, statt meinem Herzen zu folgen.', 'Ich kann auf mein Herz hören und meinen Verstand nutzen, um meinen Weg gut zu gestalten.'],
    ],
  ),
  area(
    'erfolg',
    'Erfolg, Geld und Wohlstand',
    'Unbewusste Überzeugungen über Erfolg und Fülle.',
    21,
    [
      ['Geld macht nicht glücklich.', 'Geld allein macht mich nicht glücklich, aber es kann Möglichkeiten schaffen, die mir wichtig sind.'],
      ['Ich habe Erfolg und Wohlstand nicht verdient.', 'Ich darf Erfolg und Wohlstand anstreben und Verantwortung dafür übernehmen, wie ich damit umgehe.'],
      ['Wer viel Geld verdient, muss dafür hart arbeiten.', 'Einkommen kann auch durch gute Ideen, Zusammenarbeit und echten Nutzen entstehen.'],
      ['Erfolg bedeutet, besser sein zu müssen als andere.', 'Erfolg kann bedeuten, meine eigenen Werte zu leben und mich an meinen Fortschritten zu orientieren.'],
      ['Wenn ich erfolgreich werde, verliere ich meine Freiheit oder meine Beziehungen.', 'Ich kann Erfolg so gestalten, dass Freiheit und Beziehungen darin Platz haben.'],
    ],
  ),
  area(
    'verantwortung',
    'Verantwortung und Selbstbestimmung',
    'Das Gefühl, dem Leben ausgeliefert zu sein.',
    26,
    [
      ['Ich kann sowieso nichts ändern.', 'Vielleicht kann ich nicht alles ändern, aber ich kann nach meinem nächsten Einflussbereich suchen.'],
      ['Meine Vergangenheit bestimmt, wer ich heute bin.', 'Meine Vergangenheit gehört zu meiner Geschichte; heute kann ich neue Entscheidungen treffen.'],
      ['Andere Menschen sind dafür verantwortlich, wie ich mich fühle.', 'Andere beeinflussen mein Erleben, und ich kann lernen, wie ich damit umgehe.'],
      ['Ich habe keine Wahl.', 'Auch wenn meine Möglichkeiten begrenzt sind, kann ich prüfen, welche Wahl mir noch bleibt.'],
      ['Erst wenn sich meine Lebensumstände ändern, kann ich glücklich sein.', 'Ich kann schon jetzt Momente von Glück und Verbundenheit erleben, während ich an meinen Umständen arbeite.'],
    ],
  ),
  area(
    'beziehung',
    'Beziehungen, Liebe und Bindung',
    'Die Angst, nicht geliebt zu werden oder andere zu verlieren.',
    31,
    [
      ['Ich brauche einen Partner, um vollständig zu sein.', 'Ich bin ein ganzer Mensch und kann eine Partnerschaft als Bereicherung erleben.'],
      ['Ich muss mir Liebe verdienen.', 'Ich darf Liebe annehmen, ohne sie mir durch Leistung verdienen zu müssen.'],
      ['Wenn ich Grenzen setze, verliere ich Menschen.', 'Grenzen können Beziehungen klären und zeigen, ob wir gut miteinander umgehen können.'],
      ['Meine Bedürfnisse sind weniger wichtig als die der anderen.', 'Meine Bedürfnisse sind wichtig und dürfen neben den Bedürfnissen anderer stehen.'],
      ['Wenn mich jemand wirklich liebt, muss er wissen, was ich brauche.', 'Ich kann aussprechen, was ich brauche, und dem anderen die Möglichkeit geben, darauf zu reagieren.'],
    ],
  ),
  area(
    'kontrolle',
    'Kontrolle, Sicherheit und Vertrauen',
    'Die Angst vor Ungewissheit und Kontrollverlust.',
    36,
    [
      ['Ich muss immer alles unter Kontrolle haben.', 'Ich kann Verantwortung für meinen Einflussbereich übernehmen und manches offenlassen.'],
      ['Ich darf keine Schwäche zeigen.', 'Ich darf zeigen, wo ich Unterstützung brauche, und dabei handlungsfähig bleiben.'],
      ['Ich kann niemandem wirklich vertrauen.', 'Ich kann Vertrauen schrittweise aufbauen und auf die Erfahrungen mit einem Menschen achten.'],
      ['Wenn ich loslasse, geht alles schief.', 'Wenn ich etwas loslasse, kann ich beobachten, was tatsächlich geschieht – und dann reagieren.'],
      ['Ich muss erst wissen, wie alles funktioniert, bevor ich anfangen kann.', 'Ich kann mit dem beginnen, was ich weiß, und den Rest unterwegs lernen.'],
    ],
  ),
  area(
    'identitaet',
    'Identität und persönliche Freiheit',
    'Die unsichtbaren Grenzen des eigenen Selbstbildes.',
    41,
    [
      ['So bin ich eben, und ich kann mich nicht ändern.', 'So habe ich bisher reagiert – und ich kann neue Verhaltensweisen ausprobieren.'],
      ['Ich bin zu alt, zu jung oder zu unerfahren.', 'Mein Alter und meine Erfahrung setzen Rahmenbedingungen, aber sie entscheiden nicht allein über meinen nächsten Schritt.'],
      ['Ich darf nicht anders sein als meine Familie oder mein Umfeld.', 'Ich darf eigene Wege gehen und zugleich mit meiner Familie oder meinem Umfeld verbunden bleiben.'],
      ['Ich bin nicht mutig, kreativ oder intelligent genug.', 'Ich kann Mut, Kreativität und Wissen entwickeln, indem ich sie in kleinen Schritten nutze.'],
      ['Ich muss so bleiben, wie andere mich kennen.', 'Andere kennen frühere Seiten von mir; ich darf mich weiterentwickeln.'],
    ],
  ),
  area(
    'glueck',
    'Glück, Erfüllung und Lebensfreude',
    'Die Vorstellung, dass Glück erst verdient werden muss.',
    46,
    [
      ['Ich darf erst glücklich sein, wenn alles erledigt ist.', 'Ich darf Freude erleben, auch wenn noch Aufgaben offen sind.'],
      ['Ich habe es nicht verdient, einfach glücklich zu sein.', 'Ich darf Glück erleben, ohne es mir erst verdienen zu müssen.'],
      ['Wenn es mir zu gut geht, passiert bestimmt etwas Schlimmes.', 'Ich kann schöne Momente genießen, ohne vorher wissen zu müssen, was als Nächstes passiert.'],
      ['Ich muss erst alle meine Probleme lösen, bevor ich mein Leben genießen kann.', 'Ich kann mein Leben genießen und mich zugleich um meine Probleme kümmern.'],
      ['Ich bin für das Glück anderer verantwortlich.', 'Ich kann andere unterstützen, ohne die Verantwortung für ihr Glück zu übernehmen.'],
    ],
  ),
];

export const allBeliefs = beliefAreas.flatMap((entry) => entry.beliefs);

/** Die fünf Grundüberzeugungen – ein Modell fürs Coaching, keine Rangliste. */
export const coreBeliefs = [
  { text: 'Ich bin nicht gut genug.', theme: 'Selbstwert' },
  { text: 'Ich bin nicht liebenswert.', theme: 'Bindung und Zugehörigkeit' },
  { text: 'Ich bin nicht wichtig.', theme: 'Eigene Bedürfnisse' },
  { text: 'Ich bin machtlos.', theme: 'Selbstwirksamkeit' },
  { text: 'Ich darf nicht ich selbst sein.', theme: 'Identität und Authentizität' },
];

/** Fünf Coaching-Fragen zum Hinterfragen eines Glaubenssatzes. */
export const coachingQuestions = [
  {
    question: 'Woher weißt du eigentlich, dass das wahr ist?',
    purpose: 'Hinterfragt die vermeintliche Gewissheit.',
  },
  {
    question: 'Wer hat dir beigebracht, das über dich zu glauben?',
    purpose: 'Öffnet den Blick auf die Entstehung.',
  },
  {
    question: 'Welchen Preis zahlst du dafür, weiterhin daran festzuhalten?',
    purpose: 'Macht die Konsequenzen bewusst.',
  },
  {
    question: 'Wovor schützt dich dieser Glaubenssatz möglicherweise?',
    purpose: 'Untersucht deine positive Absicht, also deine Schutzfunktion.',
  },
  {
    question: 'Wer könntest du sein, wenn du diesen Gedanken nicht mehr glauben müsstest?',
    purpose: 'Öffnet einen neuen Möglichkeitsraum.',
  },
];
