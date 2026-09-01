import NlpSections from '@/app/nlp/NlpSections';
import { FaqStructuredData, NlpStructuredData } from '@/components/StructuredData';
import { coachingOffersForSchema } from '@/app/nlp/pricing';
import { faqBoth, faqNlp } from '@/app/nlp/faq';

/**
 * Das Service-Schema beschreibt das Coaching-Angebot – also genau diese Seite.
 * Es stand zuvor im Layout und wurde dadurch auch auf Impressum, Datenschutz
 * und den Regel-Unterseiten ausgeliefert, dort jeweils mit einer Breadcrumb,
 * die auf /nlp zeigte. Auf den Regelseiten kollidierte das mit deren eigener.
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
