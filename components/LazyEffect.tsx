'use client';

import { Component, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Rendert einen dekorativen Effekt erst, wenn er sich wirklich lohnt.
 *
 * Hintergrund: /webdevelopment hielt zwei WebGL-Kontexte (LightPillar,
 * Hyperspeed) plus neun Canvas-Instanzen dauerhaft am Laufen – auch weit
 * außerhalb des Viewports und auf Mobilgeräten. Ergebnis waren permanente
 * GPU-Last, ruckelndes Scrollen und leere Akkus.
 *
 * Drei Bedingungen müssen erfüllt sein:
 *  1. Der Bereich ist (fast) im Viewport.
 *  2. Das Display ist breit genug – Effekte sind auf Mobil kaum sichtbar,
 *     kosten dort aber am meisten.
 *  3. Der Nutzer hat keine reduzierte Bewegung angefordert.
 *  4. Der Browser kann überhaupt einen WebGL-Kontext erzeugen.
 *
 * Zusätzlich fängt eine Fehlergrenze jeden Absturz des Effekts ab. Vorher
 * warf three.js ohne WebGL (Firmenrechner mit gesperrter GPU, ältere Geräte,
 * manche Datenschutz-Browser) „Error creating WebGL context" – und React
 * hat daraufhin die komplette Seite abgeräumt: weißer Bildschirm statt /nlp.
 *
 * Ist eine Bedingung verletzt, wird `fallback` gerendert (Standard: nichts).
 * Der Effekt selbst kommt als Render-Prop, damit sein Modul erst dann
 * ausgewertet wird, wenn er tatsächlich gebraucht wird.
 */

type LazyEffectProps = {
  children: ReactNode;
  /** Was gezeigt wird, solange (oder falls) der Effekt nicht läuft. */
  fallback?: ReactNode;
  /** Ab welcher Viewport-Breite der Effekt überhaupt sinnvoll ist. */
  minWidth?: number;
  /** Vorlaufstrecke, damit der Effekt beim Hineinscrollen schon steht. */
  rootMargin?: string;
  /** Einmal aktiviert, aktiviert lassen (verhindert Flackern beim Scrollen). */
  once?: boolean;
  className?: string;
  /** Effekt braucht WebGL (Standard). Für reine Canvas-2D-Effekte auf false setzen. */
  requiresWebGL?: boolean;
};

let webglSupport: boolean | undefined;

/** Einmal pro Seitenaufruf prüfen, ob ein WebGL-Kontext erzeugt werden kann. */
function supportsWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement('canvas');
      webglSupport = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

/** Fängt Abstürze des Effekts ab und zeigt stattdessen den Fallback. */
class EffectBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function LazyEffect({
  children,
  fallback = null,
  minWidth = 1024,
  rootMargin = '300px',
  once = true,
  className,
  requiresWebGL = true,
}: LazyEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wideEnough = window.matchMedia(`(min-width: ${minWidth}px)`);

    let observer: IntersectionObserver | null = null;

    const evaluate = () => {
      if (reducedMotion.matches || !wideEnough.matches || (requiresWebGL && !supportsWebGL())) {
        setActive(false);
        observer?.disconnect();
        observer = null;
        return;
      }

      if (observer) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          if (visible) {
            setActive(true);
            if (once) {
              observer?.disconnect();
              observer = null;
            }
          } else if (!once) {
            setActive(false);
          }
        },
        { rootMargin },
      );
      observer.observe(node);
    };

    evaluate();
    reducedMotion.addEventListener('change', evaluate);
    wideEnough.addEventListener('change', evaluate);

    return () => {
      observer?.disconnect();
      reducedMotion.removeEventListener('change', evaluate);
      wideEnough.removeEventListener('change', evaluate);
    };
  }, [minWidth, rootMargin, once, requiresWebGL]);

  return (
    <div
      ref={ref}
      className={className}>
      {active ? <EffectBoundary fallback={fallback}>{children}</EffectBoundary> : fallback}
    </div>
  );
}
