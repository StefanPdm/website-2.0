'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { PrimaryButton } from '@/app/nlp/components/Buttons';

type NlpHeaderProps = {
  isWarmTheme: boolean;
  onToggleTheme: () => void;
};

export default function NlpHeader({ isWarmTheme, onToggleTheme }: NlpHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactClick = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <header className='fixed w-full top-0 z-50 border-b border-black/10 bg-white/5 backdrop-blur-xl'>
      <div className='container mx-auto flex items-center justify-between gap-3 px-4 py-3 md:py-4'>
        <Link
          href='/nlp/'
          className='flex items-center gap-3'>
          <div className='relative'>
            <Image
              src='logos/nlp-logo.svg'
              alt='Logo'
              width={56}
              height={56}
              className='h-10 w-10 md:h-12 md:w-12'
            />
          </div>
          <div className='hidden! md:flex flex-col items-start justify-center'>
            <span className='text-base font-extrabold text-left tracking-[0.2em] text-(--accent-soft) uppercase sm:text-lg'>
              SNAC Coaching
            </span>
            <span className='text-left tracking-wider text-xs text-white/70 sm:text-sm'>
              NLP für klare Entscheidungen
            </span>
          </div>
        </Link>
        <nav className='hidden items-center gap-8 text-sm text-white/80 md:flex font-semibold'>
          <Link
            href='/'
            className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
            Hauptseite
          </Link>
          <Link
            href='#ueber'
            className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
            Über mich
          </Link>
          <Link
            href='#programme'
            className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
            Programme
          </Link>
          <Link
            href='#workshops'
            className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
            Preise
          </Link>
          <Link
            href='#kontakt'
            className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
            Kontakt
          </Link>
        </nav>
        <PrimaryButton
          href='#kontakt'
          onClick={handleContactClick}
          className='inline-flex md:hidden! px-4 py-2! text-xs md:px-6 md:py-3 md:text-sm'>
          Gratis Erstgespräch
        </PrimaryButton>
        <div className='flex items-center gap-2 sm:gap-3'>
          <button
            type='button'
            onClick={onToggleTheme}
            className='cursor-pointer hidden items-center gap-2 rounded-full border border-border bg-(--surface) px-4 py-2 text-xs font-semibold text-(--text) transition hover:bg-(--surface-strong) md:inline-flex'
            aria-pressed={isWarmTheme}>
            {isWarmTheme ? 'Cool Mood' : 'Warm Mood'}
          </button>
          <PrimaryButton
            href='#kontakt'
            onClick={handleContactClick}
            className='hidden! md:inline-flex px-4 py-2 text-xs md:px-6 md:py-3 md:text-sm'>
            Gratis Erstgespräch
          </PrimaryButton>
          <button
            type='button'
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DE3FF] md:hidden'
            aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={isMenuOpen}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-in-out ${
          isMenuOpen
            ? 'max-h-105 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}>
        <div
          className={`mx-4 mb-4 mt-2 rounded-2xl border border-border bg-(--surface-strong) p-4 text-sm text-(--text) shadow-[0_20px_60px_var(--glow)] transition-[opacity,transform] duration-500 ease-out delay-100 ${
            isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          }`}>
          <nav className='flex flex-col gap-3 '>
            <Link
              href='/'
              onClick={() => setIsMenuOpen(false)}
              className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
              Hauptseite
            </Link>
            <Link
              href='#ueber'
              onClick={() => setIsMenuOpen(false)}
              className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
              Über mich
            </Link>
            <Link
              href='#programme'
              onClick={() => setIsMenuOpen(false)}
              className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
              Programme
            </Link>
            <Link
              href='#workshops'
              onClick={() => setIsMenuOpen(false)}
              className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
              Preise
            </Link>
            <Link
              href='#kontakt'
              onClick={() => setIsMenuOpen(false)}
              className='rounded-full border border-transparent px-3 py-2 transition hover:border-border hover:bg-(--surface)'>
              Kontakt
            </Link>
            <button
              type='button'
              onClick={() => {
                onToggleTheme();
                setIsMenuOpen(false);
              }}
              className='mt-2 inline-flex items-center justify-between rounded-xl border border-border bg-(--surface) px-4 py-2 text-xs font-semibold text-(--text) transition hover:bg-(--surface-strong)'>
              <span>{isWarmTheme ? 'Kühles Schema' : 'Warmes Schema'}</span>
              <span className='text-accent'>{isWarmTheme ? '❄️' : '🌅'}</span>
            </button>
          </nav>
          <div className='mt-4'>
            <PrimaryButton
              href='#kontakt'
              className='w-full'
              onClick={handleContactClick}>
              Kostenloses Erstgespräch
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}
