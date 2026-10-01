import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PersonalityTypeStructuredData } from '@/components/StructuredData';
import ContentDate from '@/app/nlp/components/ContentDate';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';
import {
  DISCLAIMER,
  dimensionFromSlug,
  dimensionOrder,
  dimensions,
  questions,
  results,
  typeHref,
  typeSlugs,
} from '@/app/nlp/persoenlichkeitstest/data';
import SharedResult from '@/app/nlp/persoenlichkeitstest/SharedResult';
import TypeProfile, { MOTIFS } from '@/app/nlp/persoenlichkeitstest/TypeProfile';

/**
 * Typseiten: /nlp/persoenlichkeitstest/beziehungstyp | sachtyp | handlungstyp
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
      siteName: 'NLP Coaching',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function TypePage({ params }: Params) {
  const dimension = await resolve(params);
  const { type, area, short } = dimensions[dimension];
  const Motif = MOTIFS[dimension];
  const others = dimensionOrder.filter((entry) => entry !== dimension);

  return (
    <div className='relative z-10'>
      <PersonalityTypeStructuredData dimension={dimension} />

      {/* Kopfbereich */}
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
              href='/nlp'
              className='transition hover:text-(--text)'>
              NLP Coaching
            </Link>
            <span aria-hidden='true'>/</span>
            <Link
              href='/nlp/persoenlichkeitstest'
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
      </section>

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
              href='/nlp/persoenlichkeitstest'
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
