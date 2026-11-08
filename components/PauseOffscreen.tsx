'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hält CSS-Animationen von Sektionen an, die gerade nicht im Bild sind
 * (`data-offscreen` → `animation-play-state: paused`, Regel in globals.css).
 * Auf /coaching laufen viele Endlosschleifen gleichzeitig (3D-Icons,
 * Lichtfaden, Satz-Reihen, Atem-Ringe) – außerhalb des Bildes kosteten sie
 * nur Akku und Rechenzeit. 200 px Vorlauf, damit beim Hineinscrollen nichts
 * stockt. Rendert nichts.
 */
export default function PauseOffscreen({ selector = 'main section' }: { selector?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) delete (entry.target as HTMLElement).dataset.offscreen;
          else (entry.target as HTMLElement).dataset.offscreen = '';
        }
      },
      { rootMargin: '200px 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      sections.forEach((section) => delete section.dataset.offscreen);
    };
  }, [pathname, selector]);

  return null;
}
