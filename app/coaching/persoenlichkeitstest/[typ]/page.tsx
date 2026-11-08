import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PersonalityTypeStructuredData } from '@/components/StructuredData';
import ContentDate from '@/app/coaching/components/ContentDate';
import HeroPicture from '@/app/coaching/components/HeroPicture';
import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import {
  DISCLAIMER,
  dimensionFromSlug,
  dimensionOrder,
  dimensions,
  questions,
  results,
  typeHref,
  typeSlugs,
} from '@/app/coaching/persoenlichkeitstest/data';
import SharedResult from '@/app/coaching/persoenlichkeitstest/SharedResult';
import TypeProfile, { MOTIFS } from '@/app/coaching/persoenlichkeitstest/TypeProfile';

/**
 * Typseiten: /coaching/persoenlichkeitstest/beziehungstyp | sachtyp | handlungstyp
 *
 * Zwei Aufgaben:
 * 1. **Ziel des Teilen-Links.** Wer sein Ergebnis teilt, teilt diese Seite –
 *    mit eigenem Vorschaubild und dem Weg zurück in den Test. Trägt der Link
 *    die Prozentwerte (`?beziehung=…&erkennen=…&handeln=…`), zeigt
 *    `SharedResult` das Ergebnis über der Beschreibung.
 * 2. **Eigenständige Inhaltsseite** für Suchen wie „Handlungstyp Eigenschaften".
 *    Der Text stammt aus derselben Quelle wie das Testergebnis (data.ts).
 *
 * Statisch erzeugt; andere Slugs gibt es nicht (`dynamicParams = false`).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return dimensionOrder.map((dimension) => ({ typ: typeSlugs[dimension] }));
}

type Params = { params: Promise<{ typ: string }> };

async function resolve(params: Params['params']) {
  const { typ } = await params;
  const dimension = dimensionFromSlug(typ);
  if (!dimension) notFound();
  return dimension;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const dimension = await resolve(params);
  const { type } = dimensions[dimension];
  const title = `${type}: Stärken, Herausforderungen und Entwicklung`;
  const description = `${results[dimension].lead} Der ${type} nach der Psychografie von Dietmar Friedmann – mit kostenlosem Selbsttest (${questions.length} Fragen).`;
  const path = typeHref(dimension);
  return {
    title,
    description,
    keywords: [
      type,
      `${type} Eigenschaften`,
      `${type} Stärken`,
      'Psychografie Dietmar Friedmann',
      'Persönlichkeitstest kostenlos',
      'NLP Coaching Potsdam',
    ],
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

/**
 * Foto-Heroes je Typ (Stil wie Glaubenssätze/Partnertest). Typen ohne Eintrag
 * behalten den Kopfbereich mit Motiv – neues Bild hier eintragen.
 */
const HERO_PHOTOS: Partial<
  Record<
    string,
    {
      wide: { src: string; width: number; height: number };
      tall: { src: string; width: number; height: number };
      alt: string;
      position: string;
    }
  >
> = {
  handeln: {
    wide: { src: '/images-nlp/handlungstyp-aufbruch.webp', width: 1672, height: 941 },
    tall: { src: '/images-nlp/handlungstyp-aufbruch-hoch.webp', width: 900, height: 1125 },
    alt: 'Eine Frau im dunklen Anzug geht entschlossen los, den Blick nach vorn',
    position: 'object-[55%_25%] lg:object-[75%_center]',
  },
};

export default async function TypePage({ params }: Params) {
  const dimension = await resolve(params);
  const { type, area, short } = dimensions[dimension];
  const Motif = MOTIFS[dimension];
  const photo = HERO_PHOTOS[dimension];
  const others = dimensionOrder.filter((entry) => entry !== dimension);

  return (
    <div className='relative z-10'>
      <PersonalityTypeStructuredData dimension={dimension} />

      {/* Kopfbereich: mit Foto, sobald es eins für den Typ gibt (HERO_PHOTOS) */}
      {photo ? (
        <section className='relative overflow-hidden border-b border-border lg:flex lg:min-h-[86dvh] lg:items-center'>
          <div className='relative h-[62vh] min-h-[360px] lg:absolute lg:inset-0 lg:h-auto'>
            <HeroPicture
              wide={photo.wide}
              tall={photo.tall}
              alt={photo.alt}
              className={`object-cover ${photo.position}`}
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
                <Link
                  href='/coaching/persoenlichkeitstest'
                  className='transition hover:text-(--text)'>
                  Persönlichkeitstest
                </Link>
                <span aria-hidden='true'>/</span>
                <span className='text-(--text)'>{type}</span>
              </nav>

              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Psychografie nach Dietmar Friedmann
              </p>
              <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
                Der {type}
              </h1>
              <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
                Einer von drei Lebensbereichen, die jeder Mensch nutzt: {area} – {short}. Beim{' '}
                {type} ist dieser Bereich der selbstverständlichste. Hier stehen typische Stärken,
                mögliche Herausforderungen und ein Impuls für die Entwicklung.
              </p>
              <ContentDate path={typeHref(dimension)} />
            </div>
          </div>
        </section>
      ) : (
        <section className='relative overflow-hidden border-b border-(--border) px-4 pt-40 pb-16 md:pt-48'>
          <Motif className='pointer-events-none absolute -right-20 top-28 h-96 w-96 opacity-[0.07]' />
          <div className='container mx-auto max-w-4xl'>
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
              <Link
                href='/coaching/persoenlichkeitstest'
                className='transition hover:text-(--text)'>
                Persönlichkeitstest
              </Link>
              <span aria-hidden='true'>/</span>
              <span className='text-(--text)'>{type}</span>
            </nav>

            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Psychografie nach Dietmar Friedmann
            </p>
            <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
              Der {type}
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              Einer von drei Lebensbereichen, die jeder Mensch nutzt: {area} – {short}. Beim {type}{' '}
              ist dieser Bereich der selbstverständlichste. Hier stehen typische Stärken, mögliche
              Herausforderungen und ein Impuls für die Entwicklung.
            </p>
            <ContentDate path={typeHref(dimension)} />
          </div>
        </section>
      )}

      {/* Beschreibung */}
      <section className='px-4 py-16 sm:py-20'>
        <div className='container mx-auto max-w-3xl'>
          <SharedResult dimension={dimension} />
          <TypeProfile
            dimension={dimension}
            heading={`Was den ${type} auszeichnet`}
            level='h2'
            className=''
          />

          <p className='mt-8 border-t border-(--border) pt-6 text-xs leading-relaxed text-(--muted)'>
            {DISCLAIMER}
          </p>
        </div>
      </section>

      {/* Weiter: selbst testen, andere Typen */}
      <section className='border-t border-(--border) bg-(--section-bg-accent) px-4 py-16 sm:py-20'>
        <div className='container mx-auto max-w-3xl text-center'>
          <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>Welcher Typ bist du?</h2>
          <p className='mx-auto mt-4 max-w-xl text-sm leading-relaxed text-(--muted) sm:text-base'>
            {questions.length} Fragen, etwa fünf Minuten, sofortige Auswertung. Deine Antworten
            bleiben in deinem Browser.
          </p>
          <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <PrimaryButton
              href='/coaching/persoenlichkeitstest'
              className='w-full sm:w-auto'>
              Test kostenlos machen
            </PrimaryButton>
            {others.map((other) => (
              <SecondaryButton
                key={other}
                href={typeHref(other)}
                className='w-full sm:w-auto'>
                {dimensions[other].type}
              </SecondaryButton>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
