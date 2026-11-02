'use client';

import Image from 'next/image';
import Link from 'next/link';

import ContactFormNlp from '@/components/ContactFormNlp';

const contactPoints = [
  'Individuelle 1:1 Begleitung mit Fokus auf Entscheidungsklarheit.',
  'Workshops für Teams & Führungskräfte – praxisnah und messbar.',
  'Werkzeuge, die du sofort im Alltag anwenden kannst.',
];

export default function ContactSection() {
  return (
    <section
      id='kontakt'
      className='relative border-t border-border py-16 sm:py-24 lg:py-28'>
      <div className='container px-4 mx-auto'>
        {/*
          `minmax(0, …)` statt `1.1fr` und `min-w-0` an beiden Spalten:
          Grid-Items haben standardmäßig `min-width: auto` und können damit
          nicht unter die Mindestbreite ihres breitesten Kindes schrumpfen.
          Ein <select> übernimmt als Mindestbreite die längste Option — das
          hat den Abschnitt unter ~490 px über den Viewport hinausgeschoben.
        */}
        <div className='grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
          <div className='min-w-0'>
            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Kontakt</p>
            <h2 className='mt-4 text-3xl font-semibold text-(--text) sm:text-4xl'>
              Dein nächster Schritt
            </h2>
            <p className='mt-4 text-base text-(--muted) sm:text-lg'>
              Schreib mir, wenn du Klarheit willst: eine einzelne Session, ein Workshop oder eine
              Begleitung über Monate. Ich antworte persönlich innerhalb von 24–48 Stunden.
            </p>

            {/* Gesprächsatmosphäre statt Formularwüste – echtes Foto, Potsdam. */}
            <div className='relative mt-8 aspect-3/2 overflow-hidden rounded-3xl border border-border'>
              <Image
                src='/images-nlp/coaching-spaziergang-potsdam.webp'
                alt='Stefan Heinemann im Gespräch bei einem Spaziergang durch einen Potsdamer Schlosspark'
                fill
                sizes='(min-width: 1024px) 50vw, 100vw'
                className='object-cover object-[65%_center]'
              />
            </div>

            <ul className='mt-6 space-y-3'>
              {contactPoints.map((item) => (
                <li
                  key={item}
                  className='flex gap-3 text-sm text-(--muted)'>
                  <span
                    aria-hidden='true'
                    className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className='mt-6 text-sm text-(--muted)'>
              Aus der Region?{' '}
              <Link
                href='/coaching/potsdam'
                className='rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                So läuft Coaching in Potsdam
              </Link>
            </p>
          </div>
          <div className='min-w-0 rounded-3xl border border-border bg-surface p-4 shadow-[0_30px_80px_var(--glow)]'>
            <ContactFormNlp />
          </div>
        </div>
      </div>
    </section>
  );
}
