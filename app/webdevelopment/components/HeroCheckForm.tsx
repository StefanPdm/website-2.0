'use client';

import type { FormEvent } from 'react';

/** Event, auf das der eingebettete Check im Röntgenblick-Abschnitt hört. */
export const KI_CHECK_EVENT = 'ki-check:run';

/**
 * Mini-Formular im Hero. Mit JavaScript: scrollt weich zum Abschnitt
 * „Unter die Haube schauen“, trägt die Adresse dort ein und prüft sofort.
 * Ohne JavaScript: normales GET an /webdevelopment/ki-check?url=… (prüft dort).
 */
export default function HeroCheckForm() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const url = String(new FormData(event.currentTarget).get('url') ?? '').trim();
    const target = document.getElementById('unter-der-haube');
    if (!url || !target) return;
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.dispatchEvent(new CustomEvent(KI_CHECK_EVENT, { detail: url }));
  }

  return (
    <form
      action='/webdevelopment/ki-check'
      method='get'
      onSubmit={onSubmit}
      className='mt-10 w-full max-w-130'>
      <label
        htmlFor='web-hero-check-url'
        className='text-sm font-semibold text-white'>
        Findet ChatGPT deine Website?{' '}
        <span className='font-normal text-slate-300'>Kostenlos prüfen:</span>
      </label>
      <div className='mt-2 flex gap-2'>
        <input
          id='web-hero-check-url'
          name='url'
          type='text'
          inputMode='url'
          autoComplete='url'
          required
          placeholder='deine-website.de'
          className='h-11 w-full min-w-0 flex-1 rounded-xl border border-accent-web/40 bg-[#030a13]/80 px-4 text-sm text-white placeholder-slate-400 outline-none transition focus:border-accent-web focus-visible:ring-2 focus-visible:ring-accent-web/40'
        />
        <button
          type='submit'
          className='h-11 shrink-0 cursor-pointer rounded-xl border border-accent-web/50 bg-accent-web/15 px-4 text-sm font-semibold text-white transition hover:bg-accent-web/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
          KI-Check →
        </button>
      </div>
    </form>
  );
}
