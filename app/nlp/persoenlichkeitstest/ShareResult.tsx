'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

import { SecondaryButton } from '@/app/nlp/components/Buttons';
import { dimensionOrder, dimensions } from '@/app/nlp/persoenlichkeitstest/data';
import {
  percentage,
  rank,
  shareHref,
  type Scores,
} from '@/app/nlp/persoenlichkeitstest/scoring';
import { absoluteUrl } from '@/lib/site';

/**
 * Ergebnis teilen – geteilt werden der **Typ** und die drei Prozentwerte,
 * keine einzelnen Antworten.
 *
 * Der Link führt auf die öffentliche Typseite; die Prozentwerte hängen als
 * Parameter daran (`shareHref`), und die Typseite zeigt sie als Ergebniskarte
 * über der Typbeschreibung. Der Canonical der Typseite bleibt ohne Parameter.
 *
 * Web Share API, wo vorhanden (Handy: WhatsApp, Mail …), sonst Zwischenablage.
 * Die Rückmeldung läuft über `aria-live`, damit Screenreader sie ansagen.
 */
export default function ShareResult({ scores }: { scores: Scores }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const type = dimensions[rank(scores).ranked[0]].type;
  const url = absoluteUrl(shareHref(scores));
  const summary = dimensionOrder
    .map((dimension) => `${dimensions[dimension].area} ${percentage(scores[dimension])} %`)
    .join(', ');

  async function share() {
    const text = `Mein Ergebnis im Persönlichkeitstest: ${type} (${summary}). Welcher Typ bist du?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `Persönlichkeitstest: ${type}`, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setStatus('copied');
    } catch (error) {
      // Abbruch im Teilen-Dialog ist kein Fehler.
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('error');
    }
  }

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <SecondaryButton onClick={share}>
        <Share2
          aria-hidden='true'
          className='h-4 w-4'
        />
        Ergebnis teilen
      </SecondaryButton>
      <p
        aria-live='polite'
        className='text-xs text-(--muted)'>
        {status === 'copied' && 'Link kopiert – du kannst ihn jetzt einfügen.'}
        {status === 'error' && 'Teilen hat nicht geklappt. Der Link lautet: ' + url}
      </p>
    </div>
  );
}
