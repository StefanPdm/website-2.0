import type { Metadata } from 'next';
import Link from 'next/link';

import GlassCard from '@/components/GlassCard';
import { MotifAction, MotifInsight, MotifRelation } from '@/app/nlp/components/Motifs';
import TestClient from '@/app/nlp/persoenlichkeitstest/TestClient';
import {
  DISCLAIMER,
  dimensions,
  questions,
  SOURCES,
} from '@/app/nlp/persoenlichkeitstest/data';

const title = 'Persönlichkeitstest: Beziehungstyp, Sachtyp oder Handlungstyp';
const description =
  'Kostenloser Selbsttest nach der Psychografie von Dietmar Friedmann: 18 Fragen, etwa fünf Minuten, sofortige Auswertung. Welchen Lebensbereich nutzt du am selbstverständlichsten — Beziehung, Erkennen oder Handeln? Mit Einordnung durch NLP Coach Stefan Heinemann aus Potsdam.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Persönlichkeitstest kostenlos',
    'Psychografie Test',
    'Dietmar Friedmann Persönlichkeitstypen',
    'Beziehungstyp Sachtyp Handlungstyp',
    'Selbsttest Persönlichkeit',
    'Persönlichkeitstest ohne Anmeldung',
    'NLP Coaching Potsdam',
    'Coaching Berlin',
  ],
  alternates: { canonical: '/nlp/persoenlichkeitstest' },
  openGraph: {
    title,
    description,
    url: '/nlp/persoenlichkeitstest',
    type: 'article',
    locale: 'de_DE',
    siteName: 'NLP Coaching',
  },
  twitter: { card: 'summary_large_image', title, description },
};

/** Die drei Bereiche für den Erklärblock über dem Test. */
const areas = [
  { key: 'beziehung', Motif: MotifRelation },
  { key: 'erkennen', Motif: MotifInsight },
  { key: 'handeln', Motif: MotifAction },
] as const;

export default function PersoenlichkeitstestPage() {
  return (
    <main className='relative z-10'>
      {/* Kopfbereich */}
      <section className='relative overflow-hidden border-b border-(--border) px-4 pt-40 pb-16 md:pt-48'>
        <MotifRelation className='pointer-events-none absolute -right-20 top-28 h-96 w-96 opacity-[0.07]' />
        <div className='container mx-auto max-w-4xl'>
          <nav
            aria-label='Brotkrumen'
            className='mb-8 flex flex-wrap items-center gap-2 text-xs text-(--muted)'>
            <Link
              href='/nlp'
              className='transition hover:text-(--text)'>
              NLP Coaching
            </Link>
            <span aria-hidden='true'>/</span>
            <span className='text-(--text)'>Persönlichkeitstest</span>
          </nav>

          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Psychografie</p>
          <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
            Beziehungstyp, Sachtyp oder Handlungstyp?
          </h1>
          <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
            Jeder Mensch kann Beziehungen gestalten, Zusammenhänge erkennen und ins Handeln kommen.
            Trotzdem gibt es meist einen Bereich, den wir besonders selbstverständlich nutzen — und
            genau der prägt, wie wir entscheiden, streiten und uns entwickeln.
          </p>

          {/* Die drei Bereiche */}
          <div className='mt-12 grid gap-4 sm:grid-cols-3'>
            {areas.map(({ key, Motif }) => (
              <div
                key={key}
                className='rounded-2xl border border-(--border) bg-(--surface) p-5'>
                <Motif className='h-11 w-11' />
                <p className='mt-4 text-sm font-semibold text-(--text)'>
                  {dimensions[key].area}
                </p>
                <p className='mt-1 text-xs text-(--muted)'>{dimensions[key].short}</p>
              </div>
            ))}
          </div>

          {/* Anleitung */}
          <div className='mt-8 max-w-2xl rounded-2xl border border-(--border) bg-(--surface) p-5'>
            <p className='text-sm leading-relaxed text-(--muted)'>
              <strong className='font-semibold text-(--text)'>So funktioniert es:</strong> Wähle
              bei jeder Frage spontan die Antwort, die deinem tatsächlichen Verhalten am ehesten
              entspricht — nicht die, die du für besonders vernünftig hältst. Es gibt keine
              richtigen oder falschen Antworten. {questions.length} Fragen, etwa fünf Minuten, das
              Ergebnis erscheint sofort.
            </p>
          </div>

          <p className='mt-5 max-w-2xl text-xs leading-relaxed text-(--muted)'>
            Deine Antworten bleiben in deinem Browser. Sie werden nicht gespeichert, nicht
            übertragen und nicht ausgewertet — ich sehe dein Ergebnis nur, wenn du es mir selbst
            erzählst.
          </p>
        </div>
      </section>

      {/* Der Test */}
      <section className='px-4 py-16 sm:py-20'>
        <div className='container mx-auto max-w-3xl'>
          <TestClient />
        </div>
      </section>

      {/* Einordnung und Quellen */}
      <section className='border-t border-(--border) bg-(--section-bg-accent) px-4 py-16'>
        <div className='container mx-auto max-w-4xl'>
          <GlassCard className='p-7 sm:p-9'>
            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Einordnung</p>
            <h2 className='mt-4 text-xl font-semibold text-(--text) sm:text-2xl'>
              Was dieser Test ist — und was nicht
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              {DISCLAIMER}
            </p>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              Ich nutze das Modell im Coaching als Gesprächseinstieg, nicht als Diagnose. Es macht
              schnell sichtbar, warum zwei Menschen dieselbe Situation völlig unterschiedlich
              erleben — und das ist häufig der Punkt, an dem ein Konflikt seinen Schrecken
              verliert.
            </p>

            <h3 className='mt-8 text-xs uppercase tracking-[0.2em] text-(--muted)'>
              Quellen und weiterführende Literatur
            </h3>
            <ul className='mt-4 space-y-2'>
              {SOURCES.map((source) => (
                <li
                  key={source.label}
                  className='text-sm leading-relaxed text-(--muted)'>
                  {'href' in source ? (
                    <a
                      href={source.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline underline-offset-4 transition hover:text-(--text)'>
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                </li>
              ))}
            </ul>
          </GlassCard>

          <p className='mt-10 text-xs leading-relaxed text-(--muted)'>
            Dieser Test ersetzt keine Therapie. Wenn es dir gerade sehr schlecht geht, wende dich
            bitte an deine Hausärztin oder deinen Hausarzt — oder rund um die Uhr kostenfrei an die
            Telefonseelsorge unter{' '}
            <a
              href='tel:+498001110111'
              className='underline underline-offset-4 transition hover:text-(--text)'>
              0800 111 0 111
            </a>{' '}
            und{' '}
            <a
              href='tel:+498001110222'
              className='underline underline-offset-4 transition hover:text-(--text)'>
              0800 111 0 222
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
