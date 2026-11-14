import type { CSSProperties } from 'react';

/**
 * Helle Grafik für die dunklen Inseln von Welt A (2026-11-14): lockert die
 * Walnuss-Flächen auf, ohne mit dem Inhalt zu konkurrieren.
 *
 * Drei Varianten, alle in Creme (`--text` der dunklen Insel), dünn und
 * transparent, rein dekorativ (`aria-hidden`, `pointer-events-none`):
 * - `orbit`: zwei geneigte Bahnen, auf denen je ein Lichtpunkt kreist –
 *   verwandt mit dem Belege-Orbit der Startseite.
 * - `dust`: Lichtstaub, der langsam aufsteigt und verglimmt.
 * - `waves`: feine Linien, die wie Atem seitlich durchziehen.
 *
 * Nur transform/opacity (§9). PauseOffscreen hält die Animation außerhalb des
 * Bildes an, bei reduzierter Bewegung steht alles (globals.css).
 * Position und Größe über `className` (absolute). Die Sektion braucht
 * `relative overflow-hidden`; Inhalt danach mit `relative` darüberlegen.
 */

type Variant = 'orbit' | 'dust' | 'waves';

/** Lichtstaub: x in %, Startversatz, Größe, Dauer – fest, damit SSR und Client gleich sind. */
const MOTES = [
  [6, 0, 3, 19],
  [14, -6, 2, 23],
  [22, -12, 4, 27],
  [31, -3, 2, 21],
  [43, -15, 3, 25],
  [52, -9, 2, 18],
  [61, -1, 3, 24],
  [70, -13, 2, 22],
  [78, -5, 4, 28],
  [86, -10, 2, 20],
  [93, -2, 3, 26],
  [38, -17, 2, 30],
] as const;

/** Bahnen: Neigung in der Fläche, Kippung in die Tiefe, Umlaufzeit, Startwinkel. */
const ORBITS = [
  { tilt: -18, lean: 68, speed: 38, start: 0 },
  { tilt: 24, lean: 74, speed: 52, start: 140 },
] as const;

/** Wellen: Höhe im SVG, Amplitude, Dauer, Deckkraft. */
const WAVES = [
  { y: 60, a: 18, d: 26, o: 0.32 },
  { y: 90, a: 26, d: 34, o: 0.22 },
  { y: 120, a: 14, d: 42, o: 0.16 },
] as const;

/** Sinus-Pfad über die doppelte Breite (0–2400), damit die Schleife nahtlos läuft. */
function wavePath(y: number, a: number) {
  let d = `M0 ${y}`;
  for (let x = 0; x < 2400; x += 300) {
    d += ` Q${x + 75} ${y - a} ${x + 150} ${y} T${x + 300} ${y}`;
  }
  return d;
}

export default function LightField({
  variant,
  className = '',
}: {
  variant: Variant;
  className?: string;
}) {
  if (variant === 'dust') {
    return (
      <div
        aria-hidden='true'
        className={`light-dust pointer-events-none absolute ${className}`}>
        {MOTES.map(([x, delay, size, duration]) => (
          <span
            key={x}
            style={
              {
                left: `${x}%`,
                '--size': `${size}px`,
                '--dur': `${duration}s`,
                '--delay': `${delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  if (variant === 'orbit') {
    return (
      <div
        aria-hidden='true'
        className={`light-orbit pointer-events-none absolute aspect-square ${className}`}>
        <span className='light-orbit__core' />
        {ORBITS.map((orbit) => (
          <span
            key={orbit.tilt}
            className='light-orbit__plane'
            style={
              {
                '--tilt': `${orbit.tilt}deg`,
                '--lean': `${orbit.lean}deg`,
              } as CSSProperties
            }>
            <span
              className='light-orbit__track'
              style={{ '--speed': `${orbit.speed}s`, '--start': `${orbit.start}deg` } as CSSProperties}>
              <span className='light-orbit__dot' />
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 1200 180'
      preserveAspectRatio='none'
      className={`light-waves pointer-events-none absolute ${className}`}>
      {WAVES.map((wave) => (
        <path
          key={wave.y}
          d={wavePath(wave.y, wave.a)}
          style={{ '--dur': `${wave.d}s`, '--o': wave.o } as CSSProperties}
        />
      ))}
    </svg>
  );
}
