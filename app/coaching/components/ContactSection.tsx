'use client';

import Image from 'next/image';
import Link from 'next/link';

import ContactFormNlp from '@/components/ContactFormNlp';

/**
 * Was nach dem Absenden passiert – nimmt die Hürde vor der ersten Nachricht.
 * Antwortzeit 24–48 Stunden ist seitenweit einheitlich (§8). Dauer und Format
 * der Klarheits-Session aus pricing.ts (entryOffer).
 */
const nextSteps = [
  {
    title: 'Ich lese selbst',
    text: 'Deine Nachricht landet direkt bei mir – kein Team, kein Callcenter, vertraulich.',
  },
  {
    title: 'Antwort in 24–48 Stunden',
    text: 'Persönlich, mit einem Terminvorschlag für das kostenlose Erstgespräch.',
  },
  {
    title: '30 Minuten Klarheit',
    text: 'Telefon oder Video, unverbindlich. Danach entscheidest du in Ruhe.',
  },
];

export default function ContactSection() {
  return (
    <section
      id='kontakt'
      className='tone-dark relative border-t border-border py-16 sm:py-24 lg:py-28'>
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

            <h3 className='mt-8 text-lg font-semibold text-(--text)'>
              Was nach dem Absenden passiert
            </h3>
            <ol className='mt-4 space-y-4'>
              {nextSteps.map((step, index) => (
                <li
                  key={step.title}
                  className='flex gap-4'>
                  <span
                    aria-hidden='true'
                    className='grid h-8 w-8 shrink-0 place-items-center rounded-full border border-card-border bg-surface text-xs font-semibold text-accent-soft'>
                    {index + 1}
                  </span>
                  <span>
                    <span className='block text-sm font-semibold text-(--text)'>{step.title}</span>
                    <span className='mt-0.5 block text-sm text-(--muted)'>{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className='mt-6 font-serif text-2xl font-light italic text-accent-soft'>
              Bis bald, Stefan
            </p>
            <p className='mt-6 text-sm text-(--muted)'>
              Aus der Region? So läuft Coaching in{' '}
              <Link
                href='/coaching/potsdam'
                className='rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                Potsdam
              </Link>{' '}
              und in{' '}
              <Link
                href='/coaching/berlin'
                className='rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                Berlin
              </Link>
              .
            </p>
          </div>
          {/* Kein eigener Rahmen: ContactFormNlp ist selbst die Karte (Einheitsrahmen). */}
          <div className='min-w-0'>
            <ContactFormNlp />
          </div>
        </div>
      </div>
    </section>
  );
}
