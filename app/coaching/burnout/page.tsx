import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  BatteryLow,
  CircleCheck,
  CircleX,
  Compass,
  Footprints,
  Gauge,
  type LucideIcon,
  Phone,
  ShieldAlert,
  Stethoscope,
  TrendingDown,
  UserMinus,
} from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { ContentPageStructuredData, FaqStructuredData } from '@/components/StructuredData';
import BreathRings from '@/app/coaching/components/BreathRings';
import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import LightField from '@/app/coaching/components/LightField';
import QuoteSection, { Mark } from '@/app/coaching/components/QuoteSection';
import { faqBurnout } from '@/app/coaching/faq';
import { offerByTitle } from '@/app/coaching/pricing';

/**
 * Inhaltsseite „Coaching nach Burnout“ (2026-11-15).
 *
 * Ziel: die Suchfrage rund um Burnout in Potsdam vollständig beantworten –
 * wie man hineinkommt, was es ist, wie man wieder herauskommt – und dann
 * ehrlich zeigen, wo Coaching hilft.
 *
 * Rechtlicher Rahmen (nicht verhandelbar): Coaching behandelt keine Krankheit
 * (Heilpraktikergesetz) und verspricht keine Heilung (Heilmittelwerbegesetz).
 * Darum: „nach“ Burnout, immer zuerst ärztliche Abklärung, sichtbare
 * Hilfe-Nummern, keine Erfolgszusagen.
 *
 * Quellen: WHO, ICD-11 QD85 (Burnout als berufsbezogenes Phänomen mit drei
 * Dimensionen). Bezüge zu Robbins, Lange und Corssen nur als Denkmodelle, die
 * Stefan nutzt – keine wörtlichen Zitate, kein Wirksamkeitsversprechen.
 * Stefans Geschichte wie in AboutSection.
 */

const PATH = '/coaching/burnout';

const title = 'Coaching nach Burnout in Potsdam & Berlin';
const description =
  'Coaching nach Burnout in Potsdam, Berlin und online – von einem Coach, der den Burnout selbst erlebt hat. Wie man hineinkommt, was Burnout laut WHO ist, wie der Weg zurück aussieht und wann Coaching passt. Keine Behandlung, sondern der nächste Schritt danach. Erstgespräch kostenlos.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Coaching nach Burnout',
    'Burnout Coaching Potsdam',
    'Burnout Coach Potsdam',
    'Coaching nach Burnout Berlin',
    'Burnout Potsdam',
    'Burnout Unternehmer',
    'Burnout Prävention Coaching',
    'Rückkehr nach Burnout',
    'Was ist Burnout',
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

/** Wie man hineinkommt – ein schleichender Weg, kein einzelnes Ereignis. */
/**
 * Wie man hineinkommt. Punkt 1 allgemein, Punkte 2–4 nach Dieter Lange
 * (von Stefan so vorgegeben, 2026-11-15): nicht die Menge an Arbeit allein
 * brennt aus, sondern Widerstand, fehlender Sinn und fehlende Würdigung.
 */
const pathIn: { title: string; text: string; lens?: string }[] = [
  {
    title: 'Die Belastung wird dauerhaft größer als die Erholung',
    text: 'Selten ist es der eine große Zusammenbruch. Meist ist es ein langer Zeitraum, in dem Arbeit und Verantwortung mehr Kraft kosten, als Pausen zurückgeben.',
  },
  {
    title: 'Du bist innerlich dagegen',
    text: 'Du tust jeden Tag etwas, gegen das sich in dir alles sträubt. Dieser stille Widerstand kostet mehr Kraft als die Arbeit selbst – Tag für Tag, ohne dass es jemand sieht.',
    lens: 'nach Dieter Lange',
  },
  {
    title: 'Es ergibt für dich keinen Sinn',
    text: 'Die Aufgabe mag für andere wichtig sein – für dich selbst ist sie es nicht. Wer nicht weiß, wofür er sich verausgabt, hat nichts, woraus er Kraft zurückbekommt.',
    lens: 'nach Dieter Lange',
  },
  {
    title: 'Niemand schaut hin',
    text: 'Keiner merkt, was du leistest, und niemand würdigt es – weder die Arbeit noch dich. Ohne Wertschätzung läuft der Tank leer, egal wie viel du hineingibst.',
    lens: 'nach Dieter Lange',
  },
];

