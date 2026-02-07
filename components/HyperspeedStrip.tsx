'use client';

import { useMemo } from 'react';
import Hyperspeed from '@/components/Hyperspeed';
import { hyperspeedPresets } from '@/components/HyperSpeedPresets';

export default function HyperspeedStrip() {
  const effectOptions = useMemo(() => {
    return {
      ...hyperspeedPresets.one,
      roadWidth: 9,
      lanesPerRoad: 3,
      speedUp: 1.6,
      colors: {
        roadColor: 0x0b1b2b,
        islandColor: 0x0f2438,
        background: 0x000000,
        shoulderLines: 0x13253a,
        brokenLines: 0x13253a,
        leftCars: [0x1d6fa8, 0x5b2c8e, 0x86c243],
        rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
        sticks: 0x1d6fa8,
      },
    };
  }, []);

  return <Hyperspeed effectOptions={effectOptions} />;
}
