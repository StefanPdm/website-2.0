'use client';

import GlassCard from '@/components/GlassCard';

const testimonials = [
  {
    name: 'Lena K.',
    text: 'Weniger Grübeln, mehr Handlungsfokus. Die Sessions haben mir geholfen, Entscheidungen schneller zu treffen.',
  },
  {
    name: 'Daniel M.',
    text: 'Ich kann klarer Nein sagen, ohne Schuldgefühl. Besonders die Sprachmuster-Übungen waren extrem hilfreich.',
  },
  {
    name: 'Mira S.',
    text: 'Meine Gespräche im Team sind strukturierter. Ich erkenne schneller, was mich wirklich bewegt.',
  },
];

function StarRow() {
  return (
    <div
      className='flex items-center gap-1 text-[var(--accent-soft)]'
      aria-label='5 von 5 Sternen'>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden='true'>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] border-y border-[var(--border)]'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Erfolgsgeschichten</h2>
          <p className='mt-4 text-base text-white/70 sm:text-lg'>
            Stimmen von Menschen, die Klarheit und innere Stabilität gewonnen haben.
          </p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-3'>
          {testimonials.map((testimonial) => (
            <GlassCard
              key={testimonial.name}
              className='p-6'>
              <StarRow />
              <p className='mt-4 text-sm text-white/75'>{testimonial.text}</p>
              <p className='mt-6 text-sm font-semibold text-white'>{testimonial.name}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