/** WHO, ICD-11 QD85: drei Dimensionen. */
const dimensions: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: BatteryLow,
    title: 'Erschöpfung',
    text: 'Gefühl von Energieverlust und Erschöpfung, das auch nach freien Tagen nicht weggeht.',
  },
  {
    Icon: UserMinus,
    title: 'Innere Distanz',
    text: 'Wachsender Abstand zur eigenen Arbeit, Gleichgültigkeit oder Zynismus gegenüber dem, was einem einmal wichtig war.',
  },
  {
    Icon: TrendingDown,
    title: 'Weniger Wirksamkeit',
    text: 'Das Gefühl, weniger zu schaffen und weniger zu bewirken – obwohl man mehr investiert als je zuvor.',
  },
];

/** Der Weg zurück: erst Boden, dann Richtung. Vier Blickwinkel, die ich verbinde. */
const pathOut: { step: string; Icon: LucideIcon; title: string; lens: string; text: string; question: string }[] = [
  {
    step: '01',
    Icon: Stethoscope,
    title: 'Ernst nehmen und abklären',
    lens: 'Ärztliche Begleitung',
    text: 'Der erste Schritt gehört nicht ins Coaching, sondern zu deiner Hausärztin oder deinem Hausarzt: klären, was hinter den Beschwerden steckt, und entlasten. Hilfe zu holen ist kein Umweg, sondern Teil des Weges.',
    question: 'Wer schaut gerade von außen auf meine Gesundheit?',
  },
  {
    step: '02',
    Icon: Footprints,
    title: 'Verantwortung ohne Schuld',
    lens: 'Haltung · nach Jens Corssen',
    text: 'Du bist nicht schuld an deiner Erschöpfung. Aber du bist der Einzige, der den nächsten Schritt gehen kann. Corssens Selbst-Entwickler fragt nicht „Warum ich?“, sondern „Was ist jetzt mein Beitrag?“ – realistisch, klein, machbar.',
    question: 'Was ist mein nächster realistischer Schritt?',
  },
  {
    step: '03',
    Icon: Gauge,
    title: 'Zustand, Geschichte, Strategie',
    lens: 'Energie · nach Tony Robbins',
    text: 'Robbins unterscheidet drei Ebenen: In welchem Zustand bin ich? Welche Geschichte erzähle ich mir über meine Pflichten? Und welche Strategie verfolge ich? Wer nur die Strategie ändert („mehr Pausen“), aber die Geschichte behält („ohne mich läuft nichts“), landet wieder am selben Ort.',
    question: 'Welche Geschichte über mich hält mich im Durchhalten fest?',
  },
  {
    step: '04',
    Icon: Compass,
    title: 'Den Nordstern neu prüfen',
    lens: 'Sinn · nach Dieter Lange',
    text: 'Bevor du wieder Gas gibst, die Frage, die vor jedem Ziel steht: Wer willst du sein? Was soll in deinem Leben wieder Platz bekommen – Gesundheit, Beziehungen, Ruhe, Freude, eine andere Art zu arbeiten? Keine schnelle Reparatur, sondern die Grundlage, damit es nicht wieder passiert.',
    question: 'Wofür tue ich das eigentlich – und passt mein Alltag noch dazu?',
  },
];

const fits = [
  'Die akute Erschöpfung ist ärztlich abgeklärt, und du spürst wieder etwas Kraft.',
  'Die Rückkehr in den Job oder die eigene Firma steht an – und du willst nicht ins alte Muster.',
  'Du willst Grenzen setzen lernen, ohne dich schuldig zu fühlen.',
  'Die Sinnfrage ist laut geworden: Wofür das alles?',
  'Du merkst die ersten Warnsignale und willst vorher etwas ändern.',
];

