import type { Metadata } from 'next';
import Link from 'next/link';

import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import HeroPicture from '@/app/coaching/components/HeroPicture';
import QuoteSection, { Mark } from '@/app/coaching/components/QuoteSection';
import BeliefWall from '@/app/coaching/glaubenssaetze/BeliefWall';
import TopFive from '@/app/coaching/glaubenssaetze/TopFive';
import {
  allBeliefs,
  beliefAreas,
  coachingQuestions,
} from '@/app/coaching/glaubenssaetze/data';

const PATH = '/coaching/glaubenssaetze';

const title = 'Limitierende Glaubenssätze erkennen – 50 Sätze im Selbsttest';
const description = `${allBeliefs.length} typische limitierende Glaubenssätze in ${beliefAreas.length} Lebensbereichen zum Antippen, mit sofortiger Auswertung und fünf NLP-Coaching-Fragen, um sie zu hinterfragen. Von Life Coach Stefan Heinemann aus Potsdam – kostenlos, ohne Anmeldung.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Glaubenssätze erkennen',
    'limitierende Glaubenssätze',
    'negative Glaubenssätze Liste',
    'Glaubenssätze auflösen',
    'Glaubenssätze NLP',
    'Glaubenssätze Test',
    'Life Coaching Potsdam',
    'Coaching Berlin',
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

export default function GlaubenssaetzePage() {
  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Glaubenssätze',
          about: 'Limitierende Glaubenssätze',
        }}
      />
      <article className='relative z-10'>
        {/* Kopfbereich: Foto als Bühne – der Spiegel ist das Bild für Glaubenssätze */}
        <section className='relative overflow-hidden border-b border-border lg:flex lg:min-h-[86dvh] lg:items-center'>
          <div className='relative h-[62vh] min-h-[360px] lg:absolute lg:inset-0 lg:h-auto'>
            <HeroPicture
              wide={{ src: '/images-nlp/glaubenssaetze-spiegel.webp', width: 1672, height: 941 }}
              tall={{ src: '/images-nlp/glaubenssaetze-spiegel-hoch.webp', width: 900, height: 1125 }}
              alt='Eine Frau betrachtet nachdenklich ihr Spiegelbild'
              className='object-cover object-[50%_30%] lg:object-[80%_center]'
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
                <span className='text-(--text)'>Glaubenssätze</span>
              </nav>

              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Glaubenssätze erkennen
              </p>
              <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
                Welche Sätze laufen in dir – und halten dich klein?
              </h1>
              <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
                Viele Menschen leben nicht das Leben, das sie wollen, sondern das, von dem sie
                glauben, dass sie es leben müssen. Was du über dich glaubst, ist ein Spiegelbild –
                nicht die Wahrheit.
              </p>
              <ContentDate path={PATH} />
              <div className='mt-8'>
                <PrimaryButton
                  href='#satz-wand'
                  className='w-full sm:w-auto'>
                  Zur Satz-Wand
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* Satz-Wand */}
        <section
          aria-labelledby='wand-titel'
          className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-6xl'>
            <div className='mx-auto mb-12 max-w-3xl text-center'>
              <p className='text-base leading-relaxed text-(--muted) sm:text-lg'>
                Glaubenssätze sind tief verankerte Überzeugungen über uns selbst, andere und die
                Welt. Sie wirken meist unbewusst – und steuern trotzdem Gefühle, Entscheidungen und
                Verhalten. Aus Sicht des NLP sind sie keine Wahrheiten, sondern Deutungen, die wir
                irgendwann für wahr gehalten haben. Hier findest du {allBeliefs.length} typische,
                aufgeteilt in {beliefAreas.length} Lebensbereiche.
              </p>
              <p className='mx-auto mt-6 max-w-2xl rounded-2xl border border-card-border bg-(--surface) p-5 text-left text-sm leading-relaxed text-(--muted)'>
                <strong className='font-semibold text-(--text)'>So geht&apos;s:</strong> Tippe jeden
                Satz an, der in dir anklingt – auch wenn er sich nur halb wahr anfühlt. Nicht lange
                überlegen, der erste Impuls zählt. Etwa fünf Minuten, die Auswertung kommt sofort.
              </p>
            </div>
            <h2
              id='wand-titel'
              className='mb-10 text-center text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was davon kennst du von dir?
            </h2>
            <BeliefWall />
          </div>
        </section>

        <TopFive />

        {/* Fünf Fragen */}
        <section
          id='fragen'
          className='scroll-mt-28 px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Hinterfragen</p>
            <h2 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
              Fünf Fragen, die einen Glaubenssatz ins Wanken bringen
            </h2>
            <p className='mt-4 max-w-2xl text-base leading-relaxed text-(--muted)'>
              Einen Glaubenssatz zu erkennen, ist der erste Schritt. Spannend wird es, wenn du
              beginnst, deine vermeintliche Wahrheit infrage zu stellen.
            </p>
            <ol className='mt-10 space-y-4'>
              {coachingQuestions.map((entry, index) => (
                <li
                  key={entry.question}
                  className='flex gap-5 rounded-2xl border border-card-border bg-surface-strong p-5 sm:p-6'>
                  <span
                    aria-hidden='true'
                    className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--accent) to-(--accent-2) text-sm font-semibold text-(--button-text)'>
                    {index + 1}
                  </span>
                  <div>
                    <p className='text-base font-semibold text-(--text) sm:text-lg'>
                      {entry.question}
                    </p>
                    <p className='mt-1 text-sm text-(--muted)'>{entry.purpose}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className='mt-8 max-w-2xl text-sm leading-relaxed text-(--muted)'>
              Gerade bei tief verankerten Überzeugungen hilft es, nicht vorschnell eine positive
              Affirmation dagegenzusetzen, sondern die Überzeugung behutsam zu untersuchen.
            </p>
            {/* Einfluss offen benennen (Stefan, 2026-11-08) – nur belegbare Aussagen über The Work */}
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted)'>
              Ein Einfluss, den ich gern nenne: Byron Katie. Ihre Methode „The Work“ prüft
              Glaubenssätze mit wenigen Fragen und dreht sie anschließend um – sie hat meine
              Ausbildung geprägt. Die Fragen und Gegenteile auf dieser Seite sind meine eigene
              Fassung.
            </p>
          </div>
        </section>

        {/* Gedanke zum Abschluss – eigener Satz von Stefan, darum ohne Zuschreibung */}
        <QuoteSection
          label='Gedanke zum Abschluss'
          quote={
            <>
              „Wer wäre ich, wenn ich aufhören würde zu glauben, dass ich{' '}
              <Mark>jemand anderes</Mark> sein muss?“
            </>
          }
          follow='Manchmal besteht die größte Veränderung nicht darin, etwas Neues zu werden – sondern alte Vorstellungen loszulassen, wer wir angeblich sein müssen.'
        />

        {/* Abschluss */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-3xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Allein kommst du an manche Sätze nicht heran
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-(--muted)'>
              Die hartnäckigsten Glaubenssätze sind die, die sich wie Tatsachen anfühlen. Im
              Coaching untersuchen wir sie gemeinsam – in Potsdam, in Berlin oder online. Das
              Erstgespräch ist kostenlos.
            </p>
            <div className='mt-8 flex justify-center'>
              <PrimaryButton
                href='/coaching#kontakt'
                className='w-full sm:w-auto'>
                Erstgespräch vereinbaren
              </PrimaryButton>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
