'use client';

import type { MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-busy'?: boolean;
  /**
   * Setzt `href` auf eine Datei statt auf eine Route.
   *
   * Rendert dann ein natives `<a download>` statt `next/link`: Der Router
   * würde sonst eine Client-Navigation versuchen, ins Leere prefetchen und
   * erst danach auf einen harten Seitenwechsel zurückfallen.
   */
  download?: boolean;
};

export function PrimaryButton({
  children,
  className,
  href,
  onClick,
  disabled,
  type = 'button',
  'aria-busy': ariaBusy,
  download,
}: ButtonProps) {
  const base =
    'nlp-primary-button inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--button-text)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] shadow-[0_0_30px_var(--glow)] ring-1 ring-[var(--border)] transition duration-200 hover:shadow-[0_0_40px_var(--glow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60';
  if (href && download) {
    return (
      <a
        href={href}
        download
        onClick={onClick}
        className={`${base} ${className ?? ''}`}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${base} ${className ?? ''}`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      aria-busy={ariaBusy}
      className={`${base} ${className ?? ''}`}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  href,
  onClick,
  disabled,
  type = 'button',
  'aria-busy': ariaBusy,
  download,
}: ButtonProps) {
  const base =
    'cursor-pointer inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--text)] bg-[var(--surface)] ring-1 ring-[var(--border)] shadow-[0_0_20px_var(--glow)] transition duration-200 hover:bg-[var(--surface-strong)] hover:ring-[var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] active:translate-y-px';
  if (href && download) {
    return (
      <a
        href={href}
        download
        onClick={onClick}
        className={`${base} ${className ?? ''}`}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${base} ${className ?? ''}`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      aria-busy={ariaBusy}
      className={`${base} ${className ?? ''}`}>
      {children}
    </button>
  );
}
