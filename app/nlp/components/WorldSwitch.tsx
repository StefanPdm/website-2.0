import Image from 'next/image';
import Link from 'next/link';

/**
 * Schwebender Weg zurück zur Auswahlseite.
 *
 * Der Weltenwechsel stand vorher als „Hauptseite" in der Navigationsleiste —
 * missverständlich, weil er dort wie ein Punkt der NLP-Seite wirkte und
 * jemand darunter die NLP-Startseite vermuten konnte. Als schwebendes Element
 * ist er sichtbar etwas anderes als die Navigation: kein Ort *auf* dieser
 * Seite, sondern der Weg *von* ihr weg.
 *
 * Das Zeichen ist bewusst `logo-sh.svg` und kein abstraktes Icon — genau
 * dieses Signet steht auf der Auswahlseite und im Browser-Tab. Wer es
 * anklickt, landet dort, wo es herkommt.
 *
 * Barrierefreiheit: 44 px Zielfläche (§11), `aria-label` statt sichtbarem
 * Text, sichtbarer Fokusring. Der Puls liegt in einem eigenen, `aria-hidden`
 * gesetzten Ring — dekorativ und über `transform`/`opacity` animiert (§9).
 * Bei reduzierter Bewegung schaltet ihn die globale Regel in `globals.css` ab.
 */
export default function WorldSwitch() {
  return (
    <Link
      href='/'
      aria-label='Zur Auswahlseite: NLP Coaching oder Webentwicklung'
      title='Zwei Welten. Eine Entscheidung.'
      className='group fixed left-3 top-24 z-40 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-strong shadow-[0_10px_30px_var(--glow)] backdrop-blur-xl transition duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-5 sm:h-12 sm:w-12'>
      {/* Puls – Radarwelle nach außen, ohne Layout anzufassen */}
      <span
        aria-hidden='true'
        className='world-switch-pulse absolute inset-0 rounded-full border border-(--accent)'
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
        className='pointer-events-none absolute left-full ml-3 hidden -translate-x-2 whitespace-nowrap rounded-full border border-border bg-surface-strong px-3 py-1.5 text-xs font-semibold text-(--text) opacity-0 shadow-[0_10px_30px_var(--glow)] backdrop-blur-xl transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block'>
        Auswahlseite
      </span>
    </Link>
  );
}
