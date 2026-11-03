'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ScanEye, X } from 'lucide-react';

import KiCheckClient from '@/app/webdevelopment/ki-check/KiCheckClient';

/**
 * Röntgenblick: zeigt live, was Suchmaschinen und Sprachmodelle auf dieser
 * Seite lesen. Ein Schalter markiert die Überschriften-Hierarchie und Bilder
 * direkt auf der Seite (CSS `html[data-xray]` in globals.css) und öffnet ein
 * Panel mit den Befunden.
 *
 * Alles wird beim Einschalten im Browser ausgelesen – aus dem DOM, aus
 * /robots.txt, /llms.txt und den Antwort-Headern dieser Seite. Nichts ist
 * hart eingetragen, deshalb kann es nicht veralten.
 */

type Finding = { ok: boolean; label: string; detail?: string };

type Report = {
  headings: { level: number; text: string }[];
  images: { total: number; described: number; decorative: number };
  schemaTypes: string[];
  llms: string[];
  aiCrawlers: Finding[];
  security: Finding[];
};

const AI_BOTS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];
const SECURITY_HEADERS: [string, string][] = [
  ['strict-transport-security', 'HTTPS erzwungen (HSTS)'],
  ['content-security-policy', 'Content-Security-Policy'],
  ['x-content-type-options', 'Kein MIME-Sniffing'],
  ['referrer-policy', 'Referrer-Policy'],
  ['x-frame-options', 'Schutz vor Clickjacking'],
];

function collectSchemaTypes() {
  const types = new Set<string>();
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (node && typeof node === 'object') {
      const record = node as Record<string, unknown>;
      const t = record['@type'];
      if (typeof t === 'string') types.add(t);
      if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.add(x));
      Object.values(record).forEach(walk);
    }
  };
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
    try {
      walk(JSON.parse(el.textContent ?? ''));
    } catch {
      /* ungültiges JSON-LD ignorieren */
    }
  });
  return [...types].sort();
}

async function buildReport(): Promise<Report> {
  const main = document.querySelector('main') ?? document.body;
  const headings = [...main.querySelectorAll('h1, h2, h3')]
    .filter((el) => !el.closest('[data-xray-panel]'))
    .map((el) => ({ level: Number(el.tagName[1]), text: (el.textContent ?? '').trim().replace(/\s+/g, ' ') }));

  const imgs = [...main.querySelectorAll('img')];
  const images = {
    total: imgs.length,
    described: imgs.filter((img) => (img.getAttribute('alt') ?? '').trim().length > 0).length,
    decorative: imgs.filter((img) => img.getAttribute('alt') === '').length,
  };

  const [robots, llms, head] = await Promise.all([
    fetch('/robots.txt').then((r) => (r.ok ? r.text() : '')).catch(() => ''),
    fetch('/llms.txt').then((r) => (r.ok ? r.text() : '')).catch(() => ''),
    fetch(window.location.pathname, { method: 'HEAD', cache: 'no-store' }).catch(() => null),
  ]);

  const aiCrawlers = AI_BOTS.map((bot) => {
    const block = robots.split(/\n\s*\n/).find((b) => new RegExp(`user-agent:\\s*${bot}\\b`, 'i').test(b));
    const allowed = Boolean(block && /allow:\s*\/\s*$/im.test(block) && !/disallow:\s*\/\s*$/im.test(block));
    return { ok: allowed, label: bot, detail: allowed ? 'darf lesen' : 'nicht ausdrücklich erlaubt' };
  });

  const security = SECURITY_HEADERS.map(([key, label]) => ({
    ok: Boolean(head?.headers.get(key)),
    label,
  }));

  return {
    headings,
    images,
    schemaTypes: collectSchemaTypes(),
    llms: llms.split('\n').filter((line) => line.trim()).slice(0, 6),
    aiCrawlers,
    security,
  };
}

function Row({ ok, label, detail }: Finding) {
  return (
    <li className='flex items-start gap-2'>
      {ok ? (
        <Check
          aria-hidden='true'
          className='mt-0.5 h-4 w-4 shrink-0 text-[#86C243]'
        />
      ) : (
        <X
          aria-hidden='true'
          className='mt-0.5 h-4 w-4 shrink-0 text-slate-500'
        />
      )}
      <span>
        {label}
        {detail && <span className='text-slate-400'> – {detail}</span>}
      </span>
    </li>
  );
}

