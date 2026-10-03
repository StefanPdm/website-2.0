import Image from 'next/image';
import Link from 'next/link';

/**
 * Schwebender Weg zurück zur Auswahlseite – Fassung für Welt B.
 *
 * Gegenstück zu `app/nlp/components/WorldSwitch.tsx`: gleiches Verhalten,
 * gleiche Position, aber in der Formsprache von Welt B (CLAUDE.md §1 – kein
 * Bauteil wandert unverändert zwischen den Welten). Welt B hat keine
 * Theme-Variablen, daher die festen Werte aus §3.3: Fläche `#0B1B2B`,
 * Rahmen `white/20`, Technik-Akzent `accent-web` für Puls, Glow und Fokus.
 *
 * Barrierefreiheit: 44 px Zielfläche (§11), `aria-label`, sichtbarer
 * Fokusring. Puls dekorativ (`aria-hidden`), nur `transform`/`opacity` (§9),
 * bei reduzierter Bewegung abgeschaltet über die globale Regel.
 */
export default function WorldSwitchWeb() {
  return (
    <Link
      href='/'
      aria-label='Zur Auswahlseite: NLP Coaching oder Webentwicklung'
      title='Zwei Welten. Eine Entscheidung.'
      className='group fixed left-3 top-24 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#0B1B2B]/80 shadow-[0_10px_30px_rgba(45,212,191,0.22)] backdrop-blur-md transition duration-200 hover:scale-105 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web sm:left-5 sm:h-12 sm:w-12'>
      {/* Puls – Radarwelle nach außen, ohne Layout anzufassen */}
      <span
        aria-hidden='true'
        className='world-switch-pulse absolute inset-0 rounded-full border border-accent-web'
      />
      <Image
        src='/logos/logo-sh.svg'
        alt=''
        width={520}
        height={500}
        className='h-6 w-auto object-contain sm:h-7'
      />
      {/* Beschriftung fährt beim Zeigen und bei Tastaturfokus auf */}
      <span
        aria-hidden='true'
        className='pointer-events-none absolute left-full ml-3 hidden -translate-x-2 whitespace-nowrap rounded-xl border border-white/15 bg-[#0B1B2B]/90 px-3 py-1.5 text-xs font-semibold text-slate-100 opacity-0 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block'>
        Auswahlseite
      </span>
    </Link>
  );
}
