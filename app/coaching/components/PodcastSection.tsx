import Image from 'next/image';
import Link from 'next/link';
import { Headphones, NotebookPen, ShieldCheck, UserRound } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import AiBadge from '@/app/coaching/components/AiBadge';
import { SecondaryButton } from '@/app/coaching/components/Buttons';
import { MotifInsight } from '@/app/coaching/components/Motifs';

/**
 * Session-Podcast – inklusive bei jeder Session (seit 2026-11).
 *
 * Ablauf und Datenschutz-Zusagen müssen zu /coaching/datenschutz passen:
 * nur auf Wunsch, Aufnahme nur mit Zustimmung, Transkript lokal pseudonymisiert,\n * erst danach NotebookLM. Podcasts werden nicht automatisch gelöscht.
 * Wer hier etwas ändert, prüft den Abschnitt dort mit.
 */
const steps = [
  {
    Icon: UserRound,
    title: 'Du bist ganz im Gespräch',
    text: 'Mit deinem Einverständnis zeichne ich die Session auf. Du musst dir nichts merken.',
  },
  {
    Icon: NotebookPen,
    title: 'Ich entferne alles Persönliche',
    text: 'Bevor etwas meinen Rechner verlässt, lösche ich im Transkript deinen Namen und alles, was auf dich hinweist.',
  },
  {
    Icon: Headphones,
    title: 'Du hörst dein Coaching noch einmal',
    text: 'Zwei KI-Stimmen reflektieren deine Session aus der Metaperspektive. Beim Autofahren, Joggen oder am Abend.',
  },
];

const privacyPoints = [
  'Nur auf deinen ausdrücklichen Wunsch',
  'Aufnahme nur mit deiner Zustimmung',
  'Ohne Namen und erkennbare Details, bevor etwas hochgeladen wird',
  'Den Podcast bekommst nur du',
  'Jederzeit widerrufbar',
];

export default function PodcastSection() {
  return (
    <section
      id='podcast'
      className='relative overflow-hidden border-y border-border bg-(--section-bg-accent) py-20'>
      <MotifInsight className='pointer-events-none absolute -left-24 top-10 h-96 w-96 opacity-[0.07]' />
      <div className='container relative mx-auto px-4'>
        <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start'>
          <div>
            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Inklusive bei jeder Session
            </p>
            <h2 className='mt-4 text-3xl font-semibold text-(--text) sm:text-4xl'>
              Dein Session-Podcast
            </h2>
            <p className='mt-5 text-base leading-relaxed text-(--muted) sm:text-lg'>
              Nach der Session beginnt die eigentliche Arbeit. Deshalb bekommst du auf Wunsch zu
              jeder Session einen persönlichen Podcast: Er greift auf, was passiert ist, welche
              Muster sichtbar wurden und was dein nächster Schritt ist. Für viele Klienten wirkt er
              wie eine zweite Session.
            </p>

            <ol className='mt-10 space-y-6'>
              {steps.map(({ Icon, title, text }, index) => (
                <li
                  key={title}
                  className='flex gap-4'>
                  <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-border'>
                    <Icon
                      aria-hidden='true'
                      className='h-5 w-5'
                    />
                  </span>
                  <div>
                    <h3 className='text-lg font-semibold text-(--text)'>
                      <span className='sr-only'>Schritt {index + 1}: </span>
                      {title}
                    </h3>
                    <p className='mt-1 text-sm leading-relaxed text-(--muted)'>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className='space-y-6'>
            <div className='relative aspect-3/2 overflow-hidden rounded-3xl border border-border'>
              <Image
                src='/images-nlp/session-podcast-zuhoeren.webp'
                alt='Eine Frau hört lächelnd über Kopfhörer zu und schaut nachdenklich in die Ferne'
                fill
                sizes='(min-width: 1024px) 40vw, 100vw'
                className='object-cover object-[72%_center]'
              />
              <AiBadge className='bottom-3 right-3' />
            </div>
            <GlassCard className='p-7 sm:p-8'>
              <div className='flex items-center gap-3'>
                <ShieldCheck
                  aria-hidden='true'
                  className='h-6 w-6 text-accent'
                />
                <h3 className='text-lg font-semibold text-(--text)'>Deine Daten bleiben bei dir</h3>
              </div>
              <ul className='mt-5 space-y-3'>
                {privacyPoints.map((point) => (
                  <li
                    key={point}
                    className='flex gap-2 text-sm text-(--text)'>
                    <span
                      aria-hidden='true'
                      className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <p className='mt-5 text-xs leading-relaxed text-(--muted)'>
                Erstellt mit Google NotebookLM. Details in der{' '}
                <Link
                  href='/coaching/datenschutz'
                  className='rounded underline underline-offset-2 hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                  Datenschutzerklärung
                </Link>
                .
              </p>
              <div className='mt-7'>
                <SecondaryButton
                  href='/coaching/session-podcast'
                  className='w-full sm:w-auto'>
                  Wie das klingt – Beispiel anhören
                </SecondaryButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
