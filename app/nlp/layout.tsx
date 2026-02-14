import type { Metadata } from 'next';
import NlpLayoutClient from '@/app/nlp/NlpLayoutClient';

export const metadata: Metadata = {
  title: 'NLP Coaching – Klarheit, Fokus & Veränderung',
  description:
    'NLP Coaching für klare Entscheidungen: Kopf, Körper, Fokus. Programme für Transformation, neue Perspektiven und konkrete Umsetzung – persönlich und strukturiert.',
  alternates: {
    canonical: '/nlp',
  },
  openGraph: {
    title: 'NLP Coaching – Klarheit, Fokus & Veränderung',
    description:
      'NLP Coaching für klare Entscheidungen: Kopf, Körper, Fokus. Programme für Transformation, neue Perspektiven und konkrete Umsetzung – persönlich und strukturiert.',
    url: '/nlp',
    type: 'website',
    images: [
      {
        url: '/Global-Logo-SH-1.webp',
        width: 1200,
        height: 630,
        alt: 'NLP Coaching von Stefan Heinemann',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NLP Coaching – Klarheit, Fokus & Veränderung',
    description:
      'NLP Coaching für klare Entscheidungen: Kopf, Körper, Fokus. Programme für Transformation, neue Perspektiven und konkrete Umsetzung – persönlich und strukturiert.',
    images: ['/Global-Logo-SH-1.webp'],
  },
};

export default function NlpLayout({ children }: { children: React.ReactNode }) {
  return <NlpLayoutClient>{children}</NlpLayoutClient>;
}
