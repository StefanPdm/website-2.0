import type { ReactNode } from 'react';

import BreathRings from '@/app/coaching/components/BreathRings';

type QuoteSectionProps = {
  /** Für Screenreader: Name der Region, z. B. „Gedanke zur Karriere“. */
  label: string;
  /** Großer Satz in Fraunces kursiv; Hervorhebung per <Mark>. */
  quote: ReactNode;
  /** Optionaler zweiter, kleinerer Satz darunter. */
  follow?: ReactNode;
  /** Zuschreibung – leer lassen, wenn der Satz kein belegbares Zitat ist. */
  caption?: string;
  /** Lage der Atem-Ringe, damit zwei Bänder nicht gleich aussehen. */
  rings?: 'center' | 'left';
};

/** Hervorgehobener Teil eines Zitats (Bernstein). */
export function Mark({ children }: { children: ReactNode }) {
  return <span className='text-accent-soft'>{children}</span>;
}

/**
 * Zitat-Band (dunkle Insel, §3.2). Die Atem-Ringe mit dem weichen Lichthof sind
 * das Motiv der Coaching-Hälfte der Startseite.
 *
 * Inhalte: nur eigene Sätze oder Sätze mit geprüfter Herkunft. Fremde Zitate
 * mit Wortlaut + Quelle, Abwandlungen ohne fremden Namen darunter (§10).
 */
export default function QuoteSection({
  label,
  quote,
  follow,
  caption,
  rings = 'center',
}: QuoteSectionProps) {
  const ringPos =
    rings === 'left' ? 'left-[12%] top-1/2 -translate-x-1/2' : 'left-1/2 top-1/2 -translate-x-1/2';

  return (
    <section
      aria-label={label}
      className='tone-dark relative overflow-hidden border-y border-border py-24 sm:py-32'>
      <BreathRings className={`${ringPos} w-[min(900px,160vw)] -translate-y-1/2 opacity-70`} />
      <span
        aria-hidden='true'
        className={`quote-sun pointer-events-none absolute ${ringPos} h-24 w-24 -translate-y-1/2 rounded-full sm:h-28 sm:w-28`}
      />

      <figure className='container relative mx-auto max-w-4xl px-4 text-center'>
        <blockquote className='font-serif font-light italic text-(--text) text-balance'>
          <p className='text-3xl leading-snug sm:text-4xl lg:text-5xl'>{quote}</p>
          {follow && (
            <p className='mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-(--muted) sm:text-2xl'>
              {follow}
            </p>
          )}
        </blockquote>
        {caption && (
          <figcaption className='mt-8 text-xs uppercase tracking-[0.3em] text-(--subtle)'>
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
