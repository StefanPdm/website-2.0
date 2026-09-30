/**
 * Illustrationen der S-L-A-C-Formel – animierte Inline-SVGs.
 *
 * Wie `Motifs.tsx`: eingefärbt über `--accent → --accent-2`, dadurch in beiden
 * Themes korrekt, zusammen wenige KB statt Rasterbilder. Alle `aria-hidden`,
 * alle Animationen nur `transform`/`opacity` (Klassen `formel-*` in
 * globals.css). Die Gradient-IDs sind je Illustration eindeutig – jede kommt
 * pro Seite nur einmal vor.
 */

type ArtProps = { className?: string };

function Gradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient
        id={id}
        x1='0'
        y1='0'
        x2='1'
        y2='1'>
        <stop
          offset='0%'
          stopColor='var(--accent)'
        />
        <stop
          offset='100%'
          stopColor='var(--accent-2)'
        />
      </linearGradient>
    </defs>
  );
}

/** Hero: Wellen, die sich von einem ruhigen Punkt ausbreiten – das „Stopp". */
export function RippleArt({ className }: ArtProps) {
  return (
    <svg
      viewBox='0 0 400 400'
      fill='none'
      aria-hidden='true'
      className={`formel-svg ${className ?? ''}`}>
      <Gradient id='formel-g-ripple' />
      {[0, 1.2, 2.4, 3.6, 4.8].map((delay) => (
        <circle
          key={delay}
          cx='200'
          cy='200'
          r='150'
          stroke='url(#formel-g-ripple)'
          strokeWidth='1.5'
          className='formel-ripple'
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </svg>
  );
}

/** S²: Stoppschild, in dem ein Lächeln aufgeht. */
export function StopSmileArt({ className }: ArtProps) {
  return (
    <svg
      viewBox='0 0 200 200'
      fill='none'
      aria-hidden='true'
      className={`formel-svg ${className ?? ''}`}>
      <Gradient id='formel-g-s' />
      <polygon
        points='164.7,73.2 164.7,126.8 126.8,164.7 73.2,164.7 35.3,126.8 35.3,73.2 73.2,35.3 126.8,35.3'
        stroke='url(#formel-g-s)'
        strokeWidth='4'
        strokeLinejoin='round'
        className='formel-breathe'
      />
      <polygon
        points='150,79 150,121 121,150 79,150 50,121 50,79 79,50 121,50'
        stroke='url(#formel-g-s)'
        strokeOpacity='0.35'
        strokeWidth='1.5'
      />
      <g className='formel-float'>
        <circle
          cx='82'
          cy='90'
          r='5'
          fill='url(#formel-g-s)'
        />
        <circle
          cx='118'
          cy='90'
          r='5'
          fill='url(#formel-g-s)'
        />
        <path
          d='M74 112 Q100 138 126 112'
          stroke='url(#formel-g-s)'
          strokeWidth='5'
          strokeLinecap='round'
        />
      </g>
    </svg>
  );
}

/** L: ein Auge, das sich umsieht und blinzelt. */
export function LookArt({ className }: ArtProps) {
  return (
    <svg
      viewBox='0 0 200 200'
      fill='none'
      aria-hidden='true'
      className={`formel-svg ${className ?? ''}`}>
      <Gradient id='formel-g-l' />
      <g className='formel-blink'>
        <path
          d='M24 100 Q100 34 176 100 Q100 166 24 100 Z'
          stroke='url(#formel-g-l)'
          strokeWidth='4'
          strokeLinejoin='round'
        />
        <g className='formel-look'>
          <circle
            cx='100'
            cy='100'
            r='26'
            stroke='url(#formel-g-l)'
            strokeWidth='4'
          />
          <circle
            cx='100'
            cy='100'
            r='10'
            fill='url(#formel-g-l)'
          />
        </g>
      </g>
      {[40, 100, 160].map((x) => (
        <line
          key={x}
          x1={x}
          y1={x === 100 ? 22 : 34}
          x2={x === 100 ? 100 : x + (x < 100 ? 8 : -8)}
          y2={x === 100 ? 34 : 46}
          stroke='url(#formel-g-l)'
          strokeOpacity='0.4'
          strokeWidth='2'
          strokeLinecap='round'
        />
      ))}
    </svg>
  );
}

/** A: ein Gefühl (Punkt), gehalten von Kreisen, die mitatmen. */
export function AcceptArt({ className }: ArtProps) {
  return (
    <svg
      viewBox='0 0 200 200'
      fill='none'
      aria-hidden='true'
      className={`formel-svg ${className ?? ''}`}>
      <Gradient id='formel-g-a' />
      {[
        { r: 72, opacity: 0.25, delay: '0s', width: 1.5 },
        { r: 54, opacity: 0.5, delay: '0.6s', width: 2.5 },
        { r: 36, opacity: 0.85, delay: '1.2s', width: 4 },
      ].map((ring) => (
        <circle
          key={ring.r}
          cx='100'
          cy='100'
          r={ring.r}
          stroke='url(#formel-g-a)'
          strokeOpacity={ring.opacity}
          strokeWidth={ring.width}
          className='formel-breathe'
          style={{ animationDelay: ring.delay }}
        />
      ))}
      <circle
        cx='100'
        cy='100'
        r='12'
        fill='url(#formel-g-a)'
        className='formel-float'
      />
    </svg>
  );
}

/** C³: ein Punkt, drei Wege – einer leuchtet nach dem anderen auf. */
export function ChoicesArt({ className }: ArtProps) {
  const paths = [
    { d: 'M40 100 C90 100 100 48 162 48', end: [162, 48] },
    { d: 'M40 100 C90 100 110 100 162 100', end: [162, 100] },
    { d: 'M40 100 C90 100 100 152 162 152', end: [162, 152] },
  ];
  return (
    <svg
      viewBox='0 0 200 200'
      fill='none'
      aria-hidden='true'
      className={`formel-svg ${className ?? ''}`}>
      <Gradient id='formel-g-c' />
      {paths.map((path, index) => (
        <g
          key={path.d}
          className='formel-glow'
          style={{ animationDelay: `${index * 1.5}s` }}>
          <path
            d={path.d}
            stroke='url(#formel-g-c)'
            strokeWidth='4'
            strokeLinecap='round'
          />
          <circle
            cx={path.end[0]}
            cy={path.end[1]}
            r='10'
            stroke='url(#formel-g-c)'
            strokeWidth='4'
          />
        </g>
      ))}
      <circle
        cx='40'
        cy='100'
        r='12'
        fill='url(#formel-g-c)'
        className='formel-breathe'
      />
    </svg>
  );
}

export const STEP_ART = {
  s: StopSmileArt,
  l: LookArt,
  a: AcceptArt,
  c: ChoicesArt,
} as const;
