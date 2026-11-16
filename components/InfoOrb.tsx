'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X } from 'lucide-react';

import { useModal } from '@/components/useModal';

type InfoOrbProps = {
  headline: string;
  text: string;
  buttonClassName?: string;
  /**
   * Gibt es ein `label`, wird statt der Kugel die Glas-Pille gerendert:
   * Frage + zweifarbige Glaskugel (`.info-split*` in globals.css, Startseite).
   */
  label?: string;
};

function renderMarkdownLines(value: string) {
  const lines = value.split('\n');

  return lines.map((line, lineIndex) => {
    if (!line) {
      return (
        <span
          key={`line-${lineIndex}`}
          className='block'>
          &nbsp;
        </span>
      );
    }

    const parts = line.split(/(\*\*[^*]+\*\*)/g);

    return (
      <span
        key={`line-${lineIndex}`}
        className='block'>
        {parts.map((part, partIndex) => {
          const isBold = part.startsWith('**') && part.endsWith('**') && part.length > 4;
          const text = isBold ? part.slice(2, -2) : part;
          return isBold ? (
            <strong
              key={`part-${lineIndex}-${partIndex}`}
              className='font-semibold text-[#e8fbff]'>
              {text}
            </strong>
          ) : (
            <span key={`part-${lineIndex}-${partIndex}`}>{text}</span>
          );
        })}
      </span>
    );
  });
}

