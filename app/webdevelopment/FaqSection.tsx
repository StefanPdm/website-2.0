import Link from 'next/link';

import { faqBoth } from '@/app/nlp/faq';
import { faqWeb } from '@/app/webdevelopment/faq';

/**
 * FAQ von Welt B.
 *
 * Eigene Komponente statt einer geteilten mit Varianten-Prop: Welt A und
 * Welt B teilen sich keine visuelle Sprache (CLAUDE.md §1). Gemeinsam sind nur
 * die Daten und das Bedienmuster.
 *
 * Natives `<details>`/`<summary>` — kein JavaScript, Tastaturbedienung
 * inklusive. Der Antworttext steht auch zugeklappt im HTML; nur dann
 * akzeptiert Google ein Akkordeon für das `FAQPage`-Schema.
 */

const webQuestions = [...faqWeb, ...faqBoth];

export default function FaqSection() {
  return (
    <section
      id='faq'
      className='flex min-h-[70vh] flex-col justify-center border-y border-white/20 py-16 ring-1 ring-white/10 backdrop-blur-md'>
      <div className='mx-auto w-full max-w-6xl px-4'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-white'>Häufige Fragen</h2>
          <p className='mt-3 text-slate-300'>
            Was Kunden vor einem Projekt wissen wollen — Preise, Abläufe, Rechte. Klare Antworten
            statt Rückfragen.
          </p>
        </div>

        <div className='mt-8 grid gap-3 md:grid-cols-2'>
          {webQuestions.map((entry, index) => (
            <details
              key={entry.question}
              open={index === 0}
              className='group h-fit rounded-2xl border border-white/15 bg-white/5 transition hover:border-white/25'>
              <summary className='flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2dd4bf] [&::-webkit-details-marker]:hidden'>
                <h3 className='text-base font-semibold text-white'>{entry.question}</h3>
                <span
                  aria-hidden='true'
                  className='mt-0.5 shrink-0 text-accent-web transition-transform duration-200 group-open:rotate-45'>
                  +
                </span>
              </summary>
              <p className='px-5 pb-5 text-sm leading-relaxed text-slate-300'>{entry.answer}</p>
            </details>
          ))}
        </div>

        <p className='mt-8 text-sm text-slate-400'>
          Etwas offen geblieben?{' '}
          <Link
            href='#kontakt'
            className='font-semibold text-accent-web underline underline-offset-4'>
            Schreib mir dein Vorhaben
          </Link>{' '}
          — du bekommst eine ehrliche Einschätzung, auch wenn ich nicht der Richtige bin.
        </p>
      </div>
    </section>
  );
}
