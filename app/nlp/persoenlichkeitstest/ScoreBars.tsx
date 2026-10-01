import { dimensionOrder, dimensions, questions, type Dimension } from '@/app/nlp/persoenlichkeitstest/data';
import { percentage, type Scores } from '@/app/nlp/persoenlichkeitstest/scoring';
import { MOTIFS } from '@/app/nlp/persoenlichkeitstest/TypeProfile';

/**
 * Die drei Ergebnisbalken – gemeinsam genutzt vom Testergebnis (TestClient)
 * und vom geteilten Ergebnis auf der Typseite (SharedResult). Ohne Hooks.
 */
export default function ScoreBars({ scores, top }: { scores: Scores; top?: Dimension }) {
  return (
    <div className='mt-8 grid gap-4 sm:grid-cols-3'>
      {dimensionOrder.map((dimension) => (
        <ScoreBar
          key={dimension}
          dimension={dimension}
          points={scores[dimension]}
          isTop={dimension === top}
        />
      ))}
    </div>
  );
}

/** Balken für einen Bereich — über `scaleX` statt `width` (CLAUDE.md §9). */
function ScoreBar({
  dimension,
  points,
  isTop,
}: {
  dimension: Dimension;
  points: number;
  isTop: boolean;
}) {
  const percent = percentage(points);
  const Motif = MOTIFS[dimension];

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        isTop
          ? 'border-(--accent) bg-(--surface-strong) shadow-[0_0_40px_var(--glow)]'
          : 'border-(--border) bg-(--surface)'
      }`}>
      <div className='flex items-center gap-3'>
        <Motif className='h-9 w-9 shrink-0' />
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold text-(--text)'>
            {dimensions[dimension].area}
          </p>
          <p className='truncate text-xs text-(--muted)'>{dimensions[dimension].type}</p>
        </div>
      </div>
      <div className='mt-4 h-1.5 w-full overflow-hidden rounded-full bg-(--surface-strong)'>
        <div
          aria-hidden='true'
          className='h-full w-full origin-left rounded-full bg-linear-to-r from-accent to-accent-2 transition-transform duration-700 ease-out'
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </div>
      <p className='mt-3 text-xs tabular-nums text-(--muted)'>
        <span className='font-semibold text-(--text)'>{points}</span> von {questions.length}{' '}
        Punkten · {percent} %
      </p>
    </div>
  );
}
