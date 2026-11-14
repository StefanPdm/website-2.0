import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, Home, Lock, Repeat, Scale, UserRound, type LucideIcon } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { ContentPageStructuredData, FaqStructuredData } from '@/components/StructuredData';
import BreathRings from '@/app/coaching/components/BreathRings';
import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import LightField from '@/app/coaching/components/LightField';
import HeroPicture from '@/app/coaching/components/HeroPicture';
import QuoteSection, { Mark } from '@/app/coaching/components/QuoteSection';
import { faqEntrepreneur } from '@/app/coaching/faq';
import { offerByTitle } from '@/app/coaching/pricing';

/**
 * Schwerpunktseite „Coaching für Unternehmer“ (2026-11-14).
 *
 * Seit der Öffnung von Welt A („Life Coaching“ statt „Life Coaching für
 * Unternehmer“) sind Unternehmer Herkunft und Schwerpunkt, nicht Filter. Diese
 * Seite trägt die Unternehmer-Keywords und sagt, was der Onepager bewusst
 * nicht mehr zuspitzt.
 *
 * Nur Belegbares: Stefans Werdegang wie in AboutSection, Preise aus
 * pricing.ts, Formate wie in faq.ts. Keine Klientengeschichten, keine
 * Erfolgsversprechen.
 */

const PATH = '/coaching/unternehmer';

const title = 'Coaching für Unternehmerinnen & Unternehmer in Potsdam & Berlin';
const description =
  'Coaching für Unternehmerinnen, Unternehmer und Selbstständige in Potsdam, Berlin und online – von einem Coach, der 20 Jahre selbst ein Unternehmen mit drei Filialen geführt hat. Für die persönlichen Themen hinter der Firma: Einsamkeit an der Spitze, Firma und Familie, Entscheidungen, Übergänge. Erstgespräch kostenlos.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Coaching für Unternehmer',
    'Coaching für Unternehmerinnen',
    'Life Coaching für Unternehmer',
    'Coaching für Unternehmer Potsdam',
    'Coaching für Unternehmer Berlin',
    'Coaching für Selbstständige',
    'Unternehmercoaching',
    'Coaching Geschäftsführer',
    'Einsamkeit an der Spitze',
    'Unternehmer Burnout',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title,
    description,
    url: PATH,
    type: 'article',
    locale: 'de_DE',
    siteName: 'Stefan Heinemann Coaching',
  },
  twitter: { card: 'summary_large_image', title, description },
};

/** Was Unternehmer anders trifft als Angestellte – Themen, keine Fallgeschichten. */
const themes: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: UserRound,
    title: 'Allein an der Spitze',
    text: 'Im Team musst du stark sein, zu Hause willst du niemanden belasten. Mit wem sprichst du eigentlich über dich?',
  },
  {
    Icon: Home,
    title: 'Firma und Familie',
    text: 'Du sitzt am Abendbrottisch, aber im Kopf bist du noch im Betrieb. Und die Menschen, für die du das alles tust, merken es.',
  },
  {
    Icon: Compass,
    title: 'Wer bist du ohne die Firma?',
    text: 'Wenn das Unternehmen dein Lebenswerk ist, wird jede Krise der Firma zu einer Krise deines Selbstwerts.',
  },
  {
    Icon: Scale,
    title: 'Entscheidungen mit Tragweite',
    text: 'Es geht um Arbeitsplätze, um Geld, um Existenzen. Da drehen sich Gedanken nachts im Kreis, statt zu Entscheidungen zu werden.',
  },
  {
    Icon: Repeat,
    title: 'Übergänge',
    text: 'Verkauf, Nachfolge, Neuanfang oder die Frage, ob du so weitermachen willst. Der Wechsel ist selten ein Rechenproblem.',
  },
  {
    Icon: Lock,
    title: 'Erfolg, der nicht erfüllt',
    text: 'Umsatz, Filialen, Team: alles gewachsen. Und trotzdem fühlt es sich innen nach Pflichtprogramm an.',
  },
];

/** Kennzahlen wie in AboutSection (belegt, §10). */
const stats = [
  { value: '20+', label: 'Jahre Unternehmer' },
  { value: '3', label: 'Filialen, großes Team' },
  { value: '2024', label: 'mein Wendepunkt' },
  { value: '2025', label: 'Coach seit Mitte des Jahres' },
];

const startersession = offerByTitle('Startersession');
const folgesession = offerByTitle('Folgesession');

