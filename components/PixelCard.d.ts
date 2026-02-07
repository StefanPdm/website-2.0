import type { ReactNode } from 'react';

type PixelCardProps = {
  variant?: string;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children?: ReactNode;
};

declare const PixelCard: (props: PixelCardProps) => JSX.Element;

export default PixelCard;
