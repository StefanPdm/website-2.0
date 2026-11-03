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

export default function LiveMetrics() {
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

  return (
    <div
      aria-live='polite'
      className='mt-6 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-[#030a13]/70 px-4 py-3 text-sm text-slate-300'>
      <span className='flex items-center gap-2 font-semibold text-white'>
        <Gauge
          aria-hidden='true'
          className='h-4 w-4 text-accent-web'
        />
        Live gemessen
      </span>
      {metrics ? (
        <>
          <span>
            Diese Seite war bei dir {metrics.visibleLabel}{' '}
            <strong className='text-accent-web'>{seconds(metrics.visible)}</strong>
          </span>
          <span>
            übertragen <strong className='text-white'>{metrics.kb.toLocaleString('de-DE')} KB</strong>
          </span>
          {metrics.cls != null && (
            <span>
              Layout-Verschiebung{' '}
              <strong className='text-white'>
                {metrics.cls.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
            </span>
          )}
          <span className='text-xs text-slate-400'>Gemessen in deinem Browser, nicht behauptet.</span>
        </>
      ) : (
        <span>misst …</span>
      )}
    </div>
  );
}
