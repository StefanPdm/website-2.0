'use client';

import { useState } from 'react';

import GlassCard from '@/components/GlassCard';
import { SecondaryButton } from '@/app/nlp/components/Buttons';

const programs = [
  {
    title: '1:1 Tiefenwandel',
    featured: true,
    modalId: 'deep',
    points: [
      'Individuelle Diagnose & Zielklärung',
      'Intensive Prozessarbeit über 1–4 Sessions',
      'Integration in Alltag & Entscheidungen',
      'Begleitende Übungen & Follow-ups',
      'Messbarer Fortschritt zwischen den Sessions',
      'Ideal für Menschen mit klarer Veränderungsabsicht',
      'Maßgeschneiderte Interventionen für nachhaltige Transformation',
    ],
    price: 'ab € 339,15 (weitere Infos unten) ',
  },
  {
    title: 'Workshop: Sprache, die wirkt',
    featured: false,
    modalId: 'workshop',
    points: [
      'Live-Training in Kleingruppen ab 4 Personen',
      'Praktische Interventionen für Gespräche',
      'Feedback & Supervision',
      'Transfer in Job & Alltag',
      'Kommunikationskompetenz und Motivation',
      'Schritt-für-Schritt-Lösungen',
      'Nur für Firmenkunden !!!',
    ],
    price: 'ab € 1.200,00 pro Tag (zzgl. MwSt.)',
  },
  {
    title: 'NLP Essentials (Starter)',
    featured: false,
    modalId: 'starter',
    points: [
      'Grundlagen für Selbstführung',
      'Werkzeuge für Fokus & Klarheit',
      '3 Sessions + Workbook',
      'Sofort anwendbar im Alltag',
      'Ideal für NLP-Neugierige',
      'Persönlicher Fahrplan für die nächsten Schritte',
    ],
    price: 'ab € 892,50',
  },
] as const;

