'use client';

import GlassCard from '@/components/GlassCard';
import LaserFlow from '@/components/LaserFlow';

type TransformationSectionProps = {
  isWarmTheme: boolean;
};

const steps = [
  'Status Quo klären',
  'Limitierende Muster lösen',
  'Neue Identität verankern',
  'Alltag stabilisieren',
];

export default function TransformationSection({ isWarmTheme }: TransformationSectionProps) {
  return (
    <section className='relative py-20 flex flex-col justify-center items-center min-h-[70dvh] border-y border-[var(--border)]'>
      <div className='container mx-auto px-4'>
        <div className='pointer-events-none absolute inset-0 -z-10 top-0 rotate-180 md:rotate-0 md:bottom-0'>
          <div className='absolute inset-0 opacity-90'>
            <LaserFlow
              color={isWarmTheme ? '#b97029' : '#79d9f5'}
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
          </div>
        </div>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
            Dein Weg zur Transformation
          </h2>
          <p className='mt-4 text-base text-white/70 sm:text-lg'>
            Strukturierte Schritte, die messbare Veränderungen ermöglichen.
          </p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <div
              key={step}
              className='relative'>
              <GlassCard className='h-full p-6'>
                <div className='flex items-center gap-4'>
                  <span className='flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] shadow-[0_0_20px_var(--glow)] ring-1 ring-[var(--border)]'>
                    0{index + 1}
                  </span>
                  <p className='text-sm font-medium text-[var(--text)]'>{step}</p>
                </div>
              </GlassCard>
              {index < steps.length - 1 && (
                <div className='absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-[var(--accent)] to-transparent lg:block' />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
