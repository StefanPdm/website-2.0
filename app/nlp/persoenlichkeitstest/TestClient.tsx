'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';
import {
  DISCLAIMER,
  dimensionOrder,
  dimensions,
  mixedProfileQuestions,
  questions,
  type Dimension,
} from '@/app/nlp/persoenlichkeitstest/data';
import { evaluate, percentage, verdictLabel } from '@/app/nlp/persoenlichkeitstest/scoring';
import ShareResult from '@/app/nlp/persoenlichkeitstest/ShareResult';
import TypeProfile, { MOTIFS } from '@/app/nlp/persoenlichkeitstest/TypeProfile';

/**
 * Der Test als Client-Komponente — alles andere auf der Seite bleibt Server.
 *
 * Drei Entscheidungen, die nicht beliebig sind:
 *
 * 1. **Echte Radio-Buttons** statt klickbarer `<div>`. Screenreader melden
 *    dadurch „Option 2 von 3", die Pfeiltasten funktionieren, und die zuvor
 *    gewählte Antwort ist beim Zurückblättern wieder markiert.
 * 2. **Kein Auto-Weiter** bei der Auswahl. Mit Pfeiltasten wandert die
 *    Markierung durch die Optionen — ein automatischer Sprung würde bei der
 *    ersten Taste die Frage wegschieben. Weiter erfolgt bewusst.
 * 3. **Fortschritt über `transform: scaleX`**, nicht über `width`. Breite zu
 *    animieren erzwingt Layout in jedem Frame (CLAUDE.md §9).
 *
 * Das Ergebnis lebt nur im Speicher: kein localStorage, kein Versand, keine
 * Auswertung auf dem Server. Damit entsteht keine Datenverarbeitung, die in
 * der Datenschutzerklärung stehen müsste.
 */

const LETTERS = ['A', 'B', 'C'];

/**
 * Testmodus über `?testmodus` in der Adresse – für die eigene Prüfung des
 * Ergebnisses und des Teilen-Links, ohne 17 Fragen durchzuklicken.
 *
 * Absichtlich auch in Produktion verfügbar: Die Web Share API gibt es auf dem
 * Handy nur über HTTPS, also nur auf Vercel. Für Besucher ohne den Parameter
 * ist nichts sichtbar. `useSyncExternalStore` statt useEffect+setState, damit
 * Server (immer false) und Client ohne Hydration-Konflikt auseinandergehen.
 */
const noSubscribe = () => () => {};
function useTestMode() {
  return useSyncExternalStore(
    noSubscribe,
    () => new URLSearchParams(window.location.search).has('testmodus'),
    () => false,
  );
}

