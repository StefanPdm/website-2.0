import type { Metadata } from 'next';
import Link from 'next/link';

import { KiCheckStructuredData } from '@/components/StructuredData';
import WebBackdrop from '@/components/WebBackdrop';
import { AI_BOTS } from '@/lib/ki-check';
import KiCheckClient from './KiCheckClient';

const PATH = '/webdevelopment/ki-check';
const title = 'KI-Sichtbarkeits-Check – wird deine Website von ChatGPT & Co. gefunden?';
const description =
  'Kostenloser KI-Sichtbarkeits-Check von Stefan Heinemann, Webentwickler aus Potsdam: prüft robots.txt, llms.txt, strukturierte Daten, Meta-Angaben und Sicherheits-Header deiner Website – mit Punktzahl und den drei größten Hebeln.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'KI-Sichtbarkeit prüfen',
    'KI-Suchoptimierung',
    'SEO für ChatGPT',
    'llms.txt prüfen',
    'robots.txt KI-Crawler',
    'Webentwicklung Potsdam',
  ],
  alternates: { canonical: PATH },
  openGraph: { title, description, url: PATH, type: 'website', locale: 'de_DE' },
  twitter: { card: 'summary_large_image', title, description },
};

const checks = [
  'Darf die Seite überhaupt indexiert werden (noindex)?',
  `Dürfen KI-Crawler lesen – ${AI_BOTS.join(', ')}?`,
  'Strukturierte Daten (JSON-LD), aus denen Google und KI Fakten ziehen',
  'Eine llms.txt – die Kurzfassung für Sprachmodelle',
  'Titel, Meta-Beschreibung, H1, Canonical, Sprache, Sitemap',
  'HTTPS und Sicherheits-Header',
];

export default function KiCheckPage() {
  return (
    <div className='relative min-h-screen overflow-x-clip bg-[#06101c] text-slate-100'>
      <KiCheckStructuredData
        path={PATH}
        name={title}
        description={description}
      />
      <div className='pointer-events-none fixed inset-0 z-0'>
        <WebBackdrop />
      </div>
      <main className='relative z-10 mx-auto max-w-5xl px-4 pt-36 pb-24 md:pt-44'>
        <nav
          aria-label='Brotkrumen'
          className='mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-400'>
          <Link
            href='/'
            className='rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
            Start
          </Link>
          <span aria-hidden='true'>/</span>
          <Link
            href='/webdevelopment'
            className='rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
            Webentwicklung
          </Link>
          <span aria-hidden='true'>/</span>
          <span className='text-slate-200'>KI-Check</span>
        </nav>

        <p className='inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
          Kostenlos · ohne Anmeldung · ca. 10 Sekunden
        </p>
        <h1 className='mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-5xl'>
          Findet ChatGPT deine Website?
        </h1>
        <p className='mt-6 max-w-2xl text-lg text-slate-300'>
          Immer mehr Kunden fragen eine KI statt Google. Der Check zeigt, ob Suchmaschinen und
          Sprachmodelle deine Seite lesen dürfen und verstehen – mit Punktzahl und den drei
          größten Hebeln.
        </p>

        <div className='mt-10 rounded-2xl border border-white/15 bg-[#030a13]/70 p-6 md:p-8'>
          <KiCheckClient readUrlParam />
        </div>

        <section className='mt-16'>
          <h2 className='text-2xl font-bold tracking-tight text-white'>Was geprüft wird</h2>
          <ul className='mt-6 grid gap-3 md:grid-cols-2'>
            {checks.map((check) => (
              <li
                key={check}
                className='flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300'>
                <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#86C243]' />
                {check}
              </li>
            ))}
          </ul>
          <p className='mt-6 text-sm text-slate-400'>
            Der Check liest die Startseite und die Dateien robots.txt, llms.txt und sitemap.xml
            – so, wie ein Crawler sie sieht. Er ersetzt kein vollständiges SEO-Audit, zeigt aber
            schnell, wo die größten Lücken liegen. Wie das bei mir selbst aussieht, zeigt der{' '}
            <Link
              href='/webdevelopment#unter-der-haube'
              className='rounded text-accent-web underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
              Röntgenblick
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
