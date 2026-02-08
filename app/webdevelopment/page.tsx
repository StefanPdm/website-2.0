import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, HTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import { Boxes, ClipboardCheck, Code2, Search, ShieldCheck, Sparkles } from 'lucide-react';
import {
  SiAngular,
  SiContentful,
  SiDocker,
  SiFirebase,
  SiGraphql,
  SiNodedotjs,
  SiNextdotjs,
  SiPostman,
  SiPrisma,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
  SiWordpress,
} from 'react-icons/si';
import {
  FaClipboardCheck,
  FaGaugeHigh,
  FaMagnifyingGlass,
  FaScrewdriverWrench,
} from 'react-icons/fa6';
import CardNav from '@/components/CardNav';
import CardSwap, { Card } from '@/components/CardSwap';
import ElectricBorder from '@/components/ElectricBorder';
import LightPillar from '@/components/LightPillar';
import HyperspeedStrip from '@/components/HyperspeedStrip';
import PixelCard from '@/components/PixelCard';
import CaseCard from '../../components/CaseCard';
import ScrollToTop from '@/components/ScrollToTop';

const trustItems = ['Persönlich & direkt', 'Sauberer Code', 'Wartbar & skalierbar'];

const PixelCardView = PixelCard as ComponentType<
  PropsWithChildren<{ variant?: string; className?: string }>
>;
const CardSwapView = CardSwap as ComponentType<
  PropsWithChildren<{
    width?: number;
    height?: number;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (index: number) => void;
    skewAmount?: number;
    easing?: string;
  }>
>;
const CardView = Card as ComponentType<
  PropsWithChildren<HTMLAttributes<HTMLDivElement> & { customClass?: string }>
>;
// ProfileCard removed – replaced by custom CaseCard component

const services = [
  {
    title: 'Websites & Landingpages',
    intro: 'Websites, die führen – nicht verwirren.',
    bullets: [
      'SEO-ready',
      'Mobile-first',
      'Saubere Informationsarchitektur',
      'Schnelle Ladezeiten',
    ],
  },
  {
    title: 'Web Apps & Kundenportale',
    intro: 'Individuelle Anwendungen statt Insellösungen.',
    bullets: ['Login-Bereiche', 'Dashboards', 'Dokumentenverwaltung', 'Rollen & Rechte'],
  },
  {
    title: 'Headless & Schnittstellen',
    intro: 'Systeme, die miteinander sprechen.',
    bullets: [
      'Headless CMS',
      'REST & GraphQL APIs',
      'Automatisierungen',
      'Entkoppelte Architekturen',
    ],
  },
  {
    title: 'UX & Struktur',
    intro: 'Technik folgt Klarheit.',
    bullets: [
      'UX-Konzeption',
      'Seiten- & Datenstruktur',
      'Klare Nutzerflüsse',
      'Verständliche Logik',
    ],
  },
];

const techStack = {
  Frontend: ['Next.js', 'Angular', 'React', 'Tailwind CSS'],
  'Backend & Daten': ['Node.js', 'Prisma', 'REST', 'GraphQL'],
  'Auth & Infrastruktur': ['Clerk', 'Firebase', 'Supabase', 'Vercel', 'Docker', 'Neon (Postgres)'],
  'CMS & Inhalte': ['Headless CMS', 'WordPress (ACF, CPTs)'],
  Qualität: ['Performance-Optimierung', 'SEO-Basics', 'Wartbarkeit', 'Saubere Übergabe'],
};

const processSteps = [
  {
    title: 'Verstehen',
    description: 'Ziel, Nutzer, Kontext. Was soll entstehen – und wofür?',
  },
  {
    title: 'Struktur',
    description: 'Seiten, Daten, Prozesse. Klare Architektur statt Flickwerk.',
  },
  {
    title: 'Umsetzung',
    description: 'Sauberer Code, verständlich aufgebaut. Wartbar und erweiterbar.',
  },
  {
    title: 'Feinschliff',
    description: 'Performance, UX, Details. Spürbar – auch wenn unsichtbar.',
  },
  {
    title: 'Übergabe',
    description: 'Dokumentiert, erklärt, nutzbar. Kein Blackbox-Projekt.',
  },
];

