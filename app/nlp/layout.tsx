import type { Metadata } from 'next';
import NlpLayoutClient from '@/app/nlp/NlpLayoutClient';
import { KEYWORDS_NLP, OWNER } from '@/lib/site';

const title = 'NLP Coaching in Potsdam & Berlin – Klarheit, Fokus, Entscheidungen';
const description =
  'NLP Coaching mit Stefan Heinemann in Potsdam, Berlin und online: Gedankenkarussell stoppen, Entscheidungen ohne Grübeln treffen, Selbstwert und Grenzen stärken. Einzelcoaching, Mentoring und Workshops für Unternehmen. DVNLP-zertifiziert.';

export const metadata: Metadata = {
  // Eigenes Template: Ein String-Titel im Layout würde das Template aus dem
  // Root-Layout für alle Unterseiten unterbrechen – sie liefen dann ohne Namen.
  // `default` bleibt ohne Namen: Den hängt dort schon das Root-Template an.
  title: { default: title, template: `%s | ${OWNER.name}` },
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
