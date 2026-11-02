import { ImageResponse } from 'next/og';

import { OgCard, OG_CONTENT_TYPE, OG_SIZE } from '@/components/OgCard';
import { FORMULA_PLAIN, FORMULA_TITLE } from '@/app/coaching/formel-zum-glueck/data';

export const alt = 'Deine Formel zum Glück: S² + L + A + C³ – Stefan Heinemann Coaching';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={FORMULA_TITLE}
        title={FORMULA_PLAIN}
        subtitle='Stop & Smile · Look · Accept · Challenge · Choices · Choose'
        footer='Stefan Heinemann Coaching · Potsdam · Berlin · Online'
        background='linear-gradient(135deg, #050b12 0%, #062430 55%, #041a16 100%)'
        accent='#7de3ff'
        textColor='#e6f7ff'
        mutedColor='rgba(230,247,255,0.72)'
      />
    ),
    size,
  );
}
