import type { FaqEntry } from '@/app/nlp/faq';

/**
 * FAQ von Welt B.
 *
 * Wortlaut aus dem ausgefüllten Fragenkatalog. Erster Satz beantwortet jeweils
 * die Frage — das ist der Satz, den Google-Snippets und Sprachmodelle zitieren.
 *
 * Wird von der FAQ-Sektion und vom `FAQPage`-Schema gelesen.
 */
export const faqWeb: FaqEntry[] = [
  {
    question: 'Was kostet eine Website bei dir?',
    answer:
      'Der Preis einer Website richtet sich nach Ziel, Umfang und technischer Komplexität; nach einem Briefing erhältst du eine klare Aufwandsschätzung oder ein Festpreisangebot. Mein regulärer Entwicklungs- und Beratungssatz beträgt 190 € pro Stunde zzgl. MwSt., sofern wir nichts anderes vereinbaren. So bezahlst du nicht nur Seiten und Funktionen, sondern eine Lösung, die Strategie, Nutzerführung, Technik und Sichtbarkeit zusammenführt.',
  },
  {
    question: 'Wie lange dauert ein Projekt?',
    answer:
      'Eine kompakte Unternehmenswebsite kann meist innerhalb weniger Wochen entstehen, während Shops, Portale oder individuelle Anwendungen mehr Zeit benötigen. Der konkrete Zeitplan hängt vor allem von Umfang, Entscheidungswegen und der rechtzeitigen Lieferung von Texten, Bildern und Zugängen ab. Vor dem Start bekommst du einen realistischen Ablauf mit Meilensteinen statt eines schnellen Versprechens, das später nicht hält.',
  },
  {
    question: 'Kann ich die Website danach selbst pflegen?',
    answer:
      'Ja, ich baue die Website so, dass du vereinbarte Inhalte anschließend selbst pflegen kannst. Bei WordPress betrifft das zum Beispiel Texte, Bilder, Beiträge und Produkte; bei individuellen Anwendungen richten wir die passenden Verwaltungsoberflächen ein. Auf Wunsch bekommst du eine persönliche Einweisung oder eine kurze Dokumentation für die wichtigsten Abläufe.',
  },
  {
    question: 'Was passiert nach dem Launch – machst du Wartung?',
    answer:
      'Ja, nach dem Launch kann ich Updates, Backups, Sicherheit, technische Kontrolle und Weiterentwicklung übernehmen. Der genaue Wartungsumfang richtet sich nach deinem System und wird transparent vereinbart. Du kannst die Betreuung dauerhaft buchen oder einzelne Weiterentwicklungen nach Bedarf beauftragen.',
  },
  {
    question: 'Arbeitest du mit WordPress oder mit Next.js – und warum?',
    answer:
      'Ich arbeite sowohl mit WordPress als auch mit Next.js und wähle die Technik nach deinem tatsächlichen Bedarf. WordPress eignet sich oft für flexibel pflegbare Unternehmensseiten und Shops; Next.js ist stark bei individuellen, performanten Anwendungen, Portalen und komplexen Prozessen. Nicht die modernste Technik gewinnt, sondern die Lösung, die zu deinen Zielen, deinem Budget und deiner späteren Pflege passt.',
  },
  {
    question: 'Übernimmst du auch bestehende Projekte von anderen Entwicklern?',
    answer:
      'Ja, ich übernehme bestehende Websites und Anwendungen, wenn der technische Zustand eine verantwortbare Weiterarbeit erlaubt. Vorher prüfe ich Code, Plugins, Hosting, Sicherheit, Dokumentation und offene Abhängigkeiten. Danach bekommst du eine klare Einschätzung: weiterentwickeln, gezielt sanieren oder sauber neu aufsetzen.',
  },
  {
    question: 'Gehört die Website danach mir? Wem gehört der Code?',
    answer:
      'Nach vollständiger Bezahlung erhältst du die im Angebot vereinbarten Nutzungsrechte und die vereinbarten Projektdateien beziehungsweise Zugänge. Rechte an Drittanbieter-Software, Themes, Plugins, Schriften, Bildern und Open-Source-Komponenten richten sich weiterhin nach deren jeweiligen Lizenzen. Was genau übergeben wird und welche laufenden Lizenzen bestehen, halten wir vor Projektstart transparent fest.',
  },
  {
    question: 'Machst du auch Texte, Fotos und Logo?',
    answer:
      'Ja, ich kann Konzeption und Website-Texte übernehmen sowie Foto-, Video- und Logo-Leistungen koordinieren. Je nach Anspruch arbeite ich dabei mit spezialisierten Partnern oder geeigneten KI-Werkzeugen und kennzeichne den Einsatz transparent, wo es erforderlich oder sinnvoll ist. Du erhältst damit auf Wunsch eine stimmige Gesamtlösung statt einzelner Bausteine ohne gemeinsame Richtung.',
  },
  {
    question: 'Arbeitest du auch für Kunden außerhalb von Potsdam und Berlin?',
    answer:
      'Ja, ich arbeite deutschlandweit und ortsunabhängig mit Kunden zusammen. Briefings, Abstimmungen und Präsentationen funktionieren zuverlässig per Video; für Workshops oder wichtige Projektphasen sind nach Vereinbarung auch Vor-Ort-Termine möglich. Entscheidend ist nicht die Entfernung, sondern eine klare Kommunikation und verlässliche Zusammenarbeit.',
  },
  {
    question: 'Was brauchst du von mir, damit wir starten können?',
    answer:
      'Zum Start brauche ich dein Ziel, deine wichtigsten Zielgruppen, den gewünschten Umfang und einen verantwortlichen Ansprechpartner. Hilfreich sind vorhandene Texte, Bilder, Markenunterlagen, Zugänge sowie Beispiele dafür, was dir gefällt oder nicht gefällt. Wenn noch nicht alles vorhanden ist, strukturieren wir die offenen Punkte gemeinsam im Erstgespräch.',
  },
];
