import { ImageResponse } from 'next/og';

import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';
import {
  dimensionFromSlug,
  dimensionOrder,
  dimensions,
  questions,
  typeSlugs,
} from '@/app/nlp/persoenlichkeitstest/data';

/**
 * Vorschaubild je Typ – das Bild, das beim Teilen des Ergebnisses in
 * WhatsApp, LinkedIn & Co. erscheint. Farben wie das OG-Bild von /nlp.
 */

export const alt = 'Persönlichkeitstest nach Dietmar Friedmann – NLP Coaching Stefan Heinemann';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return dimensionOrder.map((dimension) => ({ typ: typeSlugs[dimension] }));
}

export default async function Image({ params }: { params: Promise<{ typ: string }> }) {
  const { typ } = await params;
  const dimension = dimensionFromSlug(typ) ?? 'beziehung';
  const { type, short } = dimensions[dimension];

  return new ImageResponse(
    (
      <OgCard
        eyebrow='Persönlichkeitstest · Psychografie'
        title={`Der ${type}`}
        subtitle={`${short}. Welcher Typ bist du? ${questions.length} Fragen, kostenlos.`}
        footer='NLP Coaching · Potsdam · Berlin · Online'
        background='linear-gradient(135deg, #050b12 0%, #062430 55%, #041a16 100%)'
        accent='#7de3ff'
        textColor='#e6f7ff'
        mutedColor='rgba(230,247,255,0.72)'
      />
    ),
    size,
  );
}
