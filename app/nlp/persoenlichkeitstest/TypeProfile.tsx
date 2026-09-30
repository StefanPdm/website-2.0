import GlassCard from '@/components/GlassCard';
import { MotifAction, MotifInsight, MotifRelation } from '@/app/nlp/components/Motifs';
import { dimensions, results, type Dimension } from '@/app/nlp/persoenlichkeitstest/data';

/**
 * Beschreibung eines Typs: Stärken, Herausforderungen, Entwicklungsimpuls.
 *
 * Gemeinsam genutzt vom Testergebnis (TestClient) und den Typseiten
 * (/nlp/persoenlichkeitstest/<typ>). Ohne Hooks – funktioniert deshalb als
 * Client- wie als Server-Komponente. Die Überschriftenebene ist wählbar, weil
 * sie im Ergebnis unter einem <h2> steht und auf der Typseite unter dem <h1>.
 */

export const MOTIFS: Record<Dimension, (props: { className?: string }) => React.ReactElement> = {
  beziehung: MotifRelation,
  erkennen: MotifInsight,
  handeln: MotifAction,
};

type Level = 'h2' | 'h3';

export default function TypeProfile({
  dimension,
  heading,
  level = 'h3',
  className = 'mt-6',
}: {
  dimension: Dimension;
  /** Standard: die Ergebnis-Überschrift aus data.ts („Dein bevorzugter Bereich …"). */
  heading?: string;
  level?: Level;
  className?: string;
}) {
  const result = results[dimension];
  const Motif = MOTIFS[dimension];
  const Heading = level;
  const SubHeading = level === 'h2' ? 'h3' : 'h4';

  return (
    <GlassCard className={`relative overflow-hidden p-6 sm:p-9 ${className}`}>
      <Motif className='pointer-events-none absolute -right-12 -top-12 h-56 w-56 opacity-[0.10]' />
      <p className='relative text-xs uppercase tracking-[0.25em] text-accent-soft'>
        {dimensions[dimension].type}
      </p>
      <Heading className='relative mt-4 text-xl font-semibold text-(--text) sm:text-2xl'>
        {heading ?? result.headline}
      </Heading>
      <p className='relative mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
        {result.lead}
      </p>

      <div className='relative mt-8 grid gap-8 lg:grid-cols-2'>
        <div>
          <SubHeading className='text-xs uppercase tracking-[0.2em] text-(--muted)'>
            Mögliche Stärken
          </SubHeading>
          <ul className='mt-4 space-y-2'>
            {result.strengths.map((item) => (
              <li
                key={item}
                className='flex items-start gap-3 text-sm text-(--text)'>
                <span
                  aria-hidden='true'
                  className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r from-accent to-accent-2'
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SubHeading className='text-xs uppercase tracking-[0.2em] text-(--muted)'>
            Mögliche Herausforderungen
          </SubHeading>
          <ul className='mt-4 space-y-2'>
            {result.challenges.map((item) => (
              <li
                key={item}
                className='flex items-start gap-3 text-sm text-(--muted)'>
                <span
                  aria-hidden='true'
                  className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/70'
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='relative mt-8 rounded-2xl border-l-2 border-(--accent) bg-(--surface) p-5'>
        <p className='text-xs uppercase tracking-[0.2em] text-accent-soft'>Entwicklungsimpuls</p>
        <p className='mt-3 text-sm leading-relaxed text-(--text) sm:text-base'>{result.impulse}</p>
      </div>
    </GlassCard>
  );
}
