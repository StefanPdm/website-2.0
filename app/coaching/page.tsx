import NlpSections from '@/app/coaching/NlpSections';
import { FaqStructuredData, NlpStructuredData } from '@/components/StructuredData';
import { coachingOffersForSchema } from '@/app/coaching/pricing';
import { faqBoth, faqNlp } from '@/app/coaching/faq';

/**
 * Das Service-Schema beschreibt das Coaching-Angebot – also genau diese Seite.
 * Es stand zuvor im Layout und wurde dadurch auch auf Impressum, Datenschutz
 * und den Regel-Unterseiten ausgeliefert, dort jeweils mit einer Breadcrumb,
 * die auf /coaching zeigte. Auf den Regelseiten kollidierte das mit deren eigener.
 */
export default function NlpPage() {
  return (
    <>
      <NlpStructuredData offers={coachingOffersForSchema} />
      <FaqStructuredData entries={[...faqNlp, ...faqBoth]} />
      <NlpSections />
    </>
  );
}
