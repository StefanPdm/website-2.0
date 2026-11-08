'use client';

import { usePathname } from 'next/navigation';

/** Zeigt auf der 404-Seite die Adresse, die es nicht gibt (gekürzt). */
export default function MissingPath() {
  const path = usePathname() ?? '/';
  const short = path.length > 34 ? `${path.slice(0, 31)}…` : path;
  return <>{short}</>;
}
