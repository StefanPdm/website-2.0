'use client';

import GlassCard from '@/components/GlassCard';
import { SecondaryButton } from '@/app/nlp/components/Buttons';

const events = [
  { title: 'Fortgeschrittene NLP-Techniken', date: '16–17. Juni', place: 'Berlin / Online' },
  { title: 'NLP Mastery', date: '8–10. Juli', place: 'Hamburg / Online' },
  { title: 'Durchbruch Bootcamp', date: '5–7. August', place: 'München / Online' },
];

export default function WorkshopsSection() {
  return (
    <section
      id='workshops'
      className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] backdrop-blur-2xl bg-[var(--section-bg-accent)]'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
            Bevorstehende Workshops & Seminare
          </h2>
          <p className='mt-4 text-base text-white/70 sm:text-lg'>
            Live-Formate für tiefere Praxis und direkte Umsetzung.
          </p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-3'>
          {events.map((event) => (
            <GlassCard
              key={event.title}
              className='p-6'>
              <h3 className='text-lg font-semibold text-white'>{event.title}</h3>
              <p className='mt-3 text-sm text-white/70'>{event.date}</p>
              <p className='text-xs text-white/50'>{event.place}</p>
              <SecondaryButton
                href='#kontakt'
                className='mt-6 w-full'>
                Platz reservieren
              </SecondaryButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
