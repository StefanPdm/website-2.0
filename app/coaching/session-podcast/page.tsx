import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Headphones } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import HeroPicture from '@/app/coaching/components/HeroPicture';
import PodcastPlayer from '@/app/coaching/components/PodcastPlayer';

const PATH = '/coaching/session-podcast';

/**
 * Beispiel-Podcast. Liegt die Datei unter public/, erscheint der Player
 * automatisch; sonst ein Hinweis statt eines toten Players.
 *
 * Nur ein Podcast, dessen Klient schriftlich zugestimmt hat (Einwilligung
 * aufbewahren). Format: .m4a (AAC, 64 kbit/s, mono) – ein 15-Minuten-Podcast
 * hat so rund 7 MB; Audio ist von der 500-KB-Grenze ausgenommen (CLAUDE.md §12).
 */
const EXAMPLE = {
  src: '/audio/session-podcast-beispiel.m4a',
  type: 'audio/mp4',
  title: 'Session-Podcast – Hörbeispiel',
  /** Länge in Sekunden (ffprobe). Bei neuer Datei mitpflegen. */
  duration: 2423,
  meta: 'Session-Podcast · 40 Minuten · zwei KI-Stimmen',
  caption:
    'Ein echter Session-Podcast, veröffentlicht mit schriftlicher Zustimmung des Klienten. Namen und erkennbare Details sind entfernt.',
};

function hasExample() {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', EXAMPLE.src));
  } catch {
    return false;
  }
}

const title = 'Session-Podcast – dein Coaching zum Nachhören';
const description =
  'Zu jeder Coaching-Session bei Stefan Heinemann in Potsdam, Berlin oder online gibt es auf Wunsch einen persönlichen KI-Podcast: Er reflektiert die Session aus der Metaperspektive – inklusive, nur mit deiner Zustimmung, ohne Namen. Mit Hörbeispiel.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Coaching Podcast',
    'KI Podcast Coaching',
    'Coaching Nachbereitung',
    'Life Coaching für Unternehmer',
    'Coaching Potsdam',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title,
    description,
    url: PATH,
    type: 'article',
    locale: 'de_DE',
    siteName: 'Stefan Heinemann Coaching',
  },
  twitter: { card: 'summary_large_image', title, description },
};

const reasons = [
  {
    title: 'Abstand zum eigenen Thema',
    text: 'Wer über sich selbst wie über eine dritte Person hört, sieht klarer. Die Psychologie nennt das Self-Distancing – einer der gut belegten Mechanismen, die auch im Coaching wirken.',
  },
  {
    title: 'Was gesagt wurde, bleibt',
    text: 'In einer dreistündigen Session passiert viel. Der Podcast holt die wichtigsten Einsichten zurück, bevor der Alltag sie überdeckt.',
  },
  {
    title: 'Wiederholung verankert',
    text: 'Neue Sichtweisen werden stabil, wenn du ihnen mehrmals begegnest. Du kannst den Podcast so oft hören, wie du willst.',
  },
];

const facts = [
  { term: 'Kosten', detail: 'Inklusive bei jeder Session – kein Aufpreis.' },
  { term: 'Grundlage', detail: 'Eine Aufnahme der Session – nur mit deiner Zustimmung.' },
  {
    term: 'Erstellung',
    detail:
      'Ich entferne deinen Namen und erkennbare Details auf meinem Rechner. Erst danach erstellt Google NotebookLM den Podcast.',
  },
  { term: 'Freiwillig', detail: 'Nur auf deinen ausdrücklichen Wunsch, jederzeit widerrufbar.' },
];

