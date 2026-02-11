'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import ContactFormNlp from '@/components/ContactFormNlp';
import LaserFlow from '@/components/LaserFlow';

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false });

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

function PrimaryButton({ children, className, href, onClick }: ButtonProps) {
  const base =
    'cursor-pointer inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--button-text)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] shadow-[0_0_30px_var(--glow)] ring-1 ring-[var(--border)] transition duration-200 hover:shadow-[0_0_40px_var(--glow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:translate-y-px';
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
    'cursor-pointer inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--text)] bg-[var(--surface)] ring-1 ring-[var(--border)] shadow-[0_0_20px_var(--glow)] transition duration-200 hover:bg-[var(--surface-strong)] hover:ring-[var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] active:translate-y-px';
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
      className={`group rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-strong)] shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_44px_var(--glow)] transition duration-200 hover:-translate-y-1 hover:border-[var(--border)] hover:shadow-[0_20px_60px_var(--glow),0_0_34px_var(--glow-strong)] ${className ?? ''}`}>
      {children}
    </div>
  );
}

function StarRow() {
  return (
    <div
      className='flex items-center gap-1 text-[var(--accent-soft)]'
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
  const [aboutModal, setAboutModal] = useState<null | 'before' | 'education'>(null);
  const [isWarmTheme, setIsWarmTheme] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div
      className={`scroll-smooth font-sans relative min-h-dvh bg-[var(--bg)] text-[var(--text)] ${
        isWarmTheme ? 'theme-warm' : 'theme-cool'
      }`}>
      <div className='relative isolate overflow-hidden'>
        {/****** Header **********/}
        <header className='fixed w-full top-0 z-50 border-b border-black/10 bg-white/5 backdrop-blur-xl'>
          <div className='container mx-auto flex items-center justify-between gap-3 px-4 py-3 md:py-4'>
            <Link
              href='/nlp/'
              className='flex items-center gap-3'>
              <div className='relative'>
                <Image
                  src='logos/nlp-logo.svg'
                  alt='Logo'
                  width={56}
                  height={56}
                  className='h-10 w-10 md:h-12 md:w-12'
                />
              </div>
              <div className='hidden md:flex flex-col items-start justify-center'>
                <span className='text-base font-semibold text-left tracking-[0.2em] text-[var(--accent-soft)] uppercase sm:text-lg'>
                  SNAC Coaching
                </span>
                <span className='text-left tracking-wider text-xs text-white/70 sm:text-sm'>
                  NLP für klare Entscheidungen
                </span>
              </div>
            </Link>
            <nav className='hidden items-center gap-8 text-sm text-white/80 md:flex font-semibold'>
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
            <div className='flex items-center gap-2 sm:gap-3'>
              <button
                type='button'
                onClick={() => setIsWarmTheme((prev) => !prev)}
                className='hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-strong)] md:inline-flex'
                aria-pressed={isWarmTheme}>
                {isWarmTheme ? 'Kühles Schema' : 'Warmes Schema'}
              </button>
              <PrimaryButton
                href='#kontakt'
                className='hidden px-4 py-2 text-xs sm:inline-flex md:px-6 md:py-3 md:text-sm'>
                Kostenloses Erstgespräch
              </PrimaryButton>
              <button
                type='button'
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DE3FF] md:hidden'
                aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMenuOpen}>
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
          <div
            className={`md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-in-out ${
              isMenuOpen
                ? 'max-h-[420px] opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
            }`}>
            <div
              className={`mx-4 mb-4 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 text-sm text-[var(--text)] shadow-[0_20px_60px_var(--glow)] transition-[opacity,transform] duration-500 ease-out delay-100 ${
                isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
              }`}>
              <nav className='flex flex-col gap-3 '>
                <Link
                  href='/'
                  onClick={() => setIsMenuOpen(false)}
                  className='transition hover:text-[var(--accent)]'>
                  Home
                </Link>
                <Link
                  href='#ueber'
                  onClick={() => setIsMenuOpen(false)}
                  className='transition hover:text-[var(--accent)]'>
                  Über mich
                </Link>
                <Link
                  href='#programme'
                  onClick={() => setIsMenuOpen(false)}
                  className='transition hover:text-[var(--accent)]'>
                  Programme
                </Link>
                <Link
                  href='#workshops'
                  onClick={() => setIsMenuOpen(false)}
                  className='transition hover:text-[var(--accent)]'>
                  Workshops
                </Link>
                <Link
                  href='#kontakt'
                  onClick={() => setIsMenuOpen(false)}
                  className='transition hover:text-[var(--accent)]'>
                  Kontakt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setIsWarmTheme((prev) => !prev);
                    setIsMenuOpen(false);
                  }}
                  className='mt-2 inline-flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-strong)]'>
                  <span>{isWarmTheme ? 'Kühles Schema' : 'Warmes Schema'}</span>
                  <span className='text-[var(--accent)]'>{isWarmTheme ? '❄️' : '🌅'}</span>
                </button>
              </nav>
              <div className='mt-4'>
                <PrimaryButton
                  href='#kontakt'
                  className='w-full'
                  onClick={() => setIsMenuOpen(false)}>
                  Kostenloses Erstgespräch
                </PrimaryButton>
              </div>
            </div>
          </div>
        </header>
        {/****************** Main *************************/}
        <main className='z-10'>
          {/****** Hero *****/}
          <section
            id='start'
            className='relative min-h-dvh flex items-center'>
            <div className='container mx-auto px-4 pb-20 pt-16 lg:pb-32 lg:pt-24 z-10'>
              <div className='grid items-center gap-12 lg:grid-cols-2'>
                <div>
                  <p className='text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)]'>
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
                        className='rounded-full border border-white/10 bg-white/20 px-4 py-2 text-xs text-white/80 backdrop-blur'>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='space-y-6 '>
                  <GlassCard className='relative p-0 '>
                    <div className='relative overflow-hidden rounded-2xl p-6'>
                      <div className='absolute inset-0 rounded-2xl ring-1 ring-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.35)] [clip-path:polygon(6%_2%,100%_0%,96%_100%,0%_98%)]' />
                      <div className='relative'>
                        <div className='aspect-square w-full rounded-3xl bg-[radial-gradient(circle_at_top,var(--hero-glow),var(--hero-fade))] p-6'>
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
                    </div>
                  </GlassCard>
                  <div className='flex flex-wrap gap-3'>
                    <span className='rounded-full border border-white/10 bg-white/20 px-4 py-2 text-xs text-white/75'>
                      Ø 90 Min / Session
                    </span>
                    <span className='rounded-full border border-white/10 bg-white/20 px-4 py-2 text-xs text-white/75'>
                      Fokus: Identität & Entscheidungen
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {isWarmTheme ? (
              <div className='absolute inset-0 -z-10 bg-[#ff9e13c7]'>
                <FloatingLines
                  linesGradient={['#f1c38a', '#fff']}
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
            ) : (
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
            )}
          </section>

          {/* Was ist NLP? */}
          <section
            id='nlp'
            className='py-20 border-y border-[var(--border)] relative min-h-[60dvh] flex flex-col justify-center items-center'>
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
          <section className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] overflow-hidden bg-white/5'>
            <div className='container mx-auto px-4'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
                  Woran wir arbeiten
                </h2>
                <p className='mt-4 text-base text-white/70 sm:text-lg'>
                  Ruhe im Körper. Fokus im Leben.
                </p>
              </div>
              <div className='mt-12 grid gap-6 lg:grid-cols-4'>
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
                  {
                    title: 'Ziele, die wirklich passe',
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
          <section className='relative py-20 flex flex-col justify-center items-center min-h-[70dvh] border-y border-[--border]'>
            <div className='container mx-auto px-4'>
              <div className='pointer-events-none absolute inset-0 -z-10 top-0 rotate-180 md:rotate-0 md:bottom-0'>
                <div className='absolute inset-0 opacity-90'>
                  <LaserFlow
                    color='#79d9f5'
                    wispDensity={1}
                    flowSpeed={0.35}
                    verticalSizing={1.2}
                    horizontalSizing={0.5}
                    fogIntensity={0.45}
                    fogScale={0.3}
                    wispSpeed={15}
                    wispIntensity={5}
                    flowStrength={0.25}
                    decay={1.1}
                    horizontalBeamOffset={0}
                    verticalBeamOffset={-0.5}
                    falloffStart={0.85}
                  />
                </div>
              </div>
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
                        <span className='flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] shadow-[0_0_20px_var(--glow)] ring-1 ring-[var(--border)]'>
                          0{index + 1}
                        </span>
                        <p className='text-sm font-medium text-[var(--text)]'>{step}</p>
                      </div>
                    </GlassCard>
                    {index < 3 && (
                      <div className='absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-[var(--accent)] to-transparent lg:block' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/****** Programme ******/}
          <section
            id='programme'
            className='relative py-20  border-y border-white/20 bg-white/5 backdrop-blur-2xl flex flex-col justify-center items-center min-h-[70dvh]'>
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
                    <ul className='mt-5 space-y-3 text-sm text-white/75 flex-1'>
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
          <section className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] border-y border-[--border]'>
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
            className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] backdrop-blur-2xl bg-white/5'>
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
          {/****** Leitfaden Download ******/}
          <section
            id='leitfaden'
            className='relative py-20 border-y border-[var(--border)]'>
            <div className='container mx-auto px-4 min-h-[60dvh] flex flex-col justify-center items-center '>
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

          {/***** Über mich *****/}
          <section
            id='ueber'
            className='py-40  relative min-h-[60dvh] flex flex-col justify-center items-center bg-white/5 backdrop-blur-2xl'>
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
                      <span className='font-bold text-white'>Schwerpunkte:</span> Identität &nbsp;
                      |&nbsp; Entscheidungen &nbsp;|&nbsp; innere Ausrichtung.
                    </p>
                    <p>
                      <span className='font-bold text-white'>Formate:</span> 1:1 Sessions
                      &nbsp;|&nbsp; Workshops &nbsp;|&nbsp; Keynotes.
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
                    Ich begleite Menschen dabei, aus innerem Chaos klare Entscheidungen zu formen.
                    NLP nutze ich pragmatisch: als Werkzeugkasten für Fokus, emotionale Stabilität
                    und zielgerichtetes Handeln – ohne leere Versprechen.
                  </p>
                  <div className='mt-6 flex flex-wrap gap-3'>
                    {['NLP Coach', 'Identität & Entscheidungen', 'Potsdam'].map((item) => (
                      <span
                        key={item}
                        className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80'>
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
                      Vor NLP lag mein Fokus auf Führung, Projektsteuerung und kommunikativer
                      Präzision. In dynamischen Umfeldern habe ich Teams durch Veränderungen
                      begleitet und gelernt, wie sehr innere Klarheit Entscheidungen, Stimmung und
                      Ergebnisqualität beeinflusst.
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
                        Coaching-Methoden. Ergänzend fließen Mentaltraining und systemische
                        Werkzeuge ein – pragmatisch, wirksam, messbar.
                      </p>
                    </div>
                    <div className='rounded-2xl border border-white/60 bg-white/70 p-4'>
                      <p className='text-xs uppercase tracking-[0.2em] text-[#0B1B2B]/60'>
                        🎓 Timeline
                      </p>
                      <ol className='mt-4 space-y-4 border-l border-[#0B1B2B]/15 pl-5'>
                        {[
                          {
                            year: '2016',
                            title: 'NLP Practitioner',
                            text: 'Grundlagen, Sprache, Wahrnehmung & Reframing.',
                          },
                          {
                            year: '2018',
                            title: 'NLP Master',
                            text: 'Vertiefung: Identität, Wertearbeit & Change-Strategien.',
                          },
                          {
                            year: '2020',
                            title: 'Coach & Mentaltrainer',
                            text: 'Zielarbeit, Ressourcenaktivierung, Umsetzungspläne.',
                          },
                          {
                            year: '2023',
                            title: 'Systemische Tools',
                            text: 'Kontext, Muster, Dynamiken in Teams & Beziehungen.',
                          },
                        ].map((item) => (
                          <li
                            key={item.year}
                            className='relative'>
                            <span className='absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.6)]' />
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
                        { icon: '🥋', title: 'WingTsun', text: 'Fokus, Präsenz & Klarheit.' },
                        { icon: '🧊', title: 'Eisbaden', text: 'Resilienz & Nervensystem-Reset.' },
                        { icon: '🎯', title: 'Mentales Training', text: 'Zielbilder verankern.' },
                        { icon: '🗣️', title: 'Kommunikation', text: 'Sprache als Werkzeug.' },
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
          {/****** Kontakt ******/}
          <section
            id='kontakt'
            className='relative py-40 border-y border-[--border]'>
            <div className='container mx-auto px-4'>
              <div className='grid gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
                <div>
                  <p className='text-xs uppercase tracking-[0.3em] text-[#7DE3FF]'>Kontakt</p>
                  <h2 className='mt-4 text-3xl font-semibold text-white sm:text-4xl'>
                    Lass uns starten
                  </h2>
                  <p className='mt-4 max-w-xl text-base text-white/70 sm:text-lg'>
                    Schreib mir ein paar Zeilen zu deinem Anliegen. Ich melde mich in der Regel
                    innerhalb von 24–48 Stunden mit einem Vorschlag für das weitere Vorgehen.
                  </p>
                  <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                    {[
                      {
                        title: 'Kostenloses Erstgespräch (max. 30 Min)',
                        text: 'Kurz, klar, unverbindlich.Wir prüfen beide, ob es passt.',
                      },
                      {
                        title: 'Präziser Fokus',
                        text: 'Konkretes Ziel definieren und nächste Schritte festlegen.',
                      },
                    ].map((item) => (
                      <GlassCard
                        key={item.title}
                        className='p-4'>
                        <p className='text-sm text-white/80'>{item.title}</p>
                        <p className='mt-2 text-xs text-white/60'>{item.text}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>
                <div className='lg:translate-y-2'>
                  <ContactFormNlp />
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* Footer   */}
        <footer className='border-t border-white/10 bg-white/5 py-10'>
          <div className='container mx-auto flex flex-col gap-6 px-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-3'>
              <div>
                <Image
                  src='/logos/nlp-logo.svg'
                  alt='NLP Coaching Logo'
                  width={32}
                  height={32}
                  className='h-12 w-12 '
                />
              </div>
              <div>
                <p className='text-white'>SNAC COACHING</p>
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
        {/******  Theme Styles ******/}
        <style
          jsx
          global>{`
          .theme-cool {
            --bg: #050b12;
            --text: #e6f7ff;
            --muted: rgba(230, 247, 255, 0.75);
            --accent: #00e5ff;
            --accent-2: #22c55e;
            --accent-soft: #7de3ff;
            --surface: rgba(255, 255, 255, 0.05);
            --surface-strong: rgba(255, 255, 255, 0.1);
            --border: rgba(255, 255, 255, 0.2);
            --border-strong: rgba(255, 255, 255, 0.45);
            --border-section: rgba(255, 255, 255, 0.05);
            --button-text: #001018;
            --glow: rgba(0, 229, 255, 0.24);
            --glow-strong: rgba(0, 229, 255, 0.36);
            --hero-glow: rgba(0, 229, 255, 0.35);
            --hero-fade: rgba(5, 11, 18, 0.6);
          }
          .theme-warm {
            --bg: #fff6ea;
            --text: #2b1a0f;
            --muted: rgba(43, 26, 15, 0.75);
            --accent: #eaa765;
            --accent-2: #b97029;
            --accent-soft: rgba(0, 0, 0, 0.8);
            --surface: rgba(255, 255, 255, 0.26);
            --surface-strong: rgba(255, 255, 255, 0.45);
            --border: rgba(0, 0, 0, 0.55);
            --border-strong: rgba(0, 0, 0, 0.75);
            --button-text: #2b1a0f;
            --glow: rgba(232, 160, 90, 0.25);
            --glow-strong: rgba(232, 160, 90, 0.4);
            --hero-glow: rgba(241, 195, 138, 0.45);
            --hero-fade: rgba(255, 246, 234, 0.85);
          }
          .theme-warm .text-white {
            color: var(--text) !important;
          }
          .theme-warm .text-white\/80 {
            color: rgba(43, 26, 15, 0.85) !important;
          }
          .theme-warm .text-white\/75 {
            color: rgba(43, 26, 15, 0.78) !important;
          }
          .theme-warm .text-white\/70 {
            color: rgba(43, 26, 15, 0.72) !important;
          }
          .theme-warm .text-white\/60 {
            color: rgba(43, 26, 15, 0.62) !important;
          }
          .theme-warm .text-white\/50 {
            color: rgba(43, 26, 15, 0.55) !important;
          }
          .theme-warm .text-white\/40 {
            color: rgba(43, 26, 15, 0.48) !important;
          }
          .theme-warm .text-\[\#7DE3FF\],
          .theme-warm .text-\[\#00E5FF\] {
            color: var(--accent) !important;
          }
          .theme-warm .bg-\[\#7DE3FF\],
          .theme-warm .bg-\[\#00E5FF\] {
            background-color: var(--accent) !important;
          }
          .theme-warm .border-\[\#7DE3FF\],
          .theme-warm .border-\[\#00E5FF\] {
            border-color: var(--accent) !important;
          }
          .theme-warm .ring-\[\#7DE3FF\],
          .theme-warm .ring-\[\#00E5FF\] {
            --tw-ring-color: var(--accent) !important;
          }
        `}</style>
      </div>
    </div>
  );
}