const audiences = [
  'Unternehmer & Selbstständige',
  'Coaches & Berater',
  'Kleine bis mittlere Unternehmen',
  'Agenturen (White Label)',
];

const processIconMap: Record<string, ReactElement> = {
  Verstehen: <Search className='h-8 w-8' />,
  Struktur: <Boxes className='h-8 w-8' />,
  Umsetzung: <Code2 className='h-8 w-8' />,
  Feinschliff: <Sparkles className='h-8 w-8' />,
  Übergabe: <ClipboardCheck className='h-8 w-8' />,
};

const techIconMap: Record<string, ReactElement> = {
  'Next.js': <SiNextdotjs className='h-4 w-4' />,
  Angular: <SiAngular className='h-4 w-4' />,
  React: <SiReact className='h-4 w-4' />,
  'Tailwind CSS': <SiTailwindcss className='h-4 w-4' />,
  'Node.js': <SiNodedotjs className='h-4 w-4' />,
  Prisma: <SiPrisma className='h-4 w-4' />,
  REST: <SiPostman className='h-4 w-4' />,
  GraphQL: <SiGraphql className='h-4 w-4' />,
  Clerk: <ShieldCheck className='h-4 w-4' />,
  Firebase: <SiFirebase className='h-4 w-4' />,
  Supabase: <SiSupabase className='h-4 w-4' />,
  Vercel: <SiVercel className='h-4 w-4' />,
  Docker: <SiDocker className='h-4 w-4' />,
  'Neon (Postgres)': (
    <Image
      src='https://neon.com/brand/neon-logomark-light-color.svg?updated=2026-01-21'
      alt='Neon'
      width={16}
      height={16}
      className='h-4 w-4 brightness-0 invert opacity-80'
    />
  ),
  'Headless CMS': <SiContentful className='h-4 w-4' />,
  'WordPress (ACF, CPTs)': <SiWordpress className='h-4 w-4' />,
  'Performance-Optimierung': <FaGaugeHigh className='h-4 w-4' />,
  'SEO-Basics': <FaMagnifyingGlass className='h-4 w-4' />,
  Wartbarkeit: <FaScrewdriverWrench className='h-4 w-4' />,
  'Saubere Übergabe': <FaClipboardCheck className='h-4 w-4' />,
};

const cardNavItems = [
  {
    label: 'Leistungen',
    bgColor: '#ffffff0d',
    textColor: '#fff',
    links: [
      { label: 'Überblick', ariaLabel: 'Leistungen Überblick', href: '#leistungen' },
      { label: 'Technologien', ariaLabel: 'Zu Technologien', href: '#technologien' },
    ],
  },
  {
    label: 'Prozess',
    bgColor: '#ffffff0d',
    textColor: '#fff',
    links: [
      { label: 'Arbeitsweise', ariaLabel: 'Zum Prozess', href: '#prozess' },
      { label: 'Zielgruppe', ariaLabel: 'Zur Zielgruppe', href: '#zielgruppe' },
    ],
  },
  {
    label: 'Good to know',
    bgColor: '#ffffff0d',
    textColor: '#fff',
    links: [
      { label: 'Cases', ariaLabel: 'Zu Cases', href: '#cases' },
      { label: 'Anfrage', ariaLabel: 'Zum Kontakt', href: '#kontakt' },
      {
        label: 'Zurück zur Hauptseite',
        ariaLabel: 'Zurück zur Hauptseite',
        href: '/',
      },
    ],
  },
];

