import { Public_Sans } from 'next/font/google';

import NlpFooter from '@/app/coaching/components/NlpFooter';
import NlpHeader from '@/app/coaching/components/NlpHeader';
import PaletteSwitch from '@/app/coaching/components/PaletteSwitch';
import { paletteScript } from '@/app/coaching/palette';
import WorldSwitch from '@/app/coaching/components/WorldSwitch';

const publicSans = Public_Sans({ subsets: ['latin'], display: 'swap' });

/**
 * Rahmen von Welt A. Seit 2026-11 ein festes Farbkonzept (`.theme-coaching`,
 * app/globals.css) – kein Umschalter, kein Theme-State mehr. Der Dateiname
 * stammt aus der Zeit, als hier noch Client-State lag.
 */
export default function NlpLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${publicSans.className} theme-coaching relative min-h-dvh`}
      suppressHydrationWarning>
      {/* PROTOTYP Farbwelt: setzt data-palette vor dem ersten Bild */}
      <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
      <PaletteSwitch />
      <div className='relative isolate overflow-hidden'>
        <NlpHeader />
        <WorldSwitch />
        <main>{children}</main>
        <NlpFooter />
      </div>
    </div>
  );
}
