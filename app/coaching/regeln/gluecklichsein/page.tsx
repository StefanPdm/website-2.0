import type { Metadata } from 'next';

import RulesPage from '@/app/coaching/regeln/RulesPage';
import { RulesStructuredData } from '@/components/StructuredData';
import { gluecklichsein } from '@/app/coaching/regeln/data';

export const metadata: Metadata = {
  title: gluecklichsein.metaTitle,
  description: gluecklichsein.metaDescription,
  keywords: [
    'Regeln für ein glückliches Leben',
    'wie werde ich glücklich',
    'Erfüllung finden',
    'Selbstverantwortung übernehmen',
    'NLP Coaching Potsdam',
    'Persönlichkeitsentwicklung Berlin',
    'Achtsamkeit im Alltag',
    'Wahlfreiheit zwischen Reiz und Reaktion',
  ],
  alternates: { canonical: gluecklichsein.href },
  openGraph: {
    title: gluecklichsein.metaTitle,
    description: gluecklichsein.metaDescription,
    url: gluecklichsein.href,
    type: 'article',
    locale: 'de_DE',
    siteName: 'Stefan Heinemann Coaching',
  },
  twitter: {
    card: 'summary_large_image',
    title: gluecklichsein.metaTitle,
    description: gluecklichsein.metaDescription,
  },
};

export default function Page() {
  return (
    <>
      <RulesStructuredData ruleSet={gluecklichsein} />
      <RulesPage ruleSet={gluecklichsein} />
    </>
  );
}
