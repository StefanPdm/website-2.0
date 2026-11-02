import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Footprints, Home, MapPin, Video } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import { MotifRelation } from '@/app/coaching/components/Motifs';
import { offerByTitle } from '@/app/coaching/pricing';

const PATH = '/coaching/potsdam';

/**
 * Standortseite „Coaching Potsdam“ (2026-11) – beantwortet die lokale
 * Suchanfrage vollständig: wo, wie, für wen, was kostet es.
 *
 * Nur belegbare Aussagen: Orte und Formate wie in faq.ts, Preise aus
 * pricing.ts. Keine Ortsteil-Listen (Keyword-Stuffing) und keine erfundenen
 * Details zur Praxis.
 */

const startersession = offerByTitle('Startersession');
const folgesession = offerByTitle('Folgesession');

const title = 'Coaching in Potsdam – Life Coaching für Unternehmer';
const description = `Coaching in Potsdam für Unternehmer mit persönlichen Themen: bei mir in Potsdam, bei dir vor Ort oder online. DVNLP-zertifiziert, Erstgespräch kostenlos, Sessions ca. 180 Minuten für ${folgesession.price} inkl. MwSt.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Coaching Potsdam',
    'Coach Potsdam',
    'Life Coach Potsdam',
    'Life Coaching Potsdam',
    'Coaching für Unternehmer Potsdam',
    'Business Coaching Potsdam',
    'Personal Coaching Potsdam',
    'NLP Coaching Potsdam',
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

const formats = [
  {
    Icon: Home,
    title: 'Bei mir in Potsdam',
    text: 'In ruhiger Atmosphäre, abseits von Büro und Alltag. Den genauen Ort bekommst du mit der Terminbestätigung.',
  },
  {
    Icon: Footprints,
    title: 'Im Gehen',
    text: 'Auf Wunsch arbeiten wir draußen – bei einem Spaziergang durch einen der Potsdamer Parks. Manche Gedanken sortieren sich in Bewegung leichter.',
  },
  {
    Icon: MapPin,
    title: 'Bei dir vor Ort',
    text: 'Ich komme zu dir – in Potsdam, Berlin oder Brandenburg. Auch ins Unternehmen, wenn Rahmen und Ziel vorher abgestimmt sind.',
  },
  {
    Icon: Video,
    title: 'Online',
    text: 'Per Video, ortsunabhängig. Gut für Folgesessions oder wenn der Kalender keine Anfahrt zulässt.',
  },
];

const topics = [
  'Die Firma läuft, aber du fühlst dich leer oder erschöpft.',
  'Entscheidungen drehen sich nachts im Kopf, statt getroffen zu werden.',
  'Ärger, Unruhe oder Druck steuern dich – statt du sie.',
  'Du willst Grenzen setzen – bei Kunden, im Team, in der Familie.',
  'Ziele, die sich nicht mehr nach deinen eigenen anfühlen.',
  'Niemand, mit dem du offen über dich selbst sprechen kannst.',
];

const facts = [
  {
    term: 'Erstgespräch',
    detail: 'Kostenlos und unverbindlich: die Klarheits-Session, ca. 30 Minuten per Telefon oder Video.',
  },
  {
    term: 'Sessions',
    detail: `Erste Session (Startersession) ca. 4 Stunden für ${startersession.price}, jede weitere ca. 3 Stunden für ${folgesession.price} – inkl. MwSt.`,
  },
  {
    term: 'Orte',
    detail: 'Bei mir in Potsdam, im Gehen, bei dir in Potsdam, Berlin oder Brandenburg, oder online.',
  },
  {
    term: 'Methoden',
    detail:
      'NLP (DVNLP-zertifiziert), verbunden mit der Haltung von Jens Corssen, der Lebensschule von Dieter Lange und der Energiearbeit von Tony Robbins.',
  },
  {
    term: 'Nach der Session',
    detail: 'Auf Wunsch dein persönlicher Session-Podcast – inklusive.',
  },
];

export default function CoachingPotsdamPage() {
  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Potsdam',
          about: 'Coaching in Potsdam',
        }}
      />
      <article className='relative z-10'>
        <section className='relative overflow-hidden border-b border-border px-4 pt-40 pb-16 md:pt-48'>
          <MotifRelation className='pointer-events-none absolute -right-20 top-24 h-96 w-96 opacity-[0.07]' />
          <div className='container mx-auto max-w-4xl'>
            <nav
              aria-label='Brotkrumen'
              className='mb-8 flex flex-wrap items-center gap-2 text-xs text-(--muted)'>
              <Link
                href='/coaching'
                className='transition hover:text-(--text)'>
                Coaching
              </Link>
              <span aria-hidden='true'>/</span>
              <span className='text-(--text)'>Potsdam</span>
            </nav>

            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Coaching in Potsdam</p>
            <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
              Life Coaching für Unternehmer in Potsdam
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              Ich bin Stefan Heinemann, Coach in Potsdam. Ich begleite Unternehmer, die nach außen
              funktionieren und innen wieder Klarheit, Ruhe und Richtung suchen – bei mir in
              Potsdam, bei dir vor Ort in Potsdam und Berlin oder online.
            </p>
            <ContentDate path={PATH} />
          </div>
        </section>

        {/* Formate */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-5xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Wo wir arbeiten können
            </h2>
            <p className='mt-3 max-w-2xl text-sm text-(--muted) sm:text-base'>
              Der Ort ist Teil des Coachings. Welcher passt, klären wir im Erstgespräch.
            </p>
            <div className='mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center'>
              <div className='relative aspect-4/3 overflow-hidden rounded-3xl border border-border lg:aspect-4/5'>
                <Image
                  src='/images-nlp/coaching-spaziergang-potsdam.webp'
                  alt='Stefan Heinemann im Coaching-Gespräch bei einem Spaziergang durch einen Potsdamer Schlosspark'
                  fill
                  sizes='(min-width: 1024px) 420px, 100vw'
                  className='object-cover object-[65%_center]'
                />
              </div>
              <ul className='grid gap-4 sm:grid-cols-2'>
                {formats.map(({ Icon, title: formatTitle, text }) => (
                  <li key={formatTitle}>
                    <GlassCard className='h-full p-6'>
                      <Icon
                        aria-hidden='true'
                        className='h-6 w-6 text-accent'
                      />
                      <h3 className='mt-4 text-lg font-semibold text-(--text)'>{formatTitle}</h3>
                      <p className='mt-2 text-sm leading-relaxed text-(--muted)'>{text}</p>
                    </GlassCard>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Anliegen */}
        <section className='border-y border-border bg-(--section-bg-accent) px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Mit welchen Themen Unternehmer zu mir kommen
            </h2>
            <ul className='mt-8 grid gap-x-8 sm:grid-cols-2'>
              {topics.map((topic) => (
                <li
                  key={topic}
                  className='flex items-start gap-3 border-b border-border py-4'>
                  <span
                    aria-hidden='true'
                    className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
                  />
                  <span className='text-sm leading-relaxed text-(--muted)'>{topic}</span>
                </li>
              ))}
            </ul>
            <p className='mt-8 text-base leading-relaxed text-(--text)'>
              Ich kenne das von innen: Über zwanzig Jahre habe ich selbst ein Unternehmen geführt –
              erfolgreich nach jedem Maßstab und trotzdem bis in die Erschöpfung. Heute begleite ich
              andere auf dem Weg zurück zu sich.
            </p>
          </div>
        </section>

        {/* Fakten */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>Das Wichtigste</h2>
            <dl className='mt-8 divide-y divide-border rounded-2xl border border-border bg-surface'>
              {facts.map((fact) => (
                <div
                  key={fact.term}
                  className='grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6'>
                  <dt className='text-sm font-semibold text-(--text)'>{fact.term}</dt>
                  <dd className='text-sm text-(--muted)'>{fact.detail}</dd>
                </div>
              ))}
            </dl>
            <p className='mt-4 text-sm text-(--muted)'>
              Mehr dazu:{' '}
              <Link
                href='/coaching#ansatz'
                className='rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                wie ich arbeite
              </Link>{' '}
              ·{' '}
              <Link
                href='/coaching/session-podcast'
                className='rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                der Session-Podcast
              </Link>
            </p>
          </div>
        </section>

        {/* Abschluss */}
        <section className='border-t border-border px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Lass uns in Potsdam sprechen
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-sm text-(--muted) sm:text-base'>
              30 Minuten, kostenlos, per Telefon oder Video. Danach weißt du, ob wir zusammenpassen.
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
