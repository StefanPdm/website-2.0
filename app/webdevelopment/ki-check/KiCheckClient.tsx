'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, Loader2, Share2, X } from 'lucide-react';

import { useFormShield } from '@/components/FormShield';
import { KI_CHECK_EVENT } from '@/app/webdevelopment/components/HeroCheckForm';
import type { CheckResult } from '@/lib/ki-check';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; result: CheckResult };

/** Ab hier gibt es ehrlich nichts Nennenswertes mehr zu verbessern. */
const TOP_SCORE = 98;

function verdict(score: number) {
  if (score >= TOP_SCORE) return 'Hervorragend – nichts Wesentliches zu tun';
  if (score >= 85) return 'Sehr gut sichtbar';
  if (score >= 65) return 'Solide – mit Luft nach oben';
  if (score >= 40) return 'Deutliche Lücken';
  return 'Für KI kaum sichtbar';
}

/**
 * Ergebnis teilen: Web Share API, sonst Zwischenablage. Geteilt wird nur die
 * Punktzahl, die Domain und der Link zum Check – das Vorschaubild kommt aus
 * ki-check/opengraph-image.tsx. Jede geteilte Punktzahl lädt zum Nachprüfen ein.
 */
function ShareScore({ score, host }: { score: number; host: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/webdevelopment/ki-check`;
    const text = `${host} hat im KI-Sichtbarkeits-Check ${score} von 100 Punkten. Wie sieht es bei deiner Website aus?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'KI-Sichtbarkeits-Check', text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Teilen abgebrochen */
    }
  }

  return (
    <button
      type='button'
      onClick={share}
      className='mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
      <Share2
        aria-hidden='true'
        className='h-4 w-4 text-accent-web'
      />
      <span aria-live='polite'>{copied ? 'Link kopiert' : 'Ergebnis teilen'}</span>
    </button>
  );
}

type KiCheckClientProps = {
  /** Eindeutiges Präfix für Feld-IDs, wenn der Check mehrfach eingebunden ist. */
  idPrefix?: string;
  /** Überschriften-Ebene der Ergebnis-Abschnitte (h2 auf der eigenen Seite, h3 eingebettet). */
  headingLevel?: 'h2' | 'h3';
  /** Adresse aus ?url= übernehmen und sofort prüfen (Fallback ohne JavaScript). */
  readUrlParam?: boolean;
  /** Auf das Hero-Formular hören (KI_CHECK_EVENT) – eingebettet auf /webdevelopment. */
  listenHero?: boolean;
};

/**
 * Der KI-Check als wiederverwendbarer Baustein: auf /webdevelopment/ki-check
 * und eingebettet im Röntgenblick-Abschnitt von /webdevelopment.
 */
