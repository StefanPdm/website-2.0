'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false });

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

function PrimaryButton({ children, className, href, onClick }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#001018] bg-gradient-to-r from-[#00E5FF] to-[#22C55E] shadow-[0_0_30px_rgba(0,229,255,0.25)] ring-1 ring-white/10 transition duration-200 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] active:translate-y-px';
  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${className ?? ''}`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${base} ${className ?? ''}`}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, className, href, onClick }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#E6F7FF] bg-white/5 ring-1 ring-white/15 shadow-[0_0_20px_rgba(0,229,255,0.12)] transition duration-200 hover:bg-white/10 hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DE3FF] active:translate-y-px';
  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${className ?? ''}`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${base} ${className ?? ''}`}>
      {children}
    </button>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,229,255,0.18)] ${className ?? ''}`}>
      {children}
    </div>
  );
}

function StarRow() {
  return (
    <div
      className='flex items-center gap-1 text-[#7DE3FF]'
      aria-label='5 von 5 Sternen'>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden='true'>
          ★
        </span>
      ))}
    </div>
  );
}

export default function NLP() {
  const [formState, setFormState] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState({ name: false, email: false });

  const errors = useMemo(() => {
    return {
      name: formState.name.trim().length === 0 ? 'Bitte gib deinen Namen an.' : '',
      email:
        formState.email.trim().length === 0
          ? 'Bitte gib deine E-Mail an.'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
            ? 'Bitte gib eine gültige E-Mail an.'
            : '',
    };
  }, [formState]);

  const hasError = (field: 'name' | 'email') => touched[field] && Boolean(errors[field]);

  return (
    <div className='scroll-smooth bg-[#050B12] text-[#E6F7FF] font-sans relative min-h-dvh'>
      <div className='relative isolate overflow-hidden'>
        <div className='pointer-events-none absolute inset-0'>
          {/* <div className='absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.35),rgba(0,0,0,0))] blur-3xl' /> */}
          {/* <div className='absolute left-[-120px] top-[20%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.25),rgba(0,0,0,0))] blur-3xl motion-safe:animate-pulse' /> */}
          {/* <div className='absolute right-[-140px] top-[35%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(125,227,255,0.22),rgba(0,0,0,0))] blur-3xl motion-safe:animate-pulse' /> */}
          {/* <div className='absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:20px_20px] opacity-40' /> */}
          {/* <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,11,18,0.2),rgba(5,11,18,0.9))]' /> */}
        </div>
        {/* Header */}
        <header className='fixed w-full top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl'>
          <div className='container mx-auto flex items-center justify-between px-4 py-3'>
            <Link
              href='/nlp/'
              className='flex items-center gap-3'>
              <div className='relative'>
                <Image
                  src='/nlp-logo.svg'
                  alt='Logo'
                  width={64}
                  height={64}
                />
              </div>
              <div className='flex flex-col items-start justify-center'>
                <span className='text-lg font-semibold text-left tracking-widest text-[#7DE3FF] uppercase'>
                  NLP Coaching Potsdam
                </span>
                <span className='text-left tracking-wider text-sm text-white/80'>
                  Stefan Heinemann
                </span>
              </div>
            </Link>
            <nav className='hidden items-center gap-8 text-sm text-white/80 md:flex'>
              <Link
                href='/'
                className='transition hover:text-white'>
                Home
              </Link>
              <Link
                href='#ueber'
                className='transition hover:text-white'>
                Über mich
              </Link>
              <Link
                href='#programme'
                className='transition hover:text-white'>
                Programme
              </Link>
              <Link
                href='#workshops'
                className='transition hover:text-white'>
                Workshops
              </Link>
              <Link
                href='#kontakt'
                className='transition hover:text-white'>
                Kontakt
              </Link>
            </nav>
            <div className='flex items-center gap-3'>
              <button
                type='button'
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DE3FF] md:hidden'
                aria-label='Menü öffnen'>
                ☰
              </button>
              <PrimaryButton
                href='#kontakt'
                className='px-4 py-2 text-xs md:px-6 md:py-3 md:text-sm'>
                Kostenloses Erstgespräch
              </PrimaryButton>
            </div>
          </div>
        </header>

        <main className='z-10'>
          {/* Hero */}
          <section
            id='start'
            className='relative min-h-dvh flex items-center'>
            <div className='container mx-auto px-4 pb-20 pt-16 lg:pb-32 lg:pt-24 z-10'>
              <div className='grid items-center gap-12 lg:grid-cols-2'>
                <div>
                  <p className='text-xs uppercase tracking-[0.3em] text-[#7DE3FF]'>
                    NLP - Neuro Linguistisches Programmieren
                  </p>
                  <h1 className='mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl'>
                    Meistere deinen Geist.
                    <br />
                    Ruhe im Körper.
                    <br />
                    Verändere dein Leben.
                  </h1>
                  <p className='mt-6 max-w-xl text-base text-white/75 sm:text-lg'>
                    Entfalte dein volles Potenzial mit Klarheit, Sprache und innerer Ausrichtung –
                    ohne esoterischen Nebel.
                  </p>
                  <div className='mt-8 flex flex-wrap gap-4'>
                    <PrimaryButton href='#kontakt'>Jetzt starten</PrimaryButton>
                    <SecondaryButton href='#ueber'>Mehr erfahren</SecondaryButton>
                  </div>
                  <div className='mt-10 flex flex-wrap gap-3'>
                    {['1:1 Coaching', 'Workshops', 'Praxisnah & messbar'].map((item) => (
                      <span
                        key={item}
                        className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur'>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='space-y-6'>
                  <GlassCard className='relative overflow-hidden p-6'>
                    <div className='absolute inset-0 rounded-2xl ring-1 ring-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.35)]' />
                    <div className='relative'>
                      <div className='aspect-square w-full rounded-3xl bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.35),rgba(5,11,18,0.6))] p-6'>
                        <div className='relative flex h-full w-full items-end justify-center rounded-3xl border border-white/15 bg-white/5 text-sm text-white/70 overflow-hidden'>
                          <Image
                            src='/images-nlp/nlp-portrait.webp'
                            alt='NLP Coaching'
                            width={990}
                            height={990}
                          />
                        </div>
                        <div className='absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),rgba(0,0,0,0))] blur-xl' />
                      </div>
                    </div>
                  </GlassCard>
                  <div className='flex flex-wrap gap-3'>
                    <span className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/75'>
                      Ø 90 Min / Session
                    </span>
                    <span className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/75'>
                      Fokus: Identität & Entscheidungen
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute inset-0 -z-10'>
              <FloatingLines
                linesGradient={['#050b12', '#47f5d8']}
                animationSpeed={0.4}
                interactive
                bendRadius={15}
                bendStrength={1.2}
                mouseDamping={0.01}
                topWavePosition={{ x: 10, y: 0.6, rotate: -0.35 }}
                middleWavePosition={{ x: 5, y: 0.0, rotate: 0.2 }}
                parallax={false}
                parallaxStrength={0}
              />
            </div>
          </section>
          {/* Was ist NLP? */}
          <section
            id='ueber'
            className='py-20 border-y border-white/20 relative min-h-[60dvh] flex flex-col justify-center items-center'>
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
                    className='p-6'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10'>
                        {feature.icon}
                      </div>
                      <h3 className='text-lg font-semibold text-white'>{feature.title}</h3>
                    </div>
                    <p className='mt-4 text-sm text-white/70'>{feature.text}</p>
                    <Link
                      href='#programme'
                      className='mt-5 inline-flex items-center text-sm font-semibold text-[#7DE3FF] transition hover:text-white'>
                      Mehr erfahren →
                    </Link>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          {/* Woran wir arbeiten */}
          <section className='relative py-20 backdrop-blur-2xl bg-white/5 flex flex-col justify-center items-center min-h-[60dvh]'>
            <div className='container mx-auto px-4'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
                  Woran wir arbeiten
                </h2>
                <p className='mt-4 text-base text-white/70 sm:text-lg'>
                  Ruhe im Körper. Fokus im Leben.
                </p>
              </div>
              <div className='mt-12 grid gap-6 lg:grid-cols-3'>
                {[
                  {
                    title: 'Gedankenkarussell',
                    text: 'Mehr innere Ruhe, weniger Dauerschleifen im Kopf.',
                    points: ['Klarer denken', 'Selbststeuerung stärken'],
                    icon: '🌀',
                  },
                  {
                    title: 'Emotionen regulieren',
                    text: 'Trigger bewusster wahrnehmen und souveräner reagieren.',
                    points: ['Gelassen bleiben', 'Stress schneller lösen'],
                    icon: '💗',
                  },
                  {
                    title: 'Ziele, die wirklich passen',
                    text: 'Fokus setzen, Prioritäten ordnen und dranbleiben.',
                    points: ['Konsequent handeln', 'Energie zielgerichtet nutzen'],
                    icon: '🎯',
                  },
                ].map((item) => (
                  <GlassCard
                    key={item.title}
                    className='p-6'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 text-xl'>
                        <span aria-hidden='true'>{item.icon}</span>
                      </div>
                      <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
                    </div>
                    <p className='mt-4 text-sm text-white/70'>{item.text}</p>
                    <ul className='mt-4 space-y-2 text-xs text-white/60'>
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className='flex items-center gap-2'>
                          <span className='h-1.5 w-1.5 rounded-full bg-[#7DE3FF]' />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
          {/* Dein Weg zur Transformation */}
          <section className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] border-y border-white/20'>
            <div className='container mx-auto px-4'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
                  Dein Weg zur Transformation
                </h2>
                <p className='mt-4 text-base text-white/70 sm:text-lg'>
                  Strukturierte Schritte, die messbare Veränderungen ermöglichen.
                </p>
              </div>
              <div className='mt-12 grid gap-6 lg:grid-cols-4'>
                {[
                  'Status Quo klären',
                  'Limitierende Muster lösen',
                  'Neue Identität verankern',
                  'Alltag stabilisieren',
                ].map((step, index) => (
                  <div
                    key={step}
                    className='relative'>
                    <GlassCard className='h-full p-6'>
                      <div className='flex items-center gap-4'>
                        <span className='flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-[#7DE3FF] shadow-[0_0_25px_rgba(0,229,255,0.35)] ring-1 ring-white/20'>
                          0{index + 1}
                        </span>
                        <p className='text-sm font-medium text-white/90'>{step}</p>
                      </div>
                    </GlassCard>
                    {index < 3 && (
                      <div className='absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-[#7DE3FF] to-transparent lg:block' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Programme */}
          <section
            id='programme'
            className='relative py-20  border-y border-white/20 bg-white/5 backdrop-blur-2xl flex flex-col justify-center items-center min-h-[60dvh]'>
            <div className='container mx-auto px-4'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Programme</h2>
                <p className='mt-4 text-base text-white/70 sm:text-lg'>
                  Wähle den Pfad, der zu deiner aktuellen Entwicklungsphase passt.
                </p>
              </div>
              <div className='mt-12 grid gap-6 lg:grid-cols-3'>
                {[
                  {
                    title: '1:1 Tiefenwandel',
                    featured: true,
                    points: [
                      'Individuelle Diagnose & Zielklärung',
                      'Intensive Prozessarbeit über 6–8 Sessions',
                      'Integration in Alltag & Entscheidungen',
                      'Begleitende Übungen & Follow-ups',
                    ],
                    price: 'ab Premium-Paket',
                  },
                  {
                    title: 'Workshop: Sprache, die wirkt',
                    featured: false,
                    points: [
                      'Live-Training in Kleingruppen',
                      'Praktische Interventionen für Gespräche',
                      'Feedback & Supervision',
                    ],
                    price: 'ab Gruppen-Format',
                  },
                  {
                    title: 'NLP Essentials (Starter)',
                    featured: false,
                    points: [
                      'Grundlagen für Selbstführung',
                      'Werkzeuge für Fokus & Klarheit',
                      '3 Sessions + Workbook',
                    ],
                    price: 'ab Einstieg',
                  },
                ].map((program) => (
                  <GlassCard
                    key={program.title}
                    className={`flex h-full flex-col p-6 ${program.featured ? 'ring-1 ring-[#00E5FF]/40 shadow-[0_0_50px_rgba(0,229,255,0.35)]' : ''}`}>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-semibold text-white'>{program.title}</h3>
                      {program.featured && (
                        <span className='rounded-full bg-[#00E5FF]/15 px-3 py-1 text-xs text-[#7DE3FF]'>
                          Premium
                        </span>
                      )}
                    </div>
                    <ul className='mt-5 space-y-3 text-sm text-white/75'>
                      {program.points.map((point) => (
                        <li
                          key={point}
                          className='flex gap-2'>
                          <span className='text-[#7DE3FF]'>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className='mt-6 text-sm text-white/60'>{program.price}</div>
                    <SecondaryButton
                      href='#kontakt'
                      className='mt-6'>
                      Details
                    </SecondaryButton>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
          {/* Erfolgsgeschichten */}
          <section className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] border-y border-white/20'>
            <div className='container mx-auto px-4'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
                  Erfolgsgeschichten
                </h2>
                <p className='mt-4 text-base text-white/70 sm:text-lg'>
                  Stimmen von Menschen, die Klarheit und innere Stabilität gewonnen haben.
                </p>
              </div>
              <div className='mt-12 grid gap-6 lg:grid-cols-3'>
                {[
                  {
                    name: 'Lena K.',
                    text: 'Weniger Grübeln, mehr Handlungsfokus. Die Sessions haben mir geholfen, Entscheidungen schneller zu treffen.',
                  },
                  {
                    name: 'Daniel M.',
                    text: 'Ich kann klarer Nein sagen, ohne Schuldgefühl. Besonders die Sprachmuster-Übungen waren extrem hilfreich.',
                  },
                  {
                    name: 'Mira S.',
                    text: 'Meine Gespräche im Team sind strukturierter. Ich erkenne schneller, was mich wirklich bewegt.',
                  },
                ].map((testimonial) => (
                  <GlassCard
                    key={testimonial.name}
                    className='p-6'>
                    <StarRow />
                    <p className='mt-4 text-sm text-white/75'>{testimonial.text}</p>
                    <p className='mt-6 text-sm font-semibold text-white'>{testimonial.name}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
          {/* Workshops */}
          <section
            id='workshops'
            className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] border-y border-white/20 backdrop-blur-2xl bg-white/5'>
            <div className='container mx-auto px-4'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
                  Bevorstehende Workshops & Seminare
                </h2>
                <p className='mt-4 text-base text-white/70 sm:text-lg'>
                  Live-Formate für tiefere Praxis und direkte Umsetzung.
                </p>
              </div>
              <div className='mt-12 grid gap-6 lg:grid-cols-3'>
                {[
                  {
                    title: 'Fortgeschrittene NLP-Techniken',
                    date: '16–17. Juni',
                    place: 'Berlin / Online',
                  },
                  {
                    title: 'NLP Mastery',
                    date: '8–10. Juli',
                    place: 'Hamburg / Online',
                  },
                  {
                    title: 'Durchbruch Bootcamp',
                    date: '5–7. August',
                    place: 'München / Online',
                  },
                ].map((event) => (
                  <GlassCard
                    key={event.title}
                    className='p-6'>
                    <h3 className='text-lg font-semibold text-white'>{event.title}</h3>
                    <p className='mt-3 text-sm text-white/70'>{event.date}</p>
                    <p className='text-xs text-white/50'>{event.place}</p>
                    <SecondaryButton
                      href='#kontakt'
                      className='mt-6 w-full'>
                      Platz reservieren
                    </SecondaryButton>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
          {/* Kontakt */}
          <section
            id='kontakt'
            className='relative py-20'>
            <div className='container mx-auto px-4'>
              <div className='grid gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
                <div>
                  <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
                    Sichere dir deinen kostenlosen NLP-Leitfaden
                  </h2>
                  <p className='mt-4 max-w-xl text-base text-white/70 sm:text-lg'>
                    Praktische Übungen für Klarheit, Selbstführung und Gesprächsführung.
                  </p>
                  <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                    <GlassCard className='p-4'>
                      <p className='text-sm text-white/70'>Klarheit im Kopf</p>
                      <p className='mt-2 text-xs text-white/50'>
                        Erkenne Muster und fokussiere dich neu.
                      </p>
                    </GlassCard>
                    <GlassCard className='p-4'>
                      <p className='text-sm text-white/70'>Souveräne Gespräche</p>
                      <p className='mt-2 text-xs text-white/50'>
                        Sprache bewusst einsetzen und wirken lassen.
                      </p>
                    </GlassCard>
                  </div>
                </div>
                <GlassCard className='p-6'>
                  <form
                    suppressHydrationWarning
                    onSubmit={(event) => {
                      event.preventDefault();
                      setTouched({ name: true, email: true });
                    }}
                    className='space-y-4'>
                    <div>
                      <label
                        htmlFor='lead-name'
                        className='text-sm text-white/80'>
                        Name
                      </label>
                      <input
                        id='lead-name'
                        type='text'
                        required
                        value={formState.name}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, name: event.target.value }))
                        }
                        onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                        className={`mt-2 w-full rounded-xl border bg-[#050B12]/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                          hasError('name') ? 'border-red-400/70' : 'border-white/10'
                        }`}
                        placeholder='Dein Name'
                      />
                      {hasError('name') && (
                        <p className='mt-2 text-xs text-red-300'>{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor='lead-email'
                        className='text-sm text-white/80'>
                        E-Mail
                      </label>
                      <input
                        id='lead-email'
                        type='email'
                        required
                        value={formState.email}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, email: event.target.value }))
                        }
                        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                        className={`mt-2 w-full rounded-xl border bg-[#050B12]/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                          hasError('email') ? 'border-red-400/70' : 'border-white/10'
                        }`}
                        placeholder='dein.name@email.de'
                      />
                      {hasError('email') && (
                        <p className='mt-2 text-xs text-red-300'>{errors.email}</p>
                      )}
                    </div>
                    <PrimaryButton className='w-full'>Jetzt herunterladen</PrimaryButton>
                    <p className='text-xs text-white/50'>Kein Spam. Abmeldung jederzeit.</p>
                  </form>
                </GlassCard>
              </div>
            </div>
          </section>
        </main>
        {/* Footer   */}
        <footer className='border-t border-white/10 bg-white/5 py-10'>
          <div className='container mx-auto flex flex-col gap-6 px-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-3'>
              <span className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#00E5FF] to-[#22C55E] text-[#001018]'>
                ✦
              </span>
              <div>
                <p className='text-white'>NLP</p>
                <p className='text-xs text-white/50'>NLP Coaching für klare Entscheidungen.</p>
              </div>
            </div>
            <div className='flex flex-wrap items-center gap-4'>
              <Link
                href='#'
                className='transition hover:text-white'>
                Datenschutz
              </Link>
              <Link
                href='#'
                className='transition hover:text-white'>
                AGB
              </Link>
              <Link
                href='#'
                className='transition hover:text-white'>
                Impressum
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              {[
                { label: 'Instagram', icon: '◎' },
                { label: 'LinkedIn', icon: 'in' },
                { label: 'YouTube', icon: '▶' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href='#'
                  aria-label={item.label}
                  className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DE3FF]'>
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className='container mx-auto mt-6 px-4 text-xs text-white/40'>
            © 2026 NLP Coaching. Alle Rechte vorbehalten.
          </div>
        </footer>
      </div>
    </div>
  );
}
