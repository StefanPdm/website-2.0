'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
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
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
      }`}>
      <ArrowUp className='h-5 w-5' />
    </button>
  );
}
