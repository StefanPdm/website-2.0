import type { Metadata } from 'next';
import NlpLayoutClient from '@/app/coaching/NlpLayoutClient';
import { KEYWORDS_NLP, OWNER } from '@/lib/site';

// Stile nur für Welt A (aus globals.css ausgelagert, 2026-11-08)
import './coaching.css';

// Marke „Stefan Heinemann Coaching“, Oberbegriff „Life Coaching“ (seit 2026-11-14;
// davor „Life Coaching für Unternehmer“). Unternehmer sind Herkunft und
// Schwerpunkt (/coaching/unternehmer), nicht Filter. NLP ist eine Methode unter
// mehreren, nicht die Marke: Klienten suchen „Coaching Potsdam“, kaum „NLP“.
const title = 'Life Coaching in Potsdam & Berlin';
const description =
  'Life Coaching in Potsdam, Berlin und online für Menschen, die viel tragen: Gedankenkarussell, Entscheidungen, Selbstwert, Grenzen. Von einem Coach, der 20 Jahre selbst Unternehmer war. Sessions bei mir in Potsdam, bei dir vor Ort oder per Video. Methoden u. a. NLP (DVNLP-zertifiziert).';

export const metadata: Metadata = {
  // Eigenes Template: Ein String-Titel im Layout würde das Template aus dem
  // Root-Layout für alle Unterseiten unterbrechen – sie liefen dann ohne Namen.
  // `default` bleibt ohne Namen: Den hängt dort schon das Root-Template an.
  title: { default: title, template: `%s | ${OWNER.name}` },
  description,
  keywords: [...KEYWORDS_NLP],
  alternates: {
    canonical: '/coaching',
  },
  openGraph: {
    title,
    description,
    url: '/coaching',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Stefan Heinemann Coaching',
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
