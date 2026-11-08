import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import HeroPicture from '@/app/coaching/components/HeroPicture';
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
        {/* Kopfbereich: dunkle Insel – Heimkommen nach einem langen Tag, Rückhalt an der Tür */}
        <section className='tone-dark relative overflow-hidden border-b border-border lg:flex lg:min-h-[86dvh] lg:items-center'>
          <div className='relative h-[62vh] min-h-[360px] lg:absolute lg:inset-0 lg:h-auto'>
            <HeroPicture
              wide={{ src: '/images-nlp/partnerschaft-heimkommen.webp', width: 1672, height: 941 }}
              tall={{ src: '/images-nlp/partnerschaft-heimkommen-hoch.webp', width: 900, height: 1125 }}
              alt='Ein Mann kommt abends aus dem Regen nach Hause, seine Partnerin empfängt ihn an der Tür und hält seine Hand'
              className='object-cover object-[50%_25%] lg:object-[85%_center]'
              priority
            />
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-linear-to-b from-transparent from-50% to-(--bg) lg:bg-linear-to-r lg:from-(--bg) lg:from-20% lg:via-(--bg)/70 lg:via-45% lg:to-transparent lg:to-70%'
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
                <span className='text-(--text)'>Partnerschaftstest</span>
              </nav>

              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
                Partnerschaftstest
              </p>
              <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
                Lebenspartner – oder die nächste <span className='text-accent'>Lebenslektion</span>?
              </h1>
              <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
                Gerade im Business brauchst du jemanden zu Hause, der dich unterstützt und dir Kraft
                gibt. Wer abends gegen Widerstand nach Hause kommt, hat tagsüber weniger Kraft für
                alles andere. Fünf Fragen, ehrlich beantwortet – mehr braucht es nicht.
              </p>
              <ContentDate path={PATH} />
              <div className='mt-8'>
                <PrimaryButton
                  href='#test'
                  className='w-full sm:w-auto'>
                  Zu den 5 Fragen
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* Der Test */}
        <section
          id='test'
          className='scroll-mt-24 px-4 py-16 sm:py-20'>
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

        {/* Abschluss: Rückhalt zu Hause */}
        <section className='px-4 py-16 sm:py-24'>
          <div className='container mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16'>
            <div className='relative aspect-16/9 overflow-hidden rounded-3xl border border-card-border shadow-[0_30px_70px_var(--card-shade)]'>
              <Image
                src='/images-nlp/partnerschaft-rueckhalt.webp'
                alt='Ein Paar sitzt im Abendlicht auf dem Sofa, sie legt ihm aufmunternd die Hand auf den Arm'
                fill
                sizes='(min-width: 1024px) 560px, 100vw'
                className='object-cover'
              />
            </div>
            <div className='text-center lg:text-left'>
              <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
                Erfolg draußen braucht Rückhalt drinnen
              </h2>
              <p className='mt-4 text-base leading-relaxed text-(--muted)'>
                Im Coaching geht es nicht nur um die Firma. Oft liegt der Hebel zu Hause. Wir schauen
                gemeinsam hin – in Potsdam, in Berlin oder online. Das Erstgespräch ist kostenlos.
              </p>
              <div className='mt-8 flex justify-center lg:justify-start'>
                <PrimaryButton
                  href='/coaching#kontakt'
                  className='w-full sm:w-auto'>
                  Erstgespräch vereinbaren
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
