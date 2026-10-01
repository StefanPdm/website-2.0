import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import GlassCard from '@/components/GlassCard';
import { FormulaStructuredData } from '@/components/StructuredData';
import ContentDate from '@/app/nlp/components/ContentDate';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';
import {
  DISCLAIMER,
  FORMULA_LEAD,
  FORMULA_PATH,
  FORMULA_TITLE,
  STATUS_QUO,
  choiceRule,
  cSteps,
  howToSteps,
  steps,
  triggers,
} from '@/app/nlp/formel-zum-glueck/data';
import { ChoicesArt, RippleArt, STEP_ART } from '@/app/nlp/formel-zum-glueck/FormulaArt';
import FormulaMark from '@/app/nlp/formel-zum-glueck/FormulaMark';

/**
 * /nlp/formel-zum-glueck – die S-L-A-C-Formel (S² + L + A + C³).
 *
 * Inhaltsseite nach dem Muster aus CLAUDE.md §5: Kopfbereich mit Brotkrumen,
 * dann die Schritte, zum Schluss Merkkarte und Übergang ins Coaching.
 * Server Component; alle Bewegung ist CSS (Klassen `formel-*`), das
 * Einblenden beim Scrollen läuft ohne JavaScript über `animation-timeline`.
 *
 * Rhythmus: Kopf (Rand) → Wann → Schritte → C³ (Akzent) → Merkkarte → Coaching (Akzent).
 */

const title = 'Deine Formel zum Glück: S² + L + A + C³';
const description =
  'Die S-L-A-C-Formel aus dem Coaching: Stop & Smile, Look, Accept, Challenge, Choices, Choose. Sieben Schritte für den Moment, in dem ein Problem oder ein unangenehmes Gefühl hochkommt – erklärt von NLP Coach Stefan Heinemann aus Potsdam.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Formel zum Glück',
    'SLAC Formel',
    'Stop and Smile',
    'Gefühle annehmen',
    'Emotionen regulieren',
    'bessere Entscheidungen treffen',
    'Coaching Technik',
    'NLP Coaching Potsdam',
  ],
  alternates: { canonical: FORMULA_PATH },
  openGraph: {
    title,
    description,
    url: FORMULA_PATH,
    type: 'article',
    locale: 'de_DE',
    siteName: 'NLP Coaching',
  },
  twitter: { card: 'summary_large_image', title, description },
};

const [cStep] = steps.filter((step) => step.key === 'c');
const letterSteps = steps.filter((step) => step.key !== 'c');

