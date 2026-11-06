import type { CSSProperties } from 'react';

/** Radien (viewBox 0–600) und Grund-Deckkraft der Ringe, innen kräftiger. */
const rings = [
  { r: 70, o: 0.34 },
  { r: 120, o: 0.28 },
  { r: 175, o: 0.22 },
  { r: 235, o: 0.16 },
  { r: 295, o: 0.1 },
];

/**
 * Atem-Ringe – die Signatur von Welt A (Motiv der Coaching-Kugel auf der
 * Startseite). Konzentrische Kupferlinien, die nacheinander aufatmen (7 s).
 * Rein dekorativ; Position und Größe über `className` (absolute, z. B.
 * `-left-40 top-10 w-[520px]`). Die Sektion braucht `relative overflow-hidden`.
 */
export default function BreathRings({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden='true'
      viewBox='0 0 600 600'
      className={`breath-rings ${className}`}>
      {rings.map(({ r, o }, index) => (
        <circle
          key={r}
          cx='300'
          cy='300'
          r={r}
          style={{ '--o': o, '--d': `${index * 0.9}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}
