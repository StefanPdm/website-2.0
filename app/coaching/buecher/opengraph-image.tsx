import { ImageResponse } from 'next/og';

import { OgPhotoCard, ogPhoto, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Buchempfehlungen von Life Coach Stefan Heinemann';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgPhotoCard
        eyebrow='Lesenswert'
        title={'Bücher, die mich\ngeprägt haben'}
        subtitle='24 Empfehlungen zu Haltung, Sinn und Beziehung.'
        footer='Potsdam · Berlin · Online'
        photo={await ogPhoto('buecher')}
      />
    ),
    size,
  );
}
