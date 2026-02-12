'use client';

import type { HTMLAttributes, ReactNode } from 'react';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      {...props}
      className={`group rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-strong)] shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_44px_var(--glow)] transition duration-200 hover:-translate-y-1 hover:border-[var(--border)] hover:shadow-[0_20px_60px_var(--glow),0_0_34px_var(--glow-strong)] ${className ?? ''}`}>
      {children}
    </div>
  );
}
