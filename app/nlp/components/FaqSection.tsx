import Link from 'next/link';

import GlassCard from '@/components/GlassCard';
import { faqBoth, faqNlp } from '@/app/nlp/faq';

/**
 * FAQ von Welt A.
 *
 * Aufklappbar über natives `<details>`/`<summary>` — keine Bibliothek, kein
 * JavaScript, Tastaturbedienung und Screenreader-Unterstützung out of the box.
 * Wichtig fürs `FAQPage`-Schema: Der Antworttext steht auch im zugeklappten
 * Zustand im HTML, Google akzeptiert Akkordeons nur unter dieser Bedingung.
 *
 * Zwölf Fragen sind zu viel für offene Absätze — zugeklappt bleibt die Sektion
 * überschaubar, die erste Frage steht offen als Einstiegshilfe.
 */

const nlpQuestions = [...faqNlp, ...faqBoth];

export default function FaqSection() {
  return (
    <section
      id='faq'
      className='relative flex min-h-[70dvh] flex-col items-center justify-center border-y border-(--border) py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Häufige Fragen</p>
          <h2 className='mt-5 text-3xl font-semibold text-(--text) sm:text-4xl'>
            Was Menschen vorher wissen wollen
          </h2>
          <p className='mt-5 text-base leading-relaxed text-(--muted) sm:text-lg'>
            Ehrliche Antworten auf die Fragen, die im Erstgespräch ohnehin kommen — inklusive der
            unbequemen.
          </p>
        </div>

        <div className='mx-auto mt-12 max-w-3xl space-y-3'>
          {nlpQuestions.map((entry, index) => (
            <GlassCard
              key={entry.question}
              className='overflow-hidden p-0'>
              <details
                className='group'
                open={index === 0}>
                <summary className='flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-6 [&::-webkit-details-marker]:hidden'>
                  <h3 className='text-base font-semibold text-(--text) sm:text-lg'>
                    {entry.question}
                  </h3>
                  <span
                    aria-hidden='true'
                    className='mt-1 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45'>
                    +
                  </span>
                </summary>
                <p className='px-5 pb-5 text-sm leading-relaxed text-(--muted) sm:px-6 sm:pb-6 sm:text-base'>
                  {entry.answer}
                </p>
              </details>
            </GlassCard>
          ))}
        </div>

        {/*
          Fachliche Einordnung. Steht bewusst hier und nicht im Kleingedruckten:
          Die Abgrenzung zu Heilkunde schützt rechtlich, und die offene Aussage
          zur Studienlage ist ein Vertrauens- statt Schwächesignal — genau so
          etwas greifen Sprachmodelle als belastbare Quelle auf.
        */}
        <div className='mx-auto mt-10 max-w-3xl rounded-2xl border border-(--border) bg-(--surface) p-5'>
          <p className='text-xs leading-relaxed text-(--muted)'>
            <strong className='font-semibold text-(--text)'>Fachlicher Hinweis:</strong> NLP wird
            hier als praktisches Kommunikations- und Veränderungsmodell verstanden. Umfassende
            Wirksamkeitsbehauptungen sind wissenschaftlich nicht hinreichend belegt; einzelne
            Elemente überschneiden sich mit etablierten Gesprächs-, Ziel- und
            Imaginationstechniken. Coaching ist keine Heilkunde und ersetzt weder Psychotherapie
            noch ärztliche Behandlung. Bei akuten Krisen wende dich bitte an deine Hausärztin oder
            deinen Hausarzt — oder rund um die Uhr kostenfrei an die Telefonseelsorge unter{' '}
            <a
              href='tel:+498001110111'
              className='underline underline-offset-2 transition hover:text-(--text)'>
              0800 111 0 111
            </a>
            .
          </p>
        </div>

        <p className='mx-auto mt-8 max-w-3xl text-center text-sm text-(--muted)'>
          Deine Frage war nicht dabei?{' '}
          <Link
            href='#kontakt'
            className='font-semibold text-accent underline underline-offset-4'>
            Schreib mir
          </Link>{' '}
          — ich antworte persönlich.
        </p>
      </div>
    </section>
  );
}
