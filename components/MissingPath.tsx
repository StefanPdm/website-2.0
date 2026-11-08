'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/**
 * Zeigt auf der 404-Seite die Adresse, die es nicht gibt (gekürzt).
 * Die Seite wird beim Build vorgerendert und kennt die Adresse dort nicht –
 * der Server liefert deshalb „/…“, der Browser setzt danach die echte ein
 * (useSyncExternalStore: kein Hydration-Fehler).
 */
export default function MissingPath() {
  const path = useSyncExternalStore(
    noop,
    () => window.location.pathname,
    () => null,
  );
  if (!path) return <>/…</>;
  const decoded = (() => {
    try {
      return decodeURIComponent(path);
    } catch {
      return path;
    }
  })();
  return <>{decoded.length > 34 ? `${decoded.slice(0, 31)}…` : decoded}</>;
}
