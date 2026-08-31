'use client';

import dynamic from 'next/dynamic';

import LazyEffect from '@/components/LazyEffect';

/**
 * Client-Wrapper für den Hyperspeed-Streifen.
 *
 * Hyperspeed zieht three.js UND postprocessing (zusammen über 1,2 MB) und
 * hielt bisher dauerhaft eine zweite Render-Schleife am Laufen – parallel zum
 * LightPillar-Hintergrund. Jetzt gilt das Effekt-Budget aus CLAUDE.md §9:
 * hoechstens ein aktiver WebGL-Kontext pro Viewport. Dieser Streifen startet
 * deshalb erst, wenn er selbst sichtbar wird.
 */
const Hyperspeed = dynamic(() => import('@/components/HyperspeedStrip'), { ssr: false });

export default function HyperspeedBand() {
  return (
    <LazyEffect
      className='h-full w-full'
      rootMargin='150px'
      once>
      <Hyperspeed />
    </LazyEffect>
  );
}
