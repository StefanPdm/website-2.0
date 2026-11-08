import { Fraunces, Public_Sans } from 'next/font/google';

import PauseOffscreen from '@/components/PauseOffscreen';
import NlpFooter from '@/app/coaching/components/NlpFooter';
import NlpHeader from '@/app/coaching/components/NlpHeader';
import WorldSwitch from '@/app/coaching/components/WorldSwitch';

const publicSans = Public_Sans({ subsets: ['latin'], display: 'swap' });
/** Serif-Akzent nur für Zitat und Signatur (`font-serif`, §3.2). */
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-fraunces',
});

/**
 * Rahmen von Welt A. Seit 2026-11 ein festes Farbkonzept (`.theme-coaching`,
 * app/globals.css) – kein Umschalter, kein Theme-State mehr. Der Dateiname
 * stammt aus der Zeit, als hier noch Client-State lag.
 */
export default function NlpLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${publicSans.className} ${fraunces.variable} theme-coaching relative min-h-dvh`}>
      <div className='relative isolate overflow-hidden'>
        <NlpHeader />
        <WorldSwitch />
        {/* Sonnenbahn: Lesefortschritt am linken Rand (nur CSS, ab lg) */}
        <div
          aria-hidden='true'
          className='sun-path'>
          <span className='sun-path__fill' />
          <span className='sun-path__cap sun-path__cap--top' />
          <span className='sun-path__cap sun-path__cap--bottom' />
          <span className='sun-path__ball' />
        </div>
        <main>{children}</main>
        <PauseOffscreen />
        <NlpFooter />
      </div>
    </div>
  );
}
