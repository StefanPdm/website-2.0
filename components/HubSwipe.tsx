'use client';

import { useEffect, useRef } from 'react';

/**
 * Mobil die Naht mit dem Finger ziehen (Griff auf der Kreuzung der Nähte). Wischen nach rechts zieht
 * die Web-Welt herüber, nach links die Coaching-Welt – der Inhalt folgt dem
 * Finger wie in jedem Karussell. Ab einem Viertel der Breite gilt die Wahl,
 * dann übernimmt HubLink (Kreis wächst, Navigation).
 */

const MOBILE_LAYOUT = '(max-width: 1023.98px) and (orientation: portrait)';
/** Ab dieser Strecke (Anteil der Breite) gilt das Wischen als Wahl. */
const SCHWELLE = 0.22;
/** Ab dieser Bewegung (px) steht die Richtung fest. */
const TOTZONE = 12;

export default function HubSwipe() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hub = ref.current?.closest<HTMLElement>('.hub');
    if (!hub) return;
    const layout = window.matchMedia(MOBILE_LAYOUT);

    let x0 = 0;
    let y0 = 0;
    let dx = 0;
    let breite = 1;
    let modus: 'offen' | 'quer' | 'hoch' | null = null;

    const aktiv = () => layout.matches && !hub.dataset.chosen;

    const zuruck = () => {
      delete hub.dataset.wischen;
      delete hub.dataset.tilting;
      delete hub.dataset.tilt;
      hub.style.removeProperty('--split');
    };

    const onStart = (event: TouchEvent) => {
      if (!aktiv() || event.touches.length !== 1) {
        modus = null;
        return;
      }
      x0 = event.touches[0].clientX;
      y0 = event.touches[0].clientY;
      dx = 0;
      breite = hub.clientWidth || 1;
      modus = 'offen';
    };

    const onMove = (event: TouchEvent) => {
      if (!modus || modus === 'hoch') return;
      dx = event.touches[0].clientX - x0;
      const dy = event.touches[0].clientY - y0;
      if (modus === 'offen') {
        if (Math.abs(dx) > TOTZONE && Math.abs(dx) > Math.abs(dy)) modus = 'quer';
        else if (Math.abs(dy) > TOTZONE) modus = 'hoch';
        else return;
      }
      if (modus !== 'quer') return;
      const seite = dx > 0 ? 'web' : 'coach';
      hub.dataset.wischen = seite;
      hub.dataset.tilt = seite;
      hub.dataset.tilting = 'true';
      const split = Math.max(10, Math.min(90, 50 + (dx / breite) * 100));
      hub.style.setProperty('--split', `${split.toFixed(2)}%`);
    };

    const onEnd = () => {
      if (modus !== 'quer') {
        modus = null;
        return;
      }
      modus = null;
      const gewaehlt = Math.abs(dx) > breite * SCHWELLE;
      const ziel = dx > 0 ? '.hub-half--web' : '.hub-half--coach';
      zuruck();
      if (gewaehlt) hub.querySelector<HTMLAnchorElement>(ziel)?.click();
    };

    hub.addEventListener('touchstart', onStart, { passive: true });
    hub.addEventListener('touchmove', onMove, { passive: true });
    hub.addEventListener('touchend', onEnd);
    hub.addEventListener('touchcancel', onEnd);
    return () => {
      hub.removeEventListener('touchstart', onStart);
      hub.removeEventListener('touchmove', onMove);
      hub.removeEventListener('touchend', onEnd);
      hub.removeEventListener('touchcancel', onEnd);
      zuruck();
    };
  }, []);

  return (
    <span
      ref={ref}
      hidden
    />
  );
}