export default function InfoOrb({ headline, text, buttonClassName, label }: InfoOrbProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canUseDom = typeof document !== 'undefined';

  // Escape und Scroll-Sperre gab es hier schon einzeln; Fokus-Falle und
  // Fokus-Rückgabe fehlten. useModal deckt jetzt alle vier Aspekte ab –
  // dieselbe Implementierung wie in den drei Modals von Welt A.
  const dialogRef = useModal<HTMLDivElement>(isOpen, () => setIsOpen(false));

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!isOpen) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Hide hint when user scrolls near the bottom (within 50px)
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setShowScrollHint(!isNearBottom);
    };

    if (isOpen) {
      // Initial check for scroll hint visibility - synchronizing with DOM state
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const hasScroll = scrollHeight > clientHeight;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
      if (hasScroll && !isNearBottom && !showScrollHint) {
        setShowScrollHint(true);
      }
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const modal = (
    <div
      className={`fixed inset-0 z-70 flex items-center justify-center bg-[rgba(6,12,18,0.55)] backdrop-blur-[14px] ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}>
      <button
        type='button'
        className='absolute inset-0 cursor-pointer border-0 bg-transparent'
        // Klick daneben schließt. Für Tastatur und Screenreader gibt es das X im Dialog.
        aria-hidden='true'
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
      />
      {/* Schwebendes Foto + Abstand nur bei genug Höhe – im Querformat am Handy
          bliebe sonst kein Platz für den Text */}
      <div className='info-modal-wrap relative w-[min(92vw,1280px)]'>
        <div
          ref={dialogRef}
          tabIndex={-1}
          role='dialog'
          aria-modal='true'
          aria-label={headline}
          className={`info-modal relative flex w-full flex-col rounded-[28px] border border-[rgba(125,227,255,0.35)] bg-[radial-gradient(circle_at_20%_20%,rgba(0,229,255,0.15),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(34,197,94,0.2),transparent_50%),linear-gradient(135deg,rgba(10,20,32,0.92),rgba(7,12,22,0.98))] shadow-[0_30px_80px_rgba(2,10,20,0.6),0_0_60px_rgba(0,229,255,0.16)] transform-gpu antialiased ${
            isOpen ? 'opacity-100 animate-[info-card-in_1000ms_ease-out_forwards]' : 'opacity-0'
          }`}>
          {/* Schließen oben rechts im Container – außerhalb des Scrollbereichs, also
              immer sichtbar. Unten am Textende lag der Knopf am iPhone hinter der
              Browserleiste und war kaum erreichbar (2026-11-16). Erstes fokussierbares
              Element → useModal setzt den Fokus beim Öffnen hierher. */}
          <button
            type='button'
            aria-label='Info schließen'
            onClick={() => setIsOpen(false)}
            className='absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(125,227,255,0.5)] bg-[rgba(10,18,28,0.8)] text-[#e8fbff] backdrop-blur-sm transition duration-200 hover:bg-[rgba(20,36,52,0.9)] hover:shadow-[0_10px_20px_rgba(0,229,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(125,227,255,0.9)] md:right-4 md:top-4'>
            <X
              aria-hidden='true'
              className='h-5 w-5'
            />
          </button>
          <div
            className={`info-modal-photo absolute left-1/2 -top-75.5 z-3 hidden -translate-x-1/2 pointer-events-none opacity-0 ${
              isOpen ? 'animate-[info-badge-in_620ms_cubic-bezier(0.22,0.8,0.2,1)_forwards]' : ''
            }`}
            aria-hidden='true'>
            <span className='absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF]/20 blur-3xl' />
            <Image
              src='/images-startseite/portrait-fireballs.webp'
              alt=''
              width={300}
              height={300}
              className='min-h-75 h-75 w-auto object-contain object-bottom'
            />
          </div>
          {/* Ein einziger Scrollbereich für Foto und Text. Vorher stand das Foto mobil
              fest darüber: Wer dort wischte, bewegte nichts bzw. die Seite dahinter,
              und iOS federte den Text zurück an den Anfang. overscroll-contain hält
              das Wischen im Fenster. */}
          <div
            ref={scrollContainerRef}
            className='info-modal-body relative z-2 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-7 pt-6 text-[#e8fbff] md:px-7.5'>
            <div className='info-modal-photo-sm relative mb-6 block w-full md:hidden'>
              <span className='absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF]/20 blur-3xl' />
              <Image
                src='/images-startseite/portrait-fireballs.webp'
                alt=''
                width={600}
                height={600}
                className='max-h-80 w-full object-contain'
              />
              <div className='h-px w-full bg-[rgba(125,227,255,0.35)]' />
            </div>
            <span className='text-[11px] uppercase tracking-[0.32em] text-[rgba(125,227,255,0.8)]'>
              Kurzinfo
            </span>
            <h3 className='mb-6 mt-4 text-[20px] md:pr-14 font-semibold leading-[1.1] tracking-[-0.02em] text-[#ebb74d] md:text-[28px]'>
              {headline}
            </h3>
            <p className='text-[15px] leading-[1.6] text-[rgba(230,247,255,0.78)]'>
              {renderMarkdownLines(text)}
            </p>
            {/* Mobile scroll hint arrow */}
            <div
              className={`pointer-events-none fixed bottom-2 right-0 z-10 md:hidden transition-opacity duration-300 ${
                showScrollHint && isOpen ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden='true'>
              <div className='relative flex h-10 w-10 items-center justify-center'>
                <span className='absolute inset-0 rounded-full bg-[rgba(0,229,255,0.15)] blur-md' />
                <svg
                  className='relative z-1 h-6 w-6 text-[rgba(125,227,255,0.9)] animate-[scroll-hint-bump_1.8s_ease-in-out_infinite]'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2.5}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const trigger = label ? (
    <button
      type='button'
      className={`info-split ${buttonClassName ?? ''}`}
      aria-haspopup='dialog'
      aria-expanded={isOpen}
      onClick={() => setIsOpen(true)}>
      <span className='info-split__label'>{label}</span>
      <span
        aria-hidden='true'
        className='info-split__orb'>
        <span className='info-split__core'>
          <span className='info-split__blob info-split__blob--web' />
          <span className='info-split__blob info-split__blob--coach' />
          <span className='info-split__seam' />
        </span>
      </span>
    </button>
  ) : null;

  if (trigger) {
    return (
      <>
        {trigger}
        {canUseDom && isOpen ? createPortal(modal, document.body) : null}
      </>
    );
  }

  return (
    <>
      <button
        type='button'
        className={`${
          buttonClassName || 'fixed bottom-6 right-6 z-60'
        } inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[rgba(0,229,255,0.35)] text-[10px] font-bold uppercase tracking-[0.28em] text-[#6aff87] shadow-[0_18px_40px_rgba(0,229,255,0.25),0_0_0_1px_rgba(0,229,255,0.2),inset_0_0_24px_rgba(255,255,255,0.1)] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_26px_60px_rgba(0,229,255,0.32),0_0_0_1px_rgba(125,227,255,0.35),inset_0_0_28px_rgba(255,255,255,0.18)] animate-[info-orb-float_6s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_25%,rgba(125,227,255,0.85),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.8),transparent_60%),linear-gradient(135deg,rgba(6,25,34,0.96),rgba(4,12,22,0.98))]`}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}>
        <span className='absolute -inset-2.5 rounded-full border border-[rgba(125,227,255,0.55)] opacity-60 animate-[info-orb-ring_2.8s_ease-out_infinite]' />
        <span className='absolute -inset-4.5 rounded-full border border-[rgba(125,227,255,0.55)] opacity-35 animate-[info-orb-ring_2.8s_ease-out_infinite] [animation-delay:1.2s]' />
        <span className='relative z-2'>Info</span>
      </button>
      {canUseDom && isOpen ? createPortal(modal, document.body) : null}
    </>
  );
}