export default function KiCheckClient({
  idPrefix = 'web-ki-check',
  headingLevel = 'h2',
  readUrlParam = false,
  listenHero = false,
}: KiCheckClientProps) {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<State>({ status: 'idle' });
  const shield = useFormShield();
  const loading = state.status === 'loading';
  const Heading = headingLevel;
  const resultRef = useRef<HTMLDivElement>(null);

  async function runCheck(target: string) {
    setState({ status: 'loading' });
    try {
      const response = await fetch('/api/ki-check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: target, ...shield.payload() }),
      });
      const data = await response.json();
      if (!response.ok) setState({ status: 'error', message: data.error ?? 'Die Prüfung ist fehlgeschlagen.' });
      else setState({ status: 'done', result: data as CheckResult });
    } catch {
      setState({ status: 'error', message: 'Keine Verbindung. Bitte versuch es noch einmal.' });
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runCheck(url);
  }

  // Vom Hero-Formular übergebene Adresse: übernehmen und direkt prüfen.
  // Asynchron gestartet, damit kein setState synchron im Effekt läuft.
  useEffect(() => {
    if (!readUrlParam) return;
    const fromQuery = new URLSearchParams(window.location.search).get('url')?.trim();
    if (!fromQuery) return;
    const timer = window.setTimeout(() => {
      setUrl(fromQuery);
      void runCheck(fromQuery).then(() =>
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      );
    }, 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readUrlParam]);

  // Hero-Formular: Adresse übernehmen und prüfen (das Scrollen macht das Formular).
  useEffect(() => {
    if (!listenHero) return;
    const onRun = (event: Event) => {
      const target = String((event as CustomEvent<string>).detail ?? '').trim();
      if (!target) return;
      setUrl(target);
      void runCheck(target);
    };
    window.addEventListener(KI_CHECK_EVENT, onRun);
    return () => window.removeEventListener(KI_CHECK_EVENT, onRun);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenHero]);

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className='relative flex flex-col gap-3 sm:flex-row'>
        {shield.fields}
        <label
          htmlFor={`${idPrefix}-url`}
          className='sr-only'>
          Adresse deiner Website
        </label>
        <input
          id={`${idPrefix}-url`}
          name='url'
          type='text'
          inputMode='url'
          autoComplete='url'
          required
          placeholder='deine-website.de'
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          // flex-1 erst ab sm (Zeile): untereinander würde es die Höhe auf 0-Basis drücken
          className='h-12 min-h-12 w-full min-w-0 rounded-xl border border-white/20 bg-[#030a13]/80 px-4 py-3 text-white sm:flex-1 placeholder-slate-400 outline-none transition focus:border-accent-web/70 focus-visible:ring-2 focus-visible:ring-accent-web/40'
        />
        <button
          type='submit'
          disabled={loading}
          aria-busy={loading}
          className='web-cta h-12 gap-2 px-6 text-sm font-semibold'>
          {loading && (
            <Loader2
              aria-hidden='true'
              className='h-4 w-4 animate-spin'
            />
          )}
          {loading ? 'Wird geprüft …' : 'Jetzt prüfen'}
        </button>
      </form>
      <p className='mt-3 text-xs text-slate-400'>
        Ich rufe nur öffentlich erreichbare Seiten ab und speichere weder die Adresse noch das
        Ergebnis. Details in der Datenschutzerklärung.
      </p>

      <div
        ref={resultRef}
        aria-live='polite'
        className='scroll-mt-28'>
        {state.status === 'error' && (
          <p className='mt-6 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100'>
            {state.message}
          </p>
        )}

        {state.status === 'done' && (
          <div className='mt-10 grid gap-8 lg:grid-cols-[16rem_1fr]'>
            <div className='flex flex-col items-center text-center'>
              <div
                className='grid h-44 w-44 place-items-center rounded-full'
                style={{
                  background: `conic-gradient(#2dd4bf ${state.result.score * 3.6}deg, rgba(255,255,255,0.08) 0)`,
                }}>
                <div className='grid h-36 w-36 place-items-center rounded-full bg-[#06101c]'>
                  <div>
                    <div className='text-5xl font-bold text-white'>{state.result.score}</div>
                    <div className='text-xs text-slate-400'>von 100</div>
                  </div>
                </div>
              </div>
              <p className='mt-4 text-lg font-semibold text-white'>{verdict(state.result.score)}</p>
              <p className='mt-1 break-all text-xs text-slate-400'>{state.result.url}</p>
              <ShareScore
                score={state.result.score}
                host={new URL(state.result.url).hostname.replace(/^www\./, '')}
              />
            </div>

            <div>
              {state.result.weaknesses.length > 0 && (
                <>
                  <Heading className='text-xl font-semibold text-white'>
                    {state.result.score >= TOP_SCORE ? 'Was noch fehlt' : 'Die drei größten Hebel'}
                  </Heading>
                  <ol className='mt-4 grid gap-3'>
                    {state.result.weaknesses.map((item, index) => (
                      <li
                        key={item.id}
                        className='rounded-2xl border border-white/15 bg-[#030a13]/70 p-5'>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-accent-web'>
                          {index + 1} · {item.label}
                        </p>
                        <p className='mt-2 text-sm text-white'>{item.fix}</p>
                        <p className='mt-1 text-xs text-slate-400'>{item.detail}</p>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              <Heading className='mt-8 text-xl font-semibold text-white'>Alle Prüfpunkte</Heading>
              <ul className='mt-4 divide-y divide-white/10 rounded-2xl border border-white/15 bg-[#030a13]/70'>
                {state.result.items.map((item) => (
                  <li
                    key={item.id}
                    className='flex items-start gap-3 px-5 py-3 text-sm'>
                    {item.points === item.max ? (
                      <Check
                        aria-hidden='true'
                        className='mt-0.5 h-4 w-4 shrink-0 text-[#86C243]'
                      />
                    ) : (
                      <X
                        aria-hidden='true'
                        className='mt-0.5 h-4 w-4 shrink-0 text-red-300'
                      />
                    )}
                    <div className='min-w-0 flex-1'>
                      <p className='text-white'>{item.label}</p>
                      <p className='text-xs text-slate-400'>{item.detail}</p>
                    </div>
                    <span className='shrink-0 text-xs tabular-nums text-slate-400'>
                      {item.points}/{item.max}
                    </span>
                  </li>
                ))}
              </ul>

              {state.result.score >= TOP_SCORE ? (
                <div className='mt-8 rounded-2xl border border-[#86C243]/40 bg-[#030a13]/70 p-6'>
                  <p className='text-lg font-semibold text-white'>
                    Glückwunsch – technisch ist hier alles sauber.
                  </p>
                  <p className='mt-2 text-sm text-slate-300'>
                    Für Suchmaschinen und KI gibt es an dieser Seite nichts Nennenswertes mehr zu
                    verbessern. Ob Inhalte, Angebot und Nutzerführung genauso gut funktionieren,
                    prüft dieser Check nicht – wenn du dazu eine ehrliche zweite Meinung willst,
                    schreib mir gern.
                  </p>
                  <a
                    href='/webdevelopment#kontakt'
                    className='mt-4 inline-flex min-h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web'>
                    Zweite Meinung anfragen
                  </a>
                </div>
              ) : (
                <div className='mt-8 rounded-2xl border border-accent-web/30 bg-[#030a13]/70 p-6'>
                  <p className='text-lg font-semibold text-white'>Soll ich das für dich lösen?</p>
                  <p className='mt-2 text-sm text-slate-300'>
                    Schick mir die Adresse – ich sage dir ehrlich, was sich lohnt und was es kostet.
                  </p>
                  <a
                    href='/webdevelopment#kontakt'
                    className='web-cta mt-4 w-full px-5 py-3 text-sm font-semibold sm:w-auto'>
                    Projekt anfragen
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
