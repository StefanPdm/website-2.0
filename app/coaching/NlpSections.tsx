import AboutSection from '@/app/coaching/components/AboutSection';
import ApproachSection from '@/app/coaching/components/ApproachSection';
import ContactSection from '@/app/coaching/components/ContactSection';
import FaqSection from '@/app/coaching/components/FaqSection';
import FulfilmentSection from '@/app/coaching/components/FulfilmentSection';
import GuideSection from '@/app/coaching/components/GuideSection';
import HeroSection from '@/app/coaching/components/HeroSection';
import ImpulseSection from '@/app/coaching/components/ImpulseSection';
import PodcastSection from '@/app/coaching/components/PodcastSection';
import PriceTableSection from '@/app/coaching/components/PriceTableSection';
import QuoteSection, { Mark } from '@/app/coaching/components/QuoteSection';
import TransformationSection from '@/app/coaching/components/TransformationSection';
import WorkSection from '@/app/coaching/components/WorkSection';

/**
 * Reihenfolge entlang der Entscheidung des Besuchers (2026-11):
 * Ansprache → Wiedererkennung → Gedanke (Karriere) → Ansatz → Themen → Ablauf → Session-Podcast → Gedanke (Mut) → Preis → Person →
 * Impulse zum Ausprobieren → Leitfaden → Fragen → Kontakt.
 */
export default function NlpSections() {
  return (
    <>
      <HeroSection />
      <FulfilmentSection />
      {/* Etymologie laut Duden: frz. carrière „Rennbahn, Laufbahn“ (< ital. carriera < lat. carrus) */}
      <QuoteSection
        label='Gedanke zur Karriere'
        quote={
          <>
            „Wusstest du, dass das Wort Karriere vom französischen <i>carrière</i> stammt – und
            ursprünglich <Mark>Rennbahn</Mark> bedeutet?“
          </>
        }
        caption='Stefan Heinemann'
      />
      <ApproachSection />
      <WorkSection />
      <TransformationSection />
      <PodcastSection />
      {/* Abwandlung von „Wer kämpft, kann verlieren …“ (Brecht zugeschrieben, nicht belegt) – darum ohne Namen */}
      <QuoteSection
        label='Gedanke zum Mut'
        rings='left'
        quote={
          <>
            „Lieber <Mark>gescheitert</Mark> als nicht versucht.“
          </>
        }
        follow={
          <>
            <span className='block'>Wer sich traut, kann scheitern.</span>
            <span className='block'>Wer sich nicht traut, ist schon gescheitert.</span>
          </>
        }
      />
      <PriceTableSection />
      <AboutSection />
      <ImpulseSection />
      <GuideSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
