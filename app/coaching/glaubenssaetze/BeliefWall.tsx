'use client';

import { useRef, useState } from 'react';
import { ArrowRightLeft, Check, Eye } from 'lucide-react';

import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import {
  allBeliefs,
  beliefAreas,
  coachingQuestions,
  type Belief,
} from '@/app/coaching/glaubenssaetze/data';
import ReportDownload from '@/app/coaching/glaubenssaetze/ReportDownload';
import ShareTest from '@/app/coaching/components/ShareTest';

/**
 * Satz-Wand: kein Formular, sondern Sätze zum Antippen. Ein angetippter Satz
 * leuchtet auf (= „kenne ich von mir“). Die Auswahl bleibt im Browser –
 * nichts wird gespeichert oder übertragen.
 *
 * Auswertung: Landkarte der zehn Bereiche, dann jeder markierte Satz mit zwei
 * Schritten – die fünf Fragen (ins Wanken bringen) und das Gegenteil, das man
 * erst selbst formuliert und dann aufdeckt. Die Umkehrung ist von Byron Katies
 * „The Work“ beeinflusst; Fragen und Gegenteile sind Stefans eigene Fassung.
 */
export default function BeliefWall() {
  const [picked, setPicked] = useState<Set<number>>(() => new Set());
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggle = (id: number) =>
    setPicked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const openResult = () => {
    setShowResult(true);
    // Nach dem Rendern hinscrollen und den Fokus setzen (Screenreader hören die Überschrift)
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      resultRef.current?.focus({ preventScroll: true });
    });
  };

  const reset = () => {
    setPicked(new Set());
    setShowResult(false);
    document.getElementById('satz-wand')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const counts = beliefAreas.map((entry) => ({
    ...entry,
    count: entry.beliefs.filter((belief) => picked.has(belief.id)).length,
  }));
  const max = Math.max(...counts.map((entry) => entry.count));
  const loudest = max > 0 ? counts.filter((entry) => entry.count === max) : [];

  return (
    <div>
      <div
        id='satz-wand'
        className='relative scroll-mt-32'>
        <ul className='grid gap-6 lg:grid-cols-2'>
          {counts.map((entry, index) => (
            <li
              key={entry.id}
              className='rounded-2xl border border-card-border bg-surface-strong p-6 shadow-[0_10px_40px_var(--card-shade)] sm:p-7'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-xs font-semibold tracking-[0.2em] text-accent-soft'>
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className='mt-2 text-lg font-semibold text-(--text)'>{entry.title}</h3>
                  <p className='mt-1 text-sm text-(--muted)'>{entry.fear}</p>
                </div>
                <Dots
                  count={entry.count}
                  total={entry.beliefs.length}
                />
              </div>

              <ul className='mt-5 space-y-2.5'>
                {entry.beliefs.map((belief) => {
                  const on = picked.has(belief.id);
                  return (
                    <li key={belief.id}>
                      <button
                        type='button'
                        aria-pressed={on}
                        onClick={() => toggle(belief.id)}
                        className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-snug transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-base ${
                          on
                            ? 'border-accent bg-(--surface-strong) text-(--text) shadow-[0_0_28px_var(--glow-strong)]'
                            : 'border-border bg-surface text-(--muted) hover:border-border-strong hover:text-(--text)'
                        }`}>
                        <span
                          aria-hidden='true'
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition duration-200 ${
                            on
                              ? 'border-transparent bg-linear-to-br from-(--accent) to-(--accent-2) text-(--button-text)'
                              : 'border-border-strong'
                          }`}>
                          {on && <Check className='h-3.5 w-3.5' />}
                        </span>
                        <span>„{belief.text}“</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        {/* Leiste klebt am unteren Rand, solange man durch die Wand scrollt */}
        <div className='sticky bottom-4 z-20 mx-auto mt-10 flex max-w-xl items-center justify-between gap-4 rounded-full border border-card-border bg-surface-strong py-2 pl-6 pr-2 shadow-[0_20px_50px_var(--card-shade)] backdrop-blur-md'>
          <p
            className='text-sm text-(--muted)'
            aria-live='polite'>
            <span className='text-lg font-semibold text-(--text)'>{picked.size}</span> von{' '}
            {allBeliefs.length} markiert
          </p>
          <PrimaryButton
            onClick={openResult}
            disabled={picked.size === 0}>
            {showResult ? 'Zur Auswertung' : 'Auswerten'}
          </PrimaryButton>
        </div>
      </div>

      {showResult && (
        <div
          ref={resultRef}
          tabIndex={-1}
          aria-labelledby='auswertung-titel'
          className='mt-16 scroll-mt-32 rounded-3xl border border-card-border bg-surface-strong p-6 shadow-[0_10px_40px_var(--card-shade),0_0_44px_var(--glow)] focus:outline-none sm:p-10'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Auswertung</p>
          <h3
            id='auswertung-titel'
            className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
            Deine Landkarte
          </h3>

          {loudest.length > 0 ? (
            <p className='mt-4 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              Du hast <strong className='font-semibold text-(--text)'>{picked.size}</strong> von{' '}
              {allBeliefs.length} Sätzen bei dir wiedererkannt. Am lautesten{' '}
              {loudest.length === 1 ? 'ist der Bereich' : 'sind die Bereiche'}{' '}
              <strong className='font-semibold text-(--text)'>
                {loudest.map((entry) => entry.title).join(' und ')}
              </strong>
              {loudest.length === 1 && <> – {lowerFirst(loudest[0].fear.replace(/\.$/, ''))}</>}.
            </p>
          ) : (
            <p className='mt-4 text-base text-(--muted)'>
              Gerade ist kein Satz markiert. Tippe oben an, was du von dir kennst.
            </p>
          )}

          <ul className='mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2'>
            {counts.map((entry) => (
              <li
                key={entry.id}
                className={`flex items-center justify-between gap-4 border-b border-border pb-3 text-sm ${
                  entry.count === max && max > 0 ? 'text-(--text)' : 'text-(--muted)'
                }`}>
                <span>{entry.title}</span>
                <Dots
                  count={entry.count}
                  total={entry.beliefs.length}
                />
              </li>
            ))}
          </ul>

          {/* So arbeitest du mit jedem Satz – zwei Schritte */}
          <div className='mt-12 rounded-2xl bg-(--section-bg-accent) p-6 sm:p-8'>
            <h4 className='text-lg font-semibold text-(--text) sm:text-xl'>
              So arbeitest du mit jedem Satz
            </h4>
            <p className='mt-2 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              Nimm dir einen Satz nach dem anderen vor – am besten schriftlich und ohne Eile.
              Beginne mit dem, der sich am schwersten anfühlt.
            </p>
            <div className='mt-6 grid gap-8 lg:grid-cols-2'>
              <div>
                <p className='flex items-center gap-3 text-base font-semibold text-(--text)'>
                  <StepNumber n={1} />
                  Bring ihn ins Wanken
                </p>
                <ol className='mt-4 space-y-2.5 pl-11'>
                  {coachingQuestions.map((entry, index) => (
                    <li
                      key={entry.question}
                      className='text-sm leading-relaxed text-(--muted)'>
                      <span className='font-semibold text-accent'>{index + 1}.</span>{' '}
                      {entry.question}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className='flex items-center gap-3 text-base font-semibold text-(--text)'>
                  <StepNumber n={2} />
                  Dreh ihn um
                </p>
                <p className='mt-4 pl-11 text-sm leading-relaxed text-(--muted)'>
                  Was wäre das Gegenteil deines Glaubenssatzes? Formuliere es erst selbst, dann
                  deck meinen Vorschlag auf. Und dann such drei Beispiele aus deinem Leben, in
                  denen das Gegenteil mindestens genauso wahr ist.
                </p>
                <p className='mt-3 pl-11 text-sm leading-relaxed text-(--subtle)'>
                  Das Gegenteil ist kein neuer Satz zum Auswendiglernen, sondern eine Gegenprobe.
                </p>
              </div>
            </div>
          </div>

          {/* Die markierten Sätze, nach Bereich – mit Gegenteil zum Aufdecken */}
          {picked.size > 0 && (
            <div className='mt-12'>
              <h4 className='text-lg font-semibold text-(--text) sm:text-xl'>
                {picked.size === 1 ? 'Dein Glaubenssatz' : `Deine ${picked.size} Glaubenssätze`}
              </h4>
              <div className='mt-6 space-y-10'>
                {counts
                  .filter((entry) => entry.count > 0)
                  .map((entry) => (
                    <div key={entry.id}>
                      <p className='text-xs uppercase tracking-[0.2em] text-accent-soft'>
                        {entry.title}
                      </p>
                      <ul className='mt-4 grid gap-4 md:grid-cols-2'>
                        {entry.beliefs
                          .filter((belief) => picked.has(belief.id))
                          .map((belief) => (
                            <li key={belief.id}>
                              <OppositeCard belief={belief} />
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {picked.size > 0 && <ReportDownload picked={picked} />}

          <div className='mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center'>
            <SecondaryButton href='#fragen'>Die Fragen ausführlich</SecondaryButton>
            <ShareTest
              path='/coaching/glaubenssaetze'
              text='Welche Glaubenssätze halten dich klein? 50 Sätze zum Antippen – finde es in 5 Minuten heraus.'
            />
            <button
              type='button'
              onClick={reset}
              className='min-h-11 cursor-pointer rounded-full px-4 text-sm text-(--muted) underline underline-offset-4 transition hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
              Neu beginnen
            </button>
          </div>

          <p className='mt-6 text-xs text-(--subtle)'>
            Deine Auswahl bleibt in deinem Browser. Sie wird nicht gespeichert und nicht übertragen.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Ein markierter Satz mit seinem Gegenteil. Das Gegenteil bleibt verdeckt,
 * bis man selbst überlegt hat – erst dann „Aufdecken“.
 */
function OppositeCard({ belief }: { belief: Belief }) {
  const [open, setOpen] = useState(false);
  const panelId = `gegenteil-${belief.id}`;
  return (
    <div className='flex h-full flex-col rounded-2xl border border-card-border bg-(--surface) p-5'>
      <p className='text-base font-semibold leading-snug text-(--text)'>„{belief.text}“</p>
      <div className='mt-auto pt-5'>
        {open ? (
          <div
            id={panelId}
            className='belief-reveal flex items-start gap-3 rounded-xl border border-border-strong bg-surface-strong p-4 shadow-[0_0_28px_var(--glow)]'>
            <ArrowRightLeft
              aria-hidden='true'
              className='mt-0.5 h-4 w-4 shrink-0 text-accent'
            />
            <p className='text-sm leading-relaxed text-(--text)'>
              <span className='sr-only'>Mögliches Gegenteil: </span>„{belief.opposite}“
            </p>
          </div>
        ) : (
          <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-border-strong p-3 pl-4'>
            <span className='text-sm text-(--muted)'>Was wäre das Gegenteil?</span>
            <button
              type='button'
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(true)}
              className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-surface-strong px-4 text-sm font-semibold text-(--text) ring-1 ring-border transition duration-200 hover:ring-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
              <Eye
                aria-hidden='true'
                className='h-4 w-4 text-accent'
              />
              Aufdecken
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden='true'
      className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--accent) to-(--accent-2) text-sm font-semibold text-(--button-text)'>
      {n}
    </span>
  );
}

/** „Die Angst …“ → „die Angst …“ nach dem Gedankenstrich. */
function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/** Fünf Punkte je Bereich, gefüllt = markiert. */
function Dots({ count, total }: { count: number; total: number }) {
  return (
    <span
      className='flex shrink-0 gap-1.5 pt-1'
      role='img'
      aria-label={`${count} von ${total} markiert`}>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={`h-2 w-2 rounded-full transition duration-200 ${
            index < count ? 'bg-accent shadow-[0_0_8px_var(--glow-strong)]' : 'bg-border-strong'
          }`}
        />
      ))}
    </span>
  );
}
