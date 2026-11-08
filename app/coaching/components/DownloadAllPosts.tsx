'use client';

import { useState } from 'react';
import { Check, Images, Loader2 } from 'lucide-react';

import { dailyPosts } from '@/app/coaching/daily-posts';
import {
  canShareFiles,
  prepareAll,
  resultMessage,
  saveZip,
  shareFiles,
} from '@/app/coaching/components/post-files';

/**
 * „Alle Impulse auf einmal“.
 * Computer: ZIP mit allen JPGs. Handy: Teilen-Menü des Systems („Bilder
 * sichern“ / Galerie), in Paketen zu 10 – manche Browser nehmen nicht mehr
 * Dateien auf einmal an, und jedes Paket braucht einen eigenen Tipp.
 */
const BATCH = 10;

type State =
  | { status: 'idle' }
  | { status: 'preparing'; done: number }
  | { status: 'batches'; files: File[]; shared: number[] }
  | { status: 'zipped' }
  | { status: 'error' };

export default function DownloadAllPosts() {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [message, setMessage] = useState('');
  const total = dailyPosts.length;

  const start = async (forceZip = false) => {
    setState({ status: 'preparing', done: 0 });
    try {
      const files = await prepareAll((done) => setState({ status: 'preparing', done }));
      if (!forceZip && canShareFiles()) {
        setState({ status: 'batches', files, shared: [] });
        return;
      }
      await saveZip(files);
      setState({ status: 'zipped' });
    } catch {
      setState({ status: 'error' });
    }
  };

  const shareBatch = async (index: number) => {
    if (state.status !== 'batches') return;
    const result = await shareFiles(state.files.slice(index * BATCH, (index + 1) * BATCH));
    if (result === 'shared') {
      setState({ ...state, shared: [...state.shared, index] });
    } else if (resultMessage[result]) {
      setMessage(resultMessage[result]);
      window.setTimeout(() => setMessage(''), 2400);
    }
  };

  return (
    <div className='mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-5 text-center'>
      <p className='flex items-center gap-2 text-sm font-semibold text-(--text)'>
        <Images
          aria-hidden='true'
          className='h-4 w-4 text-accent'
        />
        Alle {total} Impulse auf einmal
      </p>

      {state.status === 'idle' || state.status === 'error' ? (
        <>
          <p className='text-xs text-(--muted)'>
            Am Handy direkt in deine Fotos, am Computer als ZIP-Datei.
          </p>
          <button
            type='button'
            onClick={() => start()}
            className='dp-tool dp-tool--primary'>
            Alle herunterladen
          </button>
          {state.status === 'error' && (
            <p className='text-xs text-(--muted)'>Hat nicht geklappt – bitte noch einmal.</p>
          )}
        </>
      ) : state.status === 'preparing' ? (
        <div
          className='flex w-full flex-col items-center gap-2'
          aria-live='polite'>
          <p className='flex items-center gap-2 text-xs text-(--muted)'>
            <Loader2
              aria-hidden='true'
              className='h-4 w-4 animate-spin'
            />
            Bilder werden vorbereitet … {state.done} / {total}
          </p>
          <span
            aria-hidden='true'
            className='dp-progress max-w-xs'>
            <span
              className='dp-progress__bar dp-progress__bar--static'
              style={{ transform: `scaleX(${state.done / total})` }}
            />
          </span>
        </div>
      ) : state.status === 'batches' ? (
        <>
          <p className='text-xs text-(--muted)'>
            Tippe nacheinander auf jedes Paket und wähle „Bilder sichern“ bzw. deine Galerie.
          </p>
          <div className='flex flex-wrap justify-center gap-2'>
            {Array.from({ length: Math.ceil(state.files.length / BATCH) }, (_, index) => {
              const from = index * BATCH + 1;
              const to = Math.min((index + 1) * BATCH, state.files.length);
              const done = state.shared.includes(index);
              return (
                <button
                  key={index}
                  type='button'
                  onClick={() => shareBatch(index)}
                  className={`dp-tool dp-tool--compact ${done ? '' : 'dp-tool--primary'}`}>
                  {done && (
                    <Check
                      aria-hidden='true'
                      className='h-4 w-4'
                    />
                  )}
                  Bilder {from}–{to}
                </button>
              );
            })}
          </div>
          <button
            type='button'
            onClick={() => start(true)}
            className='text-xs text-(--muted) underline underline-offset-4 transition hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
            Lieber als ZIP-Datei
          </button>
          <p
            className='min-h-4 text-xs text-(--subtle)'
            aria-live='polite'>
            {message}
          </p>
        </>
      ) : (
        <p
          className='flex items-center gap-2 text-xs text-(--muted)'
          aria-live='polite'>
          <Check
            aria-hidden='true'
            className='h-4 w-4 text-accent'
          />
          ZIP-Datei ist heruntergeladen.
        </p>
      )}
    </div>
  );
}
