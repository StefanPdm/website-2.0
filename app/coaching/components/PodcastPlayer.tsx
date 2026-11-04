'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Loader2, Pause, Play } from 'lucide-react';

type PodcastPlayerProps = {
  src: string;
  type: string;
  title: string;
  /** Bekannte Länge in Sekunden – wird angezeigt, bevor die Datei geladen ist (preload='none'). */
  duration: number;
};

const BAR_COUNT = 44;
const SPEEDS = [1, 1.25, 1.5, 2, 0.75];
const SKIP_SECONDS = 15;

/**
 * Equalizer-Balken: feste Pseudo-Wellenform (deterministisch, kein Hydration-Mismatch).
 * `h` = Ruhehöhe, `d` = Animationsdauer, `delay` negativ, damit jeder Balken
 * an einer anderen Stelle seiner Schleife steht – pausiert sieht das aus wie eine Wellenform.
 */
const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
  const wave = Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.37));
  const envelope = Math.sin(((i + 0.5) / BAR_COUNT) * Math.PI);
  return {
    h: (0.18 + 0.82 * wave * (0.45 + 0.55 * envelope)).toFixed(3),
    d: `${(0.7 + ((i * 7) % 9) * 0.09).toFixed(2)}s`,
    delay: `${(-((i * 13) % 17) * 0.07).toFixed(2)}s`,
    /** Anteil --accent im Farbverlauf über die Reihe: links --accent, rechts --accent-2. */
    mix: `${Math.round(100 - (i / (BAR_COUNT - 1)) * 100)}%`,
  };
});

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

function spokenTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)} Minuten ${s % 60} Sekunden`;
}

const roundButton =
  'inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface text-xs font-semibold text-(--text) ring-1 ring-border transition duration-200 hover:bg-surface-strong hover:ring-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

export default function PodcastPlayer({ src, type, title, duration: knownDuration }: PodcastPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(knownDuration);
  const [speedIndex, setSpeedIndex] = useState(0);

  const progress = duration > 0 ? Math.min(current / duration, 1) : 0;
  const playedBars = Math.round(progress * BAR_COUNT);

  // Sperrbildschirm / Bluetooth-Tasten: Titel anzeigen.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: 'Stefan Heinemann Coaching',
      artwork: [{ src: '/logos/logo-zeichen-256.png', sizes: '256x256', type: 'image/png' }],
    });
  }, [title]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      setBuffering(true);
      audio.play().catch(() => setBuffering(false));
    } else {
      audio.pause();
    }
  }

  function skip(delta: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(audio.currentTime + delta, 0), duration);
    audio.currentTime = next;
    setCurrent(next);
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  }

  function cycleSpeed() {
    const next = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  }

  return (
    <div
      className={`rounded-3xl border border-border bg-surface p-5 transition-shadow duration-500 sm:p-7 ${
        playing ? 'shadow-[0_0_60px_var(--glow-strong)]' : 'shadow-[0_0_30px_var(--glow)]'
      }`}>
      <audio
        ref={audioRef}
        preload='none'
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          setBuffering(false);
        }}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d) && d > 0) setDuration(d);
          e.currentTarget.playbackRate = SPEEDS[speedIndex];
        }}>
        <source
          src={src}
          type={type}
        />
      </audio>

      {/* Equalizer = Fortschrittsanzeige. Der Regler darüber ist unsichtbar, aber bedienbar. */}
      <div className='relative rounded-2xl has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-accent'>
        <div
          aria-hidden='true'
          data-playing={playing}
          className='podcast-eq flex h-20 items-center gap-[3px] sm:h-24'>
          {bars.map((bar, i) => (
            <span
              key={i}
              data-played={i < playedBars}
              style={
                {
                  '--h': bar.h,
                  '--d': bar.d,
                  '--delay': bar.delay,
                  '--mix': bar.mix,
                } as CSSProperties
              }
              className='podcast-eq-bar h-full min-w-0.5 flex-1 rounded-full max-sm:even:hidden'
            />
          ))}
        </div>
        <input
          type='range'
          min={0}
          max={duration}
          step={1}
          value={Math.floor(current)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label='Position im Podcast'
          aria-valuetext={`${spokenTime(current)} von ${spokenTime(duration)}`}
          className='absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0'
        />
      </div>

      <div className='mt-3 flex justify-between text-xs tabular-nums text-(--muted)'>
        <span>{formatTime(current)}</span>
        <span>−{formatTime(duration - current)}</span>
      </div>

      <div className='relative mt-5 flex items-center justify-center gap-3 sm:gap-6'>
        <button
          type='button'
          onClick={() => skip(-SKIP_SECONDS)}
          aria-label={`${SKIP_SECONDS} Sekunden zurück`}
          className={roundButton}>
          −{SKIP_SECONDS}
        </button>
        <button
          type='button'
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Abspielen'}
          aria-busy={buffering}
          className='relative inline-flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-2 text-(--button-text) shadow-[0_0_30px_var(--glow)] ring-1 ring-border transition duration-200 hover:scale-105 hover:shadow-[0_0_44px_var(--glow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95'>
          {playing && (
            <span
              aria-hidden='true'
              className='podcast-play-ring pointer-events-none absolute inset-0 rounded-full ring-2 ring-accent'
            />
          )}
          {buffering ? (
            <Loader2
              aria-hidden='true'
              className='h-7 w-7 animate-spin'
            />
          ) : playing ? (
            <Pause
              aria-hidden='true'
              className='h-7 w-7'
              fill='currentColor'
            />
          ) : (
            <Play
              aria-hidden='true'
              className='ml-1 h-7 w-7'
              fill='currentColor'
            />
          )}
        </button>
        <button
          type='button'
          onClick={() => skip(SKIP_SECONDS)}
          aria-label={`${SKIP_SECONDS} Sekunden vor`}
          className={roundButton}>
          +{SKIP_SECONDS}
        </button>
        <button
          type='button'
          onClick={cycleSpeed}
          aria-label={`Wiedergabegeschwindigkeit ${SPEEDS[speedIndex]}-fach, ändern`}
          className={`${roundButton} sm:absolute sm:right-0`}>
          {SPEEDS[speedIndex].toLocaleString('de-DE')}×
        </button>
      </div>
    </div>
  );
}