export default function TestClient() {
  const testMode = useTestMode();
  const testModeRef = useRef<HTMLDivElement>(null);

  // Im Testmodus direkt zum Test scrollen – sonst landet man zuerst bei den
  // Bereichskarten oben, die auf die Typseiten verlinken.
  useEffect(() => {
    if (testMode) testModeRef.current?.scrollIntoView({ block: 'center' });
  }, [testMode]);
  const [answers, setAnswers] = useState<(Dimension | null)[]>(() =>
    Array<Dimension | null>(questions.length).fill(null),
  );
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  // Beim ersten Rendern nicht fokussieren – das würde die Seite ungefragt
  // zum Test scrollen, bevor der Besucher die Einleitung gelesen hat.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const target = showResult ? resultRef.current : headingRef.current;
    target?.focus();
  }, [index, showResult]);

  const current = questions[index];
  const selected = answers[index];
  const isLast = index === questions.length - 1;
  const answeredCount = answers.filter(Boolean).length;

  function choose(dimension: Dimension) {
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = dimension;
      return next;
    });
  }

  function goNext() {
    if (isLast) setShowResult(true);
    else setIndex((value) => value + 1);
  }

  function goBack() {
    if (showResult) setShowResult(false);
    else if (index > 0) setIndex((value) => value - 1);
  }

  /** Testmodus: Fragen 1–17 mit einem Bereich vorbelegen, zur letzten springen. */
  function jumpToLast(dimension: Dimension) {
    setAnswers(questions.map((_, i) => (i < questions.length - 1 ? dimension : null)));
    setIndex(questions.length - 1);
    setShowResult(false);
  }

  function restart() {
    setAnswers(Array<Dimension | null>(questions.length).fill(null));
    setIndex(0);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <Result
        answers={answers}
        onRestart={restart}
        onBack={goBack}
        ref={resultRef}
      />
    );
  }

  // Fortschritt zählt beantwortete Fragen, nicht die Position — sonst zeigt
  // der Balken Fortschritt an, den es noch nicht gibt.
  const progress = answeredCount / questions.length;

  return (
    <GlassCard className='relative overflow-hidden p-6 sm:p-9'>
      <div className='flex items-baseline justify-between gap-4'>
        <p className='text-xs uppercase tracking-[0.25em] text-accent-soft'>
          Frage {index + 1} von {questions.length}
        </p>
        <p className='text-xs tabular-nums text-(--muted)'>{Math.round(progress * 100)} %</p>
      </div>

      <div
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={answeredCount}
        aria-label='Beantwortete Fragen'
        className='mt-3 h-1.5 w-full overflow-hidden rounded-full bg-(--surface-strong)'>
        <div
          aria-hidden='true'
          className='h-full w-full origin-left rounded-full bg-linear-to-r from-accent to-accent-2 transition-transform duration-500 ease-out'
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {testMode && (
        <div
          ref={testModeRef}
          className='mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-border-strong p-3 text-xs text-(--muted)'>
          <span>
            Testmodus – Fragen 1–{questions.length - 1} vorbelegen, weiter zu Frage{' '}
            {questions.length}:
          </span>
          {dimensionOrder.map((dimension) => (
            <button
              key={dimension}
              type='button'
              onClick={() => jumpToLast(dimension)}
              className='min-h-11 cursor-pointer rounded-full bg-surface px-4 font-semibold text-(--text) ring-1 ring-border transition hover:bg-surface-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
              {dimensions[dimension].area} → Frage {questions.length}
            </button>
          ))}
        </div>
      )}

      <fieldset className='mt-8 border-0 p-0'>
        <legend className='sr-only'>
          Frage {index + 1} von {questions.length}
        </legend>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className='text-xl font-semibold leading-snug text-(--text) focus-visible:outline-none sm:text-2xl'>
          {current.text}
        </h2>

        <div className='mt-7 space-y-3'>
          {current.options.map((option, optionIndex) => {
            const isChosen = selected === option.dimension;
            return (
              <label
                key={option.text}
                className='block cursor-pointer'>
                <input
                  type='radio'
                  name={`frage-${index}`}
                  value={option.dimension}
                  checked={isChosen}
                  onChange={() => choose(option.dimension)}
                  className='peer sr-only'
                />
                <span
                  className={`flex items-start gap-4 rounded-2xl border p-4 transition duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-(--accent) ${
                    isChosen
                      ? 'border-(--accent) bg-(--surface-strong) shadow-[0_0_30px_var(--glow)]'
                      : 'border-(--border) bg-(--surface) hover:border-(--border-strong)'
                  }`}>
                  <span
                    aria-hidden='true'
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                      isChosen
                        ? 'bg-linear-to-br from-accent to-accent-2 text-[var(--button-text)]'
                        : 'border border-(--border) text-(--muted)'
                    }`}>
                    {LETTERS[optionIndex]}
                  </span>
                  <span className='text-sm leading-relaxed text-(--text) sm:text-base'>
                    {option.text}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className='mt-8 flex flex-wrap items-center gap-3'>
        <PrimaryButton
          onClick={goNext}
          disabled={!selected}>
          {isLast ? 'Auswertung anzeigen' : 'Weiter'}
        </PrimaryButton>
        {index > 0 && <SecondaryButton onClick={goBack}>Zurück</SecondaryButton>}
        {!selected && (
          <p className='text-xs text-(--muted)'>Bitte wähle eine Antwort.</p>
        )}
      </div>
    </GlassCard>
  );
}

/** Balken für einen Bereich — ebenfalls über `scaleX` statt `width`. */
function ScoreBar({
  dimension,
  points,
  isTop,
}: {
  dimension: Dimension;
  points: number;
  isTop: boolean;
}) {
  const percent = percentage(points);
  const Motif = MOTIFS[dimension];

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        isTop
          ? 'border-(--accent) bg-(--surface-strong) shadow-[0_0_40px_var(--glow)]'
          : 'border-(--border) bg-(--surface)'
      }`}>
      <div className='flex items-center gap-3'>
        <Motif className='h-9 w-9 shrink-0' />
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold text-(--text)'>
            {dimensions[dimension].area}
          </p>
          <p className='truncate text-xs text-(--muted)'>{dimensions[dimension].type}</p>
        </div>
      </div>
      <div className='mt-4 h-1.5 w-full overflow-hidden rounded-full bg-(--surface-strong)'>
        <div
          aria-hidden='true'
          className='h-full w-full origin-left rounded-full bg-linear-to-r from-accent to-accent-2 transition-transform duration-700 ease-out'
          style={{ transform: `scaleX(${percent / 100})` }}
        />
      </div>
      <p className='mt-3 text-xs tabular-nums text-(--muted)'>
        <span className='font-semibold text-(--text)'>{points}</span> von {questions.length}{' '}
        Punkten · {percent} %
      </p>
    </div>
  );
}

function Result({
  answers,
  onRestart,
  onBack,
  ref,
}: {
  answers: (Dimension | null)[];
  onRestart: () => void;
  onBack: () => void;
  ref: React.Ref<HTMLDivElement>;
}) {
  const { scores, ranked, verdict } = evaluate(answers);

  // Wie viele Beschreibungen gezeigt werden, hängt an der Eindeutigkeit des
  // Ergebnisses. Bei einem Gleichstand nur den erstplatzierten Bereich zu
  // zeigen wäre die bequemere, aber unehrliche Variante.
  const shown =
    verdict === 'ausgeglichen' ? ranked : verdict === 'mischprofil' ? ranked.slice(0, 2) : [ranked[0]];
  const isAmbiguous = verdict === 'ausgeglichen' || verdict === 'mischprofil';

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className='focus-visible:outline-none'>
      <GlassCard className='p-6 sm:p-9'>
        <p className='text-xs uppercase tracking-[0.25em] text-accent-soft'>Dein Ergebnis</p>
        <h2 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
          {verdictLabel[verdict]}
        </h2>
        <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
          Alle drei Werte stehen bewusst nebeneinander. Jeder Mensch nutzt alle drei Bereiche —
          das Ergebnis zeigt nur, welchen davon du in diesen 18 Situationen am
          selbstverständlichsten gewählt hast.
        </p>

        <div className='mt-8 grid gap-4 sm:grid-cols-3'>
          {dimensionOrder.map((dimension) => (
            <ScoreBar
              key={dimension}
              dimension={dimension}
              points={scores[dimension]}
              isTop={!isAmbiguous && dimension === ranked[0]}
            />
          ))}
        </div>
      </GlassCard>

      {isAmbiguous && (
        <GlassCard className='mt-6 p-6 sm:p-9'>
          <h3 className='text-lg font-semibold text-(--text)'>
            {verdict === 'ausgeglichen'
              ? 'Alle drei Bereiche sind bei dir gleich stark'
              : 'Zwei Bereiche sind bei dir nahezu gleich stark'}
          </h3>
          <p className='mt-4 text-sm leading-relaxed text-(--muted) sm:text-base'>
            Dein Ergebnis weist nicht auf eine eindeutige Bevorzugung hin. Vermutlich nutzt du je
            nach Situation unterschiedliche Zugänge. Lies deshalb die folgenden Beschreibungen und
            beobachte dich an diesen Fragen:
          </p>
          <ul className='mt-5 space-y-2'>
            {mixedProfileQuestions.map((question) => (
              <li
                key={question}
                className='flex items-start gap-3 text-sm text-(--muted)'>
                <span
                  aria-hidden='true'
                  className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r from-accent to-accent-2'
                />
                {question}
              </li>
            ))}
          </ul>
          <p className='mt-5 text-sm leading-relaxed text-(--muted)'>
            Gerade der Unterschied zwischen deinem spontanen und deinem erlernten Verhalten kann
            aufschlussreich sein.
          </p>
        </GlassCard>
      )}

      {verdict === 'leicht' && (
        <p className='mt-6 rounded-2xl border border-(--border) bg-(--surface) p-5 text-sm leading-relaxed text-(--muted)'>
          Der Abstand zum zweitstärksten Bereich —{' '}
          <span className='text-(--text)'>{dimensions[ranked[1]].area}</span> — beträgt nur einen
          Punkt. Lies die folgende Beschreibung deshalb als Tendenz, nicht als Einordnung.
        </p>
      )}

      {shown.map((dimension) => (
        <TypeProfile
          key={dimension}
          dimension={dimension}
        />
      ))}

      <GlassCard className='mt-6 p-6 sm:p-9'>
        <h3 className='text-lg font-semibold text-(--text) sm:text-xl'>
          Mein Ergebnis persönlich reflektieren
        </h3>
        <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
          Möchtest du erfahren, wie sich dein bevorzugter Bereich auf deine Beziehungen,
          Entscheidungen, Konflikte und persönliche Entwicklung auswirkt? In einem persönlichen
          Gespräch betrachten wir dein Ergebnis differenziert — ohne dich in eine Schublade zu
          stecken.
        </p>
        <div className='mt-7 flex flex-wrap gap-3'>
          <PrimaryButton href='/nlp#kontakt'>Kostenloses Erstgespräch</PrimaryButton>
          <SecondaryButton onClick={onRestart}>Test wiederholen</SecondaryButton>
          <SecondaryButton onClick={onBack}>Letzte Frage ansehen</SecondaryButton>
        </div>
        <div className='mt-6 border-t border-(--border) pt-6'>
          <ShareResult dimension={ranked[0]} />
        </div>
      </GlassCard>

      <p className='mt-8 border-t border-(--border) pt-6 text-xs leading-relaxed text-(--muted)'>
        {DISCLAIMER}
      </p>
    </div>
  );
}
