import { ImageResponse } from 'next/og';

import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Stefan Heinemann – NLP Coaching und Webentwicklung in Potsdam und Berlin';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow='Stefan Heinemann'
        title={'NLP Coaching &\nWebentwicklung'}
        subtitle='Innere Klarheit und digitale Systeme – von einer Person.'
        footer='Potsdam · Berlin · Brandenburg'
        background='linear-gradient(135deg, #070b12 0%, #0d1a2b 55%, #1a1220 100%)'
        accent='#9bc7ff'
        textColor='#f8fafc'
        mutedColor='rgba(226,232,240,0.72)'
      />
    ),
    size,
  );
}
