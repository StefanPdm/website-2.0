'use client';

import { useState } from 'react';
import { Public_Sans } from 'next/font/google';

import AboutSection from '@/app/nlp/components/AboutSection';
import ContactSection from '@/app/nlp/components/ContactSection';
import GuideSection from '@/app/nlp/components/GuideSection';
import HeroSection from '@/app/nlp/components/HeroSection';
import NlpFooter from '@/app/nlp/components/NlpFooter';
import NlpHeader from '@/app/nlp/components/NlpHeader';
import NlpIntroSection from '@/app/nlp/components/NlpIntroSection';
import ProgrammeSection from '@/app/nlp/components/ProgrammeSection';
import TestimonialsSection from '@/app/nlp/components/TestimonialsSection';
import TransformationSection from '@/app/nlp/components/TransformationSection';
import WorkSection from '@/app/nlp/components/WorkSection';
import PriceTableSection from '@/app/nlp/components/PriceTableSection';

const publicSans = Public_Sans({ subsets: ['latin'], display: 'swap' });

export default function NLP() {
  const [isWarmTheme, setIsWarmTheme] = useState(true);

  return (
    <div
      className={`scroll-smooth ${publicSans.className} relative min-h-dvh ${
        isWarmTheme ? 'theme-warm' : 'theme-cool'
      }`}>
      <div className='relative isolate overflow-hidden'>
        <NlpHeader
          isWarmTheme={isWarmTheme}
          onToggleTheme={() => setIsWarmTheme((prev) => !prev)}
        />
        <main>
          <HeroSection isWarmTheme={isWarmTheme} />
          <NlpIntroSection />
          <WorkSection />
          <TransformationSection isWarmTheme={isWarmTheme} />
          <ProgrammeSection />
          <TestimonialsSection />
          <PriceTableSection />
          <GuideSection />
          <AboutSection />
          <ContactSection />
        </main>
        <NlpFooter />
      </div>
    </div>
  );
}
