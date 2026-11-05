'use client';

import { useEffect, useRef } from 'react';

/**
 * Würfel und Kugel über den Händen wählen ihre Welt: Der Klick geht an den
 * HubLink der Hälfte – mit den Koordinaten des Fingers, damit der Kreis mobil
 * vom Symbol aus wächst. Die Wahl-Animation (Licht gleitet zur Mitte und
 * wächst) hängt an `data-chosen` und läuft damit bei jeder Art der Wahl.
 * Für Tastatur und Screenreader bleiben die Hälften die Links; die Lichter
 * sind nur zusätzliche Zeigeziele (aria-hidden).
 */
export default function HubLichtWahl() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hub = ref.current?.closest<HTMLElement>('.hub');
    if (!hub) return;
    const onClick = (event: MouseEvent) => {
      const licht = (event.target as Element | null)?.closest('.hub-light');
      if (!licht || hub.dataset.chosen) return;
      const seite = licht.classList.contains('hub-light--web') ? 'web' : 'coach';
      const link = hub.querySelector<HTMLAnchorElement>(`.hub-half--${seite}`);
      if (!link) return;
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          detail: 1,
          button: 0,
          clientX: event.clientX,
          clientY: event.clientY,
        }),
      );
    };

    hub.addEventListener('click', onClick);
    return () => {
      hub.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <span
      ref={ref}
      hidden
    />
  );
}
