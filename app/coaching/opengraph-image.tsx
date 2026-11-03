import { ImageResponse } from 'next/og';

import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Life Coaching für Unternehmer in Potsdam und Berlin – Stefan Heinemann Coaching';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow='Stefan Heinemann Coaching'
        title={'Coaching für\nklare Entscheidungen'}
        subtitle='Kopf. Körper. Fokus. Ohne esoterischen Nebel.'
        footer='Potsdam · Berlin · Online'
        background='linear-gradient(135deg, #140c06 0%, #2e1a0b 55%, #1a0f06 100%)'
        accent='#f6b35a'
        textColor='#e6f7ff'
        mutedColor='rgba(230,247,255,0.72)'
      />
    ),
    size,
  );
}