export default function SessionPodcastPage() {
  const exampleAvailable = hasExample();

  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Session-Podcast',
          about: 'Coaching-Nachbereitung',
        }}
      />
      <article className='relative z-10'>
        {/* Kopfbereich: Foto als Bühne */}
        <section className='relative overflow-hidden border-b border-border lg:flex lg:min-h-[86dvh] lg:items-center'>
          <div className='relative h-[62vh] min-h-[360px] lg:absolute lg:inset-0 lg:h-auto'>
            <HeroPicture
              wide={{ src: '/images-nlp/session-podcast-hoeren.webp', width: 1672, height: 941 }}
              tall={{
                src: '/images-nlp/session-podcast-hoeren-hoch.webp',
                width: 900,
                height: 1125,
              }}
              alt='Ein Mann hört mit geschlossenen Augen über Kopfhörer zu'
              className='object-cover object-[60%_25%] lg:object-[80%_center]'
              priority
            />
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-linear-to-b from-transparent from-55% to-(--bg) lg:bg-linear-to-r lg:from-(--bg) lg:from-25% lg:via-(--bg)/75 lg:via-45% lg:to-transparent lg:to-70%'
            />
          </div>
          <div className='container relative mx-auto -mt-20 max-w-6xl px-4 pb-16 lg:mt-0 lg:pt-40 lg:pb-24'>
            <div className='max-w-xl'>
              <nav
                aria-label='Brotkrumen'
                className='mb-8 flex flex-wrap items-center gap-2 text-xs text-(--muted)'>
                <Link
                  href='/'
                  className='transition hover:text-(--text)'>
                  Start
                </Link>
                <span aria-hidden='true'>/</span>
                <Link
                  href='/coaching'
                  className='transition hover:text-(--text)'>
                  Coaching
                </Link>
                <span aria-hidden='true'>/</span>
                <span className='text-(--text)'>Session-Podcast</span>
              </nav>

              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Inklusive bei jeder Session
              </p>
              <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
                Dein Session-Podcast – Coaching, das nachklingt
              </h1>
              <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
                Nach jeder Session bekommst du auf Wunsch einen persönlichen Podcast. Zwei
                KI-Stimmen reflektieren dein Coaching aus der Metaperspektive: was passiert ist,
                welche Muster sichtbar wurden und was dein nächster Schritt ist. Für viele Klienten
                wirkt er wie eine zweite Session.
              </p>
              <ContentDate path={PATH} />
              <div className='mt-8'>
                <PrimaryButton
                  href='#hoerbeispiel'
                  className='w-full sm:w-auto'>
                  Hörbeispiel
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* Hörbeispiel */}
        <section
          id='hoerbeispiel'
          className='scroll-mt-24 px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>Hörbeispiel</h2>
            {exampleAvailable ? (
              <div className='mt-8'>
                <p className='mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-(--muted)'>
                  <Headphones
                    aria-hidden='true'
                    className='h-4 w-4 text-accent'
                  />
                  {EXAMPLE.meta}
                </p>
                <PodcastPlayer
                  src={EXAMPLE.src}
                  type={EXAMPLE.type}
                  title={EXAMPLE.title}
                  duration={EXAMPLE.duration}
                />
                <p className='mt-4 text-sm leading-relaxed text-(--muted)'>{EXAMPLE.caption}</p>
              </div>
            ) : (
              <GlassCard className='mt-8 p-6 sm:p-8'>
                <div className='flex items-start gap-4'>
                  <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-border'>
                    <Headphones
                      aria-hidden='true'
                      className='h-6 w-6'
                    />
                  </span>
                  <p className='min-w-0 flex-1 text-sm leading-relaxed text-(--muted)'>
                    Das Hörbeispiel wird gerade vorbereitet – ein echter Session-Podcast, den ein
                    Klient zur Veröffentlichung freigegeben hat. Bis dahin: Frag im kostenlosen
                    Erstgespräch danach, dann erzähle ich dir, wie er klingt.
                  </p>
                </div>
              </GlassCard>
            )}
          </div>
        </section>

        {/* Warum er wirkt */}
        <section className='border-y border-border bg-(--section-bg-accent) px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>Warum er wirkt</h2>
            <div className='mt-8 grid gap-6 md:grid-cols-3'>
              {reasons.map((reason) => (
                <GlassCard
                  key={reason.title}
                  className='p-6'>
                  <h3 className='text-lg font-semibold text-(--text)'>{reason.title}</h3>
                  <p className='mt-3 text-sm leading-relaxed text-(--muted)'>{reason.text}</p>
                </GlassCard>
              ))}
            </div>
            <p className='mt-6 text-sm text-(--muted)'>
              Mehr zu Self-Distancing und den anderen Mechanismen:{' '}
              <Link
                href='/coaching/wissenschaft'
                className='rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                Warum NLP wirkt – der Forschungsstand
              </Link>
            </p>
          </div>
        </section>

        {/* Fakten */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            {/* Echtes Foto: das Gesicht hinter dem Angebot */}
            <figure className='mb-12'>
              <div className='relative aspect-3/2 overflow-hidden rounded-3xl border border-card-border shadow-[0_30px_70px_var(--card-shade)] sm:aspect-21/9'>
                <Image
                  src='/images-nlp/coaching-schreibtisch.webp'
                  alt='Stefan Heinemann am Schreibtisch mit Notizbuch und Kaffee nach einer Session'
                  fill
                  sizes='(min-width: 896px) 896px, 100vw'
                  className='object-cover object-[70%_35%]'
                />
              </div>
              <figcaption className='mt-3 text-sm text-(--subtle)'>
                Nach der Session bereite ich deinen Podcast persönlich vor.
              </figcaption>
            </figure>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>Das Wichtigste</h2>
            <dl className='mt-8 divide-y divide-border rounded-2xl border border-card-border bg-surface'>
              {facts.map((fact) => (
                <div
                  key={fact.term}
                  className='grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6'>
                  <dt className='text-sm font-semibold text-(--text)'>{fact.term}</dt>
                  <dd className='text-sm text-(--muted)'>{fact.detail}</dd>
                </div>
              ))}
            </dl>
            <p className='mt-4 text-xs text-(--muted)'>
              Einzelheiten zur Verarbeitung in der{' '}
              <Link
                href='/coaching/datenschutz'
                className='rounded underline underline-offset-2 hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Abschluss */}
        <section className='border-t border-border px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Bereit für deine erste Session?
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-sm text-(--muted) sm:text-base'>
              Im kostenlosen Erstgespräch klären wir dein Anliegen – und ob der Podcast für dich
              passt.
            </p>
            <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
              <PrimaryButton
                href='/coaching#kontakt'
                className='w-full sm:w-auto'>
                Kostenloses Erstgespräch
              </PrimaryButton>
              <SecondaryButton
                href='/coaching#preise'
                className='w-full sm:w-auto'>
                Preise ansehen
              </SecondaryButton>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
