import { ImageResponse } from 'next/og';

import { OgPhotoCard, ogPhoto, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Partnerschaftstest: Lebenspartner oder Lebenslektion?';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgPhotoCard
        eyebrow='Partnerschaftstest'
        title={'Lebenspartner –\noder Lebenslektion?'}
        subtitle='Fünf ehrliche Fragen. Die Antwort spürst du selbst.'
        footer='Potsdam · Berlin · Online'
        photo={await ogPhoto('partnerschaftstest')}
      />
    ),
    size,
  );
}
