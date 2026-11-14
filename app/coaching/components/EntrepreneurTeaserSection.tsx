import { PrimaryButton } from '@/app/coaching/components/Buttons';
import LightField from '@/app/coaching/components/LightField';

/**
 * Teaser Schwerpunkt Unternehmer (2026-11-14) – dunkle Insel zwischen Ansatz
 * (hell) und Themen (hell), führt zu /coaching/unternehmer.
 *
 * Seit der Öffnung der Marke ist „Unternehmer“ Herkunft und Schwerpunkt statt
 * Filter. Diese Sektion ist der sichtbare Weg dorthin – der Onepager bleibt
 * für alle, die viel tragen.
 *
 * Kennzahlen wie in AboutSection (belegt, §10).
 */
const facts = [
  { value: '20+', label: 'Jahre Unternehmer' },
  { value: '3', label: 'Filialen, großes Team' },
  { value: '2', label: 'Städte: Berlin & Hamburg' },
];

export default function EntrepreneurTeaserSection() {
  return (
    <section
      id='unternehmer'
      className='tone-dark relative overflow-hidden border-y border-border py-20 sm:py-28'>
      <LightField
        variant='orbit'
        className='-right-44 -bottom-52 w-[420px] opacity-50 lg:bottom-auto lg:right-[4%] lg:top-1/2 lg:w-[620px] lg:-translate-y-1/2 lg:opacity-90'
      />
      <LightField
        variant='dust'
        className='inset-0'
      />

      <div className='container relative mx-auto px-4'>
        <div className='max-w-2xl'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Schwerpunkt Unternehmer
          </p>
          <h2 className='mt-5 text-3xl font-semibold text-(--text) sm:text-4xl'>
            Du bist selbst Unternehmer?
          </h2>
          <p className='mt-5 text-base leading-relaxed text-(--muted) sm:text-lg'>
            Dann musst du mir nicht erklären, was ein schlechter Monat mit dem Schlaf macht. Ich
            habe 20 Jahre selbst ein Unternehmen geführt. Allein an der Spitze, Firma und Familie,
            Entscheidungen mit Tragweite – das kenne ich von innen.
          </p>

          <dl className='mt-10 grid max-w-lg grid-cols-3 gap-4'>
            {facts.map((fact) => (
              <div
                key={fact.label}
                className='flex flex-col border-l border-border-strong pl-4'>
                <dt className='text-xs leading-snug text-(--subtle)'>{fact.label}</dt>
                <dd className='order-first text-3xl font-semibold text-accent sm:text-4xl'>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className='mt-10'>
            <PrimaryButton
              href='/coaching/unternehmer'
              className='w-full sm:w-auto'>
              Coaching für Unternehmer
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
