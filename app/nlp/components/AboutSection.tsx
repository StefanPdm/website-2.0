'use client';

import { useState } from 'react';
import Image from 'next/image';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';

export default function AboutSection() {
  const [aboutModal, setAboutModal] = useState<null | 'before' | 'education'>(null);

  return (
    <>
      <section
        id='ueber'
        className='py-40 relative min-h-[60dvh] flex flex-col justify-center items-center bg-(--section-bg-accent)'>
        <div className='container px-4 mx-auto'>
          <div className='grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
            <GlassCard className='p-6'>
              <div className='relative overflow-hidden rounded-2xl bg-white/5'>
                <div className='aspect-5/4 w-full'>
                  <Image
                    src='/images-nlp/portrait-workshop.png'
                    alt='Stefan Heinemann'
                    fill
                    className='object-cover object-top transition duration-500 ease-out group-hover:opacity-0'
                    sizes='(min-width: 1024px) 40vw, 80vw'
                  />
                  <Image
                    src='/images-nlp/portrait-treppe.png'
                    alt='Stefan Heinemann im Coaching'
                    fill
                    className='object-cover object-top opacity-0 transition duration-500 ease-out group-hover:opacity-100'
                    sizes='(min-width: 1024px) 40vw, 80vw'
                  />
                </div>
                <div className='absolute inset-0 ring-1 ring-white/10' />
              </div>
              <div className='mt-5 space-y-2 text-sm text-white/70'>
                <p>
                  <span className='font-bold text-white'>Schwerpunkte:</span> Identität
                  &nbsp;|&nbsp; Entscheidungen &nbsp;|&nbsp; innere Ausrichtung.
                </p>
                <p>
                  <span className='font-bold text-white'>Formate:</span> 1:1 Sessions &nbsp;|&nbsp;
                  Workshops &nbsp;|&nbsp; Keynotes.
                </p>
              </div>
              <div className='mt-6 flex flex-wrap gap-3 justify-end '>
                <SecondaryButton onClick={() => setAboutModal('before')}>
                  Mein Weg vor NLP
                </SecondaryButton>
                <PrimaryButton onClick={() => setAboutModal('education')}>
                  Aus- & Weiterbildungen
                </PrimaryButton>
              </div>
            </GlassCard>
            <div>
              <p className='text-xs uppercase tracking-[0.3em] text-[#7DE3FF]'>Über mich</p>
              <h2 className='mt-4 text-3xl font-semibold text-white sm:text-4xl'>
                Stefan Heinemann
              </h2>
              <p className='mt-4 text-base text-white/70 sm:text-lg'>
                Ich begleite Menschen dabei, aus innerem Chaos klare Entscheidungen zu formen. NLP
                nutze ich pragmatisch: als Werkzeugkasten für Fokus, emotionale Stabilität und
                zielgerichtetes Handeln – ohne leere Versprechen.
              </p>
              <div className='mt-6 flex flex-wrap gap-3'>
                {['NLP Coach', 'Identität & Entscheidungen', 'Potsdam'].map((item) => (
                  <span
                    key={item}
                    className='rounded-full border border-[--border] bg-white/5 px-4 py-2 text-xs text-white/80'>
                    {item}
                  </span>
                ))}
              </div>

              <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                {[
                  {
                    title: 'Klarheit statt Overload',
                    text: 'Gedanken sortieren, Entscheidungen treffen, Energie bündeln.',
                  },
                  {
                    title: 'Ruhiger Körper, wacher Geist',
                    text: 'Emotionen regulieren und den Fokus halten – auch unter Druck.',
                  },
                ].map((item) => (
                  <GlassCard
                    key={item.title}
                    className='p-5'>
                    <h3 className='text-base font-semibold text-white'>{item.title}</h3>
                    <p className='mt-2 text-sm text-white/70'>{item.text}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {aboutModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center px-4 py-10'
          role='dialog'
          aria-modal='true'>
          <button
            type='button'
            onClick={() => setAboutModal(null)}
            className='absolute inset-0 bg-[#050B12]/60 backdrop-blur-sm'
            aria-label='Modal schließen'
          />
          <div className='relative w-full max-w-3xl rounded-3xl border border-white/60 bg-[linear-gradient(140deg,rgba(255,255,255,0.95),rgba(230,247,255,0.86))] p-6 text-[#0B1B2B] shadow-[0_30px_90px_rgba(0,229,255,0.25)] backdrop-blur-xl'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs uppercase tracking-[0.3em] text-[#0B1B2B]/70'>
                  {aboutModal === 'before' ? 'Vor NLP' : 'Aus- & Weiterbildungen'}
                </p>
                <h3 className='mt-3 text-2xl font-semibold text-[#0B1B2B]'>
                  {aboutModal === 'before'
                    ? 'Mein beruflicher Weg vor NLP'
                    : 'Meine Aus- & Weiterbildungen + Interessen'}
                </h3>
              </div>
              <button
                type='button'
                onClick={() => setAboutModal(null)}
                className='cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900'
                aria-label='Modal schließen'>
                ✕
              </button>
            </div>
            {aboutModal === 'before' ? (
              <div className='mt-6 space-y-6 text-sm text-[#0B1B2B]/80'>
                <p>
                  Vor NLP lag mein Fokus auf Führung, Projektsteuerung und kommunikativer Präzision.
                  In dynamischen Umfeldern habe ich Teams durch Veränderungen begleitet und gelernt,
                  wie sehr innere Klarheit Entscheidungen, Stimmung und Ergebnisqualität
                  beeinflusst.
                </p>
                <div className='grid gap-4 sm:grid-cols-3'>
                  {[
                    { icon: '💼', title: '8+ Jahre', text: 'Praxis in Führung & Beratung' },
                    { icon: '🧭', title: '120+ Projekte', text: 'Struktur & Umsetzung' },
                    { icon: '⚡', title: 'Fokus-Methoden', text: 'alltagstauglich & messbar' },
                  ].map((fact) => (
                    <div
                      key={fact.title}
                      className='rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_10px_30px_rgba(0,229,255,0.12)]'>
                      <div className='text-xl'>{fact.icon}</div>
                      <p className='mt-2 text-sm font-semibold text-[#0B1B2B]'>{fact.title}</p>
                      <p className='mt-1 text-xs text-[#0B1B2B]/70'>{fact.text}</p>
                    </div>
                  ))}
                </div>
                <div className='rounded-2xl border border-white/60 bg-white/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#0B1B2B]/60'>
                    💡 Erkenntnis
                  </p>
                  <p className='mt-2 text-sm text-[#0B1B2B]/80'>
                    Je klarer Sprache und innere Ausrichtung, desto schneller entstehen ruhige,
                    tragfähige Entscheidungen.
                  </p>
                </div>
              </div>
            ) : (
              <div className='mt-6 grid gap-6'>
                <div className='space-y-3 text-sm text-[#0B1B2B]/80'>
                  <p>
                    Meine Aus- und Weiterbildungen bündeln NLP, Kommunikation und moderne
                    Coaching-Methoden. Ergänzend fließen Mentaltraining und systemische Werkzeuge
                    ein – pragmatisch, wirksam, messbar.
                  </p>
                </div>
                <div className='rounded-2xl border border-white/60 bg-white/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#0B1B2B]/60'>
                    🎓 Ausbildungen
                  </p>
                  <ol className='mt-4 space-y-4 border-l border-[#0B1B2B]/15 pl-5'>
                    {[
                      {
                        year: 'Best Life NLP - Ronny Rhode',
                        title: 'NLP Practitioner',
                        text: 'Grundlagen, Sprache, Wahrnehmung & Reframing.',
                      },
                      {
                        year: 'Neures - DVNLP',
                        title: 'NLP Practitioner (Zweitausbildung)',
                        text: 'Vertiefung: Identität, Wertearbeit & Change-Strategien.',
                      },
                      {
                        year: 'Best Life NLP - Ronny Rhode',
                        title: 'NLP Master',
                        text: 'Zielarbeit, Ressourcenaktivierung, Umsetzungspläne.',
                      },
                      {
                        year: 'Best Life NLP - Ronny Rhode',
                        title: 'NLP Coach',
                        text: 'Kontext, Muster, Dynamiken in Teams & Beziehungen.',
                      },
                      {
                        year: 'Reiki Meisterin Andrea Brüsch',
                        title: 'Reiki Heilung I',
                        text: 'Einweihung zur Selbst- & Fremdheilung. Energiearbeit & Achtsamkeit.',
                      },
                      {
                        year: 'Tony Robbins - Greator',
                        title: 'Unleash the Power Within',
                        text: 'Firewalk und intensive Persönlichkeitsentwicklung. Fokus auf Durchbruchsmomente.',
                      },
                      {
                        year: 'Best Life NLP - Ronny Rhode',
                        title: 'NLP Trainer',
                        text: 'Ausbildung angefangen. Abschluß Ende 2026',
                      },
                    ].map((item) => (
                      <li
                        key={item.text}
                        className='relative'>
                        <span className='absolute -left-6.75 top-1.5 h-3 w-3 rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.6)]' />
                        <div className='rounded-xl border border-white/60 bg-white/90 p-3'>
                          <div className='flex items-center justify-between gap-3'>
                            <p className='text-sm font-semibold text-[#0B1B2B]'>{item.title}</p>
                            <span className='text-xs font-semibold text-[#0B1B2B]/60'>
                              {item.year}
                            </span>
                          </div>
                          <p className='mt-2 text-xs text-[#0B1B2B]/70'>{item.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className='grid gap-3 sm:grid-cols-2'>
                  {[
                    { icon: '🥋', title: 'WingTsun', text: 'Graduierung: 1. Techniker' },
                    {
                      icon: '🧊',
                      title: 'Eisbaden',
                      text: 'Resilienz & Gesundheit. Zeit 5:50 min',
                    },
                    { icon: '🎯', title: 'Fitness', text: 'Fokus, Ausdauer & Kraft.' },
                    {
                      icon: '🆘',
                      title: 'Sanitätsdienst DRK Berlin',
                      text: 'Leben retten und helfen.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className='flex items-start gap-3 rounded-2xl border border-white/60 bg-white/70 p-4'>
                      <span className='text-xl'>{item.icon}</span>
                      <div>
                        <p className='text-sm font-semibold text-[#0B1B2B]'>{item.title}</p>
                        <p className='mt-1 text-xs text-[#0B1B2B]/70'>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
