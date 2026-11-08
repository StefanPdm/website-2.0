'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

/**
 * „Test weiterempfehlen“: teilt nur Link und einen Satz – nie die eigenen
 * Antworten. Handy: Teilen-Menü (WhatsApp & Co.), sonst Link kopieren.
 */
export default function ShareTest({ path, text }: { path: string; text: string }) {
  const [message, setMessage] = useState('');

  const share = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setMessage('Link kopiert');
    } catch (error) {
      if ((error as Error)?.name !== 'AbortError') setMessage('Hat nicht geklappt – bitte noch einmal');
    }
    window.setTimeout(() => setMessage(''), 2400);
  };

  return (
    <span className='inline-flex flex-col items-center gap-1'>
      <button
        type='button'
        onClick={share}
        className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-surface px-5 text-sm font-semibold text-(--text) ring-1 ring-border transition duration-200 hover:ring-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
        <Share2
          aria-hidden='true'
          className='h-4 w-4 text-accent'
        />
        Test weiterempfehlen
      </button>
      <span
        className='min-h-4 text-xs text-(--subtle)'
        aria-live='polite'>
        {message}
      </span>
    </span>
  );
}
