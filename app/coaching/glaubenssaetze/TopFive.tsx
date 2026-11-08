import { Award, Medal, Trophy } from 'lucide-react';

import { allBeliefs, coreBeliefs } from '@/app/coaching/glaubenssaetze/data';

/**
 * „Top 5 der beliebtesten Glaubenssätze“ – die fünf Grundüberzeugungen als
 * Siegertreppchen (Platz 1–3) plus Platz 4 und 5 darunter. Augenzwinkernd:
 * Die Reihenfolge ist ein Modell aus der Coaching-Praxis, keine Statistik –
 * das steht auch sichtbar darunter (§10).
 */

/** Treppchen-Reihenfolge am Desktop: 2 – 1 – 3. Höhe der Stufe je Platz. */
const podium = [
  { rank: 2, step: 'lg:h-28', order: 'lg:order-1' },
  { rank: 1, step: 'lg:h-40', order: 'order-first lg:order-2' },
  { rank: 3, step: 'lg:h-20', order: 'lg:order-3' },
];

export default function TopFive() {
  return (
    <section className='relative overflow-hidden border-y border-border bg-(--section-bg-accent) px-4 py-16 sm:py-20'>
      <div className='container mx-auto max-w-5xl'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Das Ranking</p>
          <h2 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl lg:text-4xl'>
            Die Top 5 der beliebtesten Glaubenssätze
          </h2>
          <p className='mt-4 text-base leading-relaxed text-(--muted)'>
            Die Klassiker unter den Grundüberzeugungen. Hinter vielen der {allBeliefs.length} Sätze
            steckt einer dieser fünf.
          </p>
        </div>

        {/* Treppchen */}
        <ol className='mt-14 grid gap-6 lg:grid-cols-3 lg:items-end lg:gap-4'>
          {podium.map(({ rank, step, order }) => {
            const core = coreBeliefs[rank - 1];
            const first = rank === 1;
            const Icon = first ? Trophy : Medal;
            return (
              <li
                key={rank}
                className={`flex flex-col ${order}`}>
                <div
                  className={`relative flex flex-col items-center rounded-t-2xl border border-b-0 border-card-border px-5 pb-6 pt-7 text-center ${
                    first
                      ? 'bg-surface-strong shadow-[0_0_60px_var(--glow-strong)]'
                      : 'bg-surface-strong'
                  }`}>
                  <span
                    aria-hidden='true'
                    className={`flex items-center justify-center rounded-full ${
                      first
                        ? 'h-16 w-16 bg-linear-to-br from-(--accent) to-(--accent-2) text-(--button-text) shadow-[0_0_30px_var(--glow-strong)]'
                        : 'h-12 w-12 bg-surface text-accent ring-1 ring-border-strong'
                    }`}>
                    <Icon className={first ? 'h-8 w-8' : 'h-6 w-6'} />
                  </span>
                  <p
                    className={`mt-5 font-semibold leading-snug text-(--text) ${
                      first ? 'text-xl sm:text-2xl' : 'text-lg'
                    }`}>
                    „{core.text}“
                  </p>
                  <p className='mt-3 text-xs uppercase tracking-[0.15em] text-(--subtle)'>
                    {core.theme}
                  </p>
                </div>
                {/* Stufe mit Platzziffer */}
                <div
                  className={`flex h-14 items-center justify-center rounded-b-2xl lg:rounded-b-none lg:rounded-t-none ${step} ${
                    first
                      ? 'bg-linear-to-b from-(--accent) to-(--accent-2) text-(--button-text)'
                      : 'border border-card-border bg-surface text-accent'
                  }`}>
                  <span className='text-3xl font-semibold lg:text-5xl'>
                    <span className='sr-only'>Platz </span>
                    {rank}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
        {/* Boden des Treppchens */}
        <div
          aria-hidden='true'
          className='hidden h-1.5 rounded-full bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-60 lg:block'
        />

        {/* Platz 4 und 5 */}
        <ol
          start={4}
          className='mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2'>
          {coreBeliefs.slice(3).map((core, index) => (
            <li
              key={core.text}
              className='flex items-center gap-4 rounded-2xl border border-card-border bg-surface-strong p-5'>
              <span
                aria-hidden='true'
                className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-border-strong'>
                <Award className='h-5 w-5' />
              </span>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft'>
                  Platz {index + 4}
                </p>
                <p className='mt-1 text-base font-semibold leading-snug text-(--text)'>
                  „{core.text}“
                </p>
                <p className='mt-1 text-xs uppercase tracking-[0.15em] text-(--subtle)'>
                  {core.theme}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className='mx-auto mt-10 max-w-2xl text-center text-sm text-(--subtle)'>
          Mit einem Augenzwinkern: Die Reihenfolge stammt aus keiner Studie. Sie ist ein Modell aus
          der Coaching-Praxis, um die Grundüberzeugung hinter einem Verhaltensmuster zu finden.
        </p>
      </div>
    </section>
  );
}
