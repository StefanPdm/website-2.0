'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton } from '@/app/nlp/components/Buttons';

type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error' | 'missing';

function GuideDownloadContent() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get('token'), [searchParams]);
  const [status, setStatus] = useState<DownloadStatus>('idle');

  async function startDownload(currentToken: string) {
    setStatus('downloading');

    try {
      const res = await fetch(`/api/nlp-guide/download?token=${encodeURIComponent(currentToken)}`);
      if (!res.ok) throw new Error('download failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'NLP-Leitfaden_SNAC.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    if (!token) {
      setStatus('missing');
      return;
    }

    startDownload(token);
  }, [token]);

  return (
    <section className='relative py-20 border-y border-border '>
      <div className='container mx-auto px-4 min-h-[calc(100dvh-145px)] flex flex-col justify-center items-center'>
        <GlassCard className='w-full max-w-2xl p-6'>
          <h1 className='text-2xl font-semibold text-[var(--text)]'>Download wird vorbereitet</h1>
          <p className='mt-3 text-sm text-[var(--muted)]'>
            Bitte warte einen Moment. Der Leitfaden startet automatisch.
          </p>

          {status === 'missing' && (
            <div className='mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-[var(--text)]'>
              Der Download-Link ist unvollstaendig. Bitte fordere den Link erneut an.
            </div>
          )}

          {status === 'error' && token && (
            <div className='mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-[var(--text)]'>
              Der Download konnte nicht gestartet werden. Bitte versuche es erneut.
            </div>
          )}

          {token && status !== 'missing' && (
            <div className='mt-6 flex flex-wrap items-center gap-3'>
              <PrimaryButton
                type='button'
                onClick={() => startDownload(token)}
                disabled={status === 'downloading'}
                aria-busy={status === 'downloading'}>
                {status === 'downloading' ? 'Wird gestartet…' : 'Download erneut starten'}
              </PrimaryButton>
              <a
                href={`/api/nlp-guide/download?token=${encodeURIComponent(token)}`}
                className='text-sm font-semibold text-[var(--text)] underline decoration-[var(--border)] underline-offset-4'>
                Direktlink
              </a>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}

export default function GuideDownloadPage() {
  return (
    <Suspense
      fallback={
        <section className='relative py-20 border-y border-border'>
          <div className='container mx-auto px-4 min-h-[60dvh] flex flex-col justify-center items-center'>
            <GlassCard className='w-full max-w-2xl p-6'>
              <h1 className='text-2xl font-semibold text-[var(--text)]'>
                Download wird vorbereitet
              </h1>
              <p className='mt-3 text-sm text-[var(--muted)]'>
                Bitte warte einen Moment. Der Leitfaden startet automatisch.
              </p>
            </GlassCard>
          </div>
        </section>
      }>
      <GuideDownloadContent />
    </Suspense>
  );
}