const facts = [
  {
    term: 'Erstgespräch',
    detail:
      'Kostenlos und unverbindlich: die Klarheits-Session, ca. 30 Minuten per Telefon oder Video.',
  },
  {
    term: 'Sessions',
    detail: `Wenige, lange Termine statt einer Stunde pro Woche: erste Session (Startersession) ca. 4 Stunden für ${startersession.price}, jede weitere ca. 3 Stunden für ${folgesession.price} – inkl. MwSt.`,
  },
  {
    term: 'Orte',
    detail:
      'Bei mir in Potsdam, bei dir vor Ort in Potsdam, Berlin oder Brandenburg – auch im Unternehmen, wenn Rahmen und Ziel vorher abgestimmt sind – oder online per Video.',
  },
  {
    term: 'Vertraulichkeit',
    detail:
      'Was du erzählst, bleibt bei mir – auch gegenüber Team, Gesellschaftern und Familie.',
  },
];

const linkClass =
  'rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function CoachingUnternehmerPage() {
  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Unternehmerinnen & Unternehmer',
          about: 'Coaching für Unternehmer',
        }}
      />
      <FaqStructuredData entries={faqEntrepreneur} />
      <article className='relative z-10'>
        {/* Kopfbereich: Foto als Bühne (KI-Bild, Unternehmerin am Fenster) – bewusst eine
            Frau: Das Angebot gilt Unternehmerinnen genauso, und der Onepager-Hero zeigt zwei Männer. */}
        <section className='relative overflow-hidden border-b border-border lg:flex lg:min-h-[86dvh] lg:items-center'>
          {/* lg:top-20: Bild beginnt unter der fixen Kopfzeile – auf breiten Schirmen (27") lag der Kopf sonst dahinter */}
          <div className='relative h-[62vh] min-h-[360px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-20 lg:h-auto'>
            <HeroPicture
              wide={{ src: '/images-nlp/unternehmerin-fenster.webp', width: 1672, height: 941 }}
              tall={{ src: '/images-nlp/unternehmerin-fenster-hoch.webp', width: 900, height: 1125 }}
              alt='Eine Unternehmerin im Blazer steht nachdenklich am Bürofenster und blickt über die Stadt'
              className='object-cover object-[55%_20%] lg:object-[85%_top]'
              priority
            />
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-linear-to-b from-transparent from-55% to-(--bg) lg:bg-linear-to-r lg:from-(--bg) lg:from-25% lg:via-(--bg)/75 lg:via-45% lg:to-transparent lg:to-70%'
            />
          </div>
          <div className='container relative mx-auto -mt-20 max-w-6xl px-4 pb-16 lg:mt-0 lg:pt-40 lg:pb-24'>
            <div className='max-w-xl'>
              <nav
                aria-label='Brotkrumen'
                className='mb-8 flex flex-wrap items-center gap-2 text-xs text-(--muted)'>
                <Link
                  href='/'
                  className='transition hover:text-(--text)'>
                  Start
                </Link>
                <span aria-hidden='true'>/</span>
                <Link
                  href='/coaching'
                  className='transition hover:text-(--text)'>
                  Coaching
                </Link>
                <span aria-hidden='true'>/</span>
                <span className='text-(--text)'>Unternehmerinnen &amp; Unternehmer</span>
              </nav>

              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Schwerpunkt eigene Firma
              </p>
              <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
                Coaching für Unternehmerinnen und Unternehmer
              </h1>
              <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
                Über 20 Jahre habe ich selbst ein Unternehmen geführt – drei Filialen, großes Team.
                Ich weiß, wie es ist, wenn alle etwas von dir wollen und du für alle stark sein
                musst. Hier sprichst du mit jemandem, der das von innen kennt. In Potsdam, Berlin
                und online.
              </p>
              <ContentDate path={PATH} />
            </div>
          </div>
        </section>

        {/* Themen */}
        <section className='relative overflow-hidden px-4 py-16 sm:py-20'>
          <BreathRings className='-right-64 -bottom-48 w-[640px]' />
          <div className='container relative mx-auto max-w-5xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was dich mit eigener Firma anders trifft
            </h2>
            <p className='mt-3 max-w-2xl text-sm text-(--muted) sm:text-base'>
              Die Themen sind menschlich. Aber mit eigener Firma haben sie mehr Gewicht.
            </p>
            <ul className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {themes.map(({ Icon, title: themeTitle, text }) => (
                <li key={themeTitle}>
                  <GlassCard className='h-full p-6'>
                    <Icon
                      aria-hidden='true'
                      className='h-6 w-6 text-accent'
                    />
                    <h3 className='mt-4 text-lg font-semibold text-(--text)'>{themeTitle}</h3>
                    <p className='mt-2 text-sm leading-relaxed text-(--muted)'>{text}</p>
                  </GlassCard>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Herkunft */}
        <section className='tone-dark relative overflow-hidden border-y border-border bg-(--bg) px-4 pt-16 pb-32 sm:pt-24 sm:pb-36'>
          <LightField
            variant='waves'
            className='inset-x-0 bottom-0 h-24 w-full'
          />
          <LightField
            variant='dust'
            className='inset-0'
          />
          <div className='container relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center'>
            <div className='relative aspect-4/5 overflow-hidden rounded-3xl border border-border'>
              <Image
                src='/images-nlp/portrait-flipchart.webp'
                alt='Stefan Heinemann am Flipchart in einem Workshopraum'
                fill
                sizes='(min-width: 1024px) 440px, 100vw'
                className='object-cover object-[55%_center]'
              />
            </div>
            <div>
              <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
                Warum ich das verstehe
              </h2>
              <div className='mt-6 space-y-4 text-base leading-relaxed text-(--muted)'>
                <p>
                  Über 20 Jahre war ich Unternehmer im Interieur Design, in Berlin und Hamburg, mit
                  drei Filialen und großem Team. Nach jedem messbaren Maßstab erfolgreich.
                </p>
                <p>
                  Und trotzdem bin ich in Erschöpfung, Depression und Burnout gelandet – weil ich
                  mein Glück im Außen gesucht habe. 2024 war mein Wendepunkt. Ich habe mir Hilfe
                  geholt und meine NLP-Ausbildung begonnen. Seit Mitte 2025 begleite ich als Coach
                  andere Menschen.
                </p>
                <p className='text-(--text)'>
                  Ich muss dir nicht erklären lassen, was Lohnlauf, Personalgespräch oder ein
                  schlechter Monat mit dem Schlaf machen. Wir können gleich bei dir anfangen.
                </p>
              </div>
              <dl className='mt-8 grid grid-cols-2 gap-x-6 gap-y-5'>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className='flex flex-col border-l border-border-strong pl-4'>
                    <dt className='text-xs leading-snug text-(--subtle)'>{stat.label}</dt>
                    <dd className='order-first text-2xl font-semibold text-accent sm:text-3xl'>
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className='mt-6 text-sm text-(--muted)'>
                Du führst keine eigene Firma, erkennst dich aber wieder? Dann bist du genauso richtig:{' '}
                <Link
                  href='/coaching'
                  className={linkClass}>
                  Life Coaching für alle, die viel tragen
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Fragen von Unternehmern – Text steht auch zugeklappt im HTML (FAQPage) */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-3xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was mich Unternehmerinnen und Unternehmer fragen
            </h2>
            <div className='mt-8 space-y-3'>
              {faqEntrepreneur.map((entry, index) => (
                <GlassCard
                  key={entry.question}
                  className='overflow-hidden p-0'>
                  <details
                    className='group'
                    open={index === 0}>
                    <summary className='flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-6 [&::-webkit-details-marker]:hidden'>
                      <h3 className='text-base font-semibold text-(--text) sm:text-lg'>
                        {entry.question}
                      </h3>
                      <span
                        aria-hidden='true'
                        className='mt-1 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45'>
                        +
                      </span>
                    </summary>
                    <p className='px-5 pb-5 text-sm leading-relaxed text-(--muted) sm:px-6 sm:pb-6 sm:text-base'>
                      {entry.answer}
                    </p>
                  </details>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Eigener Satz aus „Mein Weg vor NLP“ (AboutSection) */}
        <QuoteSection
          label='Gedanke zur Veränderung'
          rings='left'
          quote={
            <>
              „Ich muss nicht die Welt um mich herum ändern, sondern <Mark>mich selbst</Mark>.“
            </>
          }
          caption='Stefan Heinemann'
        />

        {/* Fakten */}
        <section className='bg-(--section-bg-accent) px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              So passt es in deinen Kalender
            </h2>
            <dl className='mt-8 divide-y divide-border rounded-2xl border border-card-border bg-surface'>
              {facts.map((fact) => (
                <div
                  key={fact.term}
                  className='grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6'>
                  <dt className='text-sm font-semibold text-(--text)'>{fact.term}</dt>
                  <dd className='text-sm text-(--muted)'>{fact.detail}</dd>
                </div>
              ))}
            </dl>
            <p className='mt-4 text-sm text-(--muted)'>
              Mehr dazu:{' '}
              <Link
                href='/coaching#ansatz'
                className={linkClass}>
                wie ich arbeite
              </Link>{' '}
              ·{' '}
              <Link
                href='/coaching/potsdam'
                className={linkClass}>
                Coaching in Potsdam
              </Link>{' '}
              ·{' '}
              <Link
                href='/coaching/berlin'
                className={linkClass}>
                Coaching in Berlin
              </Link>
            </p>
          </div>
        </section>

        {/* Abschluss */}
        <section className='border-t border-border px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Einmal offen reden. Auf Augenhöhe.
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-sm text-(--muted) sm:text-base'>
              30 Minuten, kostenlos, per Telefon oder Video. Danach weißt du, ob wir zusammenpassen.
            </p>
            <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
              <PrimaryButton
                href='/coaching#kontakt'
                className='w-full sm:w-auto'>
                Kostenloses Erstgespräch
              </PrimaryButton>
              <SecondaryButton
                href='/coaching#preise'
                className='w-full sm:w-auto'>
                Preise ansehen
              </SecondaryButton>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
