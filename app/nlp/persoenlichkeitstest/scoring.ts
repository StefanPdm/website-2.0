import { dimensionOrder, questions, type Dimension } from '@/app/nlp/persoenlichkeitstest/data';

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

  return { scores, ranked, gap, verdict, answered };
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
