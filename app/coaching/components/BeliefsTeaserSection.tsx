import type { CSSProperties } from 'react';

import { PrimaryButton } from '@/app/coaching/components/Buttons';
import { allBeliefs, beliefAreas } from '@/app/coaching/glaubenssaetze/data';

/**
 * Teaser Glaubenssätze (seit 2026-11) – dunkle Insel, führt zur Satz-Wand
 * unter /coaching/glaubenssaetze. Davor „Wobei dir Coaching hilft“ (hell),
 * danach der Partnerschafts-Teaser (hell) – nie zwei dunkle hintereinander.
 *
 * Hintergrund: drei Reihen echter Sätze aus der Wand, die langsam vorbeiziehen
 * (`.belief-drift`, nur transform). Einige leuchten – wie angetippt.
 *
 * Die 85 % sind eine bewusste Entscheidung des Betreibers (2026-11-08) und
 * nicht belegt – darum nur hier als Aufhänger, nie in llms.txt, FAQ oder JSON-LD.
 */
const rows = [0, 1, 2].map((row) =>
  allBeliefs
    .filter((_, index) => index % 3 === row)
    .slice(0, 12)
    .map((belief, index) => ({ ...belief, lit: (index + row) % 5 === 1 })),
);

const facts = [
  `${allBeliefs.length} Sätze`,
  `${beliefAreas.length} Lebensbereiche`,
  'Auswertung sofort',
];

function DriftRow({ row, index }: { row: (typeof rows)[number]; index: number }) {
  // Doppelt rendern, damit die Schleife bei −50 % nahtlos weiterläuft
  const items = [...row, ...row];
  return (
    <div
      className='belief-drift'
      style={{ '--drift': `${70 + index * 18}s`, '--dir': index % 2 ? 'reverse' : 'normal' } as CSSProperties}>
      {items.map((belief, i) => (
        <span
          key={`${belief.id}-${i}`}
          className={`belief-drift__item ${belief.lit ? 'is-lit' : ''}`}>
          „{belief.text}“
        </span>
      ))}
    </div>
  );
}

export default function BeliefsTeaserSection() {
  return (
    <section
      id='glaubenssaetze'
      className='tone-dark relative flex min-h-[80dvh] flex-col justify-center overflow-hidden border-y border-border py-16 sm:py-20'>
      <div
        aria-hidden='true'
        className='belief-drift-mask pointer-events-none absolute inset-x-0 top-8 space-y-4'>
        <DriftRow
          row={rows[0]}
          index={0}
        />
        <DriftRow
          row={rows[1]}
          index={1}
        />
      </div>
      <div
        aria-hidden='true'
        className='belief-drift-mask pointer-events-none absolute inset-x-0 bottom-8'>
        <DriftRow
          row={rows[2]}
          index={2}
        />
      </div>
      {/* Lichthof hinter der Überschrift, damit der Text vor den Reihen ruhig steht */}
      <span
        aria-hidden='true'
        className='belief-halo pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[min(900px,140vw)] -translate-x-1/2 -translate-y-1/2'
      />

      <div className='container relative mx-auto px-4 py-24'>
        <div className='mx-auto max-w-4xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Glaubenssätze herausfinden
          </p>
          <h2 className='mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-(--text) text-balance sm:text-5xl lg:text-6xl'>
            „<span className='text-accent'>85 %</span> deiner Glaubenssätze sind{' '}
            <span className='belief-lie'>nichts als Lügen</span>.“
          </h2>
          <p className='mx-auto mt-8 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
            Die meisten hast du irgendwann übernommen – von Eltern, Lehrern, dem ersten Chef.
            Seitdem entscheiden sie mit, ohne dass du sie je geprüft hast. Finde heraus, welche
            Sätze in dir laufen.
          </p>

          <div className='mt-10 flex flex-col items-center gap-5'>
            <PrimaryButton
              href='/coaching/glaubenssaetze'
              className='w-full sm:w-auto'>
              Meine Glaubenssätze aufdecken
            </PrimaryButton>
            <ul className='flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-(--subtle)'>
              {facts.map((fact) => (
                <li
                  key={fact}
                  className='flex items-center gap-2'>
                  <span
                    aria-hidden='true'
                    className='h-1 w-1 rounded-full bg-accent'
                  />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
