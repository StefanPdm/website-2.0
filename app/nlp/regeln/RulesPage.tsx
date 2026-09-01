import fs from 'node:fs';
import path from 'node:path';

import Link from 'next/link';
import { Download } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';
import { otherRuleSet, type RuleSet } from '@/app/nlp/regeln/data';

/**
 * Gemeinsame Darstellung beider Regelwerke.
 *
 * Die zwei Seiten sind strukturell identisch und unterscheiden sich nur in
 * Inhalt, Rahmung und Badge-Farben — deshalb eine Komponente statt zweier
 * fast gleicher Dateien. Bewusst eine Server Component: reiner Lesestoff,
 * kein State, kein JavaScript im Client nötig.
 *
 * Die Nummern-Badges verlaufen über die Liste hinweg von `badgeFrom` nach
 * `badgeTo` — dieselbe Idee wie in den Original-PDFs, hier aber über
 * `color-mix` an die Theme-Variablen gekoppelt, damit sie im Kühl- wie im
 * Warm-Theme stimmig bleibt.
 */

/**
 * Prüft zur Bauzeit, ob die Original-PDF hinterlegt ist.
 *
 * So entsteht kein toter Download-Link, falls eine Datei fehlt — der Button
 * erscheint automatisch, sobald sie unter public/dokumente/ liegt.
 */
function hasPdf(pdfPath: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', pdfPath));
  } catch {
    return false;
  }
}

export default function RulesPage({ ruleSet }: { ruleSet: RuleSet }) {
  const other = otherRuleSet(ruleSet);
  const total = ruleSet.rules.length;
  const pdfAvailable = hasPdf(ruleSet.pdfPath);

  return (
    <main className='relative z-10'>
      {/* Kopfbereich */}
      <section className='border-b border-(--border) px-4 pt-40 pb-16 md:pt-48'>
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
            <span className='text-(--text)'>{ruleSet.shortTitle}</span>
          </nav>

          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>{ruleSet.eyebrow}</p>
          <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
            {ruleSet.title}
          </h1>
          <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
            {ruleSet.lead}
          </p>

          {/* Einordnung – bei den Anti-Regeln die wichtigste Zeile der Seite */}
          <div className='mt-8 max-w-2xl rounded-2xl border border-(--border) bg-(--surface) p-5'>
            <p className='text-sm leading-relaxed text-(--muted)'>{ruleSet.framing}</p>
          </div>
        </div>
      </section>

      {/* Die Regeln */}
      <section className='px-4 py-16 sm:py-20'>
        <div className='container mx-auto max-w-5xl'>
          <ol className='grid gap-x-10 gap-y-0 lg:grid-cols-2'>
            {ruleSet.rules.map((rule, index) => {
              // Verlauf über die gesamte Liste, nicht pro Spalte.
              const ratio = total > 1 ? index / (total - 1) : 0;
              const badge = `color-mix(in oklab, ${ruleSet.badgeFrom} ${Math.round(
                (1 - ratio) * 100,
              )}%, ${ruleSet.badgeTo})`;

              return (
                <li
                  key={rule}
                  className='flex items-start gap-4 border-b border-(--border) py-5 last:border-b-0 lg:[&:nth-last-child(2)]:border-b-0'>
                  <span
                    aria-hidden='true'
                    className='mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-[#04121a] tabular-nums'
                    style={{ background: badge, boxShadow: `0 0 18px ${badge}55` }}>
                    {index + 1}
                  </span>
                  <p className='text-sm leading-relaxed text-(--text) sm:text-base'>{rule}</p>
                </li>
              );
            })}
          </ol>

          {pdfAvailable && (
            <div className='mt-12 flex flex-col gap-5 border-t border-(--border) pt-8 sm:flex-row sm:items-center sm:justify-between'>
              <p className='max-w-md text-sm leading-relaxed text-(--muted)'>
                Die {total} Regeln zum Mitnehmen. Ausgedruckt neben dem Schreibtisch wirken
                sie zuverlässiger als in einem Browser-Tab.
              </p>
              <PrimaryButton
                href={ruleSet.pdfPath}
                download>
                <Download
                  className='h-4 w-4'
                  aria-hidden='true'
                />
                Als PDF laden
              </PrimaryButton>
            </div>
          )}
        </div>
      </section>

      {/* Querverweis auf das andere Regelwerk */}
      <section className='border-y border-(--border) bg-(--section-bg-accent) px-4 py-16'>
        <div className='container mx-auto max-w-4xl'>
          <GlassCard className='p-7 sm:p-9'>
            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
              {ruleSet.crossLinkLabel}
            </p>
            <h2 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
              {other.title}
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
              {ruleSet.crossLinkText}
            </p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <PrimaryButton href={other.href}>{other.shortTitle} lesen</PrimaryButton>
              <SecondaryButton href='/nlp#kontakt'>Darüber sprechen</SecondaryButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Abschluss */}
      <section className='px-4 py-16 sm:py-20'>
        <div className='container mx-auto max-w-4xl'>
          <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
            Vom Lesen zum Leben
          </h2>
          <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
            Eine Liste zu verstehen dauert fünf Minuten. Sie zu leben ist die eigentliche Arbeit —
            und genau dort setzt Coaching an: bei den Mustern, die stärker sind als jede Einsicht.
            Wenn du magst, schauen wir gemeinsam, welche dieser Punkte bei dir gerade hakt.
          </p>
          <div className='mt-7 flex flex-wrap gap-3'>
            <PrimaryButton href='/nlp#kontakt'>Kostenloses Erstgespräch</PrimaryButton>
            <SecondaryButton href='/nlp#preise'>Programme ansehen</SecondaryButton>
          </div>

          <p className='mt-12 border-t border-(--border) pt-6 text-xs leading-relaxed text-(--muted)'>
            Diese Seite ersetzt keine Therapie. Wenn es dir gerade sehr schlecht geht, wende dich
            bitte an deine Hausärztin oder deinen Hausarzt — oder rund um die Uhr kostenfrei an die
            Telefonseelsorge unter{' '}
            <a
              href='tel:+498001110111'
              className='underline underline-offset-4 transition hover:text-(--text)'>
              0800 111 0 111
            </a>{' '}
            und{' '}
            <a
              href='tel:+498001110222'
              className='underline underline-offset-4 transition hover:text-(--text)'>
              0800 111 0 222
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
