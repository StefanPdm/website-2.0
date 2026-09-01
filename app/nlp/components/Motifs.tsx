/**
 * Dekorative Motive für die beiden Karten der Sektion „Was ist NLP?".
 *
 * Bewusst **Inline-SVG statt Bilddateien**:
 *
 *  - Sie färben sich über `currentColor` und die Theme-Variablen selbst ein und
 *    funktionieren dadurch im Kühl- wie im Warm-Theme, ohne zwei Bildsätze.
 *  - Zusammen unter 2 KB statt zweier Rasterbilder — bei einem rein
 *    dekorativen Element wäre alles andere Verschwendung.
 *  - Beliebig skalierbar, kein Nachschärfen auf Retina nötig.
 *
 * Monochrom im Verlauf `--accent → --accent-2`, sehr niedrige Deckkraft:
 * Die Motive sollen die Karte tragen, nicht mit dem Text konkurrieren.
 * Beide sind `aria-hidden` — sie transportieren keine Information.
 */

type MotifProps = { className?: string };

/**
 * „Persönlich": konzentrische Bögen, die aus einem Punkt nach außen laufen —
 * innere Klarheit, die sich nach außen fortsetzt.
 */
export function MotifClarity({ className }: MotifProps) {
  return (
    <svg
      viewBox='0 0 200 200'
      fill='none'
      aria-hidden='true'
      className={className}>
      <defs>
        <linearGradient
          id='motif-clarity'
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
      <g
        stroke='url(#motif-clarity)'
        strokeLinecap='round'>
        {[28, 48, 68, 88, 108].map((r, i) => (
          <circle
            key={r}
            cx='100'
            cy='100'
            r={r}
            strokeWidth={1.5 - i * 0.15}
            strokeDasharray={i === 0 ? undefined : `${18 + i * 14} ${10 + i * 8}`}
            opacity={0.9 - i * 0.14}
          />
        ))}
        {/* Vier Strahlen als Andeutung von Ausrichtung */}
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1='100'
            y1='100'
            x2='100'
            y2='8'
            strokeWidth='1'
            opacity='0.25'
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </g>
      <circle
        cx='100'
        cy='100'
        r='7'
        fill='url(#motif-clarity)'
      />
    </svg>
  );
}

/**
 * „Wissenschaft": ein Netz aus Knoten und Kanten mit ansteigenden Balken —
 * Evidenz als verbundene Befunde, nicht als Einzelbehauptung.
 */
export function MotifEvidence({ className }: MotifProps) {
  const nodes = [
    [40, 150],
    [72, 108],
    [104, 128],
    [136, 74],
    [168, 46],
    [60, 62],
    [124, 40],
  ] as const;

  return (
    <svg
      viewBox='0 0 200 200'
      fill='none'
      aria-hidden='true'
      className={className}>
      <defs>
        <linearGradient
          id='motif-evidence'
          x1='0'
          y1='1'
          x2='1'
          y2='0'>
          <stop
            offset='0%'
            stopColor='var(--accent-2)'
          />
          <stop
            offset='100%'
            stopColor='var(--accent)'
          />
        </linearGradient>
      </defs>

      {/* Ansteigende Balken im Hintergrund – Evidenzstärke */}
      <g
        fill='url(#motif-evidence)'
        opacity='0.14'>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={24 + i * 27}
            y={172 - (i + 1) * 18}
            width='13'
            height={(i + 1) * 18}
            rx='4'
          />
        ))}
      </g>

      {/* Verbindungen */}
      <g
        stroke='url(#motif-evidence)'
        strokeWidth='1.2'
        opacity='0.5'
        strokeLinecap='round'>
        <path d='M40 150 L72 108 L104 128 L136 74 L168 46' />
        <path d='M60 62 L72 108' />
        <path d='M124 40 L136 74' />
        <path d='M60 62 L124 40' />
      </g>

      {/* Knoten */}
      <g fill='url(#motif-evidence)'>
        {nodes.map(([cx, cy], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={i < 5 ? 5 : 3.5}
            opacity={i < 5 ? 0.95 : 0.6}
          />
        ))}
      </g>
    </svg>
  );
}
