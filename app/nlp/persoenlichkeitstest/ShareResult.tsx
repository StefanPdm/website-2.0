'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

import { SecondaryButton } from '@/app/nlp/components/Buttons';
import { dimensions, typeHref, type Dimension } from '@/app/nlp/persoenlichkeitstest/data';
import { absoluteUrl } from '@/lib/site';

/**
 * Ergebnis teilen – geteilt wird nur der **Typ**, nie die Punktwerte.
 *
 * Der Link führt auf die öffentliche Typseite, nicht auf ein persönliches
 * Ergebnis. So verlässt nichts aus den Antworten den Browser (siehe Hinweis
 * auf der Testseite), und jeder geteilte Link landet auf einer indexierbaren
 * Seite mit eigenem Vorschaubild.
 *
 * Web Share API, wo vorhanden (Handy: WhatsApp, Mail …), sonst Zwischenablage.
 * Die Rückmeldung läuft über `aria-live`, damit Screenreader sie ansagen.
 */
export default function ShareResult({ dimension }: { dimension: Dimension }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const type = dimensions[dimension].type;
  const url = absoluteUrl(typeHref(dimension));

  async function share() {
    const text = `Mein Ergebnis im Persönlichkeitstest: ${type}. Welcher Typ bist du?`;
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
