import Image from 'next/image';

import AiBadge from '@/app/coaching/components/AiBadge';
import { PrimaryButton } from '@/app/coaching/components/Buttons';
import LightField from '@/app/coaching/components/LightField';

/**
 * Teaser Schwerpunkt eigene Firma (2026-11-14) – dunkle Insel zwischen Ansatz
 * (hell) und Themen (hell), führt zu /coaching/unternehmer.
 *
 * Seit der Öffnung der Marke ist „Unternehmer“ Herkunft und Schwerpunkt statt
 * Filter. Diese Sektion ist der sichtbare Weg dorthin – der Onepager bleibt
 * für alle, die viel tragen.
 *
 * Bild bewusst eine Unternehmerin (KI-Bild): Der Hero zeigt Stefan mit einem
 * Klienten – hier soll sichtbar werden, dass das Angebot Frauen genauso gilt.
 * Ansprache darum neutral („eigene Firma“).
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
        className='-left-60 -bottom-64 w-[520px] opacity-60'
      />
      <LightField
        variant='dust'
        className='inset-0'
      />

      <div className='container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Schwerpunkt eigene Firma
          </p>
          <h2 className='mt-5 text-3xl font-semibold text-(--text) sm:text-4xl'>
            Du führst ein eigenes Unternehmen?
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
              Mehr zum Schwerpunkt
            </PrimaryButton>
          </div>
        </div>

        <div className='relative aspect-16/10 overflow-hidden rounded-3xl border border-card-border shadow-[0_30px_80px_-40px_var(--card-shade)]'>
          <Image
            src='/images-nlp/unternehmerin-tisch.webp'
            alt='Eine Unternehmerin sitzt nachdenklich an einem runden Tisch im warmen Abendlicht'
            fill
            sizes='(min-width: 1024px) 600px, 100vw'
            className='object-cover object-[75%_center]'
          />
          <AiBadge className='top-3 right-3' />
        </div>
      </div>
    </section>
  );
}
