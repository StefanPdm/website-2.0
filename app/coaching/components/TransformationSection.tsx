'use client';

import dynamic from 'next/dynamic';

import GlassCard from '@/components/GlassCard';
import LazyEffect from '@/components/LazyEffect';

// Dynamisch statt statisch (CLAUDE.md §9): three.js lädt erst, wenn LazyEffect es freigibt.
const LaserFlow = dynamic(() => import('@/components/LaserFlow'), { ssr: false });

/** Ablauf aus Klientensicht – beginnt bewusst beim kostenlosen Erstgespräch. */
const steps = [
  {
    title: 'Erstgespräch',
    text: 'Wir klären dein Anliegen und ob es zwischen uns passt. Kostenlos und unverbindlich.',
  },
  {
    title: 'Klarheit',
    text: 'Wo stehst du, was hält dich fest, wohin willst du? Erst das Bild, dann der Weg.',
  },
  {
    title: 'Veränderung',
    text: 'Muster lösen, Haltung stärken, Entscheidungen treffen – mit den Werkzeugen aus vier Schulen.',
  },
  {
    title: 'Alltag',
    text: 'Neue Routinen verankern, bis sie ohne Anstrengung tragen. Auch im Trubel des Unternehmens.',
  },
];

export default function TransformationSection() {
  return (
    <section
      id='ablauf'
      className='relative flex min-h-[70dvh] flex-col items-center justify-center border-y border-border py-20'>
      <div className='container mx-auto px-4'>
        <div className='pointer-events-none absolute inset-0 -z-10 top-0 rotate-180 md:rotate-0 md:bottom-0'>
          <div className='absolute inset-0 opacity-90'>
            {/* Großer Vorlauf: three.js lädt und der Strahl blendet auf, bevor die
                Sektion im Bild ist – mit 300 px stand er erst nach Sekunden. */}
            <LazyEffect
              className='h-full w-full'
              minWidth={0}
              rootMargin='1400px 0px'>
              <LaserFlow
                color='#f6b35a'
                wispDensity={1}
                flowSpeed={0.35}
                verticalSizing={1.2}
                horizontalSizing={0.5}
                fogIntensity={0.45}
                fogScale={0.3}
                wispSpeed={15}
                wispIntensity={5}
                flowStrength={0.25}
                decay={1.1}
                horizontalBeamOffset={0}
                verticalBeamOffset={-0.5}
                falloffStart={0.85}
              />
            </LazyEffect>
          </div>
        </div>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-(--text) sm:text-4xl'>So läuft dein Coaching</h2>
          <p className='mt-4 text-base text-(--muted) sm:text-lg'>
            Vier Schritte. Vom ersten Gespräch bis in deinen Alltag.
          </p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className='relative'>
              <GlassCard className='h-full p-6'>
                <div className='flex items-center gap-4'>
                  <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-accent-soft shadow-[0_0_20px_var(--glow)] ring-1 ring-border'>
                    0{index + 1}
                  </span>
                  <h3 className='text-lg font-semibold text-(--text)'>{step.title}</h3>
                </div>
                <p className='mt-4 text-sm leading-relaxed text-(--muted)'>{step.text}</p>
              </GlassCard>
              {index < steps.length - 1 && (
                <>
                  <div className='absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-[var(--accent)] to-transparent lg:block' />
                  <div className='absolute bottom-0 left-0 h-6 w-px translate-x-12 translate-y-full bg-gradient-to-b from-[var(--accent)] to-transparent lg:hidden' />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
