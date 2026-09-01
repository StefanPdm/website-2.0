import type { Metadata } from 'next';

import RulesPage from '@/app/nlp/regeln/RulesPage';
import { RulesStructuredData } from '@/components/StructuredData';
import { ungluecklichsein } from '@/app/nlp/regeln/data';

export const metadata: Metadata = {
  title: ungluecklichsein.metaTitle,
  description: ungluecklichsein.metaDescription,
  keywords: [
    'warum bin ich unglücklich',
    'unglückliche Muster erkennen',
    'sich ständig mit anderen vergleichen',
    'Erwartungen anderer erfüllen',
    'Komfortzone verlassen',
    'NLP Coaching Potsdam',
    'Coaching Berlin',
  ],
  alternates: { canonical: ungluecklichsein.href },
  openGraph: {
    title: ungluecklichsein.metaTitle,
    description: ungluecklichsein.metaDescription,
    url: ungluecklichsein.href,
    type: 'article',
    locale: 'de_DE',
    siteName: 'NLP Coaching',
  },
  twitter: {
    card: 'summary_large_image',
    title: ungluecklichsein.metaTitle,
    description: ungluecklichsein.metaDescription,
  },
};

export default function Page() {
  return (
    <>
      <RulesStructuredData ruleSet={ungluecklichsein} />
      <RulesPage ruleSet={ungluecklichsein} />
    </>
  );
}
