'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type HubLinkProps = {
  side: 'web' | 'coach';
  href: string;
  className?: string;
  children: ReactNode;
};

/** Dauer, in der die gewählte Welt den Bildschirm füllt (siehe `.hub[data-chosen]` in globals.css). */
const EXPAND_MS = 850;
/** Danach steht die gewählte Welt noch kurz still, bevor die Seite wechselt. */
const HOLD_MS = 500;

/**
 * Eine Hälfte der Startseite. Beim Klick füllt die gewählte Welt zuerst den
 * Bildschirm, dann wird navigiert. Neuer Tab, Tastenkürzel und reduzierte
 * Bewegung laufen ohne Verzögerung als normaler Link.
 */
export default function HubLink({ side, href, className, children }: HubLinkProps) {
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement>(null);

  // Zurück-Navigation: Die Seite darf nicht im aufgezogenen Zustand stehen bleiben.
  useEffect(() => {
    const hub = ref.current?.closest<HTMLElement>('.hub');
    hub?.removeAttribute('data-chosen');
  }, []);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hub = event.currentTarget.closest<HTMLElement>('.hub');
    if (!hub || hub.dataset.chosen) return;

    event.preventDefault();
    // Mobil wächst die Welt als Kreis vom Tippunkt aus. Tastatur (detail 0):
    // Mitte des Links statt der Ecke oben links.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
    const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
    hub.style.setProperty('--tap-x', `${x}px`);
    hub.style.setProperty('--tap-y', `${y}px`);
    hub.dataset.chosen = side;
    window.setTimeout(() => router.push(href), EXPAND_MS + HOLD_MS);
  }

  return (
    <Link
      ref={ref}
      href={href}
      onClick={handleClick}
      className={className}>
      {children}
    </Link>
  );
}
