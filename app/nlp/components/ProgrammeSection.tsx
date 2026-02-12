'use client';

import GlassCard from '@/components/GlassCard';
import { SecondaryButton } from '@/app/nlp/components/Buttons';

const programs = [
  {
    title: '1:1 Tiefenwandel',
    featured: true,
    points: [
      'Individuelle Diagnose & Zielklärung',
      'Intensive Prozessarbeit über 6–8 Sessions',
      'Integration in Alltag & Entscheidungen',
      'Begleitende Übungen & Follow-ups',
    ],
    price: 'ab Premium-Paket',
  },
  {
    title: 'Workshop: Sprache, die wirkt',
    featured: false,
    points: [
      'Live-Training in Kleingruppen',
      'Praktische Interventionen für Gespräche',
      'Feedback & Supervision',
    ],
    price: 'ab Gruppen-Format',
  },
  {
    title: 'NLP Essentials (Starter)',
    featured: false,
    points: [
      'Grundlagen für Selbstführung',
      'Werkzeuge für Fokus & Klarheit',
      '3 Sessions + Workbook',
    ],
    price: 'ab Einstieg',
  },
];

export default function ProgrammeSection() {
  return (
    <section
      id='programme'
      className='relative py-20 border-y border-white/20 bg-(--section-bg-accent) flex flex-col justify-center items-center min-h-[70dvh]'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Programme</h2>
          <p className='mt-4 text-base text-white/70 sm:text-lg'>
            Wähle den Pfad, der zu deiner aktuellen Entwicklungsphase passt.
          </p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-3'>
          {programs.map((program) => (
            <GlassCard
              key={program.title}
              className={`flex h-full flex-col p-6 ${
                program.featured
                  ? 'ring-1 ring-(--accent)/35 shadow-[0_0_50px_var(--glow-strong)]'
                  : ''
              }`}>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-white'>{program.title}</h3>
                {program.featured && (
                  <span className='rounded-full bg-(--accent)/15 px-3 py-1 text-xs text-accent'>
                    Premium
                  </span>
                )}
              </div>
              <ul className='mt-5 space-y-3 text-sm text-white/75 flex-1'>
                {program.points.map((point) => (
                  <li
                    key={point}
                    className='flex gap-2'>
                    <span className='text-accent'>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className='mt-6 text-sm text-white/60'>{program.price}</div>
              <SecondaryButton
                href='#kontakt'
                className='mt-6'>
                Details
              </SecondaryButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
