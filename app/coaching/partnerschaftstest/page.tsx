import type { Metadata } from 'next';
import Link from 'next/link';

import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import { MotifRelation } from '@/app/coaching/components/Motifs';
import PartnerTest from '@/app/coaching/partnerschaftstest/PartnerTest';
import { SOURCE } from '@/app/coaching/partnerschaftstest/data';

const PATH = '/coaching/partnerschaftstest';

const title = 'Partnerschaftstest: Lebenspartner oder Lebenslektion? 5 Fragen';
const description =
  'Fünf ehrliche Fragen zu deiner Beziehung: Gibt dir dieser Mensch Kraft, oder ist er eine weitere Lebenslektion? Die Antwort spürst du am Ende selbst. Für Unternehmer, die zu Hause Rückhalt brauchen. Von Life Coach Stefan Heinemann aus Potsdam, kostenlos und ohne Anmeldung.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Partnerschaftstest',
    'Beziehungstest',
    'Ist er der Richtige',
    'Lebenspartner finden',
    'Beziehung Unternehmer',
    'Life Coaching Potsdam',
    'Coaching Berlin',
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

export default function PartnerschaftstestPage() {
  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Partnerschaftstest',
          about: 'Partnerschaft',
        }}
      />
      <article className='relative z-10'>
        {/* Kopfbereich */}
        <section className='relative overflow-hidden border-b border-border px-4 pt-40 pb-16 md:pt-48'>
          <MotifRelation className='pointer-events-none absolute -right-20 top-24 h-96 w-96 opacity-[0.07]' />
          <div className='container mx-auto max-w-4xl'>
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
              <span className='text-(--text)'>Partnerschaftstest</span>
            </nav>

            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Partnerschaftstest</p>
            <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
              Lebenspartner – oder die nächste Lebenslektion?
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              Gerade im Business brauchst du jemanden zu Hause, der dich unterstützt und dir Kraft
              gibt. Wer abends gegen Widerstand nach Hause kommt, hat tagsüber weniger Kraft für
              alles andere. Fünf Fragen, ehrlich beantwortet – mehr braucht es nicht.
            </p>
            <ContentDate path={PATH} />
          </div>
        </section>

        {/* Der Test */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-3xl'>
            <PartnerTest />
          </div>
        </section>

        {/* Herkunft und Einordnung */}
        <section className='border-y border-border bg-(--section-bg-accent) px-4 py-16'>
          <div className='container mx-auto max-w-3xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Woher die Fragen kommen
            </h2>
            <p className='mt-4 text-base leading-relaxed text-(--muted)'>
              Die fünf Fragen gehen auf{' '}
              <a
                href={SOURCE.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-accent underline underline-offset-4 transition hover:text-(--text)'>
                {SOURCE.label}
              </a>{' '}
              zurück. Ich habe sie übersetzt und so formuliert, dass sie für jede Beziehung passen.
            </p>
            <p className='mt-4 text-base leading-relaxed text-(--muted)'>
              Fünf Fragen ersetzen keine Paarberatung. Sie sind ein Spiegel, keine Diagnose – aber
              ein ehrlicher Spiegel zeigt oft schneller, wo es hakt, als viele Gespräche.
            </p>
          </div>
        </section>

        {/* Abschluss */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-3xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Erfolg draußen braucht Rückhalt drinnen
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-(--muted)'>
              Im Coaching geht es nicht nur um die Firma. Oft liegt der Hebel zu Hause. Wir schauen
              gemeinsam hin – in Potsdam, in Berlin oder online. Das Erstgespräch ist kostenlos.
            </p>
            <div className='mt-8 flex justify-center'>
              <PrimaryButton
                href='/coaching#kontakt'
                className='w-full sm:w-auto'>
                Erstgespräch vereinbaren
              </PrimaryButton>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
