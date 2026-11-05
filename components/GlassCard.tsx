'use client';

import type { HTMLAttributes, ReactNode } from 'react';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  /** Hervorgehobene Karte (z. B. „Beliebt“, „Bester Preis“) – einzige Ausnahme vom Einheitsrahmen. */
  featured?: boolean;
};

/**
 * Standard-Karte Welt A. Rahmen überall gleich (`--card-border`): auf hellem
 * Grund etwas dunkler, auf dunklen Inseln (.tone-dark) heller.
 */
export default function GlassCard({ children, className, featured, ...props }: GlassCardProps) {
  const frame = featured
    ? 'border-2 border-border-strong ring-1 ring-(--accent)/45 shadow-[0_0_60px_var(--glow-strong)]'
    : 'border border-card-border shadow-[0_10px_40px_var(--card-shade),0_0_44px_var(--glow)]';
  return (
    <div
      {...props}
      className={`group rounded-2xl bg-(--surface-strong) ${frame} transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_var(--glow),0_0_34px_var(--glow-strong)] ${className ?? ''}`}>
      {children}
    </div>
  );
}
