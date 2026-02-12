'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { Public_Sans } from 'next/font/google';

import NlpFooter from '@/app/nlp/components/NlpFooter';
import NlpHeader from '@/app/nlp/components/NlpHeader';

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

export default function NlpLayout({ children }: { children: React.ReactNode }) {
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
        className={`scroll-smooth ${publicSans.className} relative min-h-dvh ${
          isWarmTheme ? 'theme-warm' : 'theme-cool'
        }`}>
        <div className='relative isolate overflow-hidden'>
          <NlpHeader
            isWarmTheme={isWarmTheme}
            onToggleTheme={contextValue.toggleTheme}
          />
          <main>{children}</main>
          <NlpFooter />
        </div>
      </div>
    </NlpThemeContext.Provider>
  );
}
