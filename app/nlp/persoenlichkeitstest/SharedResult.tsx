'use client';

import { useSyncExternalStore } from 'react';

import GlassCard from '@/components/GlassCard';
import { dimensions, questions, type Dimension } from '@/app/nlp/persoenlichkeitstest/data';
import ScoreBars from '@/app/nlp/persoenlichkeitstest/ScoreBars';
import { parseShared, rank, verdictLabel } from '@/app/nlp/persoenlichkeitstest/scoring';

/**
 * Geteiltes Ergebnis auf der Typseite – nur, wenn der Link die Prozentwerte
 * aus `shareHref` trägt. Ohne (oder mit unpassenden) Parametern rendert die
 * Komponente nichts, die Typseite bleibt die reine Inhaltsseite.
 *
 * Die Parameter liest erst der Browser: So bleibt die Typseite statisch
 * erzeugt, und Suchmaschinen sehen immer dieselbe Seite. Server-Snapshot ''
 * → kein Hydration-Konflikt (Muster wie `useTestMode` im TestClient).
 */
const noSubscribe = () => () => {};

export default function SharedResult({ dimension }: { dimension: Dimension }) {
  const search = useSyncExternalStore(
    noSubscribe,
    () => window.location.search,
    () => '',
  );
  const scores = parseShared(search, dimension);
  if (!scores) return null;

  const { ranked, verdict } = rank(scores);
  const isAmbiguous = verdict === 'ausgeglichen' || verdict === 'mischprofil';

  return (
    <GlassCard className='mb-8 p-6 sm:p-9'>
      <p className='text-xs uppercase tracking-[0.25em] text-accent-soft'>Geteiltes Ergebnis</p>
      <h2 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
        {dimensions[dimension].type}: {verdictLabel[verdict]}
      </h2>
      <p className='mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base'>
        So hat sich die Person, die dir diesen Link geschickt hat, in den {questions.length} Situationen des Tests
        verteilt. Jeder Mensch nutzt alle drei Bereiche — die Werte zeigen nur, welcher davon am
        selbstverständlichsten gewählt wurde.
      </p>
      <ScoreBars
        scores={scores}
        top={isAmbiguous ? undefined : ranked[0]}
      />
    </GlassCard>
  );
}
