import { ImageResponse } from 'next/og';

import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'KI-Sichtbarkeits-Check – findet ChatGPT deine Website? Kostenlos prüfen bei Stefan Heinemann';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow='Kostenloser KI-Check'
        title={'Findet ChatGPT\ndeine Website?'}
        subtitle='robots.txt, llms.txt, strukturierte Daten, Sicherheit – Punktzahl in 10 Sekunden.'
        footer='heinemann.berlin/webdevelopment/ki-check'
        background='linear-gradient(135deg, #06101c 0%, #0f3350 55%, #3a1650 100%)'
        accent='#2dd4bf'
        textColor='#ffffff'
        mutedColor='rgba(203,213,225,0.8)'
      />
    ),
    size,
  );
}
