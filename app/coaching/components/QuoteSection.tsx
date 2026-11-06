import BreathRings from '@/app/coaching/components/BreathRings';

/**
 * Zitat-Band zwischen Ansatz und Themen (dunkle Insel). Die Kugel mit den
 * Atem-Ringen ist das Motiv der Coaching-Hälfte der Startseite – so taucht
 * die Entscheidung von „/“ hier wieder auf.
 *
 * Wortlaut nach Stefans eigenem Text in „Was Coaching für mich bedeutet“
 * (ApproachSection). Nur eigene Sätze als Zitat – fremde Zitate brauchen
 * Quelle und Wortlaut-Prüfung.
 */
export default function QuoteSection() {
  return (
    <section
      aria-label='Leitgedanke'
      className='tone-dark relative overflow-hidden border-y border-border py-24 sm:py-32'>
      <BreathRings className='left-1/2 top-1/2 w-[min(900px,160vw)] -translate-x-1/2 -translate-y-1/2 opacity-70' />
      <span
        aria-hidden='true'
        className='quote-sun pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-28 sm:w-28'
      />

      <figure className='container relative mx-auto max-w-4xl px-4 text-center'>
        <blockquote className='font-serif text-3xl font-light italic leading-snug text-(--text) text-balance sm:text-4xl lg:text-5xl'>
          <p>
            „Glück und Erfüllung entstehen nicht im Außen, sondern{' '}
            <span className='text-accent-soft'>in dir selbst</span>.“
          </p>
        </blockquote>
        <figcaption className='mt-8 text-xs uppercase tracking-[0.3em] text-(--subtle)'>
          Stefan Heinemann
        </figcaption>
      </figure>
    </section>
  );
}