const notFits = [
  'Du bist mitten in der akuten Erschöpfung und noch ohne ärztliche Abklärung.',
  'Du hast Anzeichen einer Depression, die nicht behandelt wird.',
  'Du hast Gedanken, dir etwas anzutun – dann bitte sofort Hilfe holen (siehe unten).',
];

const helpNumbers = [
  { label: 'Notruf', number: '112', note: 'bei akuter Gefahr, rund um die Uhr' },
  { label: 'Telefonseelsorge', number: '0800 111 0 111', note: 'oder 0800 111 0 222, kostenlos, anonym, rund um die Uhr' },
  { label: 'Ärztlicher Bereitschaftsdienst', number: '116 117', note: 'wenn die Praxis geschlossen ist' },
];

const folgesession = offerByTitle('Folgesession');

const facts = [
  {
    term: 'Erstgespräch',
    detail:
      'Kostenlos, ca. 30 Minuten per Telefon oder Video. Wir klären, ob jetzt der richtige Zeitpunkt ist.',
  },
  {
    term: 'Sessions',
    detail: `Etwa drei Stunden, ${folgesession.price} inkl. MwSt. – mit Pausen, in deinem Tempo. Auf Wunsch mit persönlichem Session-Podcast zum Nachhören.`,
  },
  {
    term: 'Orte',
    detail:
      'Bei mir in Potsdam, im Gehen durch einen der Potsdamer Parks, bei dir vor Ort in Potsdam, Berlin oder Brandenburg oder online.',
  },
];

