'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { useModal } from '@/components/useModal';
import { dailyPosts, postSrc } from '@/app/coaching/daily-posts';
import PostActions from '@/app/coaching/components/PostActions';
import { jpegOf } from '@/app/coaching/components/post-files';

/**
 * Horizontale Galerie der WhatsApp-Impulse.
 *
 * - Bühne: horizontaler Scroller mit Snap. Die Karten drehen sich per CSS
 *   (scroll-getriebene Animation `view(inline)`, `.dp-card` in globals.css)
 *   wie ein Coverflow zur Mitte und treten an den Rändern zurück. Ohne
 *   Unterstützung bzw. bei reduzierter Bewegung: ruhige, flache Reihe.
 * - Steuerung: Wischen, Mausrad mit Shift, Ziehen mit der Maus, Pfeiltasten,
 *   Vor/Zurück-Knöpfe, Fortschrittsleiste (scroll-timeline).
 * - Klick öffnet die große Ansicht (useModal: Fokus-Falle, Escape) mit
 *   Blättern, Teilen und Speichern.
 */
/** Karte, die beim Laden in der Mitte steht. */
const START_INDEX = 3;

export default function DailyPostsGallery() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const [current, setCurrent] = useState(START_INDEX);
  const [open, setOpen] = useState<number | null>(null);
  const total = dailyPosts.length;

  // Index der Karte in der Mitte – für Zähler und Knöpfe
  const onScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    const cards = Array.from(scroller.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, index) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    setCurrent(best);
  }, []);

  const scrollToIndex = (index: number, smooth = true) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - scroller.clientWidth / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  // Start beim vierten Post: Die Bühne ist dann links und rechts gefüllt.
  // Der Scroll-Event setzt den Zähler – kein setState im Effekt nötig.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[START_INDEX] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollLeft = card.offsetLeft + card.offsetWidth / 2 - scroller.clientWidth / 2;
  }, []);

  // Ziehen mit der Maus (Touch scrollt nativ)
  const onPointerDown = (event: PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== 'mouse' || !scrollerRef.current) return;
    drag.current = {
      active: true,
      moved: false,
      x: event.clientX,
      left: scrollerRef.current.scrollLeft,
    };
  };
  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    const state = drag.current;
    const scroller = scrollerRef.current;
    if (!state.active || !scroller) return;
    const delta = event.clientX - state.x;
    if (Math.abs(delta) > 4 && !state.moved) {
      state.moved = true;
      scroller.dataset.dragging = 'true';
      scroller.setPointerCapture(event.pointerId);
    }
    if (state.moved) scroller.scrollLeft = state.left - delta;
  };
  const endDrag = (event: PointerEvent<HTMLUListElement>) => {
    const scroller = scrollerRef.current;
    if (!drag.current.active || !scroller) return;
    drag.current.active = false;
    if (scroller.hasPointerCapture(event.pointerId))
      scroller.releasePointerCapture(event.pointerId);
    delete scroller.dataset.dragging;
    if (drag.current.moved) scrollToIndex(current);
  };

  const openPost = (index: number) => {
    // Nach dem Ziehen kein Klick
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setOpen(index);
  };

  const closePost = () => {
    if (open !== null) scrollToIndex(open, false);
    setOpen(null);
  };

  return (
    <div className='dp-gallery relative'>
      <ul
        ref={scrollerRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        tabIndex={0}
        aria-label={`Galerie: ${total} NLP-Impulse, mit den Pfeiltasten blättern`}
        className='dp-scroller focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
        {dailyPosts.map((post, index) => (
          <li
            key={post.slug}
            className='dp-card'>
            <button
              type='button'
              onClick={() => openPost(index)}
              aria-label={`Impuls ${index + 1} groß ansehen: ${post.alt}`}
              className='dp-card__button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
              <Image
                src={postSrc(post.slug)}
                alt={post.alt}
                fill
                sizes='(min-width: 1024px) 300px, 64vw'
                draggable={false}
                className='object-cover'
              />
              <span
                aria-hidden='true'
                className='dp-card__sheen'
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Steuerung */}
      <div className='container mx-auto mt-8 flex items-center justify-center gap-5 px-4'>
        <button
          type='button'
          onClick={() => scrollToIndex(Math.max(0, current - 1))}
          disabled={current === 0}
          aria-label='Vorheriger Impuls'
          className='dp-nav'>
          <ChevronLeft className='h-5 w-5' />
        </button>
        <div className='flex w-full max-w-xs flex-col items-center gap-2'>
          <span
            aria-hidden='true'
            className='dp-progress'>
            <span className='dp-progress__bar' />
          </span>
          <p
            className='text-xs tabular-nums tracking-[0.2em] text-(--subtle)'
            aria-live='polite'>
            {String(current + 1).padStart(2, '0')} / {total}
          </p>
        </div>
        <button
          type='button'
          onClick={() => scrollToIndex(Math.min(total - 1, current + 1))}
          disabled={current === total - 1}
          aria-label='Nächster Impuls'
          className='dp-nav'>
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>

      {/* Teilen · Kopieren · Speichern für den Post in der Mitte */}
      <div className='container mx-auto mt-6 px-4'>
        <PostActions post={dailyPosts[current]} />
      </div>

      {open !== null &&
        createPortal(
          <Lightbox
            index={open}
            onIndex={setOpen}
            onClose={closePost}
          />,
          document.body,
        )}
    </div>
  );
}

function Lightbox({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useModal<HTMLDivElement>(true, onClose);
  const total = dailyPosts.length;
  const post = dailyPosts[index];
  const prev = () => onIndex((index - 1 + total) % total);
  const next = () => onIndex((index + 1) % total);

  // Nachbarbilder vorladen, damit das Blättern sofort sitzt
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const neighbour = dailyPosts[(i + total) % total];
      const img = new window.Image();
      img.src = postSrc(neighbour.slug);
    });
  }, [index, total]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') prev();
    if (event.key === 'ArrowRight') next();
  };

  // JPG für Teilen/Speichern schon vorbereiten
  useEffect(() => {
    void jpegOf(post.slug).catch(() => undefined);
  }, [post.slug]);

  return (
    // Portal liegt außerhalb von NlpLayoutClient – Tokens hier neu aufspannen
    <div className='theme-coaching'>
      <div
        ref={dialogRef}
        tabIndex={-1}
        role='dialog'
        aria-modal='true'
        aria-label={`Impuls ${index + 1} von ${total}`}
        onKeyDown={onKeyDown}
        className='tone-dark dp-lightbox fixed inset-0 z-100 flex items-center justify-center focus:outline-none'>
        <button
          type='button'
          aria-label='Schließen'
          onClick={onClose}
          className='absolute inset-0 cursor-zoom-out bg-[rgba(10,6,3,0.95)] backdrop-blur-lg'
        />

        <figure
          key={post.slug}
          className='dp-lightbox__figure relative flex max-h-full flex-col items-center px-4'>
          <div
            className='relative overflow-hidden rounded-[22px] shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_80px_var(--glow)] ring-1 ring-border'
            style={
              {
                height: 'min(68dvh, calc((100vw - 2rem) * 16 / 9))',
                aspectRatio: '9 / 16',
              } as CSSProperties
            }>
            <Image
              src={postSrc(post.slug)}
              alt={post.alt}
              fill
              sizes='(min-width: 768px) 46vh, 92vw'
              className='object-cover'
              priority
            />
          </div>
          <figcaption className='sr-only'>{post.alt}</figcaption>
          <div className='relative mt-5'>
            <PostActions
              post={post}
              compact
            />
          </div>
        </figure>

        {/* Leiste oben */}
        <div className='absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4'>
          <p className='rounded-full bg-surface px-3 py-1.5 text-xs tabular-nums tracking-[0.2em] text-(--muted) ring-1 ring-border'>
            {String(index + 1).padStart(2, '0')} / {total}
          </p>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={onClose}
              aria-label='Schließen'
              className='dp-tool dp-tool--round'>
              <X className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Blättern */}
        <button
          type='button'
          onClick={prev}
          aria-label='Vorheriger Impuls'
          className='dp-nav dp-nav--float left-3 sm:left-8'>
          <ChevronLeft className='h-5 w-5' />
        </button>
        <button
          type='button'
          onClick={next}
          aria-label='Nächster Impuls'
          className='dp-nav dp-nav--float right-3 sm:right-8'>
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
