import Link from 'next/link';

import GlassCard from '@/components/GlassCard';
import {
  MotifAction,
  MotifClarity,
  MotifInsight,
  MotifRelation,
} from '@/app/coaching/components/Motifs';

/**
 * Impulse – die eigenen Inhaltsseiten als kompakte Reihe (seit 2026-11).
 *
 * Ersetzt die vollen Sektionen Persönlichkeitstest und Formel sowie die
 * Regel-Karten aus der Erfüllungs-Sektion: Der Onepager verkauft, die
 * Unterseiten vertiefen. Eine neue Inhaltsseite kommt hier dazu – und wie
 * gehabt ins „Entdecken“-Menü von NlpHeader.
 */
const impulses = [
  {
    href: '/coaching/persoenlichkeitstest',
    kicker: 'Selbsttest · 5 Minuten',
    title: 'Persönlichkeitstest',
    text: 'Welchen Lebensbereich nutzt du am selbstverständlichsten – Beziehung, Erkennen oder Handeln? 18 Fragen, Auswertung sofort.',
    cta: 'Test starten',
    Motif: MotifRelation,
  },
  {
    href: '/coaching/formel-zum-glueck',
    kicker: 'Werkzeug',
    title: 'Die Formel zum Glück',
    text: 'S² + L + A + C³: sieben Schritte für den Moment, in dem ein Problem oder ein unangenehmes Gefühl hochkommt.',
    cta: 'Formel ansehen',
    Motif: MotifInsight,
  },
  {
    href: '/coaching/regeln/gluecklichsein',
    kicker: 'Haltung',
    title: '20 Regeln fürs Glücklichsein',
    text: 'Zwanzig Sätze, an denen ich mich selbst ausrichte. Keine Technik – eine Haltung, die man täglich neu wählt.',
    cta: 'Regeln lesen',
    Motif: MotifClarity,
  },
  {
    href: '/coaching/regeln/ungluecklichsein',
    kicker: 'Der Umweg',
    title: '20 Regeln fürs Unglücklichsein',
    text: 'Die ironische Umkehrung – und der schnellste Weg, eigene Muster wiederzuerkennen.',
    cta: 'Umkehrung lesen',
    Motif: MotifAction,
  },
];

export default function ImpulseSection() {
  return (
    <section
      id='impulse'
      className='relative border-y border-border bg-(--section-bg-accent) py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Impulse</p>
          <h2 className='mt-4 text-3xl font-semibold text-(--text) sm:text-4xl'>
            Zum Selbst-Ausprobieren
          </h2>
          <p className='mt-4 text-base text-(--muted) sm:text-lg'>
            Kostenlos, ohne Anmeldung. Für den ersten Schritt, bevor wir miteinander sprechen.
          </p>
        </div>

        <ul className='mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4'>
          {impulses.map(({ href, kicker, title, text, cta, Motif }) => (
            <li key={href}>
              <Link
                href={href}
                className='group/card block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                <GlassCard className='relative flex h-full flex-col overflow-hidden p-6'>
                  <Motif className='pointer-events-none absolute -right-8 -top-8 h-32 w-32 opacity-[0.07]' />
                  <p className='relative text-[11px] uppercase tracking-[0.2em] text-accent-soft'>
                    {kicker}
                  </p>
                  <h3 className='relative mt-3 text-lg font-semibold text-(--text)'>{title}</h3>
                  <p className='relative mt-3 flex-1 text-sm leading-relaxed text-(--muted)'>
                    {text}
                  </p>
                  <span className='relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-[gap] group-hover/card:gap-3'>
                    {cta}
                    <span aria-hidden='true'>→</span>
                  </span>
                </GlassCard>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
