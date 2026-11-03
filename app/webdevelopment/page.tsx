import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, PropsWithChildren, ReactElement } from 'react';
import {
  Boxes,
  Check,
  ClipboardCheck,
  Code2,
  LayoutTemplate,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  SiAngular,
  SiContentful,
  SiDocker,
  SiElementor,
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
  SiWoocommerce,
  SiWordpress,
} from 'react-icons/si';
import {
  FaClipboardCheck,
  FaGaugeHigh,
  FaMagnifyingGlass,
  FaRobot,
  FaShieldHalved,
  FaScrewdriverWrench,
} from 'react-icons/fa6';
import ElectricBorder from '@/components/ElectricBorder';
import ContactFormWeb from '@/components/ContactFormWeb';


import PixelCard from '@/components/PixelCard';
import CaseCard from '../../components/CaseCard';
import ScrollToTop from '@/components/ScrollToTop';
import WebBackdrop from '@/components/WebBackdrop';
import HyperspeedBand from '@/components/HyperspeedBand';
import { FaqStructuredData, WebStructuredData } from '@/components/StructuredData';
import FaqSection from '@/app/webdevelopment/FaqSection';
import HeroCheckForm from '@/app/webdevelopment/components/HeroCheckForm';
import HeroPortrait from '@/app/webdevelopment/components/HeroPortrait';
import LiveMetrics from '@/app/webdevelopment/components/LiveMetrics';
import PriceCompass from '@/app/webdevelopment/components/PriceCompass';
import XRaySection from '@/app/webdevelopment/components/XRaySection';
import AboutDeveloperSection from '@/app/webdevelopment/components/AboutDeveloperSection';
import { faqBoth } from '@/app/coaching/faq';
import { faqWeb } from '@/app/webdevelopment/faq';
import { VAT_NOTE, webServices } from '@/app/webdevelopment/pricing';
import { webCases } from '@/app/webdevelopment/cases';

const trustItems = ['Persönlich & direkt', 'Sauberer Code', 'Wartbar & skalierbar'];

const PixelCardView = PixelCard as ComponentType<
  PropsWithChildren<{ variant?: string; className?: string }>
>;

const techStack = {
  Frontend: ['Next.js', 'Angular', 'React', 'Tailwind CSS'],
  'Backend & Daten': ['Node.js', 'Prisma', 'REST', 'GraphQL'],
  'Auth & Infrastruktur': ['Clerk', 'Firebase', 'Supabase', 'Vercel', 'Docker', 'Neon (Postgres)'],
  'CMS & Inhalte': [
    'Headless CMS',
    'WordPress (ACF, CPTs)',
    'WooCommerce',
    'Elementor',
    'Divi Builder',
  ],
  Qualität: [
    'Performance-Optimierung',
    'SEO',
    'KI-Suchoptimierung',
    'Security',
    'Wartbarkeit',
    'Saubere Übergabe',
  ],
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

/** Ehrliche Abgrenzung statt Zielgruppen-Kacheln (Entwurf 2026-11, von Stefan geprüft). */
const fitYes = [
  'Du willst etwas, das in fünf Jahren noch läuft – nicht nur bis zum Launch.',
  'Du willst verstehen, was gebaut wird, und die Inhalte danach selbst pflegen.',
  'Du suchst einen festen Ansprechpartner statt wechselnder Zuständigkeiten.',
  'Ladezeit, Auffindbarkeit und Sicherheit sind dir wichtiger als der nächste Trend.',
];

const fitNo = [
  'Du suchst den günstigsten Baukasten.',
  'Die Seite soll morgen online sein – das Konzept kommt später.',
  'Für jeden Wunsch soll ein weiteres Plugin her.',
  'Du brauchst ein Team, das rund um die Uhr erreichbar ist.',
];

/**
 * Entscheidungsmatrix: Wann welche Technik. Jede Spalte ist durch eine
 * Referenz gedeckt (cases.ts) – Grundlage für Google- und KI-Antworten auf
 * „WordPress oder Next.js?“.
 */
const techChoices = [
  {
    title: 'WordPress',
    when: 'wenn …',
    points: [
      'du Inhalte selbst und ohne Entwickler pflegen willst',
      'ein Shop mit WooCommerce reicht',
      'Budget und Zeitrahmen überschaubar sind',
    ],
    example: 'TRAFÖ-Shop, Rund um Berlin Rallye',
  },
  {
    title: 'Next.js',
    when: 'wenn …',
    points: [
      'Ladezeit und Sichtbarkeit bei Google und KI entscheiden',
      'Logins, Rollen oder Dashboards dazugehören',
      'das System mit dem Unternehmen wachsen soll',
    ],
    example: 'Zahnarzt Groß & Groß, Kundenportal TRAFÖ',
  },
  {
    title: 'Headless',
    when: 'wenn …',
    points: [
      'Inhalte an mehreren Stellen erscheinen – Website, App, Portal',
      'bestehende Systeme angebunden werden sollen',
      'Redaktion und Technik getrennt arbeiten',
    ],
    example: 'Schnittstellen im Kundenportal TRAFÖ',
  },
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
      src='/logos/neon-logomark.svg'
      alt='Neon'
      width={16}
      height={16}
      className='h-4 w-4 brightness-0 invert opacity-80'
    />
  ),
  'Headless CMS': <SiContentful className='h-4 w-4' />,
  'WordPress (ACF, CPTs)': <SiWordpress className='h-4 w-4' />,
  WooCommerce: <SiWoocommerce className='h-4 w-4' />,
  Elementor: <SiElementor className='h-4 w-4' />,
  // Kein Divi-Logo in react-icons – neutrales Page-Builder-Symbol.
  'Divi Builder': <LayoutTemplate className='h-4 w-4' />,
  'Performance-Optimierung': <FaGaugeHigh className='h-4 w-4' />,
  SEO: <FaMagnifyingGlass className='h-4 w-4' />,
  'KI-Suchoptimierung': <FaRobot className='h-4 w-4' />,
  Security: <FaShieldHalved className='h-4 w-4' />,
  Wartbarkeit: <FaScrewdriverWrench className='h-4 w-4' />,
  'Saubere Übergabe': <FaClipboardCheck className='h-4 w-4' />,
};

