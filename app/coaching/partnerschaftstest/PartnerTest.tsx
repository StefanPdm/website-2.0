'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import ShareTest from '@/app/coaching/components/ShareTest';
import { INTRO, OUTRO, partnerQuestions } from '@/app/coaching/partnerschaftstest/data';

/**
 * Fünf Fragen, eine nach der anderen – zwei große Antwortflächen statt
 * Formular. Bewusst ohne Auswertung: Am Ende steht Stefans Schlusstext, die
 * Antwort gibt sich der Besucher selbst. Antworten bleiben im Browser. Nach jeder Antwort springt der Fokus
 * auf die nächste Frage (Screenreader hören sie vor).
 */
export default function PartnerTest() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const total = partnerQuestions.length;
  const step = answers.length;
  const done = step === total;

  const focusHeading = () => requestAnimationFrame(() => headingRef.current?.focus());

  const answer = (value: boolean) => {
    setAnswers((current) => [...current, value]);
    focusHeading();
  };
  const back = () => {
    setAnswers((current) => current.slice(0, -1));
    focusHeading();
  };
  const restart = () => {
    setAnswers([]);
    focusHeading();
  };

  return (
    <div className='rounded-3xl border border-card-border bg-surface-strong p-6 shadow-[0_10px_40px_var(--card-shade),0_0_44px_var(--glow)] sm:p-10'>
      {/* Fortschritt: fünf Punkte wie im Teaser */}
      <ol
        className='flex select-none items-center justify-center gap-2'
        aria-label='Fortschritt'>
        {partnerQuestions.map((entry, index) => {
          const state = index < step ? 'done' : index === step && started && !done ? 'now' : 'open';
          return (
            <li
              key={entry.question}
              aria-current={state === 'now' ? 'step' : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition duration-200 ${
                state === 'done'
                  ? 'bg-linear-to-br from-(--accent) to-(--accent-2) text-(--button-text)'
                  : state === 'now'
                    ? 'text-(--text) ring-2 ring-accent'
                    : 'text-(--muted) ring-1 ring-border-strong'
              }`}>
              <span className='sr-only'>Frage </span>
              {index + 1}
            </li>
          );
        })}
      </ol>

      {/* Feste Bühnenhöhe (.partner-stage): Der Kasten springt zwischen Einleitung, Fragen und Schluss nicht */}
      <div className='partner-stage mt-10 flex flex-col justify-center'>
        {!started ? (
          <div className='text-center'>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className='mx-auto max-w-2xl text-xl font-semibold leading-snug text-(--text) focus:outline-none sm:text-2xl'>
              <Emphasize text={INTRO} />
            </h2>
            <div className='mt-10 flex justify-center'>
              <PrimaryButton
                onClick={() => {
                  setStarted(true);
                  focusHeading();
                }}
                className='w-full sm:w-auto'>
                Ja, ich bin bereit
              </PrimaryButton>
            </div>
          </div>
        ) : !done ? (
          <div
            key={step}
            className='partner-question'>
            <p className='text-center text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Frage {step + 1} von {total}
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className='mx-auto mt-4 max-w-2xl text-center text-xl font-semibold leading-snug text-(--text) focus:outline-none sm:text-2xl'>
              {partnerQuestions[step].question}
            </h2>
            <div className='mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2'>
              {[
                { label: partnerQuestions[step].yes, value: true },
                { label: partnerQuestions[step].no, value: false },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  type='button'
                  onClick={() => answer(value)}
                  className='min-h-20 cursor-pointer rounded-2xl border border-border bg-surface px-5 py-4 text-base font-semibold text-(--text) transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_28px_var(--glow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                  {label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <div className='mt-8 flex justify-center'>
                <button
                  type='button'
                  onClick={back}
                  className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm text-(--muted) transition hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                  <ArrowLeft
                    aria-hidden='true'
                    className='h-4 w-4'
                  />
                  Zurück
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='partner-question text-center'>
            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Und?</p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className='mt-4 text-4xl font-semibold tracking-tight text-(--text) focus:outline-none sm:text-5xl'>
              <span className='sr-only'>Lebenspartner oder Lebenslektion?</span>
              {/* Bewusst kein Urteil: Die Endung wechselt weiter – entscheiden tut der Besucher */}
              <span aria-hidden='true'>
                Lebens
                <span className='word-flip'>
                  <span className='word-flip__a'>partner</span>
                  <span className='word-flip__b'>lektion</span>
                </span>
                ?
              </span>
            </h2>
            <p className='mx-auto mt-8 max-w-xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              <Emphasize text={OUTRO} />
            </p>
            <p className='mx-auto mt-4 max-w-xl text-base font-semibold text-(--text) sm:text-lg'>
              Stimmt&apos;s?
            </p>

            {/* Übersicht der eigenen Antworten – neutral, ohne Wertung */}
            <div className='mx-auto mt-10 max-w-2xl text-left'>
              <h3 className='text-center text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Deine Antworten
              </h3>
              <ol className='mt-5 space-y-3'>
                {partnerQuestions.map((entry, index) => (
                  <li
                    key={entry.question}
                    className='flex gap-4 rounded-2xl border border-border bg-surface p-4 sm:p-5'>
                    <span
                      aria-hidden='true'
                      className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--accent) to-(--accent-2) text-xs font-semibold text-(--button-text)'>
                      {index + 1}
                    </span>
                    <div>
                      <p className='text-sm leading-relaxed text-(--muted)'>
                        <span className='sr-only'>Frage {index + 1}: </span>
                        {entry.question}
                      </p>
                      <p className='mt-2 text-sm font-semibold text-(--text) sm:text-base'>
                        <span className='sr-only'>Deine Antwort: </span>„
                        {answers[index] ? entry.yes : entry.no}“
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <SecondaryButton href='/coaching#kontakt'>Darüber sprechen</SecondaryButton>
              <ShareTest
                path='/coaching/partnerschaftstest'
                text='Lebenspartner oder Lebenslektion? Fünf ehrliche Fragen – die Antwort spürst du selbst.'
              />
              <button
                type='button'
                onClick={restart}
                className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm text-(--muted) underline underline-offset-4 transition hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                <RotateCcw
                  aria-hidden='true'
                  className='h-4 w-4'
                />
                Noch einmal
              </button>
            </div>
            <p className='mt-6 text-xs text-(--subtle)'>
              Deine Antworten bleiben in deinem Browser. Sie werden nicht gespeichert und nicht
              übertragen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** „Lebenspartner“ und „Lebenslektion“ fett und in Kupfer hervorheben. */
function Emphasize({ text }: { text: string }) {
  return (
    <>
      {text.split(/(Lebenspartner|Lebenslektion)/).map((part, index) =>
        index % 2 === 1 ? (
          <strong
            key={index}
            className='font-bold text-accent'>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
