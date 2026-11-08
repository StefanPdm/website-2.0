import type { CSSProperties } from 'react';

import BreathRings from '@/app/coaching/components/BreathRings';
import { PrimaryButton } from '@/app/coaching/components/Buttons';

/**
 * Teaser Partnerschaftstest (seit 2026-11) – führt zu den 5 Fragen unter
 * /coaching/partnerschaftstest. Hell mit Akzentgrund: davor die dunkle
 * Glaubenssatz-Insel, danach der Ablauf (ebenfalls dunkel).
 *
 * Bühne rechts: „Lebens-“ mit zwei Endungen, die sich abwechseln
 * (`.word-flip`, nur opacity/transform) – Partner oder Lektion.
 */
const points = [
  'Trägt dich dein Zuhause, wenn es im Business stürmt?',
  'Gibt dir deine Beziehung Kraft – oder kostet sie welche?',
  'Fünf Fragen, ehrlich beantwortet. Die Antwort spürst du dann selbst.',
];

const steps = [1, 2, 3, 4, 5];

export default function PartnerTeaserSection() {
  return (
    <section
      id='partnerschaft'
      className='relative flex min-h-[70dvh] flex-col justify-center overflow-hidden bg-(--section-bg-accent) py-20'>
      <div className='container relative mx-auto px-4'>
        <div className='mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16'>
          <div className='text-center lg:text-left'>
            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Partnerschaftstest</p>
            <h2 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
              Lebenspartner – oder die nächste Lebenslektion?
            </h2>
            <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
              Gerade im Business brauchst du jemanden zu Hause, der dich unterstützt und dir Kraft
              gibt. Mit fünf Fragen findest du heraus, ob du diesen Menschen an deiner Seite hast.
            </p>
            <ul className='mx-auto mt-8 max-w-md space-y-3 text-left lg:mx-0'>
              {points.map((point) => (
                <li
                  key={point}
                  className='flex items-start gap-3'>
                  <span
                    aria-hidden='true'
                    className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
                  />
                  <span className='text-sm leading-relaxed text-(--muted) sm:text-base'>{point}</span>
                </li>
              ))}
            </ul>
            <div className='mt-10 flex flex-col items-center gap-3 lg:items-start'>
              <PrimaryButton
                href='/coaching/partnerschaftstest'
                className='w-full sm:w-auto'>
                Zu den 5 Fragen
              </PrimaryButton>
              <p className='text-xs text-(--subtle)'>Selbsttest · kostenlos</p>
            </div>
          </div>

          {/* Bühne – rein dekorativ */}
          <div
            aria-hidden='true'
            className='relative order-first mx-auto flex aspect-square w-full max-w-[16rem] items-center justify-center sm:max-w-sm lg:max-w-md lg:order-none'>
            <BreathRings className='left-1/2 top-1/2 w-[130%] -translate-x-1/2 -translate-y-1/2' />
            <div className='relative flex aspect-square w-[78%] flex-col items-center justify-center rounded-full border border-card-border bg-surface-strong shadow-[0_30px_80px_var(--card-shade),0_0_60px_var(--glow)]'>
              <p className='text-3xl font-semibold tracking-tight text-(--text) sm:text-4xl'>Lebens</p>
              <p className='word-flip mt-1 text-3xl font-semibold tracking-tight sm:text-4xl'>
                <span className='word-flip__a'>partner</span>
                <span className='word-flip__b'>lektion</span>
              </p>
              <ol className='mt-8 flex items-center gap-2'>
                {steps.map((step) => (
                  <li
                    key={step}
                    className='partner-step flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-xs font-semibold text-(--muted)'
                    style={{ '--delay': `${step * 0.6}s` } as CSSProperties}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
