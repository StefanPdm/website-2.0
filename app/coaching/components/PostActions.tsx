'use client';

import { useState } from 'react';
import { Copy, Download, Share2 } from 'lucide-react';

import type { DailyPost } from '@/app/coaching/daily-posts';
import {
  type ActionResult,
  copyPost,
  jpegOf,
  resultMessage,
  savePost,
  sharePost,
} from '@/app/coaching/components/post-files';

/**
 * Teilen · Bild kopieren · Speichern für einen Post – mit sichtbaren
 * Beschriftungen, weil Weitergeben ausdrücklich erwünscht ist.
 * Bei Hover/Fokus wird das JPG schon vorbereitet (Teilen braucht ein
 * sofortiges Ergebnis nach dem Klick).
 */
export default function PostActions({
  post,
  compact = false,
}: {
  post: DailyPost;
  compact?: boolean;
}) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const run = async (action: (post: DailyPost) => Promise<ActionResult>) => {
    setBusy(true);
    const result = await action(post);
    setBusy(false);
    setMessage(resultMessage[result]);
    if (resultMessage[result]) window.setTimeout(() => setMessage(''), 2400);
  };

  const warm = () => {
    void jpegOf(post.slug).catch(() => undefined);
  };

  const actions = [
    { label: 'Teilen', Icon: Share2, onClick: () => run(sharePost), primary: true },
    { label: 'Bild kopieren', Icon: Copy, onClick: () => run(copyPost), primary: false },
    { label: 'Speichern', Icon: Download, onClick: () => run(savePost), primary: false },
  ];

  return (
    <div
      className='flex flex-col items-center gap-2'
      onPointerEnter={warm}
      onFocus={warm}>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {actions.map(({ label, Icon, onClick, primary }) => (
          <button
            key={label}
            type='button'
            onClick={onClick}
            disabled={busy}
            aria-busy={busy}
            className={`dp-tool ${primary ? 'dp-tool--primary' : ''} ${compact ? 'dp-tool--compact' : ''}`}>
            <Icon
              aria-hidden='true'
              className='h-4 w-4'
            />
            {label}
          </button>
        ))}
      </div>
      <p
        className='min-h-5 text-xs text-(--subtle)'
        aria-live='polite'>
        {message}
      </p>
    </div>
  );
}
