import { ImageResponse } from 'next/og';

import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';

export const alt = 'Webentwicklung aus Potsdam für Berlin und Brandenburg – Stefan Heinemann';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow='Webdevelopment'
        title={'Klare Websites.\nSaubere Systeme.'}
        subtitle='Websites, Web Apps und Kundenportale mit Next.js, React und Angular.'
        footer='Potsdam · Berlin · Remote'
        background='linear-gradient(135deg, #0B1B2B 0%, #123a5c 55%, #4a1d5c 100%)'
        accent='#2dd4bf'
        textColor='#ffffff'
        mutedColor='rgba(203,213,225,0.78)'
      />
    ),
    size,
  );
}