export default function WebdevelopmentPage() {
  return (
    <div className='relative min-h-screen overflow-x-clip bg-[#0B1B2B] text-slate-100'>
      {/* Page Background */}
      <div className='pointer-events-none fixed inset-0 z-0'>
        <LightPillar
          className='z-0'
          topColor='#1D6FA8'
          bottomColor='#7A2C8E'
          intensity={0.9}
          glowAmount={0.004}
          pillarWidth={3.2}
          pillarHeight={0.45}
          pillarRotation={15}
          mixBlendMode='screen'
        />
      </div>
      {/* Header */}
      <header className='z-50 fixed top-0 w-full bg-transparent'>
        <CardNav
          logo='/Global-logo-W.webp'
          logoAlt='Studio Fokus Logo'
          items={cardNavItems}
          baseColor='transparent'
          menuColor='#fff'
          buttonBgColor='#ffffff1a'
          buttonTextColor='#fff'
          ease='power3.out'
        />
      </header>
      {/* content */}
      <div className='relative z-10'>
        {/* Hero Section */}
        <section className='relative min-h-svh overflow-hidden flex items-center '>
          <div className='relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24'>
            <div>
              <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
                Technischer Möglichmacher · Klarheit & Struktur
              </p>
              <h1 className='mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl'>
                Klare Websites.
                <br className='hidden md:block' />
                Saubere Systeme.
                <br className='hidden md:block' />
                Entwicklung, die trägt.
              </h1>
              <p className='mt-4 text-lg text-slate-300'>
                Webentwicklung für Unternehmer, Coaches und Teams, die keine Bastellösungen wollen –
                sondern Struktur, Performance und Zukunftssicherheit.
              </p>
              <div className='mt-7 flex flex-wrap gap-3'>
                <a
                  href='#kontakt'
                  className='rounded-xl bg-linear-to-r from-[#1D6FA8] to-[#7A2C8E] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
                  Projekt anfragen
                </a>
                <a
                  href='#technologien'
                  className='rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10'>
                  Technologien ansehen
                </a>
              </div>
              <div className='mt-6 flex flex-wrap gap-4 text-sm text-slate-300'>
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='relative'>
              <div className='relative h-105 w-full'>
                <CardSwapView
                  width={380}
                  height={260}
                  cardDistance={80}
                  verticalDistance={85}
                  delay={3500}
                  pauseOnHover>
                  <CardView
                    style={{
                      borderRadius: 28,
                      background: 'rgba(11, 27, 43, 0.82)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      boxShadow: '0 40px 80px -60px rgba(0,0,0,0.7)',
                    }}
                    className='text-slate-100'>
                    <div className='flex h-full flex-col justify-between p-6'>
                      <div className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-300'>
                        Kompetenz 1/42
                      </div>
                      <div className='mt-5 flex items-start gap-3'>
                        <span className='mt-0.5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white/80'>
                          <Code2 className='h-6 w-6' />
                        </span>
                        <div>
                          <div className='text-sm font-semibold'>UI Mockups / Code Snippets</div>
                          <div className='mt-1 text-xs text-slate-300'>
                            Saubere UI-Struktur, realistische Prototypen.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardView>
                  <CardView
                    style={{
                      borderRadius: 28,
                      background: 'rgba(11, 27, 43, 0.82)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      boxShadow: '0 40px 80px -60px rgba(0,0,0,0.7)',
                    }}
                    className='text-slate-100'>
                    <div className='flex h-full flex-col justify-between p-6'>
                      <div className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-300'>
                        Kompetenz 2/42
                      </div>
                      <div className='mt-5 flex items-start gap-3'>
                        <span className='mt-0.5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white/80'>
                          <Boxes className='h-6 w-6' />
                        </span>
                        <div>
                          <div className='text-sm font-semibold'>Architektur & Systeme</div>
                          <div className='mt-1 text-xs text-slate-300'>
                            Logik, Datenflüsse, skalierbare Struktur.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardView>
                  <CardView
                    style={{
                      borderRadius: 28,
                      background: 'rgba(11, 27, 43, 0.82)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      boxShadow: '0 40px 80px -60px rgba(0,0,0,0.7)',
                    }}
                    className='text-slate-100'>
                    <div className='flex h-full flex-col justify-between p-6'>
                      <div className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-300'>
                        Kompetenz 3/42
                      </div>
                      <div className='mt-5 flex items-start gap-3'>
                        <span className='mt-0.5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white/80'>
                          <Sparkles className='h-6 w-6' />
                        </span>
                        <div>
                          <div className='text-sm font-semibold'>Skalierbare Prozesse</div>
                          <div className='mt-1 text-xs text-slate-300'>
                            Stabiler Betrieb, saubere Übergabe, Wartung.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardView>
                </CardSwapView>
              </div>
              <div className='pointer-events-none absolute -bottom-6 right-0 hidden h-24 w-24 rounded-3xl bg-[#1D6FA8]/30 blur-xl md:block'></div>
            </div>
          </div>
        </section>
        {/* Digitale Lösungen Section */}
        <section
          id='leistungen'
          className='relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center gap-10 px-4 py-16 pb-28 overflow-hidden'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>
              Digitale Lösungen mit Struktur.
            </h2>
            <p className='mt-3 text-slate-300'>
              Ich entwickle Websites und Webanwendungen, die nicht nur gut aussehen, sondern logisch
              aufgebaut, verständlich und langfristig nutzbar sind.
            </p>
            <p className='mt-3 text-slate-300'>
              Kein Overengineering. Kein Plugin-Chaos. Sondern klare Systeme, die funktionieren.
            </p>
          </div>
          <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 z-10'>
            {services.map((service) => (
              <PixelCardView
                key={service.title}
                variant='blue'
                className='w-full bg-[#0B1B2B]/70 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)]'>
                <div className='relative z-10 w-full rounded-[22px] border border-white/20 bg-white/5 p-5 text-slate-100 h-full'>
                  <h3 className='text-lg font-semibold text-white'>{service.title}</h3>
                  <p className='mt-2 text-sm text-slate-300'>{service.intro}</p>
                  <ul className='mt-4 space-y-2 text-sm text-slate-300'>
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className='flex items-center gap-2'>
                        <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </PixelCardView>
            ))}
          </div>

          <div className='z-0 pointer-events-none absolute bottom-0 left-1/2 h-1/2 w-screen -translate-x-1/2 opacity-100'>
            <HyperspeedStrip />
          </div>
        </section>
        {/* Technologien Section */}
        <section
          id='technologien'
          className='bg-white/5 py-16 ring-1 ring-white/10 min-h-[70vh] flex flex-col justify-center backdrop-blur-xl border-y border-white/20'>
          <div className='mx-auto max-w-6xl px-4'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-white'>
                Bewährte Technologien. Sauber eingesetzt.
              </h2>
              <p className='mt-3 text-slate-300'>
                Ich arbeite mit modernen, stabilen Technologien – nicht, um zu beeindrucken, sondern
                um nachhaltige Lösungen zu bauen.
              </p>
            </div>
            <div className='mt-8 grid gap-6 md:grid-cols-2'>
              {Object.entries(techStack).map(([title, items]) => (
                <ElectricBorder
                  key={title}
                  color='#2dd4bf'
                  speed={0.5}
                  chaos={0.04}
                  className=''
                  style={{ borderRadius: 18 }}>
                  <div className='rounded-2xl border border-white/15 bg-white/5 p-6 text-slate-100 h-full'>
                    <div className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-300'>
                      {title}
                    </div>
                    <div className='mt-4 flex flex-wrap gap-3'>
                      {items.map((item) => (
                        <span
                          key={item}
                          className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100'>
                          <span className='grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white/80'>
                            {techIconMap[item]}
                          </span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>
        {/* Prozess */}
        <section
          id='prozess'
          className='mx-auto max-w-6xl px-4 py-16 min-h-[70vh] flex flex-col justify-center'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>
              Strukturierter Prozess. Klare Kommunikation.
            </h2>
            <p className='mt-3 text-slate-300'>
              Ich baue keine Projekte, die nur „funktionieren“. Ich baue Systeme, die verstanden
              werden.
            </p>
          </div>
          <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
            {processSteps.map((step, index) => (
              <PixelCardView
                key={step.title}
                variant='blue'
                className='w-full bg-[#0B1B2B]/70 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)]'>
                <div className='relative z-10 w-full rounded-[22px] border border-white/20 bg-white/5 p-5 text-slate-100 h-full'>
                  <div className='text-xs font-semibold text-accent-web'>Step {index + 1}</div>
                  <div className='mt-3 flex flex-col gap-2 text-sm font-semibold text-white items-center'>
                    <span className='my-6 grid h-16 w-16 place-items-center rounded-full bg-white/10 text-accent-web'>
                      {processIconMap[step.title]}
                    </span>
                    <div className='flex justify-start w-full'>{step.title}</div>
                  </div>
                  <p className='mt-2 text-sm text-slate-300 pb-6'>{step.description}</p>
                </div>
              </PixelCardView>
            ))}
          </div>
        </section>
        {/* Nicht für jeden */}
        <section
          id='zielgruppe'
          className='bg-white/5 py-16 ring-1 ring-white/10 min-h-[70vh] flex flex-col justify-center border-y border-white/20'>
          <div className='mx-auto max-w-6xl px-4'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-white'>
                Nicht für jeden. Aber für die Richtigen.
              </h2>
              <p className='mt-3 text-slate-300'>
                Wenn dir Klarheit, saubere Lösungen und langfristiges Denken wichtig sind, passen
                wir gut zusammen.
              </p>
            </div>
            <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {audiences.map((audience) => (
                <ElectricBorder
                  key={audience}
                  color='#2dd4bf'
                  speed={0.5}
                  chaos={0.04}
                  className=''
                  style={{ borderRadius: 18 }}>
                  <div className='rounded-2xl border border-white/15 bg-white/5 p-5 text-slate-100 h-full text-center'>
                    <div className='text-sm font-semibold text-white'>{audience}</div>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>
        {/* Cases */}
        <section
          id='cases'
          className='mx-auto max-w-6xl px-4 py-32 min-h-[90vh] flex flex-col justify-center gap-6'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>Cases</h2>
            <p className='mt-3 text-slate-300'>
              Projekte, die (teilweise) nicht öffentlich sind – aber Struktur, Wirkung und Klarheit
              beweisen.
            </p>
          </div>
          <div className='mt-10 grid gap-x-8 gap-y-21 md:grid-cols-2'>
            <CaseCard
              title='Linde · TRAFÖ GmbH'
              status='Projekt abgeschlossen'
              image='/project-images/project-trafoe.webp'
              href='https://trafoe.de'
              cta='Case ansehen'
            />
            <CaseCard
              title='Rund um Berlin'
              status='Relaunch 2026'
              image='/project-images/project-rund-um-berlin.webp'
              href='#'
              cta='Case ansehen'
            />
            <CaseCard
              title='Pulse AI'
              status='Launch Q2'
              image='https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop'
              href='#'
              cta='Case ansehen'
            />
            <CaseCard
              title='Signal Ops'
              status='Scale-up 2025'
              image='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop'
              href='#'
              cta='Case ansehen'
            />
          </div>
        </section>
        {/* Kontakt */}
        <section
          id='kontakt'
          className='mx-auto w-full px-4 py-32 min-h-[70vh] flex flex-col justify-center items-center backdrop-blur-xl border-y border-white/20'>
          <div className='grid gap-8 md:grid-cols-2 md:items-start  max-w-6xl'>
            <div>
              <h2 className='text-3xl font-bold tracking-tight text-white'>Projekt anfragen</h2>
              <p className='mt-3 text-slate-300'>
                Beschreib mir kurz dein Vorhaben – Website, Web App oder System. Ich melde mich
                ehrlich zurück und sage dir, ob ich der Richtige dafür bin und wie ein sinnvoller
                nächster Schritt aussieht.
              </p>
              <div className='mt-6 rounded-2xl bg-white/95 p-6 text-slate-700 ring-1 ring-white/20'>
                <div className='text-sm font-semibold text-[#0B1B2B]'>Klarheit & Struktur</div>
                <p className='mt-2 text-sm text-slate-600'>
                  Du bekommst eine klare Einschätzung, keine Verkaufsfloskel. Wenn es nicht passt,
                  sage ich das.
                </p>
              </div>
            </div>

            <form className='rounded-3xl bg-white p-6 text-slate-900 ring-1 ring-white/20'>
              <div className='grid gap-4'>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium'>Name *</label>
                  <input
                    required
                    name='name'
                    className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
                  />
                </div>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium'>E-Mail *</label>
                  <input
                    required
                    name='email'
                    type='email'
                    className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
                  />
                </div>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium'>Projektart *</label>
                  <select
                    required
                    name='projectType'
                    className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
                    <option value=''>Bitte wählen</option>
                    <option>Website / Landingpage</option>
                    <option>Web App / Kundenportal</option>
                    <option>System / Automatisierung</option>
                    <option>Etwas anderes</option>
                  </select>
                </div>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium'>Budget (optional)</label>
                  <select
                    name='budget'
                    className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
                    <option value=''>Budgetrahmen</option>
                    <option>Unter 2.500 €</option>
                    <option>2.500 – 7.500 €</option>
                    <option>7.500 – 15.000 €</option>
                    <option>15.000 €+</option>
                  </select>
                </div>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium'>Zeitrahmen *</label>
                  <select
                    required
                    name='timeline'
                    className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
                    <option value=''>Bitte wählen</option>
                    <option>2–4 Wochen</option>
                    <option>1–2 Monate</option>
                    <option>3+ Monate</option>
                    <option>Flexibel</option>
                  </select>
                </div>
                <div className='grid gap-1'>
                  <label className='text-sm font-medium'>Nachricht *</label>
                  <textarea
                    required
                    name='message'
                    rows={5}
                    className='rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-400'></textarea>
                </div>
                <label className='flex items-start gap-2 text-xs text-slate-600'>
                  <input
                    required
                    type='checkbox'
                    name='privacy'
                    className='mt-1'
                  />
                  Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten
                  zur Kontaktaufnahme zu.
                </label>
                <button
                  type='submit'
                  className='h-11 rounded-xl bg-linear-to-r from-[#1D6FA8] to-[#7A2C8E] text-sm font-semibold text-white transition hover:opacity-90'>
                  Anfrage senden
                </button>
                <p className='text-xs text-slate-500'>
                  Kein Spam. Kein Weiterverkauf. Antwort in der Regel innerhalb von 24–48 Stunden.
                </p>
              </div>
            </form>
          </div>
        </section>
        <ScrollToTop />
      </div>

      <footer className='relative z-20 border-t border-white/10 bg-transparent'>
        <div className='mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-1'>
            <div>© {new Date().getFullYear()} Stefan Heinemann · Alle Rechte vorbehalten.</div>
            <div className='text-xs text-slate-500'>
              Web Development · Klare Systeme für digitale Ideen.
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-4'>
            <Link
              href='/'
              className='hover:text-white'>
              Start
            </Link>
            <span className='text-slate-600'>·</span>
            <Link
              href='/impressum'
              className='hover:text-white'>
              Impressum
            </Link>
            <span className='text-slate-600'>·</span>
            <Link
              href='/impressum#datenschutz'
              className='hover:text-white'>
              Datenschutzerklärung
            </Link>
            <span className='text-slate-600'>·</span>
            <a
              href='#cookies'
              className='hover:text-white'>
              Cookie‑Einstellungen
            </a>
            <span className='text-slate-600'>·</span>
            <a
              href='https://www.linkedin.com/in/your-profile'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-white'>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
