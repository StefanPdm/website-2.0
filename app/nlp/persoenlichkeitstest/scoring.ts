import {
  dimensionOrder,
  questions,
  typeHref,
  type Dimension,
} from '@/app/nlp/persoenlichkeitstest/data';

/**
 * Auswertung getrennt von den Testdaten.
 *
 * Die Regeln stammen 1:1 aus der Vorlage. Entscheidend ist der **Abstand
 * zwischen Platz 1 und Platz 2**, nicht der Spitzenwert allein: Wer 7/6/5
 * erreicht, hat kein ausgeprägtes Profil, sondern drei fast gleich starke
 * Bereiche. Genau davor soll die Formulierung schützen — ein Typenmodell
 * verführt sonst dazu, einen Menschen auf ein Etikett zu reduzieren.
 */

export type Scores = Record<Dimension, number>;

export type Verdict =
  /** Abstand ≥ 4 */
  | 'deutlich'
  /** Abstand 2–3 */
  | 'tendenz'
  /** Abstand 1 */
  | 'leicht'
  /** Abstand 0 zwischen Platz 1 und 2 */
  | 'mischprofil'
  /** alle drei Bereiche gleich */
  | 'ausgeglichen';

export type Evaluation = {
  scores: Scores;
  /** Bereiche absteigend nach Punkten, bei Gleichstand in fester Reihenfolge. */
  ranked: Dimension[];
  gap: number;
  verdict: Verdict;
  answered: number;
};

export function emptyScores(): Scores {
  return { beziehung: 0, erkennen: 0, handeln: 0 };
}

export function evaluate(answers: (Dimension | null)[]): Evaluation {
  const scores = emptyScores();
  let answered = 0;

  for (const answer of answers) {
    if (answer) {
      scores[answer] += 1;
      answered += 1;
    }
  }

  return { scores, answered, ...rank(scores) };
}

/** Rangfolge und Einordnung aus fertigen Punktwerten – auch für geteilte Ergebnisse. */
export function rank(scores: Scores): Pick<Evaluation, 'ranked' | 'gap' | 'verdict'> {
  // Bei Punktgleichstand entscheidet `dimensionOrder`. Das ist willkürlich,
  // aber stabil — die Anzeige darf zwischen zwei Renderings nicht springen.
  const ranked = [...dimensionOrder].sort((a, b) => scores[b] - scores[a]);
  const gap = scores[ranked[0]] - scores[ranked[1]];
  const allEqual = scores[ranked[0]] === scores[ranked[2]];

  let verdict: Verdict;
  if (allEqual) verdict = 'ausgeglichen';
  else if (gap === 0) verdict = 'mischprofil';
  else if (gap === 1) verdict = 'leicht';
  else if (gap <= 3) verdict = 'tendenz';
  else verdict = 'deutlich';

  return { ranked, gap, verdict };
}

/** Anteil an allen Fragen, gerundet. Keine wissenschaftliche Kennzahl. */
export function percentage(points: number): number {
  return Math.round((points / questions.length) * 100);
}

export const verdictLabel: Record<Verdict, string> = {
  deutlich: 'Deutlich ausgeprägte Bevorzugung',
  tendenz: 'Erkennbare Tendenz',
  leicht: 'Leichte Tendenz mit starkem Zweitbereich',
  mischprofil: 'Mischprofil aus zwei Bereichen',
  ausgeglichen: 'Ausgeglichenes Profil',
};

/**
 * Teilen-Link mit Ergebnis: /nlp/persoenlichkeitstest/<typ>?beziehung=22&erkennen=28&handeln=50
 *
 * Im Link stehen nur die drei Prozentwerte – keine einzelnen Antworten. Die
 * Typseite bleibt statisch; die Parameter liest erst der Browser
 * (`SharedResult`), der Canonical zeigt weiter auf die Seite ohne Parameter.
 */
export function shareHref(scores: Scores): string {
  const { ranked } = rank(scores);
  const params = new URLSearchParams(
    dimensionOrder.map((dimension) => [dimension, String(percentage(scores[dimension]))]),
  );
  return `${typeHref(ranked[0])}?${params}`;
}

/**
 * Gegenstück zu `shareHref`. Liefert `null`, wenn die Parameter fehlen oder
 * nicht zu einem echten Ergebnis passen – dann zeigt die Typseite einfach
 * keine Ergebniskarte. Geprüft wird:
 * - jeder Wert ist ein Prozentwert, der aus ganzen Punkten entstehen kann,
 * - die Summe ergibt alle Fragen (der Test lässt keine Frage offen),
 * - der Typ der Seite ist auch der stärkste Bereich (Gleichstand erlaubt).
 */
export function parseShared(search: string, dimension: Dimension): Scores | null {
  const params = new URLSearchParams(search);
  const scores = emptyScores();

  for (const entry of dimensionOrder) {
    const raw = params.get(entry);
    if (raw === null || !/^\d{1,3}$/.test(raw)) return null;
    const points = Math.round((Number(raw) / 100) * questions.length);
    if (percentage(points) !== Number(raw)) return null;
    scores[entry] = points;
  }

  const total = dimensionOrder.reduce((sum, entry) => sum + scores[entry], 0);
  if (total !== questions.length) return null;
  if (dimensionOrder.some((entry) => scores[entry] > scores[dimension])) return null;

  return scores;
}
