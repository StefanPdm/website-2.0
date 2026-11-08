'use client';

import { type DailyPost, dailyPosts, postSrc } from '@/app/coaching/daily-posts';

/**
 * Teilen, Kopieren, Speichern der WhatsApp-Impulse – alles im Browser.
 *
 * Ausgeliefert werden die Posts als WebP (klein, schnell). Zum Weitergeben
 * wandeln wir sie in JPG um: WebP nehmen manche Handys, Fotos-Apps und der
 * WhatsApp-Status nicht zuverlässig an. Die Zwischenablage kennt nur PNG.
 * Umgewandelte Bilder bleiben im Speicher (Cache), damit „Teilen“ sofort
 * reagiert – Browser erlauben navigator.share nur kurz nach dem Klick.
 */

const jpegCache = new Map<string, Promise<Blob>>();

async function render(slug: string, type: 'image/jpeg' | 'image/png') {
  const response = await fetch(postSrc(slug));
  const bitmap = await createImageBitmap(await response.blob());
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0);
  bitmap.close();
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob'))), type, 0.9),
  );
}

/** JPG eines Posts (gecacht). Fehler werden nicht gecacht. */
export function jpegOf(slug: string) {
  let entry = jpegCache.get(slug);
  if (!entry) {
    entry = render(slug, 'image/jpeg');
    entry.catch(() => jpegCache.delete(slug));
    jpegCache.set(slug, entry);
  }
  return entry;
}

export const fileNameOf = (post: DailyPost) => `nlp-impuls-${post.slug}.jpg`;
const shareText = (post: DailyPost) => `${post.alt}\n– Stefan Heinemann Coaching`;
const pageUrl = () => `${window.location.origin}/coaching#impulse-taeglich`;

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export type ActionResult =
  'shared' | 'link-copied' | 'image-copied' | 'text-copied' | 'saved' | 'cancelled' | 'failed';

/** Teilt das Bild selbst (Handy: WhatsApp, Status, Fotos …), sonst den Link. */
export async function sharePost(post: DailyPost): Promise<ActionResult> {
  try {
    const blob = await jpegOf(post.slug);
    const file = new File([blob], fileNameOf(post), { type: 'image/jpeg' });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text: shareText(post) });
      return 'shared';
    }
    if (navigator.share) {
      await navigator.share({ title: 'NLP-Impuls', text: shareText(post), url: pageUrl() });
      return 'shared';
    }
    await navigator.clipboard.writeText(`${shareText(post)}\n${pageUrl()}`);
    return 'link-copied';
  } catch (error) {
    return (error as Error)?.name === 'AbortError' ? 'cancelled' : 'failed';
  }
}

/** Kopiert das Bild in die Zwischenablage (PNG), sonst den Text. */
export async function copyPost(post: DailyPost): Promise<ActionResult> {
  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      // Safari verlangt das Promise direkt im ClipboardItem (noch innerhalb des Klicks)
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': render(post.slug, 'image/png') }),
      ]);
      return 'image-copied';
    }
    await navigator.clipboard.writeText(`${shareText(post)}\n${pageUrl()}`);
    return 'text-copied';
  } catch {
    try {
      await navigator.clipboard.writeText(`${shareText(post)}\n${pageUrl()}`);
      return 'text-copied';
    } catch {
      return 'failed';
    }
  }
}

/** Speichert das Bild als JPG. */
export async function savePost(post: DailyPost): Promise<ActionResult> {
  try {
    saveBlob(await jpegOf(post.slug), fileNameOf(post));
    return 'saved';
  } catch {
    return 'failed';
  }
}

/** Alle Posts als JPG-Dateien, mit Fortschritt. */
export async function prepareAll(onProgress: (done: number) => void) {
  const files: File[] = [];
  for (const post of dailyPosts) {
    const blob = await jpegOf(post.slug);
    files.push(new File([blob], fileNameOf(post), { type: 'image/jpeg' }));
    onProgress(files.length);
  }
  return files;
}

/** Alle als ZIP (Computer). JPG ist schon komprimiert – darum nur „speichern“. */
export async function saveZip(files: File[]) {
  const { zipSync } = await import('fflate');
  const entries: Record<string, [Uint8Array, { level: 0 }]> = {};
  for (const file of files) {
    entries[file.name] = [new Uint8Array(await file.arrayBuffer()), { level: 0 }];
  }
  const zip = zipSync(entries);
  saveBlob(
    new Blob([zip as BlobPart], { type: 'application/zip' }),
    'nlp-impulse-stefan-heinemann.zip',
  );
}

/** Handy mit Teilen-Menü für Dateien? Dann „Bilder sichern“ statt ZIP. */
export function canShareFiles() {
  if (typeof navigator === 'undefined' || !navigator.canShare) return false;
  if (!window.matchMedia('(pointer: coarse)').matches) return false;
  const probe = new File([new Blob(['x'], { type: 'image/jpeg' })], 'probe.jpg', {
    type: 'image/jpeg',
  });
  return navigator.canShare({ files: [probe] });
}

/** Ein Paket Dateien über das Teilen-Menü (z. B. „Bilder sichern“). */
export async function shareFiles(files: File[]): Promise<ActionResult> {
  try {
    await navigator.share({ files });
    return 'shared';
  } catch (error) {
    return (error as Error)?.name === 'AbortError' ? 'cancelled' : 'failed';
  }
}

export const resultMessage: Record<ActionResult, string> = {
  shared: 'Geteilt – danke!',
  'link-copied': 'Link kopiert',
  'image-copied': 'Bild kopiert',
  'text-copied': 'Text und Link kopiert',
  saved: 'Gespeichert',
  cancelled: '',
  failed: 'Hat nicht geklappt – bitte noch einmal',
};
