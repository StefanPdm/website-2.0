'use client';

import { useEffect, useState } from 'react';
import { Gauge } from 'lucide-react';

/**
 * Live-Messung: zeigt, wie schnell diese Seite beim Besucher geladen hat –
 * gemessen im eigenen Browser über die Performance-API, nicht behauptet.
 *
 * - Sichtbar nach: Largest Contentful Paint (Chrome, Edge, Firefox). Wo es das
 *   nicht gibt (Safari), die Zeit bis „DOM fertig“.
 * - Übertragen: Summe der transferSize aller Ressourcen bis zur Messung.
 * - Layout-Verschiebung: Cumulative Layout Shift bis zur Messung.
 *
 * Nichts davon wird gespeichert oder gesendet (CLAUDE.md §14: keine Cookies).
 */

type Metrics = { visible: number; visibleLabel: string; kb: number; cls: number | null };

const seconds = (ms: number) =>
  `${(ms / 1000).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`;

function supports(type: string) {
  return typeof PerformanceObserver !== 'undefined' && PerformanceObserver.supportedEntryTypes?.includes(type);
}

export default function LiveMetrics({ className = '' }: { className?: string }) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    let lcp = 0;
    let cls = 0;
    const observers: PerformanceObserver[] = [];

    if (supports('largest-contentful-paint')) {
      const o = new PerformanceObserver((list) => {
        const last = list.getEntries().at(-1);
        if (last) lcp = last.startTime;
      });
      o.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(o);
    }
    if (supports('layout-shift')) {
      const o = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      });
      o.observe({ type: 'layout-shift', buffered: true });
      observers.push(o);
    }

    const measure = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const bytes = (nav?.transferSize ?? 0) + resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      const useLcp = lcp > 0;
      setMetrics({
        visible: useLcp ? lcp : (nav?.domContentLoadedEventEnd ?? 0),
        visibleLabel: useLcp ? 'sichtbar nach' : 'bereit nach',
        kb: Math.round(bytes / 1024),
        cls: supports('layout-shift') ? cls : null,
      });
    };

    // Kurz nach dem Laden messen, damit LCP feststeht.
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(measure, 1200);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', schedule);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const tiles = [
    {
      label: metrics?.visibleLabel === 'bereit nach' ? 'bereit nach' : 'sichtbar nach',
      value: metrics ? seconds(metrics.visible) : null,
      accent: true,
    },
    { label: 'übertragen', value: metrics ? `${metrics.kb.toLocaleString('de-DE')} KB` : null },
    {
      label: 'Layout-Verschiebung',
      value: metrics
        ? metrics.cls == null
          ? 'n. v.'
          : metrics.cls.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : null,
    },
  ];

  // Das Layout steht von Anfang an (feste Kacheln, Platzhalter) – sonst würde
  // ausgerechnet die Messung der Layout-Verschiebung selbst einen Sprung erzeugen.
  return (
    <div className={`live-metrics w-full ${className}`}>
      <div className='live-metrics__inner rounded-2xl bg-[#040b15] p-5'>
        <p className='flex items-center gap-2 text-sm font-semibold text-white'>
          <span className='relative flex h-2.5 w-2.5'>
            <span className='live-metrics__pulse absolute inline-flex h-full w-full rounded-full bg-accent-web' />
            <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-web' />
          </span>
          <Gauge
            aria-hidden='true'
            className='h-4 w-4 text-accent-web'
          />
          Live gemessen – diese Seite bei dir
        </p>
        <dl
          aria-live='polite'
          aria-busy={!metrics}
          className='mt-4 grid grid-cols-3 gap-3'>
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className='rounded-xl border border-white/10 bg-white/5 px-3 py-2.5'>
              <dt className='text-[11px] leading-tight text-slate-400'>{tile.label}</dt>
              <dd
                className={`mt-1 text-xl font-bold tabular-nums leading-none ${
                  tile.accent ? 'text-accent-web' : 'text-white'
                } ${tile.value ? '' : 'animate-pulse text-slate-500'}`}>
                {tile.value ?? '–'}
              </dd>
            </div>
          ))}
        </dl>
        <p className='mt-3 text-xs text-slate-400'>Gemessen in deinem Browser, nicht behauptet.</p>
      </div>
    </div>
  );
}