const linkClass =
  'rounded text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function CoachingBurnoutPage() {
  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Burnout',
          about: 'Coaching nach Burnout',
        }}
      />
      <FaqStructuredData entries={faqBurnout} />
      <article className='relative z-10'>
        {/* Kopfbereich: ruhig, ohne Foto – große Atem-Ringe als Bild für „wieder durchatmen“ */}
        <section className='relative overflow-hidden border-b border-border px-4 pt-40 pb-16 md:pt-48 md:pb-24'>
          <BreathRings className='-right-72 top-10 w-[860px] sm:-right-48 lg:-right-24' />
          <div className='container relative mx-auto max-w-5xl'>
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
              <span className='text-(--text)'>Burnout</span>
            </nav>

            <div className='max-w-2xl'>
              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Coaching nach Burnout · Potsdam, Berlin &amp; online
              </p>
              <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
                Nach dem Burnout nicht einfach weitermachen.
              </h1>
              <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
                Ich war selbst dort. Zwanzig Jahre Unternehmer, erfolgreich nach jedem Maßstab – und
                trotzdem in Erschöpfung und Burnout gelandet. Heute begleite ich Menschen in Potsdam
                und Berlin auf dem Weg danach: damit Rückkehr nicht Rückfall heißt.
              </p>
              <ContentDate path={PATH} />

              <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                <PrimaryButton
                  href='/coaching#kontakt'
                  className='w-full sm:w-auto'>
                  Kostenloses Erstgespräch
                </PrimaryButton>
                <SecondaryButton
                  href='#passt'
                  className='w-full sm:w-auto'>
                  Passt Coaching für mich?
                </SecondaryButton>
              </div>

              {/* Rahmen sofort klar: keine Behandlung */}
              <p className='mt-8 flex items-start gap-3 rounded-2xl border border-border-strong bg-surface p-4 text-sm leading-relaxed text-(--muted)'>
                <ShieldAlert
                  aria-hidden='true'
                  className='mt-0.5 h-5 w-5 shrink-0 text-accent'
                />
                <span>
                  <strong className='font-semibold text-(--text)'>Wichtig vorab:</strong> Coaching
                  ist keine Burnout-Behandlung und ersetzt keine Ärztin, keinen Arzt und keine
                  Therapie. Es ist der Schritt danach – oder begleitend, wenn deine Behandlerin
                  zustimmt.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Wie kommt man hinein */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-5xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Wie kommt man in einen Burnout?
            </h2>
            <p className='mt-3 max-w-2xl text-sm text-(--muted) sm:text-base'>
              Nicht über Nacht. Und selten nur durch zu viel Arbeit: Dieter Lange nennt drei
              Dinge, die Menschen wirklich ausbrennen lassen – Widerstand, fehlender Sinn und
              fehlende Würdigung.
            </p>
            <ol className='mt-10 grid gap-6 sm:grid-cols-2'>
              {pathIn.map((item, index) => (
                <li key={item.title}>
                  <GlassCard className='h-full p-6'>
                    <p className='flex items-baseline gap-3'>
                      <span className='text-sm font-semibold text-accent'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.lens && (
                        <span className='text-[11px] uppercase tracking-[0.2em] text-(--subtle)'>
                          {item.lens}
                        </span>
                      )}
                    </p>
                    <h3 className='mt-2 text-lg font-semibold text-(--text)'>{item.title}</h3>
                    <p className='mt-2 text-sm leading-relaxed text-(--muted)'>{item.text}</p>
                  </GlassCard>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Was ist Burnout */}
        <section className='relative overflow-hidden border-y border-border bg-(--section-bg-accent) px-4 py-16 sm:py-20'>
          <BreathRings className='-left-72 -bottom-64 w-[640px]' />
          <div className='container relative mx-auto max-w-5xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was ist ein Burnout – und was nicht?
            </h2>
            <p className='mt-4 max-w-3xl text-base leading-relaxed text-(--muted)'>
              Burnout ist mehr als „ein bisschen erschöpft“. Die Weltgesundheitsorganisation führt
              Burnout in der ICD-11 als <em>berufsbezogenes Phänomen</em> – Folge von chronischem
              Stress am Arbeitsplatz, der nicht erfolgreich bewältigt wurde –, nicht als
              eigenständige Krankheit. Sie beschreibt drei Merkmale:
            </p>
            <ul className='mt-10 grid gap-6 md:grid-cols-3'>
              {dimensions.map(({ Icon, title: dimTitle, text }) => (
                <li key={dimTitle}>
                  <GlassCard className='h-full p-6'>
                    <Icon
                      aria-hidden='true'
                      className='h-6 w-6 text-accent'
                    />
                    <h3 className='mt-4 text-lg font-semibold text-(--text)'>{dimTitle}</h3>
                    <p className='mt-2 text-sm leading-relaxed text-(--muted)'>{text}</p>
                  </GlassCard>
                </li>
              ))}
            </ul>
            <div className='mt-10 grid gap-6 md:grid-cols-2'>
              <p className='text-sm leading-relaxed text-(--muted) sm:text-base'>
                <strong className='font-semibold text-(--text)'>
                  Burnout ist kein persönliches Versagen.
                </strong>{' '}
                Es entsteht aus dem Zusammenspiel von Arbeitsbedingungen, Dauerbelastung und
                persönlichen Umständen.
              </p>
              <p className='text-sm leading-relaxed text-(--muted) sm:text-base'>
                <strong className='font-semibold text-(--text)'>
                  Ähnliche Beschwerden können andere Ursachen haben.
                </strong>{' '}
                Schlafprobleme, Antriebslosigkeit und Erschöpfung gibt es auch bei Depressionen oder
                körperlichen Erkrankungen. Das auseinanderzuhalten, gehört in ärztliche Hände.
              </p>
            </div>
          </div>
        </section>

        {/* Eigene Geschichte – dunkle Insel mit echtem Foto */}
        <section className='tone-dark relative overflow-hidden bg-(--bg) px-4 py-16 sm:py-24'>
          <LightField
            variant='dust'
            className='inset-0'
          />
          <LightField
            variant='waves'
            className='inset-x-0 bottom-0 h-24 w-full'
          />
          <div className='container relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
            <div>
              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Mein Weg</p>
              <h2 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
                Ich kenne das nicht aus Büchern
              </h2>
              <div className='mt-6 space-y-4 text-base leading-relaxed text-(--muted)'>
                <p>
                  Über 20 Jahre war ich Unternehmer im Interieur Design, mit drei Filialen und
                  großem Team. Ich bin von Erfolg zu Erfolg gelaufen. Von außen sah alles nach
                  einem erfüllten Leben aus: Firma, Haus, Auto, Familie.
                </p>
                <p>
                  Innen fehlten Glück und Erfüllung. Mein Selbstwert hing an Anerkennung von außen,
                  Selbstliebe kannte ich kaum. Irgendwann stand die Frage im Raum:{' '}
                  <em className='text-(--text)'>War das alles?</em>
                </p>
                <p>
                  Dann kamen Burnout und Depression – kein bisschen Müdigkeit, sondern ein tiefer
                  Einbruch. Ein neuer beruflicher Weg brachte erst wieder Licht, doch die alten
                  Muster kamen mit. 2024 war mein Wendepunkt: Ich habe mir Hilfe geholt und mit
                  meiner NLP-Ausbildung begonnen.
                </p>
                <p className='text-(--text)'>
                  Heute weiß ich: Glück entsteht nicht, wenn man ein Ziel erreicht. Es zählt, ob du
                  das, was du täglich tust, aus eigener Überzeugung tust. Erfolg darf daraus
                  entstehen – er ist nur nicht mehr der Maßstab.
                </p>
              </div>
            </div>
            <div className='relative aspect-3/2 overflow-hidden rounded-3xl border border-card-border'>
              <Image
                src='/images-nlp/portrait-see-abend.webp'
                alt='Stefan Heinemann sitzt entspannt in der Abenddämmerung auf einer Treppe am See'
                fill
                sizes='(min-width: 1024px) 440px, 100vw'
                className='object-cover object-[60%_center]'
              />
            </div>
          </div>
        </section>

        {/* Wie kommt man wieder heraus */}
        <section className='relative overflow-hidden px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-5xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Wie kommt man wieder heraus?
            </h2>
            <p className='mt-3 max-w-2xl text-sm text-(--muted) sm:text-base'>
              Erst wieder Boden unter die Füße, dann Richtung. Vier Blickwinkel, die ich im
              Coaching verbinde – jeder mit einer Frage, die du dir heute schon stellen kannst.
            </p>
            <ol className='mt-10 space-y-6'>
              {pathOut.map(({ step, Icon, title: stepTitle, lens, text, question }) => (
                <li key={step}>
                  <GlassCard className='grid gap-5 p-6 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8'>
                    <span className='grid h-14 w-14 place-items-center rounded-2xl border border-border bg-surface text-accent'>
                      <Icon
                        aria-hidden='true'
                        className='h-6 w-6'
                      />
                    </span>
                    <div>
                      <p className='text-[11px] uppercase tracking-[0.2em] text-(--subtle)'>
                        Schritt {step} · {lens}
                      </p>
                      <h3 className='mt-2 text-lg font-semibold text-(--text) sm:text-xl'>
                        {stepTitle}
                      </h3>
                      <p className='mt-3 text-sm leading-relaxed text-(--muted) sm:text-base'>
                        {text}
                      </p>
                      <p className='mt-4 border-l-2 border-(--accent) pl-4 font-serif text-lg italic text-(--text)'>
                        {question}
                      </p>
                    </div>
                  </GlassCard>
                </li>
              ))}
            </ol>
            <p className='mt-8 max-w-3xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              <strong className='font-semibold text-(--text)'>
                Und: Nicht nur die Haltung ändern, auch die Bedingungen.
              </strong>{' '}
              Wer weiter überlastet ist und nur versucht, positiver zu denken, kommt nicht weit. Es
              braucht konkrete Entlastung – Aufgaben abgeben, Erwartungen klären, Grenzen setzen,
              Erholung schützen. Genau daran arbeiten wir.
            </p>
          </div>
        </section>

        {/* Stefans eigener Satz (von ihm geliefert, 2026-11-15) */}
        <QuoteSection
          label='Gedanke zum inneren Kampf'
          rings='left'
          quote={
            <>
              „Der Kampf fand nicht im Außen statt, sondern <Mark>in mir</Mark>.“
            </>
          }
          caption='Stefan Heinemann'
        />

        {/* Passt / passt nicht */}
        <section
          id='passt'
          className='scroll-mt-24 px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-5xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Wann Coaching passt – und wann nicht
            </h2>
            <p className='mt-3 max-w-2xl text-sm text-(--muted) sm:text-base'>
              Wenn es nicht passt, sage ich dir das im Erstgespräch. Ehrlich.
            </p>
            <div className='mt-10 grid gap-6 md:grid-cols-2'>
              <GlassCard className='h-full p-6 sm:p-8'>
                <h3 className='text-lg font-semibold text-(--text)'>Coaching passt, wenn …</h3>
                <ul className='mt-5 space-y-3'>
                  {fits.map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-3 text-sm leading-relaxed text-(--muted)'>
                      <CircleCheck
                        aria-hidden='true'
                        className='mt-0.5 h-5 w-5 shrink-0 text-accent'
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className='h-full p-6 sm:p-8'>
                <h3 className='text-lg font-semibold text-(--text)'>Erst etwas anderes, wenn …</h3>
                <ul className='mt-5 space-y-3'>
                  {notFits.map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-3 text-sm leading-relaxed text-(--muted)'>
                      <CircleX
                        aria-hidden='true'
                        className='mt-0.5 h-5 w-5 shrink-0 text-(--subtle)'
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            <dl className='mt-10 divide-y divide-border rounded-2xl border border-card-border bg-surface'>
              {facts.map((fact) => (
                <div
                  key={fact.term}
                  className='grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6'>
                  <dt className='text-sm font-semibold text-(--text)'>{fact.term}</dt>
                  <dd className='text-sm text-(--muted)'>{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Fragen */}
        <section className='border-y border-border bg-(--section-bg-accent) px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-3xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Fragen zu Coaching nach Burnout
            </h2>
            <div className='mt-8 space-y-3'>
              {faqBurnout.map((entry, index) => (
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

        {/* Hilfe sofort + Abschluss */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <div className='rounded-2xl border border-border-strong bg-surface p-6 sm:p-8'>
              <h2 className='flex items-center gap-3 text-lg font-semibold text-(--text) sm:text-xl'>
                <Phone
                  aria-hidden='true'
                  className='h-5 w-5 text-accent'
                />
                Wenn es gerade zu viel ist: Hilfe sofort
              </h2>
              <ul className='mt-5 grid gap-4 sm:grid-cols-3'>
                {helpNumbers.map((help) => (
                  <li key={help.label}>
                    <p className='text-xs uppercase tracking-[0.2em] text-(--subtle)'>
                      {help.label}
                    </p>
                    <a
                      href={`tel:${help.number.replace(/\s/g, '')}`}
                      className='mt-1 inline-flex min-h-11 items-center text-xl font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                      {help.number}
                    </a>
                    <p className='text-xs text-(--muted)'>{help.note}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className='mt-16 text-center'>
              <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
                Lass uns schauen, was jetzt dran ist
              </h2>
              <p className='mx-auto mt-4 max-w-xl text-sm text-(--muted) sm:text-base'>
                30 Minuten, kostenlos, ohne Druck. Danach weißt du, ob Coaching gerade der richtige
                Schritt ist – oder ein anderer.
              </p>
              <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
                <PrimaryButton
                  href='/coaching#kontakt'
                  className='w-full sm:w-auto'>
                  Kostenloses Erstgespräch
                </PrimaryButton>
                <SecondaryButton
                  href='/coaching/potsdam'
                  className='w-full sm:w-auto'>
                  Coaching in Potsdam
                </SecondaryButton>
              </div>
              <p className='mt-6 text-sm text-(--muted)'>
                Auch interessant:{' '}
                <Link
                  href='/coaching/unternehmer'
                  className={linkClass}>
                  Coaching mit eigener Firma
                </Link>{' '}
                ·{' '}
                <Link
                  href='/coaching/regeln/ungluecklichsein'
                  className={linkClass}>
                  20 Regeln fürs Unglücklichsein
                </Link>
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