const programDetails = {
  deep: {
    title: '1:1 Tiefenwandel — Premium Coaching',
    lead: 'Ein intensiver, maßgeschneiderter Prozess für Menschen, die Entscheidungen klären, innere Blockaden lösen und ihre Identität bewusst ausrichten wollen.',
    highlights: [
      'Klarheit über Werte, Ziele und innere Standards.',
      'Auflösen limitierender Muster mit präzisen NLP-Interventionen.',
      'Emotionale Stabilität und Fokus – auch unter Druck.',
      'Konkrete Umsetzungsschritte für Alltag, Job und Beziehungen.',
    ],
    structure: [
      {
        title: '1. Diagnose & Zielbild',
        text: 'Wir analysieren dein aktuelles Denken, die Sprachmuster und die inneren Trigger. Daraus entsteht ein messbares Zielbild: klar, überprüfbar und emotional stimmig.',
      },
      {
        title: '2. Musterarbeit & Reframing',
        text: 'Mit NLP-Reframing, Submodalitäten und Timeline-Arbeit verändern wir die emotionale Bedeutung alter Erfahrungen. Dadurch reduziert sich innerer Druck und neue Handlungsspielräume entstehen.',
      },
      {
        title: '3. Identität & Werte',
        text: 'Wir richten dein Selbstbild neu aus. Deine Werte werden als Kompass gesetzt, damit Entscheidungen nicht mehr von äußeren Erwartungen, sondern von innerer Klarheit getragen werden.',
      },
      {
        title: '4. Verankerung & Umsetzung',
        text: 'Wir verankern neue Zustände, Routinen und Entscheidungsprozesse. Das Ergebnis: fokussiertes Handeln, das auch im Alltag stabil bleibt.',
      },
    ],
    outcomes: [
      'Entscheidungen treffen ohne Grübeln.',
      'Klar kommunizieren und Grenzen setzen.',
      'Innere Ruhe, klare Prioritäten, höhere Energie.',
      'Messbarer Fortschritt zwischen den Sessions.',
    ],
  },
  workshop: {
    title: 'Workshop — Sprache, die wirkt',
    lead: 'Ein praxisintensives Format für Teams, Führungskräfte und Selbstständige, die ihre Kommunikation schärfen und Wirkung bewusst steuern wollen.',
    highlights: [
      'Sofort anwendbare Gesprächs- und Feedbacktools.',
      'NLP-Sprachmuster für Klarheit, Motivation und Konfliktlösung.',
      'Live-Demonstrationen und Übungen mit direktem Feedback.',
      'Transfer in Meetings, Führungssituationen und Verkauf.',
    ],
    structure: [
      {
        title: '1. Wirkung der Sprache',
        text: 'Wir analysieren, wie Sprache Realität konstruiert. Du lernst, präzise zu formulieren und Missverständnisse zu vermeiden.',
      },
      {
        title: '2. Rapport & Präsenz',
        text: 'Aufbau von Vertrauen in Minuten: Körpersprache, Tonalität und Timing werden bewusst gesteuert.',
      },
      {
        title: '3. Reframing & Konfliktlösung',
        text: 'Konflikte werden durch Perspektivwechsel entschärft. Du lernst, selbst schwierige Gespräche klar und respektvoll zu führen.',
      },
      {
        title: '4. Praxis & Transfer',
        text: 'Live-Übungen, Feedback und individuelle Tipps sorgen dafür, dass du das Gelernte sofort anwenden kannst.',
      },
    ],
    outcomes: [
      'Sichere Wirkung in Gesprächen.',
      'Klarere Entscheidungen in Teams.',
      'Weniger Konflikte, mehr Kooperation.',
      'Nachhaltige Kommunikationsroutine.',
    ],
  },
  starter: {
    title: 'NLP Essentials — Starter',
    lead: 'Der Einstieg für alle, die schneller Klarheit im Kopf wollen und NLP alltagstauglich nutzen möchten.',
    highlights: [
      'Sofort einsetzbare Tools für Fokus & Selbstführung.',
      'Kurze, klare Sessions mit Übungen für den Alltag.',
      'Workbook und Übungen zur Vertiefung.',
      'Ideal für Neugierige und Einsteiger.',
    ],
    structure: [
      {
        title: '1. Fokus & innerer Zustand',
        text: 'Du lernst, deinen Zustand bewusst zu steuern und aus innerem Chaos in Klarheit zu wechseln.',
      },
      {
        title: '2. Sprache & Denken',
        text: 'NLP zeigt dir, wie Worte Gedanken prägen. Du erkennst Muster und kannst dich bewusst neu ausrichten.',
      },
      {
        title: '3. Zielbilder & Umsetzung',
        text: 'Wir erstellen klare Zielbilder und eine erste Umsetzungsstruktur, die dich sofort ins Handeln bringt.',
      },
    ],
    outcomes: [
      'Mehr Selbstkontrolle in stressigen Situationen.',
      'Klarer Fokus auf das Wesentliche.',
      'Erste NLP-Routinen für Alltag & Job.',
      'Ein persönlicher Fahrplan für die nächsten Schritte.',
    ],
  },
} as const;

