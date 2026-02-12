'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false });

type HeroSectionProps = {
  isWarmTheme: boolean;
};

export default function HeroSection({ isWarmTheme }: HeroSectionProps) {
  return (
    <section
      id='start'
      className='relative min-h-dvh flex items-center'>
      <div className='container mx-auto px-4 pb-20 pt-20 md:pt-16 lg:pb-32 lg:pt-24 z-10'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <div>
            <p className='text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)]'>
              NLP - Neuro Linguistisches Programmieren
            </p>
            <h1 className='mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl'>
              Meistere deinen Geist.
              <br />
              Ruhe im Körper.
              <br />
              Verändere dein Leben.
            </h1>
            <p className='mt-6 max-w-xl text-base text-white/75 sm:text-lg'>
              Entfalte dein volles Potenzial mit Klarheit, Sprache und innerer Ausrichtung – ohne
              esoterischen Nebel.
            </p>
            <div className='hidden mt-8 md:flex flex-wrap gap-4'>
              <PrimaryButton href='#kontakt'>Jetzt starten</PrimaryButton>
              <SecondaryButton href='#ueber'>Mehr erfahren</SecondaryButton>
            </div>
            <div className='mt-10 flex flex-wrap gap-3'>
              {['1:1 Coaching', 'Workshops', 'Praxisnah & messbar'].map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-white/10 bg-white/20 px-4 py-2 text-xs text-white/80 backdrop-blur'>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className='space-y-6 '>
            <GlassCard className='relative p-0 '>
              <div className='relative overflow-hidden rounded-2xl p-6'>
                <div className='absolute inset-0 rounded-2xl ring-1 ring-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.35)] [clip-path:polygon(6%_2%,100%_0%,96%_100%,0%_98%)]' />
                <div className='relative'>
                  <div className='aspect-square w-full rounded-3xl bg-[radial-gradient(circle_at_top,var(--hero-glow),var(--hero-fade))] p-6'>
                    <div className='relative flex h-full w-full items-end justify-center rounded-3xl border border-white/15 bg-white/5 text-sm text-white/70 overflow-hidden'>
                      <Image
                        src='/images-nlp/nlp-portrait.webp'
                        alt='NLP Coaching'
                        width={990}
                        height={990}
                      />
                    </div>
                    <div className='absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),rgba(0,0,0,0))] blur-xl' />
                  </div>
                </div>
              </div>
            </GlassCard>
            <div className='flex flex-wrap gap-3'>
              <span className='rounded-full border border-white/10 bg-white/20 px-4 py-2 text-xs text-white/75'>
                Ø 90 Min / Session
              </span>
              <span className='rounded-full border border-white/10 bg-white/20 px-4 py-2 text-xs text-white/75'>
                Fokus: Identität & Entscheidungen
              </span>
            </div>
          </div>
        </div>
      </div>
      {isWarmTheme ? (
        <div className='absolute inset-0 -z-10 bg-[#ff9e13c7]'>
          <FloatingLines
            linesGradient={['#f1c38a', '#fff']}
            animationSpeed={0.4}
            interactive
            bendRadius={15}
            bendStrength={1.2}
            mouseDamping={0.01}
            topWavePosition={{ x: 10, y: 0.6, rotate: -0.35 }}
            middleWavePosition={{ x: 5, y: 0.0, rotate: 0.2 }}
            parallax={false}
            parallaxStrength={0}
          />
        </div>
      ) : (
        <div className='absolute inset-0 -z-10'>
          <FloatingLines
            linesGradient={['#050b12', '#47f5d8']}
            animationSpeed={0.4}
            interactive
            bendRadius={15}
            bendStrength={1.2}
            mouseDamping={0.01}
            topWavePosition={{ x: 10, y: 0.6, rotate: -0.35 }}
            middleWavePosition={{ x: 5, y: 0.0, rotate: 0.2 }}
            parallax={false}
            parallaxStrength={0}
          />
        </div>
      )}
    </section>
  );
}
