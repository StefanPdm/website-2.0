import { FORMULA_PLAIN, formulaTerms } from '@/app/nlp/formel-zum-glueck/data';

/**
 * Die Formel als Schriftbild: S² + L + A + C³ im Akzentverlauf.
 *
 * Optisch mit echten Hochzahlen (höher gesetzt als Tailwinds Standard-`sup`,
 * damit sie wie in einer Gleichung an der Oberkante des Buchstabens sitzen), für Screenreader als lesbarer Text
 * (`sr-only`) – „S hoch zwei" per Vorlesefunktion wäre unverständlich.
 * `animate` lässt die Terme nacheinander aufsteigen (nur im Hero).
 */
export default function FormulaMark({
  className = '',
  animate = false,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <p className={`font-semibold tracking-tight ${className}`}>
      <span className='sr-only'>
        {FORMULA_PLAIN} – Stop und Smile, Look, Accept, Challenge, Choices, Choose
      </span>
      <span
        aria-hidden='true'
        className='inline-flex flex-wrap items-baseline justify-center gap-x-[0.35em]'>
        {formulaTerms.map((term, index) => (
          <span
            key={term.base}
            className={`inline-flex items-baseline gap-x-[0.35em] ${animate ? 'formel-rise' : ''}`}
            style={animate ? { animationDelay: `${150 + index * 140}ms` } : undefined}>
            {index > 0 && <span className='text-(--muted) font-light'>+</span>}
            <span className='bg-linear-to-br from-accent to-accent-2 bg-clip-text text-transparent'>
              {term.base}
              {'power' in term && <sup className='-top-[1.1em] ml-[0.04em] text-[0.5em]'>{term.power}</sup>}
            </span>
          </span>
        ))}
      </span>
    </p>
  );
}
