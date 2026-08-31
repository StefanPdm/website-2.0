'use client';

import { useState } from 'react';

import GlassCard from '@/components/GlassCard';

export default function NlpIntroSection() {
  const [nlpModal, setNlpModal] = useState<null | 'mastery' | 'change' | 'goals'>(null);

  return (
    <>
      <section
        id='nlp'
        className='py-20 border-y border-border relative min-h-[60dvh] flex flex-col justify-center items-center'>
        <div className='container px-4 flex flex-col justify-center items-center mx-auto'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Was ist NLP?</h2>
            <p className='mt-4 text-base text-white/70 sm:text-lg'>
              Die Wissenschaft wirksamer Kommunikation & Transformation
            </p>
          </div>
          <div className='mt-12 grid gap-6 lg:grid-cols-3'>
            {[
              {
                id: 'mastery',
                title: 'Geistige Meisterschaft',
                text: 'Nutze die Macht deines Unterbewusstseins, um Fokus und Klarheit zu etablieren.',
                icon: (
                  <span
                    className='text-2xl'
                    aria-hidden='true'>
                    🧠
                  </span>
                ),
              },
              {
                id: 'change',
                title: 'Verhaltensänderung',
                text: 'Durchbreche limitierende Muster mit präzisen sprachlichen Interventionen.',
                icon: (
                  <span
                    className='text-2xl'
                    aria-hidden='true'>
                    ⟲
                  </span>
                ),
              },
              {
                id: 'goals',
                title: 'Zielerreichung',
                text: 'Setze klare innere Zielbilder und bringe Entscheidungen in den Alltag.',
                icon: (
                  <span
                    className='text-2xl'
                    aria-hidden='true'>
                    ⊙
                  </span>
                ),
              },
            ].map((feature) => (
              <GlassCard
                key={feature.title}
                className='p-6 cursor-pointer'
                role='button'
                tabIndex={0}
                onClick={() => setNlpModal(feature.id as 'mastery' | 'change' | 'goals')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setNlpModal(feature.id as 'mastery' | 'change' | 'goals');
                  }
                }}>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10'>
                    {feature.icon}
                  </div>
                  <h3 className='text-lg font-semibold text-white'>{feature.title}</h3>
                </div>
                <p className='mt-4 text-sm text-white/70'>{feature.text}</p>
                <span className='mt-5 inline-flex items-center text-sm font-semibold text-[#7DE3FF] transition group-hover:text-white'>
                  Mehr erfahren →
                </span>
              </GlassCard>
            ))}
          </div>

          {/*
            Persönliche Haltung – bewusst anders gesetzt als die drei
            Methoden-Karten darüber: keine Hover-Interaktion, mehr Leseraum,
            Akzentkante statt Icon. Der Abschnitt beantwortet das „Warum",
            nicht das „Was".
          */}
          <div className='mx-auto mt-16 w-full max-w-3xl'>
            <GlassCard className='relative overflow-hidden p-7 sm:p-9'>
              <span
                aria-hidden='true'
                className='absolute inset-y-0 left-0 w-1 bg-linear-to-b from-accent to-accent-2'
              />
              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Persönlich</p>
              <h3 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
                Was NLP für mich ganz persönlich bedeutet
              </h3>
              <div className='mt-6 space-y-5 text-(--muted)'>
                <p className='text-base leading-relaxed sm:text-lg'>
                  NLP ist für mich weit mehr als eine Sammlung von Techniken – es ist eine positive
                  Haltung zum Leben.
                </p>
                <p className='text-sm leading-relaxed sm:text-base'>
                  Es bedeutet, bewusst wahrzunehmen, statt vorschnell zu urteilen; zu wählen, statt
                  nur zu reagieren, und Verantwortung für das eigene Leben zu übernehmen. Für mich
                  heißt das, den Angst- und Überlebensmodus zu verlassen und mein Leben aus
                  Freiheit, Akzeptanz und Liebe heraus zu gestalten – mit dem Wissen, dass mein
                  Glück und meine Erfüllung nicht im Außen entstehen, sondern in mir selbst.
                </p>
                <p className='text-sm leading-relaxed sm:text-base'>
                  NLP bedeutet für mich auch anzuerkennen, dass Veränderung und Unsicherheit keine
                  Ausnahme sind, sondern zum Wesen des Lebens gehören. Es geht nicht darum, durch
                  Kontrolle eine trügerische Sicherheit zu erschaffen, sondern Vertrauen in mich
                  selbst und in meine Fähigkeit zu entwickeln, mit dem Unbekannten umzugehen.
                </p>
                <p className='text-sm leading-relaxed sm:text-base'>
                  So wird Veränderung nicht länger zu etwas, das ich fürchten oder vermeiden muss,
                  sondern zu einer Einladung, zu wachsen, neue Möglichkeiten zu entdecken und mein
                  Leben selbstbestimmt zu gestalten.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
      {nlpModal && (
        <div
          className='fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10'
          role='dialog'
          aria-modal='true'>
          <button
            type='button'
            onClick={() => setNlpModal(null)}
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            aria-label='Modal schließen'
          />
          <div className='relative w-full max-w-3xl max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white/90 p-6 text-[#1b1410] shadow-[0_30px_90px_rgba(0,0,0,0.25)]'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs uppercase tracking-[0.3em] text-[#5a4637]'>
                  {nlpModal === 'mastery'
                    ? 'Geistige Meisterschaft'
                    : nlpModal === 'change'
                      ? 'Verhaltensänderung'
                      : 'Zielerreichung'}
                </p>
                <h3 className='mt-3 text-2xl font-semibold text-[#1b1410]'>
                  {nlpModal === 'mastery'
                    ? 'Fokus, Klarheit & innere Steuerung'
                    : nlpModal === 'change'
                      ? 'Muster erkennen & neu programmieren'
                      : 'Ziele definieren & konsequent umsetzen'}
                </h3>
              </div>
              <button
                type='button'
                onClick={() => setNlpModal(null)}
                className='inline-flex h-10 w-10 aspect-square flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#1b1410] transition hover:bg-slate-100'
                aria-label='Modal schließen'>
                ✕
              </button>
            </div>
            {nlpModal === 'mastery' && (
              <div className='mt-6 grid gap-5 text-sm text-[#5a4637]'>
                <p>
                  NLP macht unbewusste Denk- und Sprachmuster sichtbar. Du lernst, deinen Fokus
                  bewusst zu steuern, innere Zustände zu regulieren und mentale Klarheit aufzubauen
                  – statt im Grübeln zu versinken.
                </p>
                <p>
                  Wir arbeiten mit Aufmerksamkeit, Sprache und inneren Bildern, um schnell vom
                  Problemfokus in lösungsorientierte Handlungsschritte zu wechseln.
                </p>
                <ul className='grid gap-2'>
                  <li>• mentale Landkarten präzisieren und neu bewerten</li>
                  <li>• innere Dialoge neu ausrichten und beruhigen</li>
                  <li>• klare Entscheidungen schneller treffen</li>
                  <li>• Fokus halten, auch unter Druck</li>
                </ul>
                <div className='rounded-2xl border border-slate-200 bg-white p-4'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#5a4637]'>
                    Tony Robbins – Inspiration
                  </p>
                  <p className='mt-2 text-sm text-[#1b1410]'>
                    Fokus, State-Management und klare Zielbilder als Hebel für nachhaltige
                    Veränderung.
                  </p>
                </div>
              </div>
            )}
            {nlpModal === 'change' && (
              <div className='mt-6 grid gap-5 text-sm text-[#5a4637]'>
                <p>
                  Verhaltensänderung beginnt bei Sprache und inneren Mustern. Wir identifizieren
                  Trigger, unterbrechen Automatismen und installieren neue, wirksame Strategien.
                </p>
                <p>
                  Dadurch entsteht ein neues Reaktionsmuster, das in Alltagssituationen stabil
                  bleibt – nicht nur im Coaching-Moment.
                </p>
                <ul className='grid gap-2'>
                  <li>• limitierende Glaubenssätze auflösen</li>
                  <li>• neue Reaktionsmuster verankern</li>
                  <li>• emotionale Stabilität aufbauen</li>
                  <li>• souverän reagieren statt impulsiv handeln</li>
                </ul>
                <div className='rounded-2xl border border-slate-200 bg-white p-4'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#5a4637]'>
                    Tony Robbins – Inspiration
                  </p>
                  <p className='mt-2 text-sm text-[#1b1410]'>
                    Change entsteht, wenn deine Standards steigen und du neue Muster konsequent
                    lebst.
                  </p>
                </div>
              </div>
            )}
            {nlpModal === 'goals' && (
              <div className='mt-6 grid gap-5 text-sm text-[#5a4637]'>
                <p>
                  Ziele werden wirksam, wenn sie emotional stimmig sind. NLP hilft, Zielbilder zu
                  klären, Hindernisse zu erkennen und Umsetzungsschritte zu verankern.
                </p>
                <p>
                  Gemeinsam übersetzen wir Visionen in konkrete Meilensteine, sodass Umsetzung
                  messbar und machbar bleibt.
                </p>
                <ul className='grid gap-2'>
                  <li>• Zielbild schärfen & priorisieren</li>
                  <li>• Motivation stabilisieren</li>
                  <li>• Umsetzung im Alltag sichern</li>
                  <li>• Fortschritt sichtbar machen</li>
                </ul>
                <div className='rounded-2xl border border-slate-200 bg-white p-4'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#5a4637]'>
                    Tony Robbins – Inspiration
                  </p>
                  <p className='mt-2 text-sm text-[#1b1410]'>
                    Klare Outcomes, starke Why-Story und messbare Schritte – so bleibt Veränderung
                    nachhaltig.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
