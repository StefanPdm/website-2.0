/**
 * Trampolin-Motiv (2026-11-15) für „Bis zum Therapieplatz“ auf /coaching/burnout.
 *
 * Eine Figur federt auf einem kleinen Trampolin: Stauchen beim Landen,
 * Strecken beim Absprung, oben öffnen sich die Arme und drei Lichtfunken
 * steigen auf. Das Sprungtuch gibt beim Aufkommen nach, der Schatten wird
 * kleiner, je höher die Figur ist. Choreografie `.tramp*` in coaching.css,
 * nur transform/opacity (§9), dekorativ (`aria-hidden`). Bei reduzierter
 * Bewegung steht die Figur ruhig über dem Tuch.
 */
export default function TrampolineMotif({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 160 160'
      className={`tramp ${className}`}>
      <defs>
        <radialGradient id='tramp-glow'>
          <stop
            offset='0%'
            stopColor='currentColor'
            stopOpacity='0.55'
          />
          <stop
            offset='100%'
            stopColor='currentColor'
            stopOpacity='0'
          />
        </radialGradient>
      </defs>

      {/* Lichthof: leuchtet am Scheitel auf */}
      <circle
        className='tramp__glow'
        cx='80'
        cy='58'
        r='44'
        fill='url(#tramp-glow)'
      />

      {/* Lichtfunken am höchsten Punkt */}
      <g className='tramp__sparks'>
        <path
          className='tramp__spark tramp__spark--d'
          d='M38 54l1.4 3.5 3.5 1.4-3.5 1.4-1.4 3.5-1.4-3.5-3.5-1.4 3.5-1.4z'
        />
        <path
          className='tramp__spark tramp__spark--e'
          d='M124 50l1.8 4.5 4.5 1.8-4.5 1.8-1.8 4.5-1.8-4.5-4.5-1.8 4.5-1.8z'
        />
        <path
          className='tramp__spark tramp__spark--a'
          d='M54 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z'
        />
        <path
          className='tramp__spark tramp__spark--b'
          d='M106 22l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z'
        />
        <path
          className='tramp__spark tramp__spark--c'
          d='M98 46l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z'
        />
      </g>

      {/* Schatten der Figur auf dem Tuch */}
      <ellipse
        className='tramp__shadow'
        cx='80'
        cy='121'
        rx='14'
        ry='2.5'
      />

      {/* Figur: Kopf, Körper, Arme – federt als Ganzes */}
      <g className='tramp__body'>
        <circle
          cx='80'
          cy='70'
          r='8'
          className='tramp__fill'
        />
        <rect
          x='71'
          y='81'
          width='18'
          height='26'
          rx='9'
          className='tramp__fill'
        />
        <path
          className='tramp__arm tramp__arm--l'
          d='M73 86 L60 98'
        />
        <path
          className='tramp__arm tramp__arm--r'
          d='M87 86 L100 98'
        />
        <path
          className='tramp__leg'
          d='M76 106 L74 119 M84 106 L86 119'
        />
      </g>

      {/* Welle im Tuch beim Aufkommen */}
      <ellipse
        className='tramp__ripple'
        cx='80'
        cy='121'
        rx='40'
        ry='4'
      />

      {/* Trampolin: Rahmen, Federn, Sprungtuch mit Delle, Beine */}
      <path
        className='tramp__frame'
        d='M28 121 H132'
      />
      <path
        className='tramp__spring'
        d='M30 121 l3 -3 l3 3 l3 -3 l3 3 M118 121 l3 -3 l3 3 l3 -3 l3 3'
      />
      <path
        className='tramp__dip'
        d='M40 121 Q80 136 120 121'
      />
      <path
        className='tramp__frame'
        d='M36 121 L30 142 M124 121 L130 142 M58 121 L56 142 M102 121 L104 142'
      />
    </svg>
  );
}
