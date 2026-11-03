'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * Mobil: Seitliches Kippen des Handys verschiebt die Naht der Startseite –
 * wie die Maus am Desktop. Kippen nach links macht die Web-Welt breiter.
 *
 * Gelauscht wird immer sofort. Wo der Browser eine Freigabe verlangt (iOS,
 * DeviceOrientationEvent.requestPermission), kommen erst nach Tippen auf den
 * Chip Werte an. Der Chip verschwindet, sobald der erste echte Wert eintrifft –
 * auch in Browsern, die die Funktion kennen, aber keine Freigabe brauchen.
 * Die Neigung wird nur im Browser verrechnet, nichts wird gespeichert.
 */

/** Nur im mobilen Stapel-Layout (siehe `.hub` in globals.css). */
const MOBILE_LAYOUT = '(max-width: 1023.98px) and (orientation: portrait)';
/** Ab dieser Neigung (Grad) ist die Naht am Anschlag. */
const MAX_TILT = 20;
/** Größte Auslenkung der Naht in Prozentpunkten um die Mitte. */
const MAX_SHIFT = 10;
/** Ab dieser Neigung leuchtet das Logo der Seite, zu der gekippt wird. */
const ACTIVE_TILT = 6;

type OrientationWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

function needsPermission() {
  if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') return false;
  return typeof (DeviceOrientationEvent as OrientationWithPermission).requestPermission === 'function';
}

const noopSubscribe = () => () => {};

export default function HubTilt() {
  const ref = useRef<HTMLButtonElement>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const [granted, setGranted] = useState(false);
  // iOS-Erkennung ohne setState im Effekt; auf dem Server immer „nein“.
  const askFirst = useSyncExternalStore(noopSubscribe, needsPermission, () => false);

  const start = useCallback(() => {
    const hub = ref.current?.closest<HTMLElement>('.hub');
    if (!hub || stopRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layout = window.matchMedia(MOBILE_LAYOUT);
    let target = 50;
    let current = 50;
    let frame = 0;
    let sensorSeen = false;

    const reset = () => {
      hub.style.removeProperty('--split');
      delete hub.dataset.tilt;
      delete hub.dataset.tilting;
    };

    const tick = () => {
      // Weich nachziehen statt jedem Sensorwert hart zu folgen
      current += (target - current) * 0.18;
      hub.style.setProperty('--split', `${current.toFixed(2)}%`);
      frame = Math.abs(target - current) > 0.05 ? requestAnimationFrame(tick) : 0;
    };

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || !layout.matches || hub.dataset.chosen) return;
      if (!sensorSeen) {
        sensorSeen = true;
        setGranted(true);
      }
      const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, event.gamma));
      // Links kippen (gamma negativ) → Naht nach rechts → Web breiter
      target = 50 - (tilt / MAX_TILT) * MAX_SHIFT;
      hub.dataset.tilting = 'true';
      if (tilt <= -ACTIVE_TILT) hub.dataset.tilt = 'web';
      else if (tilt >= ACTIVE_TILT) hub.dataset.tilt = 'coach';
      else delete hub.dataset.tilt;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLayoutChange = () => {
      if (!layout.matches) reset();
    };

    window.addEventListener('deviceorientation', onOrientation);
    layout.addEventListener('change', onLayoutChange);
    stopRef.current = () => {
      window.removeEventListener('deviceorientation', onOrientation);
      layout.removeEventListener('change', onLayoutChange);
      cancelAnimationFrame(frame);
      reset();
    };
  }, []);

  useEffect(() => {
    start();
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, [start]);

  async function handleClick() {
    try {
      // Gelauscht wird schon – nach der Freigabe kommen einfach Werte an.
      await (DeviceOrientationEvent as OrientationWithPermission).requestPermission?.();
      setGranted(true);
    } catch {
      setGranted(true);
    }
  }

  return (
    <button
      ref={ref}
      type='button'
      onClick={handleClick}
      hidden={!askFirst || granted}
      aria-label='Bewegungssensor freigeben: Handy kippen verschiebt die Welten'
      className='hub-tilt'>
      <span aria-hidden='true'>↔</span> Kippen
    </button>
  );
}
