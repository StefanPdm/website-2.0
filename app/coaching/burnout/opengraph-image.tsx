import { ImageResponse } from 'next/og';

import { OgPhotoCard, ogPhoto, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Coaching nach Burnout in Potsdam – Stefan Heinemann Coaching';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgPhotoCard
        eyebrow='Coaching nach Burnout'
        title={'Nach dem Burnout nicht\neinfach weitermachen.'}
        subtitle='Von einem, der selbst dort war.'
        footer='Potsdam · Berlin · Online'
        photo={await ogPhoto('burnout')}
      />
    ),
    size,
  );
}
