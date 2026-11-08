import { ImageResponse } from 'next/og';

import { OgPhotoCard, ogPhoto, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Persönlichkeitstest: Beziehungstyp, Sachtyp oder Handlungstyp?';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgPhotoCard
        eyebrow='Persönlichkeitstest'
        title={'Beziehung, Sache\noder Handeln?'}
        subtitle='18 Fragen, etwa fünf Minuten, Ergebnis sofort.'
        footer='Potsdam · Berlin · Online'
        photo={await ogPhoto('persoenlichkeitstest')}
      />
    ),
    size,
  );
}
