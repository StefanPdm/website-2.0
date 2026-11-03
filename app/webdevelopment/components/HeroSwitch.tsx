'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * PROVISORISCH (2026-11): Vergleich zweier Hero-Varianten auf /webdevelopment.
 * Gerendert wird immer nur eine Variante (kein doppeltes H1). Besucher sehen
 * immer A. Mit ?hero=a oder ?hero=b in der Adresse erscheint unten links der
 * Umschalter (auch live, z. B. zum Vergleich auf dem Handy). Nach der Entscheidung: diese Datei und die verworfene Variante löschen.
 * Stand A ist zusätzlich als Git-Tag `hero-variante-a` gesichert.
 */
export default function HeroSwitch({ a, b }: { a: ReactNode; b: ReactNode }) {
  const [variant, setVariant] = useState<'a' | 'b'>('a');
  const [testing, setTesting] = useState(false);

  // ?hero=b aus der Adresse übernehmen – asynchron, kein setState synchron im Effekt.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('hero');
    if (param !== 'a' && param !== 'b') return;
    const timer = window.setTimeout(() => {
      setTesting(true);
      setVariant(param);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggle() {
    const next = variant === 'a' ? 'b' : 'a';
    setVariant(next);
    const url = new URL(window.location.href);
    url.searchParams.set('hero', next);
    window.history.replaceState(null, '', url);
  }

  return (
    <>
      {variant === 'a' ? a : b}
      {testing && (
        <button
          type='button'
          onClick={toggle}
          className='fixed bottom-4 left-4 z-[80] min-h-11 cursor-pointer rounded-full border border-amber-300/70 bg-amber-400 px-4 text-xs font-bold text-black shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
        >
          Hero: {variant.toUpperCase()} → {variant === 'a' ? 'B' : 'A'}
        </button>
      )}
    </>
  );
}
