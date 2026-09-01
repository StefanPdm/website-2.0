import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ExternalLink } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';
import { MotifEvidence } from '@/app/nlp/components/Motifs';
import { WhitepaperStructuredData } from '@/components/StructuredData';
import { limitations, mechanisms, WHITEPAPER } from '@/app/nlp/wissenschaft/data';

const title = 'Warum NLP wirkt – der Forschungsstand 2026';
const description =
  'Was ist an NLP wissenschaftlich belegt und was nicht? Der DVNLP hat die Evidenz von 2016 bis 2026 ausgewertet: Reframing, Perspektivwechsel, Zielarbeit und Ressourcenaktivierung sind gut belegt — Augenbewegungen und feste Wahrnehmungstypen nicht. Zusammenfassung und Original-Whitepaper.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'ist NLP wissenschaftlich',
    'NLP Wirksamkeit Studien',
    'NLP Evidenz',
    'DVNLP Whitepaper',
    'Cognitive Reappraisal',
    'Self-Distancing',
    'NLP Kritik',
    'NLP Coaching Potsdam',
  ],
  alternates: { canonical: '/nlp/wissenschaft' },
  openGraph: {
    title,
    description,
    url: '/nlp/wissenschaft',
    type: 'article',
    locale: 'de_DE',
    siteName: 'NLP Coaching',
  },
  twitter: { card: 'summary_large_image', title, description },
};

/**
 * Prüft zur Bauzeit, ob die Original-PDF hinterlegt ist.
 *
 * So entsteht kein toter Download-Link, solange die Datei fehlt — der Button
 * erscheint automatisch, sobald sie unter public/dokumente/ liegt.
 */
function hasWhitepaperPdf() {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', WHITEPAPER.pdfPath));
  } catch {
    return false;
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className='shrink-0 tracking-[0.15em] text-accent'
      aria-label={`Evidenz ${rating} von 5`}>
      <span aria-hidden='true'>
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </span>
    </span>
  );
}

