import { ImageResponse } from 'next/og';

import { OgPhotoCard, ogPhoto, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Glaubenssätze erkennen – Selbsttest mit 50 Sätzen';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgPhotoCard
        eyebrow='Glaubenssätze erkennen'
        title={'Welche Sätze\nhalten dich klein?'}
        subtitle='50 Sätze zum Antippen, Auswertung sofort – und ihr Gegenteil.'
        footer='Potsdam · Berlin · Online'
        photo={await ogPhoto('glaubenssaetze')}
      />
    ),
    size,
  );
}
