'use client';

import Link from 'next/link';

export default function NlpFooter() {
  return (
    <footer className='tone-dark border-t border-border py-8 text-(--subtle)'>
      <div className='container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-sm font-semibold text-(--text)'>Stefan Heinemann Coaching</p>
          <p className='mt-1 text-xs text-(--subtle)'>Wir lieben dein Problem</p>
        </div>
        <div className='flex flex-wrap items-center gap-6 text-xs'>
          {/*
            Textlicher Weg zurück in die andere Welt. Der schwebende Schalter
            oben links ist der auffällige Weg — dieser hier ist der, den
            Suchmaschinen und jemand ohne Maus zuverlässig finden (§10).
          */}
          <Link
            href='/'
            className='transition hover:text-(--text)'>
            Auswahlseite
          </Link>
          <Link
            href='/coaching/datenschutz'
            className='transition hover:text-(--text)'>
            Datenschutz
          </Link>
          <Link
            href='/coaching/cookies'
            className='transition hover:text-(--text)'>
            Cookies
          </Link>
          <Link
            href='/coaching/agb'
            className='transition hover:text-(--text)'>
            AGB
          </Link>
          <Link
            href='/coaching/impressum'
            className='transition hover:text-(--text)'>
            Impressum
          </Link>
        </div>
        <div className='flex items-center gap-3'>
          <Link
            href='https://www.linkedin.com/in/stefan-h-317377267/'
            rel='noopener noreferrer'
            target='_blank'
            aria-label='LinkedIn'
            className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface  text-(--text)/70 transition hover:border-border-strong hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DE3FF]'>
            in
          </Link>
        </div>
      </div>
      <div className='container mx-auto mt-6 px-4 text-xs text-(--subtle)'>
        © {new Date().getFullYear()} Stefan Heinemann Coaching · Life Coaching für Unternehmer in Potsdam & Berlin. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
