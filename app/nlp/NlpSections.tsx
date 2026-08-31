'use client';

import AboutSection from '@/app/nlp/components/AboutSection';
import ContactSection from '@/app/nlp/components/ContactSection';
import GuideSection from '@/app/nlp/components/GuideSection';
import HeroSection from '@/app/nlp/components/HeroSection';
import NlpIntroSection from '@/app/nlp/components/NlpIntroSection';
import ProgrammeSection from '@/app/nlp/components/ProgrammeSection';
import FulfilmentSection from '@/app/nlp/components/FulfilmentSection';
import TransformationSection from '@/app/nlp/components/TransformationSection';
import WorkSection from '@/app/nlp/components/WorkSection';
import PriceTableSection from '@/app/nlp/components/PriceTableSection';
import { useNlpTheme } from '@/app/nlp/NlpLayoutClient';

export default function NlpSections() {
  const { isWarmTheme } = useNlpTheme();

  return (
    <>
      <HeroSection isWarmTheme={isWarmTheme} />
      <NlpIntroSection />
      <WorkSection />
      <TransformationSection isWarmTheme={isWarmTheme} />
      <ProgrammeSection />
      <FulfilmentSection />
      <PriceTableSection />
      <GuideSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
