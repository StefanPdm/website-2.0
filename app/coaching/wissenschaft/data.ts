/**
 * Forschungsstand zu NLP-Wirkmechanismen.
 *
 * Grundlage: DVNLP-Whitepaper „Wissenschaftliche Grundlagen wirksamer
 * NLP-Interventionen" (Dipl.-Psych. Martina Schmidt-Tanger, 08/2026).
 *
 * Bewusst **eigene Formulierungen** statt einer Übernahme des Originaltexts:
 * Befunde und Bewertungen sind Tatsachen, die konkrete Ausformulierung ist
 * urheberrechtlich geschützt. Das Original wird verlinkt und – sobald die
 * Datei vorliegt – zum Download angeboten.
 *
 * Beim Aktualisieren: Die Kernaussage darf nicht verrutschen. NLP als
 * geschlossenes Theoriegebäude ist wissenschaftlich **nicht** bestätigt;
 * belegt sind die psychologischen Mechanismen, auf denen viele Interventionen
 * beruhen. Diese Unterscheidung ist der ganze Punkt der Seite.
 */

export const WHITEPAPER = {
  title: 'Wissenschaftliche Grundlagen wirksamer NLP-Interventionen',
  subtitle: 'Empirische Evidenz psychologischer Wirkmechanismen (2016–2026)',
  author: 'Dipl.-Psych. Martina Schmidt-Tanger, Vorsitzende DVNLP',
  published: '08/2026 · 30 Jahre DVNLP',
  publisher: 'DVNLP – Deutscher Verband für Neuro-Linguistisches Programmieren e. V.',
  dvnlpUrl: 'https://www.dvnlp.de/ueber-nlp/nlp',
  /**
   * Erwarteter Ablageort der Original-PDF. Die Seite prüft beim Bauen, ob die
   * Datei existiert, und blendet den Download-Button nur dann ein – so
   * entsteht kein toter Link, wenn sie fehlt.
   */
  pdfPath: '/dokumente/dvnlp-whitepaper-nlp-forschung.pdf',
} as const;

export type Mechanism = {
  /** Begriff aus der NLP-Praxis. */
  nlp: string;
  /** Entsprechung in der psychologischen Forschung. */
  science: string;
  /** Evidenzbewertung des Whitepapers, 1–5. */
  rating: number;
  /** Was der Mechanismus praktisch bewirkt. */
  effect: string;
};

export const mechanisms: Mechanism[] = [
  {
    nlp: 'Reframing',
    science: 'Cognitive Reappraisal',
    rating: 5,
    effect:
      'Eine Situation bewusst neu bewerten verändert die emotionale Reaktion auf sie. Der Effekt gehört zu den am besten replizierten Befunden der affektiven Neurowissenschaft und ist fester Bestandteil der kognitiven Verhaltenstherapie.',
  },
  {
    nlp: 'Perspektivwechsel',
    science: 'Self-Distancing / Perspective Taking',
    rating: 5,
    effect:
      'Aus der Beobachterposition auf das eigene Erleben zu schauen senkt die emotionale Reaktivität messbar. Schon sich selbst beim Namen statt mit „Ich" anzusprechen genügt in Studien für einen nachweisbaren Effekt.',
  },
  {
    nlp: 'Zielarbeit & Future Pace',
    science: 'Goal Setting / Mental Contrasting',
    rating: 5,
    effect:
      'Konkrete Ziele plus die gedankliche Vorwegnahme künftiger Situationen erhöhen die Wahrscheinlichkeit tatsächlicher Verhaltensänderung. Wirksamer als reines positives Visualisieren ist die Kombination aus Zielbild und Hindernisantizipation.',
  },
  {
    nlp: 'Ressourcenaktivierung',
    science: 'Selbstwirksamkeit',
    rating: 5,
    effect:
      'Wer eigene Stärken und frühere Erfolge bewusst abruft, handelt ausdauernder und erfolgreicher. Eigene Erfolgserlebnisse sind dabei die stärkste Quelle – noch vor Ermutigung von außen.',
  },
  {
    nlp: 'Kommunikation & Zuhören',
    science: 'Aktives Zuhören, Feedbackforschung',
    rating: 5,
    effect:
      'Wahrgenommen gutes Zuhören hängt zuverlässig mit Vertrauen, Beziehungsqualität und Leistung zusammen. Kommunikation ist eine trainierbare Kompetenz, keine Begabung.',
  },
  {
    nlp: 'Rapport',
    science: 'Interpersonelle Synchronisation',
    rating: 4,
    effect:
      'Vertrauen entsteht durch Aufmerksamkeit, Empathie und wechselseitige Abstimmung — nicht durch bewusstes Spiegeln von Körperhaltung. Genau hier korrigiert die Forschung eine klassische NLP-Annahme.',
  },
  {
    nlp: 'Sprache, Framing & Metaphern',
    science: 'Framing- und Metaphernforschung',
    rating: 4,
    effect:
      'Sprachliche Rahmung beeinflusst Entscheidungen und Bewertungen zuverlässig, in kleiner bis mittlerer Effektstärke. Metaphern erleichtern nachweislich das Verstehen abstrakter Zusammenhänge.',
  },
  {
    nlp: 'Submodalitäten',
    science: 'Mental Imagery / Imagery Rescripting',
    rating: 4,
    effect:
      'Wie ein inneres Bild beschaffen ist, hängt mit der Stärke der emotionalen Reaktion zusammen. Gut belegt ist das gezielte Verändern belastender Bilder (Imagery Rescripting) – nicht die NLP-Systematik einzelner Submodalitäten.',
  },
  {
    nlp: 'Embodiment',
    science: 'Körper–Geist-Interaktion',
    rating: 4,
    effect:
      'Atmung, Haltung und Bewegung beeinflussen Emotionsregulation und Stressverarbeitung. Am stärksten wirkt die Kombination aus körperlichen und kognitiven Interventionen.',
  },
];

/**
 * Was die Forschung ausdrücklich **nicht** stützt.
 *
 * Gehört sichtbar auf die Seite: Eine Evidenzseite, die nur Bestätigungen
 * zeigt, ist Werbung. Erst die Grenzen machen sie glaubwürdig — und genau
 * solche Einschränkungen greifen Sprachmodelle als belastbare Quelle auf.
 */
export const limitations: string[] = [
  'NLP als geschlossenes Theoriegebäude ist bis heute nicht umfassend empirisch bestätigt.',
  'Die Annahme, Augenbewegungen verrieten das genutzte Sinnessystem, konnte nicht überzeugend belegt werden.',
  'Stabile sensorische Repräsentationssysteme („Visueller Typ", „Auditiver Typ") gelten als nicht bestätigt.',
  'Dass eine bestimmte Submodalität – etwa ein Bild kleiner oder dunkler zu machen – zuverlässig eine bestimmte Wirkung erzeugt, ist nicht belegt; die Effekte sind personen- und kontextabhängig.',
  'Rapport entsteht nicht durch bewusstes Spiegeln von Gestik oder Haltung, sondern durch echte Zuwendung.',
  'Für genuin NLP-spezifische Techniken liegt deutlich weniger und methodisch schwächere Evidenz vor als für kognitiv-verhaltenstherapeutische Verfahren.',
];