export default function ProgrammeSection() {
  const [activeModal, setActiveModal] = useState<null | keyof typeof programDetails>(null);

  return (
    <>
      <section
        id='programme'
        className='relative py-20 border-y border-white/20 bg-(--section-bg-accent) flex flex-col justify-center items-center min-h-[70dvh]'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Programme</h2>
            <p className='mt-4 text-base text-white/70 sm:text-lg'>
              Wähle den Pfad, der zu deiner aktuellen Entwicklungsphase passt.
            </p>
          </div>
          <div className='mt-12 grid gap-6 lg:grid-cols-3'>
            {programs.map((program) => (
              <GlassCard
                key={program.title}
                className={`flex h-full flex-col p-6 cursor-pointer ${
                  program.featured
                    ? 'ring-1 ring-(--accent)/35 shadow-[0_0_50px_var(--glow-strong)]'
                    : ''
                }`}
                role='button'
                tabIndex={0}
                onClick={() => setActiveModal(program.modalId)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveModal(program.modalId);
                  }
                }}>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-white'>{program.title}</h3>
                  {program.featured && (
                    <span className='rounded-full bg-(--accent)/15 px-3 py-1 text-xs text-accent border border-[--border]'>
                      Premium
                    </span>
                  )}
                </div>
                <ul className='mt-5 space-y-3 text-sm text-white/75 flex-1'>
                  {program.points.map((point) => (
                    <li
                      key={point}
                      className='flex gap-2'>
                      <span className='text-accent'>•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className='mt-6 text-md text-white/60 font-bold'>{program.price}</div>
                <SecondaryButton
                  onClick={() => setActiveModal(program.modalId)}
                  className='mt-6'>
                  Details
                </SecondaryButton>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      {activeModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center px-4 py-10'
          role='dialog'
          aria-modal='true'>
          <button
            type='button'
            onClick={() => setActiveModal(null)}
            className='absolute inset-0 bg-[#050B12]/60 backdrop-blur-sm'
            aria-label='Modal schließen'
          />
          <div className='relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(255,255,255,0.65))] p-6 text-[#0B1B2B] shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,229,255,0.15),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(34,197,94,0.18),transparent_40%)] opacity-80' />
            <div className='relative z-10'>
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='text-xs uppercase tracking-[0.35em] text-[#0B1B2B]/60'>Programm</p>
                  <h3 className='mt-3 text-2xl font-semibold text-[#0B1B2B] sm:text-3xl'>
                    {programDetails[activeModal].title}
                  </h3>
                  <p className='mt-3 text-sm text-[#0B1B2B]/80 sm:text-base'>
                    {programDetails[activeModal].lead}
                  </p>
                </div>
                <button
                  type='button'
                  onClick={() => setActiveModal(null)}
                  className='inline-flex h-10 w-10 aspect-square items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
                  aria-label='Modal schließen'>
                  ✕
                </button>
              </div>
              <div className='mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
                <div className='space-y-6'>
                  <div className='rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.08)]'>
                    <p className='text-xs uppercase tracking-[0.3em] text-[#0B1B2B]/60'>
                      Highlights
                    </p>
                    <ul className='mt-4 space-y-2 text-sm text-[#0B1B2B]/80'>
                      {programDetails[activeModal].highlights.map((item) => (
                        <li
                          key={item}
                          className='flex gap-2'>
                          <span className='text-[#0B1B2B]'>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.08)]'>
                    <p className='text-xs uppercase tracking-[0.3em] text-[#0B1B2B]/60'>Ergebnis</p>
                    <ul className='mt-4 space-y-2 text-sm text-[#0B1B2B]/80'>
                      {programDetails[activeModal].outcomes.map((item) => (
                        <li
                          key={item}
                          className='flex gap-2'>
                          <span className='text-[#0B1B2B]'>✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)]'>
                  <p className='text-xs uppercase tracking-[0.3em] text-[#0B1B2B]/60'>Ablauf</p>
                  <div className='mt-4 space-y-4'>
                    {programDetails[activeModal].structure.map((step) => (
                      <div
                        key={step.title}
                        className='rounded-xl border border-white/60 bg-white/90 p-4'>
                        <p className='text-sm font-semibold text-[#0B1B2B]'>{step.title}</p>
                        <p className='mt-2 text-xs text-[#0B1B2B]/70'>{step.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className='mt-6 rounded-xl border border-white/60 bg-white/90 p-4'>
                    <p className='text-xs uppercase tracking-[0.2em] text-[#0B1B2B]/60'>
                      Nächster Schritt
                    </p>
                    <p className='mt-2 text-sm text-[#0B1B2B]/80'>
                      Buche ein kostenloses Erstgespräch. Wir klären dein Ziel, den Rahmen und ob
                      dieses Programm der richtige Hebel ist.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
