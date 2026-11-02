'use client';

import AboutSection from '@/app/coaching/components/AboutSection';
import ApproachSection from '@/app/coaching/components/ApproachSection';
import ContactSection from '@/app/coaching/components/ContactSection';
import FaqSection from '@/app/coaching/components/FaqSection';
import FulfilmentSection from '@/app/coaching/components/FulfilmentSection';
import GuideSection from '@/app/coaching/components/GuideSection';
import HeroSection from '@/app/coaching/components/HeroSection';
import ImpulseSection from '@/app/coaching/components/ImpulseSection';
import PriceTableSection from '@/app/coaching/components/PriceTableSection';
import TransformationSection from '@/app/coaching/components/TransformationSection';
import WorkSection from '@/app/coaching/components/WorkSection';
import { useNlpTheme } from '@/app/coaching/NlpLayoutClient';

/**
 * Reihenfolge entlang der Entscheidung des Besuchers (2026-11):
 * Ansprache → Wiedererkennung → Ansatz → Themen → Ablauf → Preis → Person →
 * Impulse zum Ausprobieren → Leitfaden → Fragen → Kontakt.
 */
export default function NlpSections() {
  const { isWarmTheme } = useNlpTheme();

  return (
    <>
      <HeroSection />
      <FulfilmentSection />
      <ApproachSection />
      <WorkSection />
      <TransformationSection isWarmTheme={isWarmTheme} />
      <PriceTableSection />
      <AboutSection />
      <ImpulseSection />
      <GuideSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
