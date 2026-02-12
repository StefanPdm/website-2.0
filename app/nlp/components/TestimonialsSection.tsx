'use client';

import Image from 'next/image';

import GlassCard from '@/components/GlassCard';

const testimonials = [
  {
    name: 'Lena K.',
    imageUrl: '/images-nlp/testimonial-f-1.png',
    text: 'Weniger Grübeln, mehr Handlungsfokus. Die Sessions haben mir geholfen, Entscheidungen schneller zu treffen.',
  },
  {
    name: 'Daniel M.',
    imageUrl: '/images-nlp/testimonial-m-3.png',
    text: 'Ich kann klarer Nein sagen, ohne Schuldgefühl. Besonders die Sprachmuster-Übungen waren extrem hilfreich.',
  },
  {
    name: 'Mira S.',
    imageUrl: '/images-nlp/testimonial-f-5.png',
    text: 'Meine Gespräche im Team sind strukturierter. Ich erkenne schneller, was mich wirklich bewegt.',
  },
  {
    name: 'Fabian R.',
    imageUrl: '/images-nlp/testimonial-m-4.png',
    text: 'Ich habe endlich eine klare Prioritätenliste und setze sie konsequent um. Die Methoden sind praxisnah und sofort wirksam.',
  },
  {
    name: 'Nora V.',
    imageUrl: '/images-nlp/testimonial-f-6.png',
    text: 'Mehr Ruhe, weniger Druck. Besonders die Arbeit an meinen inneren Standards hat mir geholfen, Entscheidungen leichter zu treffen.',
  },
  {
    name: 'Jasmin T.',
    imageUrl: '/images-nlp/testimonial-f-7.png',
    text: 'Die Kommunikation im Team ist deutlich klarer. Ich fühle mich sicherer in Gesprächen und kann meine Punkte präzise formulieren.',
  },
];

function StarRow() {
  return (
    <div
      className='flex items-center gap-1 text-(--accent-soft)'
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
    <section className='relative py-20 flex flex-col justify-center items-center min-h-[80dvh] border-y border-border'>
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
              <div className='flex items-center gap-3'>
                <div className='relative h-11 w-11 overflow-hidden rounded-full border border-white/20 bg-white/10'>
                  <Image
                    src={testimonial.imageUrl}
                    alt={`Kundenportrait ${testimonial.name}`}
                    fill
                    sizes='44px'
                    className='object-cover'
                  />
                </div>
                <StarRow />
              </div>
              <p className='mt-4 text-sm text-white/75'>{testimonial.text}</p>
              <p className='mt-6 text-sm font-semibold text-white'>{testimonial.name}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
