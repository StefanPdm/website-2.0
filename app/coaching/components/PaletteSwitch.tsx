'use client';

import { useSyncExternalStore } from 'react';

import { palettes, STORAGE_KEY, type PaletteId } from '@/app/coaching/palette';

/** PROTOTYP-Umschalter der Farbwelt – Hintergrund in app/coaching/palette.ts. */
function container() {
  return document.querySelector<HTMLElement>('.theme-coaching');
}

function subscribe(onChange: () => void) {
  const el = container();
  if (!el) return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(el, { attributes: true, attributeFilter: ['data-palette'] });
  return () => observer.disconnect();
}

function getSnapshot(): PaletteId {
  return (container()?.dataset.palette as PaletteId | undefined) ?? 'bisher';
}

function choose(id: PaletteId) {
  const el = container();
  if (!el) return;
  if (id === 'bisher') delete el.dataset.palette;
  else el.dataset.palette = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* privater Modus – dann eben nur für diesen Seitenaufruf */
  }
  const url = new URL(window.location.href);
  url.searchParams.set('farbe', id);
  window.history.replaceState(window.history.state, '', url);
}

export default function PaletteSwitch() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => 'bisher' as PaletteId);

  return (
    <div
      role='group'
      aria-label='Farbwelt wählen (Prototyp)'
      className='fixed bottom-4 left-4 z-70 flex items-center gap-1 rounded-full border border-border-strong bg-(--bg)/90 p-1 shadow-[0_10px_40px_var(--glow)] backdrop-blur-xl'>
      <span className='hidden pl-3 pr-1 text-xs uppercase tracking-[0.2em] text-(--muted) sm:inline'>
        Farbwelt
      </span>
      {palettes.map((p) => {
        const active = current === p.id;
        return (
          <button
            key={p.id}
            type='button'
            aria-pressed={active}
            title={p.label}
            onClick={() => choose(p.id)}
            className={`h-11 min-w-11 cursor-pointer rounded-full px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              active
                ? 'bg-linear-to-r from-(--accent) to-(--accent-2) text-(--button-text)'
                : 'text-(--text) hover:bg-surface-strong'
            }`}>
            <span className='lg:hidden'>
              <span aria-hidden='true'>{p.short}</span>
              <span className='sr-only'>{p.label}</span>
            </span>
            <span className='hidden lg:inline'>
              {p.short === '0' ? p.label : `${p.short} · ${p.label}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