export default function XRaySection() {
  const [on, setOn] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!on) {
      delete root.dataset.xray;
      return;
    }
    root.dataset.xray = 'on';
    let cancelled = false;
    buildReport().then((result) => {
      if (!cancelled) setReport(result);
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOn(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelled = true;
      window.removeEventListener('keydown', onKey);
      delete root.dataset.xray;
    };
  }, [on]);

  const h1Count = report?.headings.filter((h) => h.level === 1).length ?? 0;

  return (
    <section
      id='unter-der-haube'
      className='mx-auto max-w-6xl scroll-mt-24 px-4 pt-28 pb-20 md:pt-36'>
      <div className='grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-white'>
            Unter die Haube schauen.
          </h2>
          <p className='mt-3 text-slate-300'>
            SEO und KI-Suchoptimierung passieren im Unsichtbaren: saubere Überschriften,
            beschreibende Alt-Texte, strukturierte Daten, eine llms.txt für Sprachmodelle und
            Sicherheits-Header. Schalte den Röntgenblick ein – dann siehst du live, was Google,
            ChatGPT &amp; Co. auf genau dieser Seite lesen.
          </p>
        </div>
        <div className='md:justify-self-end'>
          <button
            ref={buttonRef}
            type='button'
            aria-pressed={on}
            aria-controls='xray-panel'
            onClick={() => setOn((value) => !value)}
            className='web-cta w-full gap-2 px-6 py-3 text-sm font-semibold sm:w-auto'>
            <ScanEye
              aria-hidden='true'
              className='h-5 w-5'
            />
            {on ? 'Röntgenblick ausschalten' : 'Röntgenblick einschalten'}
          </button>
        </div>
      </div>

      {/* A: Der Check direkt hier – genau dort, wo sich die Frage „Und bei mir?“ stellt */}
      <div className='mt-10 rounded-2xl border border-accent-web/30 bg-[#030a13]/70 p-6 md:p-8'>
        <h3 className='text-xl font-semibold text-white'>Und deine Website?</h3>
        <p className='mt-2 mb-5 text-sm text-slate-300'>
          Kostenloser KI-Sichtbarkeits-Check: Adresse eingeben, in rund zehn Sekunden siehst du
          Punktzahl und die drei größten Hebel.{' '}
          <a
            href='/webdevelopment/ki-check'
            className='rounded text-accent-web underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
            Mehr zum Check
          </a>
        </p>
        <KiCheckClient
          idPrefix='web-xray-check'
          headingLevel='h3'
          listenHero
        />
      </div>

      {on && (
        <div
          id='xray-panel'
          data-xray-panel
          role='region'
          aria-label='Röntgenblick: Befunde dieser Seite'
          className='fixed inset-x-3 bottom-20 z-[70] max-h-[60dvh] overflow-y-auto overscroll-contain rounded-2xl border border-accent-web/40 bg-[#030a13]/95 p-5 text-sm text-slate-200 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[26rem]'>
          <div className='flex items-start justify-between gap-4'>
            <p className='flex items-center gap-2 font-semibold text-white'>
              <ScanEye
                aria-hidden='true'
                className='h-4 w-4 text-accent-web'
              />
              Was Suchmaschinen und KI hier lesen
            </p>
            <button
              type='button'
              onClick={() => {
                setOn(false);
                buttonRef.current?.focus();
              }}
              aria-label='Röntgenblick schließen'
              className='grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
              <X
                aria-hidden='true'
                className='h-4 w-4'
              />
            </button>
          </div>

          {!report ? (
            <p className='mt-4 text-slate-300'>liest die Seite …</p>
          ) : (
            <div className='mt-4 space-y-5'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                  Überschriften
                </p>
                <ul className='mt-2 space-y-1'>
                  <Row
                    ok={h1Count === 1}
                    label={`${h1Count}× H1`}
                    detail={h1Count === 1 ? 'genau eine, wie es sein soll' : 'sollte genau eine sein'}
                  />
                  <Row
                    ok
                    label={`${report.headings.filter((h) => h.level === 2).length}× H2, ${report.headings.filter((h) => h.level === 3).length}× H3`}
                    detail='auf der Seite gestrichelt markiert'
                  />
                </ul>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>Bilder</p>
                <ul className='mt-2 space-y-1'>
                  <Row
                    ok={report.images.described + report.images.decorative === report.images.total}
                    label={`${report.images.described} von ${report.images.total} mit Alt-Text`}
                    detail={report.images.decorative ? `${report.images.decorative} bewusst dekorativ` : undefined}
                  />
                </ul>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                  Strukturierte Daten (JSON-LD)
                </p>
                <p className='mt-2 flex flex-wrap gap-1.5'>
                  {report.schemaTypes.map((type) => (
                    <span
                      key={type}
                      className='rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs'>
                      {type}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                  KI-Crawler (robots.txt)
                </p>
                <ul className='mt-2 space-y-1'>
                  {report.aiCrawlers.map((finding) => (
                    <Row
                      key={finding.label}
                      {...finding}
                    />
                  ))}
                </ul>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                  llms.txt – Kurzfassung für Sprachmodelle
                </p>
                <pre className='mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs leading-relaxed text-slate-300'>
                  {report.llms.join('\n') || 'nicht gefunden'}
                </pre>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                  Sicherheits-Header
                </p>
                <ul className='mt-2 space-y-1'>
                  {report.security.map((finding) => (
                    <Row
                      key={finding.label}
                      {...finding}
                    />
                  ))}
                </ul>
              </div>
              <p className='text-xs text-slate-400'>
                Live aus dieser Seite gelesen. Escape schließt.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
