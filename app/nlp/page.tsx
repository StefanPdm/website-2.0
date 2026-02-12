'use client';

import AboutSection from '@/app/nlp/components/AboutSection';
import ContactSection from '@/app/nlp/components/ContactSection';
import GuideSection from '@/app/nlp/components/GuideSection';
import HeroSection from '@/app/nlp/components/HeroSection';
import NlpIntroSection from '@/app/nlp/components/NlpIntroSection';
import ProgrammeSection from '@/app/nlp/components/ProgrammeSection';
import TestimonialsSection from '@/app/nlp/components/TestimonialsSection';
import TransformationSection from '@/app/nlp/components/TransformationSection';
import WorkSection from '@/app/nlp/components/WorkSection';
import PriceTableSection from '@/app/nlp/components/PriceTableSection';
import { useNlpTheme } from '@/app/nlp/layout';

export default function NLP() {
  const { isWarmTheme } = useNlpTheme();

  return (
    <>
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
    </>
  );
}
