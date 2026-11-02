import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Footprints, Home, MapPin, Video } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import { MotifAction, MotifRelation } from '@/app/coaching/components/Motifs';
import { offerByTitle } from '@/app/coaching/pricing';

/**
 * Gemeinsame Vorlage der Standortseiten (/coaching/potsdam, /coaching/berlin).
 * Jede Seite beantwortet die lokale Suchanfrage vollständig: wo, wie, für
 * wen, was kostet es. Die Seiten liefern nur ihre Texte – Layout, Anliegen
 * und Eckdaten sind hier, damit beide nicht auseinanderlaufen.
 *
 * Nur belegbare Aussagen: Orte und Formate wie in faq.ts, Preise aus
 * pricing.ts. Keine Ortsteil-Listen (Keyword-Stuffing), keine erfundenen
 * Details zur Praxis.
 */

const formatIcons = { home: Home, walk: Footprints, visit: MapPin, online: Video } as const;

export type LocationFormat = { icon: keyof typeof formatIcons; title: string; text: string };

export type LocationConfig = {
  path: string;
  /** Kurzname für Brotkrumen und Schema, z. B. „Potsdam“. */
  city: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  lead: string;
  formats: LocationFormat[];
  places: string;
  image: { src: string; alt: string; position: string };
  motif: 'relation' | 'action';
  ctaTitle: string;
  /** Die jeweils andere Standortseite – interne Verlinkung zwischen beiden. */
  sibling: { href: string; label: string };
};

const startersession = offerByTitle('Startersession');
const folgesession = offerByTitle('Folgesession');

/** Beschreibungstext mit aktuellem Preis – für `description` der Seiten. */
export const SESSION_FACTS = `DVNLP-zertifiziert, Erstgespräch kostenlos, Sessions ca. 180 Minuten für ${folgesession.price} inkl. MwSt.`;

const topics = [
  'Die Firma läuft, aber du fühlst dich leer oder erschöpft.',
  'Entscheidungen drehen sich nachts im Kopf, statt getroffen zu werden.',
  'Ärger, Unruhe oder Druck steuern dich – statt du sie.',
  'Du willst Grenzen setzen – bei Kunden, im Team, in der Familie.',
  'Ziele, die sich nicht mehr nach deinen eigenen anfühlen.',
  'Niemand, mit dem du offen über dich selbst sprechen kannst.',
];

const linkClass =
  'rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export function locationMetadata(config: LocationConfig): Metadata {
  const { title, description, keywords, path } = config;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'article',
      locale: 'de_DE',
      siteName: 'Stefan Heinemann Coaching',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function LocationPage({ config }: { config: LocationConfig }) {
  const Motif = config.motif === 'action' ? MotifAction : MotifRelation;
  const facts = [
    {
      term: 'Erstgespräch',
      detail:
        'Kostenlos und unverbindlich: die Klarheits-Session, ca. 30 Minuten per Telefon oder Video.',
    },
    {
      term: 'Sessions',
      detail: `Erste Session (Startersession) ca. 4 Stunden für ${startersession.price}, jede weitere ca. 3 Stunden für ${folgesession.price} – inkl. MwSt.`,
    },
    { term: 'Orte', detail: config.places },
    {
      term: 'Methoden',
      detail:
        'NLP (DVNLP-zertifiziert), verbunden mit der Haltung von Jens Corssen, der Lebensschule von Dieter Lange und der Energiearbeit von Tony Robbins.',
    },
    { term: 'Nach der Session', detail: 'Auf Wunsch dein persönlicher Session-Podcast – inklusive.' },
  ];

  return (
    <>
      <ContentPageStructuredData
        page={{
          path: config.path,
          headline: config.title,
          description: config.description,
          shortTitle: config.city,
          about: `Coaching in ${config.city}`,
        }}
      />
      <article className='relative z-10'>
        <section className='relative overflow-hidden border-b border-border px-4 pt-40 pb-16 md:pt-48'>
          <Motif className='pointer-events-none absolute -right-20 top-24 h-96 w-96 opacity-[0.07]' />
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
              <span className='text-(--text)'>{config.city}</span>
            </nav>

            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Coaching in {config.city}
            </p>
            <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
              {config.h1}
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              {config.lead}
            </p>
            <ContentDate path={config.path} />
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
                  src={config.image.src}
                  alt={config.image.alt}
                  fill
                  sizes='(min-width: 1024px) 420px, 100vw'
                  className={`object-cover ${config.image.position}`}
                />
              </div>
              <ul className='grid gap-4 sm:grid-cols-2'>
                {config.formats.map((format) => {
                  const Icon = formatIcons[format.icon];
                  return (
                    <li key={format.title}>
                      <GlassCard className='h-full p-6'>
                        <Icon
                          aria-hidden='true'
                          className='h-6 w-6 text-accent'
                        />
                        <h3 className='mt-4 text-lg font-semibold text-(--text)'>{format.title}</h3>
                        <p className='mt-2 text-sm leading-relaxed text-(--muted)'>{format.text}</p>
                      </GlassCard>
                    </li>
                  );
                })}
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
                className={linkClass}>
                wie ich arbeite
              </Link>{' '}
              ·{' '}
              <Link
                href='/coaching/session-podcast'
                className={linkClass}>
                der Session-Podcast
              </Link>{' '}
              ·{' '}
              <Link
                href={config.sibling.href}
                className={linkClass}>
                {config.sibling.label}
              </Link>
            </p>
          </div>
        </section>

        {/* Abschluss */}
        <section className='border-t border-border px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>{config.ctaTitle}</h2>
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
