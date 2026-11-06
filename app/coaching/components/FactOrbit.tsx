import type { CSSProperties } from 'react';

/**
 * Prüfbare Belege (§10) – dieselbe Idee wie der Orbit auf der Startseite.
 * Muss zu Hero-Fakten, Preisen und Ausbildungen passen.
 */
export const orbitFacts = [
  'DVNLP-zertifiziert',
  '20+ Jahre Unternehmer',
  'Potsdam · Berlin · online',
  'Ø 180 Min pro Session',
];

const DURATION = 48;

function Orbit() {
  return (
    <div
      aria-hidden='true'
      className='coach-orbit'>
      <span className='coach-orbit__ring' />
      {orbitFacts.map((label, index) => {
        const angle = 45 + index * 90;
        return (
          <span
            key={label}
            className='coach-orbit__pos'
            style={{ '--delay': `${-(angle / 360) * DURATION}s` } as CSSProperties}>
            <span className='coach-orbit__fact'>{label}</span>
          </span>
        );
      })}
    </div>
  );
}

/**
 * Belege-Orbit um eine Karte (Welt A, „Über mich“). Umschließt das Kind; nur
 * die vordere Bahnhälfte ist sichtbar (die hintere läge hinter der Glaskarte
 * und schimmerte durch), die Belege ziehen dort vorbei und tauchen ab.
 * Ab `lg`; darunter und bei reduzierter Bewegung eine ruhige Belegzeile.
 */
export default function FactOrbit({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative lg:mb-20'>
      <div className='relative z-10'>{children}</div>
      <div className='hidden lg:contents'>
        <Orbit />
      </div>
      <ul
        className='coach-orbit-static mt-5 flex flex-wrap justify-center gap-2 lg:hidden'
        aria-label='Auf einen Blick'>
        {orbitFacts.map((label) => (
          <li
            key={label}
            className='rounded-full border border-card-border bg-surface px-3 py-1.5 text-xs text-(--text)'>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
