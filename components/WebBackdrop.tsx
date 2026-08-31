'use client';

import dynamic from 'next/dynamic';

import LazyEffect from '@/components/LazyEffect';

/**
 * Client-Wrapper für den WebGL-Hintergrund von Welt B.
 *
 * three.js wiegt allein rund 480 KB. Über `dynamic({ ssr: false })` landet es
 * in einem eigenen Chunk, der erst geladen wird, wenn LazyEffect entscheidet,
 * dass der Effekt überhaupt laufen soll (breites Display, im Viewport,
 * keine reduzierte Bewegung).
 *
 * Der Fallback ist kein leerer Bereich, sondern ein CSS-Verlauf in denselben
 * Markenfarben – auf Mobil und bei prefers-reduced-motion sieht die Seite
 * dadurch vollständig aus statt kahl.
 */
const LightPillar = dynamic(() => import('@/components/LightPillar'), { ssr: false });

export default function WebBackdrop() {
  return (
    <LazyEffect
      className='absolute inset-0'
      once
      fallback={
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(29,111,168,0.28),transparent_70%),radial-gradient(50%_40%_at_70%_60%,rgba(122,44,142,0.22),transparent_70%)]'
        />
      }>
      <LightPillar
        className='z-0'
        topColor='#1D6FA8'
        bottomColor='#7A2C8E'
        intensity={0.9}
        glowAmount={0.004}
        pillarWidth={3.2}
        pillarHeight={0.45}
        pillarRotation={15}
        mixBlendMode='screen'
      />
    </LazyEffect>
  );
}
