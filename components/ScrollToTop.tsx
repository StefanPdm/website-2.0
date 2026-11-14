'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Schwebender Button „Nach oben“ unten rechts – in beiden Welten über das
 * jeweilige Layout eingebunden (seit 2026-11-14 auch Welt A).
 *
 * Die Logik ist geteilt, das Aussehen nicht (§1): `variant` wählt die Farben
 * der Welt. Welt A nutzt nur Tokens (--surface-strong, --border, --accent),
 * Welt B die Glasfläche aus §3.3.
 */
const variants = {
  web: 'border-white/20 bg-[#0B1B2B]/80 text-white shadow-[0_10px_30px_rgba(45,212,191,0.22)] hover:border-white/40 focus-visible:ring-accent-web',
  coaching:
    'border-border bg-surface-strong text-accent shadow-[0_10px_30px_var(--glow)] hover:border-border-strong focus-visible:ring-accent',
} as const;

export default function ScrollToTop({ variant = 'web' }: { variant?: keyof typeof variants }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      type='button'
      onClick={scrollTop}
      aria-label='Nach oben scrollen'
      title='Nach oben'
      className={`fixed bottom-4 right-4 z-50 grid h-12 w-12 cursor-pointer place-items-center rounded-full border backdrop-blur-xl transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 sm:bottom-6 sm:right-6 ${variants[variant]} ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
      }`}>
      <ArrowUp
        aria-hidden='true'
        className='h-5 w-5'
      />
    </button>
  );
}
