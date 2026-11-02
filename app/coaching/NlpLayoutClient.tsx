'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { Public_Sans } from 'next/font/google';

import NlpFooter from '@/app/coaching/components/NlpFooter';
import NlpHeader from '@/app/coaching/components/NlpHeader';
import WorldSwitch from '@/app/coaching/components/WorldSwitch';

type NlpThemeContextValue = {
  isWarmTheme: boolean;
  toggleTheme: () => void;
};

const NlpThemeContext = createContext<NlpThemeContextValue | null>(null);

const publicSans = Public_Sans({ subsets: ['latin'], display: 'swap' });

export function useNlpTheme() {
  const context = useContext(NlpThemeContext);
  if (!context) {
    throw new Error('useNlpTheme must be used within the NLP layout');
  }
  return context;
}

export default function NlpLayoutClient({ children }: { children: React.ReactNode }) {
  const [isWarmTheme, setIsWarmTheme] = useState(false);

  const contextValue = useMemo(
    () => ({
      isWarmTheme,
      toggleTheme: () => setIsWarmTheme((prev) => !prev),
    }),
    [isWarmTheme],
  );

  return (
    <NlpThemeContext.Provider value={contextValue}>
      <div
        className={`${publicSans.className} relative min-h-dvh ${
          isWarmTheme ? 'theme-warm' : 'theme-cool'
        }`}>
        <div className='relative isolate overflow-hidden'>
          <NlpHeader
            isWarmTheme={isWarmTheme}
            onToggleTheme={contextValue.toggleTheme}
          />
          <WorldSwitch />
          <main>{children}</main>
          <NlpFooter />
        </div>
      </div>
    </NlpThemeContext.Provider>
  );
}
