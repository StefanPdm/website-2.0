import { ImageResponse } from 'next/og';

import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'NLP Coaching in Potsdam und Berlin – Stefan Heinemann, SNAC Coaching';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow='SNAC Coaching'
        title={'NLP Coaching für\nklare Entscheidungen'}
        subtitle='Kopf. Körper. Fokus. Ohne esoterischen Nebel.'
        footer='Potsdam · Berlin · Online'
        background='linear-gradient(135deg, #050b12 0%, #062430 55%, #041a16 100%)'
        accent='#7de3ff'
        textColor='#e6f7ff'
        mutedColor='rgba(230,247,255,0.72)'
      />
    ),
    size,
  );
}