export default function WissenschaftPage() {
  const pdfAvailable = hasWhitepaperPdf();

  return (
    <>
      <WhitepaperStructuredData />
      <main className='relative z-10'>
        {/* Kopfbereich */}
        <section className='relative overflow-hidden border-b border-(--border) px-4 pt-40 pb-16 md:pt-48'>
          <MotifEvidence className='pointer-events-none absolute -right-20 top-24 h-96 w-96 opacity-[0.09]' />
          <div className='container mx-auto max-w-4xl'>
            <nav
              aria-label='Brotkrumen'
              className='mb-8 flex flex-wrap items-center gap-2 text-xs text-(--muted)'>
              <Link
                href='/nlp'
                className='transition hover:text-(--text)'>
                NLP Coaching
              </Link>
              <span aria-hidden='true'>/</span>
              <span className='text-(--text)'>Forschungsstand</span>
            </nav>

            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Wissenschaft</p>
            <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
              Warum NLP wirkt — und wo die Belege enden
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              „Ist das wissenschaftlich?“ ist die häufigste kritische Frage zu NLP. Sie verdient
              eine ehrliche Antwort statt einer Verteidigungsrede — und die fällt differenzierter
              aus, als beide Lager es gern hätten.
            </p>

            <div className='mt-8 max-w-2xl rounded-2xl border border-(--border) bg-(--surface) p-5'>
              <p className='text-sm leading-relaxed text-(--muted)'>
                <strong className='font-semibold text-(--text)'>Die Kurzfassung:</strong> NLP als
                geschlossenes Theoriegebäude ist bis heute nicht umfassend empirisch bestätigt. Die
                psychologischen Wirkmechanismen, auf denen viele NLP-Interventionen beruhen, sind es
                dagegen weitgehend — sie werden in der Forschung nur unter anderen Namen geführt.
              </p>
            </div>
          </div>
        </section>

        {/* Mechanismen */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was belegt ist — und wie gut
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              Neun Wirkmechanismen, ihre Entsprechung in der psychologischen Forschung und die
              Evidenzbewertung des DVNLP-Whitepapers. Fünf Sterne bedeuten: Metaanalysen und
              systematische Reviews liegen vor.
            </p>

            <ol className='mt-10 space-y-4'>
              {mechanisms.map((item, index) => (
                <li key={item.nlp}>
                  <GlassCard className='p-5 sm:p-6'>
                    <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2'>
                      <h3 className='text-base font-semibold text-(--text) sm:text-lg'>
                        <span
                          aria-hidden='true'
                          className='mr-2 text-accent tabular-nums'>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.nlp}
                      </h3>
                      <Stars rating={item.rating} />
                    </div>
                    <p className='mt-2 text-xs uppercase tracking-[0.18em] text-(--muted)'>
                      in der Forschung: {item.science}
                    </p>
                    <p className='mt-4 text-sm leading-relaxed text-(--muted)'>{item.effect}</p>
                  </GlassCard>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Grenzen */}
        <section className='border-y border-(--border) bg-(--section-bg-accent) px-4 py-16'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was die Forschung nicht stützt
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              Eine Evidenzseite, die nur Bestätigungen zeigt, ist Werbung. Diese Punkte gehören
              genauso dazu — sie stammen aus derselben Quelle.
            </p>
            <ul className='mt-8 space-y-3'>
              {limitations.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 rounded-2xl border border-(--border) bg-(--surface) p-4'>
                  <span
                    aria-hidden='true'
                    className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400'
                  />
                  <span className='text-sm leading-relaxed text-(--muted)'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Methodischer Hinweis */}
        <section className='px-4 py-16'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Warum „nicht bewiesen“ nicht „unwirksam“ heißt
            </h2>
            <div className='mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-(--muted) sm:text-base'>
              <p>
                Ein Medikament lässt sich gegen ein Placebo testen. Bei Verfahren, die auf Sprache
                und Beziehung beruhen, geht das nicht sauber: Wirkung entsteht dort auch durch die
                Beziehung selbst, durch Erwartung, durch ungeteilte Aufmerksamkeit — oder schlicht
                dadurch, dass Zeit vergeht.
              </p>
              <p>
                Die Psychotherapieforschung kennt das seit Jahrzehnten als „Dodo-Bird-Verdict“:
                Verschiedene Therapieschulen zeigen ähnliche Effektstärken, obwohl ihre
                Erklärungsmodelle sich widersprechen. Das betrifft auch Verfahren, die von
                Krankenkassen bezahlt werden.
              </p>
              <p>
                <strong className='font-semibold text-(--text)'>
                  Das ist keine Ausrede und macht nicht alle Verfahren gleichwertig.
                </strong>{' '}
                Für kognitiv-verhaltenstherapeutische Ansätze liegt deutlich mehr und methodisch
                stärkere Evidenz vor als für genuin NLP-spezifische Techniken. Der Vorwurf „nicht
                wissenschaftlich fundiert“ zielt aber oft weniger auf fehlende Wirkung als auf die
                Schwierigkeit, unter kontrollierten Bedingungen zu isolieren, <em>warum</em> etwas
                wirkt.
              </p>
            </div>
          </div>
        </section>

        {/* Quelle und Download */}
        <section className='border-y border-(--border) px-4 py-16'>
          <div className='container mx-auto max-w-4xl'>
            <GlassCard className='p-7 sm:p-9'>
              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Quelle</p>
              <h2 className='mt-4 text-xl font-semibold text-(--text) sm:text-2xl'>
                {WHITEPAPER.title}
              </h2>
              <p className='mt-2 text-sm text-(--muted)'>{WHITEPAPER.subtitle}</p>

              <dl className='mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[auto_1fr]'>
                <dt className='text-(--muted)'>Autorin</dt>
                <dd className='text-(--text)'>{WHITEPAPER.author}</dd>
                <dt className='text-(--muted)'>Herausgeber</dt>
                <dd className='text-(--text)'>{WHITEPAPER.publisher}</dd>
                <dt className='text-(--muted)'>Erschienen</dt>
                <dd className='text-(--text)'>{WHITEPAPER.published}</dd>
              </dl>

              <p className='mt-6 text-sm leading-relaxed text-(--muted)'>
                Die Zusammenfassung auf dieser Seite stammt von mir und gibt die Befunde in eigenen
                Worten wieder. Maßgeblich ist das Original — dort stehen auch die vollständigen
                Literaturangaben mit über dreißig Metaanalysen und systematischen Reviews.
              </p>

              <div className='mt-8 flex flex-wrap gap-3'>
                {pdfAvailable && (
                  <PrimaryButton
                    href={WHITEPAPER.pdfPath}
                    download>
                    <Download
                      className='h-4 w-4'
                      aria-hidden='true'
                    />
                    Whitepaper als PDF
                  </PrimaryButton>
                )}
                <SecondaryButton href={WHITEPAPER.dvnlpUrl}>
                  <ExternalLink
                    className='h-4 w-4'
                    aria-hidden='true'
                  />
                  NLP beim DVNLP
                </SecondaryButton>
              </div>

              <p className='mt-5 text-xs text-(--muted)'>
                Ich bin durch den DVNLP zertifiziert. Der Verband verantwortet das Whitepaper, nicht
                ich — Fehler in meiner Zusammenfassung gehen entsprechend auf mein Konto.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Abschluss */}
        <section className='px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was das für unsere Arbeit bedeutet
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              Ich arbeite mit den Interventionen, deren Wirkmechanismen belegt sind, und benenne
              offen, wo das Modell an seine Grenzen kommt. Kein „NLP löst alles“, keine
              Heilversprechen — dafür Methoden, die auf gut untersuchten psychologischen Prozessen
              beruhen.
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <PrimaryButton href='/nlp#kontakt'>Kostenloses Erstgespräch</PrimaryButton>
              <SecondaryButton href='/nlp#faq'>Häufige Fragen</SecondaryButton>
            </div>

            <p className='mt-12 border-t border-(--border) pt-6 text-xs leading-relaxed text-(--muted)'>
              Coaching ist keine Heilkunde und ersetzt weder Psychotherapie noch ärztliche
              Behandlung. Bei akuten Krisen wende dich bitte an deine Hausärztin oder deinen
              Hausarzt — oder rund um die Uhr kostenfrei an die Telefonseelsorge unter{' '}
              <a
                href='tel:+498001110111'
                className='underline underline-offset-4 transition hover:text-(--text)'>
                0800 111 0 111
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