export default function FormulaPage() {
  return (
    <article className='relative z-10'>
      <FormulaStructuredData />

      {/* Kopfbereich */}
      <section className='relative overflow-hidden border-b border-border px-4 pt-40 pb-20 md:pt-48'>
        <RippleArt className='pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-[40%] opacity-60' />
        <div className='container relative mx-auto max-w-4xl text-center'>
          <nav
            aria-label='Brotkrumen'
            className='mb-10 flex flex-wrap items-center justify-center gap-2 text-xs text-(--muted)'>
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
            <span className='text-(--text)'>Formel zum Glück</span>
          </nav>

          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Eine Technik aus dem Coaching
          </p>
          <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
            {FORMULA_TITLE}
          </h1>
          <FormulaMark
            animate
            className='mt-8 text-[clamp(2.25rem,11vw,3.75rem)] sm:text-8xl lg:text-9xl'
          />
          <p className='mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-(--muted)'>
            Die S-L-A-C-Formel
          </p>
          <p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
            {FORMULA_LEAD}
          </p>
          <div className='flex justify-center'>
            <ContentDate path={FORMULA_PATH} />
          </div>
        </div>
      </section>

      {/* Wann */}
      <section className='px-4 py-20'>
        <div className='container mx-auto max-w-5xl'>
          <h2 className='formel-reveal text-center text-3xl font-semibold text-(--text) sm:text-4xl'>
            Wann du sie anwendest
          </h2>
          <ul className='mt-10 grid gap-4 sm:grid-cols-3'>
            {triggers.map((trigger, index) => (
              <li
                key={trigger}
                className='formel-reveal rounded-2xl border border-border bg-surface p-6 text-center'>
                <span className='text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft'>
                  0{index + 1}
                </span>
                <p className='mt-3 text-base font-semibold text-(--text)'>{trigger}</p>
              </li>
            ))}
          </ul>
          <p className='formel-reveal mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-(--muted) sm:text-base'>
            Genau dann – nicht erst hinterher – gehst du die Formel durch. Schritt für Schritt,
            in dieser Reihenfolge.
          </p>
        </div>
      </section>

      {/* Schritte S², L, A */}
      <section className='px-4 pb-24'>
        <div className='container mx-auto max-w-6xl'>
          <h2 className='formel-reveal text-center text-3xl font-semibold text-(--text) sm:text-4xl'>
            Die Formel Schritt für Schritt
          </h2>

          <ol className='mt-16 space-y-24'>
            {letterSteps.map((step, index) => {
              const Art = STEP_ART[step.key];
              const reversed = index % 2 === 1;
              return (
                <li
                  key={step.key}
                  className='formel-reveal grid items-center gap-10 lg:grid-cols-2 lg:gap-16'>
                  <div className={`relative ${reversed ? 'lg:order-2' : ''}`}>
                    <span
                      aria-hidden='true'
                      className='pointer-events-none absolute -top-10 left-0 select-none bg-linear-to-br from-accent/25 to-transparent bg-clip-text text-[9rem] font-bold leading-none text-transparent sm:text-[12rem]'>
                      {step.symbol}
                      {step.power && <sup className='-top-[1.2em] text-[0.45em]'>{step.power}</sup>}
                    </span>
                    <div className='relative'>
                      <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                        Schritt {index + 1} von {steps.length}
                      </p>
                      <h3 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
                        {step.symbol}
                        {step.power && <sup className='-top-[1em] text-[0.55em]'>{step.power}</sup>}
                        <span className='text-(--muted)'> · </span>
                        {step.title}
                      </h3>
                      <p className='mt-4 text-lg font-medium text-(--text)'>{step.short}</p>
                      {step.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className='mt-4 text-sm leading-relaxed text-(--muted) sm:text-base'>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <GlassCard
                    className={`mx-auto flex aspect-square w-full max-w-sm items-center justify-center p-10 ${reversed ? 'lg:order-1' : ''}`}>
                    <Art className='h-full w-full' />
                  </GlassCard>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* C³ */}
      <section className='relative overflow-hidden border-y border-border bg-(--section-bg-accent) px-4 py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]'>
            <div className='formel-reveal'>
              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Schritt {steps.length} von {steps.length}
              </p>
              <h2 className='mt-4 text-3xl font-semibold text-(--text) sm:text-4xl'>
                C<sup className='-top-[1em] text-[0.55em]'>3</sup>
                <span className='text-(--muted)'> · </span>
                {cStep.title}
              </h2>
              <p className='mt-5 max-w-xl text-base leading-relaxed text-(--muted) sm:text-lg'>
                Jetzt bist du wieder bei dir – und erst jetzt wird entschieden. Das dritte C hat
                es in sich: Hier wird aus Nachdenken ein Schritt.
              </p>
            </div>
            <div className='formel-reveal mx-auto w-full max-w-xs'>
              <ChoicesArt className='h-full w-full' />
            </div>
          </div>

          <ol className='mt-14 grid gap-6 lg:grid-cols-3'>
            {cSteps.map((item, index) => (
              <li
                key={item.word}
                className='formel-reveal'>
                <GlassCard className='h-full p-6 sm:p-8'>
                  <p className='text-xs uppercase tracking-[0.25em] text-accent-soft'>
                    C{index + 1} · {item.word}
                  </p>
                  <h3 className='mt-4 text-lg font-semibold text-(--text)'>{item.title}</h3>
                  <p className='mt-3 text-sm leading-relaxed text-(--muted)'>{item.text}</p>
                </GlassCard>
              </li>
            ))}
          </ol>

          {/* 1 – 2 – 3: warum es drei Möglichkeiten braucht */}
          <div className='formel-reveal mt-16'>
            <h3 className='text-center text-xl font-semibold text-(--text) sm:text-2xl'>
              Warum mindestens drei?
            </h3>
            <ul className='mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3'>
              {choiceRule.map((rule) => {
                const isChoice = rule.count === 3;
                return (
                  <li
                    key={rule.count}
                    className={`rounded-2xl border p-6 text-center ${
                      isChoice
                        ? 'border-accent bg-surface-strong shadow-[0_0_40px_var(--glow)]'
                        : 'border-border bg-surface'
                    }`}>
                    <span
                      aria-hidden='true'
                      className='flex justify-center gap-2'>
                      {Array.from({ length: rule.count }, (_, dot) => (
                        <span
                          key={dot}
                          className={`h-3 w-3 rounded-full ${
                            isChoice
                              ? 'formel-float bg-linear-to-br from-accent to-accent-2'
                              : 'bg-(--muted) opacity-50'
                          }`}
                          style={isChoice ? { animationDelay: `${dot * 0.3}s` } : undefined}
                        />
                      ))}
                    </span>
                    <p className='mt-4 text-sm text-(--muted)'>{rule.label}</p>
                    <p
                      className={`mt-1 text-lg font-semibold ${isChoice ? 'text-(--text)' : 'text-(--muted)'}`}>
                      {rule.verdict}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className='mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-(--text) sm:text-base'>
              {STATUS_QUO}
            </p>
          </div>
        </div>
      </section>

      {/* Merkkarte */}
      <section className='px-4 py-24'>
        <div className='container mx-auto max-w-3xl'>
          <GlassCard className='formel-reveal p-6 sm:p-10'>
            <p className='text-center text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Zum Merken
            </p>
            <h2 className='mt-4 text-center text-2xl font-semibold text-(--text) sm:text-3xl'>
              Die Formel auf einen Blick
            </h2>
            <FormulaMark className='mt-6 text-center text-4xl sm:text-5xl' />
            <ol className='mt-10 space-y-4'>
              {howToSteps.map((step, index) => (
                <li
                  key={step.name}
                  className='flex items-start gap-4'>
                  <span className='grid h-8 w-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-accent to-accent-2 text-xs font-bold text-(--button-text)'>
                    {index + 1}
                  </span>
                  <p className='pt-1 text-sm leading-relaxed text-(--muted) sm:text-base'>
                    <strong className='font-semibold text-(--text)'>{step.name}:</strong>{' '}
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </GlassCard>
        </div>
      </section>

      {/* Übergang ins Coaching */}
      <section className='border-t border-border bg-(--section-bg-accent) px-4 py-24'>
        <div className='container mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr]'>
          <div className='formel-reveal relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl ring-1 ring-border'>
            <Image
              src='/images-nlp/portrait-treppe.webp'
              alt='Stefan Heinemann, NLP Coach aus Potsdam, lehnt an einem Treppengeländer'
              width={732}
              height={585}
              sizes='(min-width: 768px) 34vw, 90vw'
              className='h-auto w-full'
            />
          </div>
          <div className='formel-reveal'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Die Formel an deinem Thema üben
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-(--muted) sm:text-base'>
              Die Formel kannst du jederzeit allein anwenden. Richtig stark wird sie, wenn sie
              zur Gewohnheit wird – und wenn jemand mit dir auf die Wahlmöglichkeiten
              schaut, die du selbst noch nicht siehst. Genau das machen wir im Coaching.
            </p>
            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <PrimaryButton
                href='/nlp#kontakt'
                className='w-full sm:w-auto'>
                Kostenloses Erstgespräch
              </PrimaryButton>
              <SecondaryButton
                href='/nlp/regeln/gluecklichsein'
                className='w-full sm:w-auto'>
                20 Regeln fürs Glücklichsein
              </SecondaryButton>
            </div>
          </div>
        </div>
        <p className='mx-auto mt-16 max-w-3xl border-t border-border pt-6 text-xs leading-relaxed text-(--muted)'>
          {DISCLAIMER}
        </p>
      </section>
    </article>
  );
}
