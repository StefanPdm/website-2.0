'use client';

import { createElement, type ReactElement, useEffect, useRef, useState } from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { Download, ExternalLink, FileText } from 'lucide-react';

import { PrimaryButton } from '@/app/coaching/components/Buttons';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; url: string; key: string };

/**
 * „Nimm deine Auswertung mit“: erzeugt das PDF im Browser (react-pdf wird erst
 * beim Klick nachgeladen, ~0,5 MB). Ansehen öffnet den PDF-Betrachter des
 * Browsers – dort lässt es sich auch drucken. Ändert sich die Auswahl, wird
 * das alte PDF verworfen und der Knopf erscheint wieder.
 */
export default function ReportDownload({ picked }: { picked: Set<number> }) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const urlRef = useRef<string | null>(null);

  // Blob-Adresse beim Verlassen freigeben ("Neu beginnen" baut die Auswertung ab)
  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  const ids = [...picked].sort((a, b) => a - b);
  const key = ids.join(',');
  const ready = state.status === 'ready' && state.key === key ? state : null;
  const fileName = `glaubenssaetze-auswertung-${new Date().toISOString().slice(0, 10)}.pdf`;

  const create = async () => {
    setState({ status: 'loading' });
    try {
      const [{ pdf }, { default: BeliefReportPdf }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/app/coaching/glaubenssaetze/BeliefReportPdf'),
      ]);
      // pdf() erwartet ein <Document>-Element; unsere Komponente liefert genau das
      const doc = createElement(BeliefReportPdf, {
        picked: ids,
        created: new Date(),
      }) as unknown as ReactElement<DocumentProps>;
      const blob = await pdf(doc).toBlob();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = URL.createObjectURL(blob);
      setState({ status: 'ready', url: urlRef.current, key });
    } catch {
      setState({ status: 'error' });
    }
  };

  const linkClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

  return (
    <div className='tone-dark relative mt-12 overflow-hidden rounded-2xl border border-border bg-(--bg) p-6 sm:p-8'>
      <div className='relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-start gap-4'>
          <span
            aria-hidden='true'
            className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-strong text-accent ring-1 ring-border'>
            <FileText className='h-6 w-6' />
          </span>
          <div>
            <h4 className='text-lg font-semibold text-(--text)'>Nimm deine Auswertung mit</h4>
            <p className='mt-1 max-w-md text-sm leading-relaxed text-(--muted)'>
              Als PDF mit Landkarte, Arbeitsblättern zum Ausfüllen und meinen Vorschlägen für die
              Gegenteile. Zum Ansehen, Speichern oder Ausdrucken.
            </p>
          </div>
        </div>

        <div
          className='flex shrink-0 flex-col gap-3 sm:flex-row'
          aria-live='polite'>
          {ready ? (
            <>
              <a
                href={ready.url}
                target='_blank'
                rel='noopener'
                className={`${linkClass} bg-linear-to-r from-(--accent) to-(--accent-2) text-(--button-text) shadow-[0_0_30px_var(--glow)]`}>
                <ExternalLink
                  aria-hidden='true'
                  className='h-4 w-4'
                />
                PDF ansehen
              </a>
              <a
                href={ready.url}
                download={fileName}
                className={`${linkClass} bg-surface text-(--text) ring-1 ring-border hover:ring-border-strong`}>
                <Download
                  aria-hidden='true'
                  className='h-4 w-4'
                />
                Herunterladen
              </a>
            </>
          ) : (
            <PrimaryButton
              onClick={create}
              disabled={state.status === 'loading' || picked.size === 0}
              aria-busy={state.status === 'loading'}
              className='w-full sm:w-auto'>
              {state.status === 'loading' ? 'PDF wird erstellt…' : 'PDF erstellen'}
            </PrimaryButton>
          )}
        </div>
      </div>
      {state.status === 'error' && (
        <p className='relative mt-4 text-sm text-(--muted)'>
          Das PDF ließ sich gerade nicht erstellen. Versuch es bitte noch einmal.
        </p>
      )}
      <p className='relative mt-5 text-xs text-(--subtle)'>
        Das PDF entsteht in deinem Browser – nichts davon wird an mich oder andere übertragen.
      </p>
    </div>
  );
}
