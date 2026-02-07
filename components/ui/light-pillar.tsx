import type { CSSProperties } from 'react';

type LightPillarProps = {
  className?: string;
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  pillarRotation?: number;
  mixBlendMode?: CSSProperties['mixBlendMode'];
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function LightPillar({
  className = '',
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1,
  glowAmount = 0.005,
  pillarWidth = 3,
  pillarHeight = 0.4,
  pillarRotation = 0,
  mixBlendMode = 'screen',
}: LightPillarProps) {
  const widthPercent = clamp(pillarWidth * 12, 22, 70);
  const heightPercent = clamp(pillarHeight * 200, 60, 140);
  const opacity = clamp(intensity, 0.25, 1);
  const glow = clamp(glowAmount * 12000, 40, 220);

  return (
    <div
      aria-hidden='true'
      className={`pointer-events-none absolute inset-0 ${className}`.trim()}
      style={{ mixBlendMode }}>
      <div className='absolute inset-0 opacity-70'>
        <div
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[999px]'
          style={{
            width: `${widthPercent}%`,
            height: `${heightPercent}%`,
            background: `radial-gradient(circle at 50% 20%, ${topColor}, ${bottomColor} 60%, rgba(0,0,0,0) 72%)`,
            filter: `blur(${glow}px)`,
            opacity,
            transform: `translate(-50%, -50%) rotate(${pillarRotation}deg)`,
          }}
        />
        <div
          className='absolute inset-0'
          style={{
            background: `radial-gradient(circle at 50% 60%, ${topColor}1A, transparent 60%), radial-gradient(circle at 60% 40%, ${bottomColor}1A, transparent 55%)`,
          }}
        />
      </div>
    </div>
  );
}
