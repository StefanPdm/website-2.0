import { ImageResponse } from 'next/og';

import { OgPhotoCard, ogPhoto, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Dein Session-Podcast – Coaching, das nachklingt';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgPhotoCard
        eyebrow='Session-Podcast'
        title={'Coaching,\ndas nachklingt'}
        subtitle='Dein persönlicher Podcast nach jeder Session – inklusive.'
        footer='Potsdam · Berlin · Online'
        photo={await ogPhoto('session-podcast')}
      />
    ),
    size,
  );
}
