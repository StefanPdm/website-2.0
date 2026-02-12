'use client';

import Link from 'next/link';

export default function NlpFooter() {
  return (
    <footer className='border-t border-white/10 bg-black/20 py-8 text-white/60'>
      <div className='container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-sm font-semibold text-white'>SNAC Coaching</p>
          <p className='mt-1 text-xs text-white/60'>NLP für klare Entscheidungen</p>
        </div>
        <div className='flex flex-wrap items-center gap-6 text-xs'>
          <Link
            href='#'
            className='transition hover:text-white'>
            Datenschutz
          </Link>
          <Link
            href='#'
            className='transition hover:text-white'>
            AGB
          </Link>
          <Link
            href='#'
            className='transition hover:text-white'>
            Impressum
          </Link>
        </div>
        <div className='flex items-center gap-3'>
          {[
            { label: 'Instagram', icon: '◎' },
            { label: 'LinkedIn', icon: 'in' },
            { label: 'YouTube', icon: '▶' },
          ].map((item) => (
            <Link
              key={item.label}
              href='#'
              aria-label={item.label}
              className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DE3FF]'>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
      <div className='container mx-auto mt-6 px-4 text-xs text-white/40'>
        © 2026 NLP Coaching. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
