import type { Metadata } from 'next';
import NlpLayoutClient from '@/app/nlp/NlpLayoutClient';
import { KEYWORDS_NLP } from '@/lib/site';

const title = 'NLP Coaching in Potsdam & Berlin – Klarheit, Fokus, Entscheidungen';
const description =
  'NLP Coaching mit Stefan Heinemann in Potsdam, Berlin und online: Gedankenkarussell stoppen, Entscheidungen ohne Grübeln treffen, Selbstwert und Grenzen stärken. Einzelcoaching, Mentoring und Workshops für Unternehmen. DVNLP-zertifiziert.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [...KEYWORDS_NLP],
  alternates: {
    canonical: '/nlp',
  },
  openGraph: {
    title,
    description,
    url: '/nlp',
    type: 'website',
    locale: 'de_DE',
    siteName: 'NLP Coaching',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function NlpLayout({ children }: { children: React.ReactNode }) {
  return <NlpLayoutClient>{children}</NlpLayoutClient>;
}
