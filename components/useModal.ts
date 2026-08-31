'use client';

import { useEffect, useRef } from 'react';

/**
 * Vollständiges Verhalten für modale Dialoge.
 *
 * Die vier Modals der Seite (NLP-Grundlagen, Programme, Werdegang, InfoOrb)
 * waren zwar korrekt als `role="dialog"` ausgezeichnet, hielten den Fokus aber
 * nicht fest: Mit Tab landete man hinter dem Overlay in der Seite und fand
 * nicht zurück. Screenreader lasen den Hintergrund mit.
 *
 * Der Hook übernimmt alles, was ein Dialog braucht:
 *   - Fokus beim Öffnen in den Dialog setzen
 *   - Tab und Shift+Tab im Dialog zyklisch halten (Fokus-Falle)
 *   - Fokus beim Schließen an das auslösende Element zurückgeben
 *   - Escape schließt
 *   - Scrollen des Hintergrunds sperren
 *
 * Verwendung:
 *   const dialogRef = useModal(isOpen, () => setOpen(null));
 *   <div ref={dialogRef} role='dialog' aria-modal='true' tabIndex={-1}>…</div>
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useModal<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onClose: () => void,
) {
  const ref = useRef<T>(null);
  // In einer Ref gehalten, damit ein bei jedem Render neu erzeugtes onClose
  // die Fokus-Falle nicht ständig neu aufsetzt. Die Zuweisung gehört in einen
  // Effekt – ein Ref-Schreibzugriff während des Renders ist nicht erlaubt.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        // Ausgeblendete Elemente überspringen – sonst landet der Fokus im Nichts.
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
      );

    // Fokus in den Dialog holen. Fällt auf den Container zurück, wenn es
    // (noch) nichts Fokussierbares gibt – deshalb dort tabIndex={-1} setzen.
    const initial = focusables()[0] ?? container;
    initial.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      // Zurück zum Auslöser – sonst beginnt die Tastaturnavigation wieder oben.
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  return ref;
}