export default function WebdevelopmentPage() {
  return (
    <div className='relative min-h-screen overflow-x-clip bg-[#06101c] text-slate-100'>
      <WebStructuredData
        cases={webCases.map((entry) => ({
          ...entry,
          description: entry.result ? `${entry.description} ${entry.result}.` : entry.description,
        }))}
        services={webServices}
      />
      <FaqStructuredData entries={[...faqWeb, ...faqBoth]} />
      {/* Page Background */}
      <div className='pointer-events-none fixed inset-0 z-0'>
        <WebBackdrop />
      </div>
      {/* content */}
      <main className='relative z-10'>
        {/* Hero Section – Split oben, Beleg-Band unten (2026-11) */}
        <section className='relative overflow-hidden pt-32 pb-16 md:pt-36 lg:pb-24'>
          <div className='relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8'>
            <div className='grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16'>
              {/* Links: nur das Wesentliche */}
              <div className='flex flex-col items-start'>
                <p className='mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
                  Webentwicklung in Potsdam · 20 Jahre Unternehmer
                </p>
                <h1 className='mb-8 text-[2rem] font-extrabold leading-tight tracking-tight text-white md:text-[2.75rem]'>
                  20 Jahre habe ich ein Unternehmen geführt.
                  <br />
                  <span className='bg-linear-to-r from-[#9bc7ff] via-accent-web to-white bg-clip-text text-transparent'>
                    Heute baue ich die Systeme, die ich damals gebraucht hätte.
                  </span>
                </h1>
                <p className='mb-10 max-w-130 text-lg text-slate-300'>
                  Webentwicklung aus Potsdam für Unternehmer, Coaches und Teams in Berlin und
                  Brandenburg: Websites, Shops und Kundenportale mit Struktur, Performance und
                  Zukunftssicherheit – statt Bastellösungen.
                </p>
                <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
                  <a
                    href='#kontakt'
                    className='web-cta w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto'>
                    Projekt anfragen
                  </a>
                  <a
                    href='#technologien'
                    className='w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto'>
                    Technologien ansehen
                  </a>
                </div>
              </div>
              {/* Rechts: Porträt, so hoch wie die Textspalte – mobil zuerst */}
              <div className='order-first w-full lg:order-none'>
                <HeroPortrait />
              </div>
            </div>

            {/* Beleg-Band: KI-Check · Live-Messung · Arbeitsweise */}
            <div className='mt-16 grid gap-6 rounded-3xl border border-white/10 bg-[#030a13]/60 p-5 backdrop-blur-md md:p-6 lg:mt-20 lg:grid-cols-[1.15fr_1.15fr_0.7fr] lg:items-center lg:gap-8'>
              {/* Adresse eingeben → scrollt zum Check im Röntgenblick-Abschnitt und prüft */}
              <HeroCheckForm className='lg:px-2' />
              <LiveMetrics />
              <ul className='grid gap-3 text-sm text-slate-300 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-white/10 lg:pl-8'>
                {trustItems.map((item) => (
                  <li
                    key={item}
                    className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-[#86C243]' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* Digitale Lösungen Section */}
        <section
          id='leistungen'
          className='relative mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-start gap-10 px-4'>
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
            {/*
              Budgetrahmen gehört vor das Formular, nicht hinein. Vorher tauchten
              diese Zahlen nur als Frage im Budget-Select auf – wer zu klein
              dachte, schrieb trotzdem; wer passend dachte, sprang vorher ab.
            */}
            <p className='mt-4 text-sm text-slate-400'>
              Richtwerte für den Einstieg, damit du vorher weißt, woran du bist. Der genaue Rahmen
              hängt vom Umfang ab – die Einschätzung dazu bekommst du im Erstgespräch, kostenlos
              und unverbindlich.
            </p>
          </div>
          <div className='z-10 my-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {webServices.map((service) => (
              <PixelCardView
                key={service.title}
                variant='blue'
                className='w-full bg-[#0B1B2B]/70 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)]'>
                <div className='relative z-10 w-full rounded-[22px] border border-white/20 bg-white/5 p-5 text-slate-100 h-full'>
                  {/* Feste Mindesthöhen für Titel und Intro (je zwei Zeilen):
                      so stehen die Preise in allen vier Karten auf einer Höhe. */}
                  <h3 className='text-lg font-semibold leading-7 text-white lg:min-h-14'>
                    {service.title}
                  </h3>
                  <p className='mt-2 text-sm leading-5 text-slate-300 lg:min-h-10'>
                    {service.intro}
                  </p>
                  <p className='mt-6 text-sm text-slate-300'>ab</p>
                  <p className='text-3xl font-bold tracking-tight text-accent-web'>
                    {service.price}
                  </p>
                  <p className='mt-1 text-xs text-slate-300'>{VAT_NOTE}</p>
                  <ul className='mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-300'>
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

          <div className='relative z-10 mb-16 w-full max-w-3xl self-center'>
            <PriceCompass />
          </div>

          <div className='z-0 pointer-events-none absolute bottom-0 left-1/2 h-1/2 w-screen -translate-x-1/2 opacity-45'>
            <HyperspeedBand />
          </div>
        </section>
        {/* Technologien Section */}
        <section
          id='technologien'
          className='backdrop-blur-md py-16 ring-1 ring-white/10 min-h-[80vh] flex flex-col justify-center border-y border-white/20'>
          <div className='mx-auto max-w-6xl px-4'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-white'>
                Bewährte Technologien. Sauber eingesetzt.
              </h2>
              <p className='mt-3 text-slate-300'>
                Ich arbeite mit modernen, stabilen Technologien – nicht, um zu beeindrucken, sondern
                um nachhaltige Lösungen zu bauen. Welche passt, hängt von deinem Vorhaben ab:
              </p>
            </div>
            <div className='mt-8 grid gap-4 md:grid-cols-3'>
              {techChoices.map((choice) => (
                <div
                  key={choice.title}
                  className='rounded-2xl border border-white/15 bg-[#030a13]/70 p-6'>
                  <h3 className='text-lg font-semibold text-white'>
                    {choice.title}, <span className='font-normal text-slate-300'>{choice.when}</span>
                  </h3>
                  <ul className='mt-4 space-y-2 text-sm text-slate-300'>
                    {choice.points.map((point) => (
                      <li
                        key={point}
                        className='flex gap-2'>
                        <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#86C243]' />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className='mt-4 text-xs text-slate-400'>Beispiel: {choice.example}</p>
                </div>
              ))}
            </div>
            <p className='mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300'>
              Womit ich arbeite
            </p>
            <div className='mt-4 grid gap-6 md:grid-cols-2'>
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
        <XRaySection />
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
                  <div className='text-sm font-semibold text-accent-web'>Schritt {index + 1}</div>
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
          className='backdrop-blur-md py-16 ring-1 ring-white/10 min-h-[70vh] flex flex-col justify-center border-y border-white/20'>
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
            <div className='mt-8 grid gap-6 md:grid-cols-2'>
              <div className='rounded-2xl border border-[#86C243]/40 bg-[#030a13]/70 p-6'>
                <h3 className='text-lg font-semibold text-white'>Passt, wenn …</h3>
                <ul className='mt-4 space-y-3 text-sm text-slate-200'>
                  {fitYes.map((item) => (
                    <li
                      key={item}
                      className='flex gap-3'>
                      <Check
                        aria-hidden='true'
                        className='mt-0.5 h-4 w-4 shrink-0 text-[#86C243]'
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='rounded-2xl border border-white/15 bg-[#030a13]/70 p-6'>
                <h3 className='text-lg font-semibold text-white'>Passt nicht, wenn …</h3>
                <ul className='mt-4 space-y-3 text-sm text-slate-300'>
                  {fitNo.map((item) => (
                    <li
                      key={item}
                      className='flex gap-3'>
                      <X
                        aria-hidden='true'
                        className='mt-0.5 h-4 w-4 shrink-0 text-slate-500'
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className='mt-4 text-xs text-slate-400'>
                  Dann sage ich dir das ehrlich – und nenne dir, wenn ich kann, jemanden, der besser
                  passt.
                </p>
              </div>
            </div>
            <p className='mt-6 text-sm text-slate-300'>
              Typische Kunden: {audiences.join(' · ')}
            </p>
          </div>
        </section>
        <AboutDeveloperSection />
        {/* Referenzen */}
        <section
          id='referenzen'
          className='mx-auto max-w-6xl px-4 py-32 min-h-[90vh] flex flex-col justify-center gap-6'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>Referenzen</h2>
            <p className='mt-3 text-slate-300'>
              Projekte, die (teilweise) nicht öffentlich sind – aber Struktur, Wirkung und Klarheit
              beweisen.
            </p>
          </div>
          <div className='mt-10 grid gap-x-8 gap-y-21 md:grid-cols-2'>
            {webCases.map((entry) => (
              <CaseCard
                key={entry.name}
                title={entry.name}
                status={entry.status}
                description={entry.description}
                tech={entry.tech}
                result={entry.result}
                video={entry.video}
                image={entry.image}
                href={entry.url}
                cta={entry.url ? 'Case ansehen' : undefined}
              />
            ))}
          </div>
        </section>
        <FaqSection />
        {/* Kontakt */}
        <section
          id='kontakt'
          className='backdrop-blur-xs mx-auto w-full px-4 py-32 min-h-[70vh] flex flex-col justify-center items-center bg-white/5 border-y border-white/20'>
          <div className='w-full md:max-w-6xl flex flex-col items-start justify-start gap-6 mb-12'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>Projekt anfragen</h2>
            <p className='mt-3 text-slate-300'>
              Beschreib mir kurz dein Vorhaben – Website, Web App oder System. <br />
              Ich melde mich ehrlich zurück und sage dir, ob ich der Richtige dafür bin und wie ein
              sinnvoller nächster Schritt aussieht.
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 md:items-start w-full md:max-w-6xl'>
            <div className='max-w-full'>
              <ElectricBorder
                color='#2dd4bf'
                speed={0.5}
                chaos={0.04}
                style={{ borderRadius: 18 }}
                className='mb-6 w-max-full'>
                <div className='rounded-2xl border border-white/15 bg-white/5 p-6 text-slate-100'>
                  <div className='text-sm font-semibold text-white'>Klarheit & Struktur</div>
                  <p className='mt-2 text-sm text-slate-300'>
                    Du bekommst eine klare Einschätzung, keine Verkaufsfloskel. Wenn es nicht passt,
                    sage ich das.
                  </p>
                </div>
              </ElectricBorder>
              <figure className='relative hidden aspect-4/5 overflow-hidden rounded-[28px] ring-1 ring-white/15 md:block'>
                <Image
                  src='/images-webdevelopment/stefan-heinemann-projekt-zeigen.webp'
                  alt='Stefan Heinemann zeigt auf einen Monitor mit einem Website-Entwurf'
                  fill
                  sizes='(min-width: 1152px) 560px, 45vw'
                  className='object-cover object-[center_30%]'
                />
                <figcaption className='absolute inset-x-0 bottom-0 bg-linear-to-t from-[#06101c] via-[#06101c]/80 to-transparent p-6 pt-16 text-sm text-slate-200'>
                  Lass uns dein Projekt anschauen – im Erstgespräch, kostenlos und unverbindlich.
                </figcaption>
              </figure>
            </div>

            <ElectricBorder
              color='#2dd4bf'
              speed={0.5}
              chaos={0.04}
              style={{ borderRadius: 18 }}
              className=''>
              <ContactFormWeb />
            </ElectricBorder>
          </div>
        </section>
      </main>
      {/* Footer */}
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
              href='/webdevelopment/impressum'
              className='hover:text-white'>
              Impressum
            </Link>
            <span className='text-slate-600'>·</span>
            <Link
              href='/webdevelopment/datenschutz'
              className='hover:text-white'>
              Datenschutzerklärung
            </Link>
            <span className='text-slate-600'>·</span>
            <Link
              href='/webdevelopment/cookies'
              className='hover:text-white'>
              Cookies
            </Link>

            <span className='text-slate-600'>·</span>
            <a
              href='https://www.linkedin.com/in/stefan-h-317377267/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-white'>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
