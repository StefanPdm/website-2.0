'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';

export default function AboutSection() {
  const [aboutModal, setAboutModal] = useState<null | 'before' | 'education'>(null);
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    '/images-nlp/portrait-workshop.webp',
    '/images-nlp/portrait-treppe.webp',
    '/images-nlp/portrait-coaching.webp',
    '/images-nlp/portrait-firewalk.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section
        id='ueber'
        className='py-40 relative min-h-[60dvh] flex flex-col justify-center items-center bg-(--section-bg-accent)'>
        <div className='container px-4 mx-auto'>
          <div className='grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
            {/* left side */}
            <GlassCard className='p-6 order-2 md:order-1'>
              <div className='relative overflow-hidden rounded-2xl bg-white/5'>
                <div className='aspect-5/4 w-full overflow-hidden'>
                  <div
                    className='flex h-full w-full transition-transform duration-700 ease-out'
                    style={{ transform: `translateX(-${activeImage * 100}%)` }}>
                    {images.map((src, index) => (
                      <div
                        key={`${src}-${index}`}
                        className='relative h-full w-full shrink-0'>
                        <Image
                          src={src}
                          alt='Stefan Heinemann'
                          fill
                          className='object-cover object-top'
                          sizes='(min-width: 1024px) 40vw, 80vw'
                          quality={100}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='absolute inset-0 ring-1 ring-white/10' />
                <div className='absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur'>
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type='button'
                      onClick={() => setActiveImage(index)}
                      className={`h-2 w-2 rounded-full transition cursor-pointer ${
                        index === activeImage
                          ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Bild ${index + 1} anzeigen`}
                    />
                  ))}
                </div>
              </div>
              <div className='mt-5 space-y-2 text-sm text-white/70 '>
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
            {/* right side */}
            <div className='order-1 md:order-2'>
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
              <GlassCard className='mt-8 p-5'>
                <p className='text-xs uppercase tracking-[0.2em] text-white/60'>
                  Zertifizierungen durch:
                </p>
                <div className='mt-2 flex items-center  gap-[10%] justify-start'>
                  <a
                    href='https://www.dvnlp.de/'
                    target='_blank'
                    aria-label='DVNLP-Link'
                    rel='noopener noreferrer'
                    className='inline-flex'>
                    <span className='group/tooltip relative inline-flex items-center'>
                      <Image
                        src='/logos/Logo-DVNLP-black.svg'
                        alt='Certification 1'
                        height={30}
                        width={120}
                      />
                      <span className='pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[--border] bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/90 opacity-0 shadow-[0_10px_30px_rgba(11,27,43,0.25)] transition-opacity group-hover/tooltip:opacity-100'>
                        DVNLP - Deutscher Verband fur NLP
                      </span>
                    </span>
                  </a>
                  <a
                    href='https://www.ronnyrohde.com/'
                    target='_blank'
                    aria-label='Ronny Rohde-Link'
                    rel='noopener noreferrer'
                    className='inline-flex'>
                    <span className='group/tooltip relative inline-flex items-center'>
                      <Image
                        src='/logos/Logo-RR-black.webp'
                        alt='Certification 2'
                        height={30}
                        width={120}
                      />
                      <span className='pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[--border] bg-white/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/90 opacity-0 shadow-[0_10px_30px_rgba(11,27,43,0.25)] transition-opacity group-hover/tooltip:opacity-100'>
                        Ronny Rohde - Best Life NLP
                      </span>
                    </span>
                  </a>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
      {aboutModal && (
        <div
          className='fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-10'
          role='dialog'
          aria-modal='true'>
          <button
            type='button'
            onClick={() => setAboutModal(null)}
            className='absolute inset-0 bg-[#050B12]/60 backdrop-blur-sm'
            aria-label='Modal schließen'
          />
          <div className='relative w-full max-w-3xl max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-3xl border border-white/60 bg-[linear-gradient(140deg,rgba(255,255,255,0.95),rgba(230,247,255,0.86))] p-6 text-[#0B1B2B] shadow-[0_30px_90px_rgba(0,229,255,0.25)] backdrop-blur-xl'>
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
                  Vor NLP lag mein Fokus auf Leistung und Funktionieren. Nach über 20 Jahren als
                  erfolgreicher Unternehmer im Interieur Design (mit 3 Filialen und großem Team)
                  suchte ich den Wandel.
                  <br />
                  <br />
                  Ich folgte meiner alten C64-Leidenschaft und stürzte mich mit Begeisterung in die
                  Welt des Fullstack-Developments. Das Programmieren machte mir Spaß und forderte
                  mich intellektuell – doch ich musste schmerzhaft erkennen: Spaß ist nicht gleich
                  Erfüllung. Die IT war eine faszinierende Welt, doch sie hielt mich nicht davon ab,
                  in eine tiefe Krise zu rutschen. Ich wurde krank, depressiv und landete im
                  Burnout, weil ich das Glück vergeblich im Außen suchte.
                  <br />
                  <br /> 2024 war mein absoluter Wendepunkt. Ich holte mir Hilfe und begann meine
                  NLP Ausbildung. Dort begriff ich das Wichtigste: Ich muss nicht die Welt um mich
                  herum ändern, sondern mich selbst. Inspiriert von meinem Mentor{' '}
                  <a
                    href='https://ronyrhode.com'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <strong>Rony Rhode </strong>
                  </a>
                  und dem unglaublichen{' '}
                  <a
                    href='https://www.tonyrobbins.com/de'
                    target='_blank'
                    rel='noopener noreferrer'>
                    <strong>Tony Robbins</strong>
                  </a>{' '}
                  fand ich zum ersten Mal tiefes Glück. Das Interesse an meiner Wandlung war riesig.
                  <br />
                  <br />
                  Was privat begann, ist seit Mitte 2025 meine zweite Profession:&nbsp;
                  <strong>
                    Als Coach begleite ich heute Menschen dabei, ihre eigene Erfüllung zu finden.
                  </strong>
                </p>
                <div className='grid gap-4 sm:grid-cols-3'>
                  {[
                    { icon: '💼', title: '20+ Jahre', text: 'Unternehmer in Berlin & Hamburg' },
                    {
                      icon: '🧭',
                      title: 'Spannenstes Projekt',
                      text: (
                        <>
                          Luxus Sportclub Berlin Ku´Damm ·{' '}
                          <a
                            href='https://www.bodylife.com/body-life-club-des-monats-sportsaal-berlin/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-[#0B1B2B] underline decoration-[#0B1B2B]/30 underline-offset-2 transition hover:decoration-[#0B1B2B]'>
                            Sportsaal
                          </a>
                        </>
                      ),
                    },
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
                    💡 Erkenntnis 1
                  </p>
                  <p className='mt-2 text-sm text-[#0B1B2B]/80'>
                    Die Tür zum Glück geht nach innen auf.
                  </p>
                </div>
                <div className='rounded-2xl border border-white/60 bg-white/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#0B1B2B]/60'>
                    💡 Erkenntnis 2
                  </p>
                  <p className='mt-2 text-sm text-[#0B1B2B]/80'>
                    Erfolg ohne Erfüllung ist der ultimative Fehlschlag. Erfüllung ist die neue
                    Währung.
                  </p>
                </div>
                <div className='rounded-2xl border border-white/60 bg-white/70 p-4'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#0B1B2B]/60'>
                    💡 Erkenntnis 3
                  </p>
                  <p className='mt-2 text-sm text-[#0B1B2B]/80'>
                    Es sind nicht die Umstände oder anderen Menschen, die dein Leben bestimmen. Es
                    sind deine Entscheidungen, die du triffts oder eben nicht triffst.
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
                    { icon: '🥋', title: 'WingTsun & Fitness', text: 'Graduierung: 1. Techniker' },
                    {
                      icon: '🧊',
                      title: 'Eisbaden',
                      text: 'Resilienz & Gesundheit. Bestzeit 5:50 min',
                    },
                    {
                      icon: '🚗',
                      title: '68er Ford Mustang',
                      text: (
                        <>
                          Rallye &amp; Hochzeiten ·{' '}
                          <a
                            href='https://www.mustang-mieten.berlin/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-[#0B1B2B] underline decoration-[#0B1B2B]/30 underline-offset-2 transition hover:decoration-[#0B1B2B]'>
                            mustang-mieten.berlin
                          </a>
                        </>
                      ),
                    },
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
