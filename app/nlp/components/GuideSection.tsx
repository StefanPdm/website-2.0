'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton } from '@/app/nlp/components/Buttons';

export default function GuideSection() {
  const [formState, setFormState] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState({ name: false, email: false });
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const errors = useMemo(() => {
    return {
      name: formState.name.trim().length === 0 ? 'Bitte gib deinen Namen an.' : '',
      email:
        formState.email.trim().length === 0
          ? 'Bitte gib deine E-Mail an.'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
            ? 'Bitte gib eine gültige E-Mail an.'
            : '',
    };
  }, [formState]);

  const hasError = (field: 'name' | 'email') => touched[field] && Boolean(errors[field]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true });
    setStatus(null);

    if (errors.name || errors.email) return;

    setLoading(true);

    try {
      const res = await fetch('/api/nlp-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error('failed');
      setSubmittedName(formState.name.trim());
      setStatus('success');
      setFormState({ name: '', email: '' });
      setTouched({ name: false, email: false });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id='leitfaden'
      className='relative py-20 border-y border-border'>
      <div className='container mx-auto px-4 min-h-[60dvh] flex flex-col justify-center items-center '>
        <div className='grid gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
          <div>
            <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
              Sichere dir deinen kostenlosen NLP-Leitfaden
            </h2>
            <p className='mt-4 max-w-xl text-base text-white/70 sm:text-lg'>
              Praktische Übungen für Klarheit, Selbstführung und Gesprächsführung.
            </p>
            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              <GlassCard className='p-4'>
                <p className='text-sm text-white/70'>Klarheit im Kopf</p>
                <p className='mt-2 text-xs text-white/50'>
                  Erkenne Muster und fokussiere dich neu.
                </p>
              </GlassCard>
              <GlassCard className='p-4'>
                <p className='text-sm text-white/70'>Souveräne Gespräche</p>
                <p className='mt-2 text-xs text-white/50'>
                  Sprache bewusst einsetzen und wirken lassen.
                </p>
              </GlassCard>
            </div>
          </div>
          <GlassCard className='p-6'>
            {status === 'success' ? (
              <div className='rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-6 text-[var(--text)] shadow-[0_20px_60px_var(--glow)] backdrop-blur-xl'>
                <div className='flex items-start gap-4'>
                  <span className='grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-400/30'>
                    <CheckCircle2 className='h-7 w-7' />
                  </span>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-[var(--text)]'>
                      Danke{submittedName ? `, ${submittedName}` : ''}!
                    </h3>
                    <p className='mt-1 text-sm text-[var(--muted)]'>
                      Wir haben dir soeben eine E-Mail mit dem Download-Link geschickt.
                    </p>
                    <button
                      type='button'
                      onClick={() => setStatus(null)}
                      className='mt-4 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-strong)]'>
                      Noch einen Link anfordern
                    </button>
                  </div>
                </div>
              </div>
            ) : status === 'error' ? (
              <div className='rounded-3xl border border-rose-400/40 bg-rose-500/10 p-6 text-[var(--text)]'>
                <div className='flex items-start gap-4'>
                  <span className='grid h-12 w-12 place-items-center rounded-full bg-rose-500/20 text-rose-700 ring-1 ring-rose-300/30'>
                    <XCircle className='h-7 w-7' />
                  </span>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-[var(--text)]'>Leider ein Fehler</h3>
                    <p className='mt-1 text-sm text-[var(--muted)]'>
                      Bitte versuche es später erneut oder schreibe direkt per E-Mail.
                    </p>
                    <button
                      type='button'
                      onClick={() => setStatus(null)}
                      className='mt-4 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-strong)]'>
                      Erneut versuchen
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                suppressHydrationWarning
                onSubmit={onSubmit}
                className='space-y-4'>
                <div>
                  <label
                    htmlFor='lead-name'
                    className='text-sm text-white/80'>
                    Name
                  </label>
                  <input
                    id='lead-name'
                    type='text'
                    required
                    value={formState.name}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, name: event.target.value }))
                    }
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    className={`mt-2 w-full rounded-xl border bg-[#050B12]/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                      hasError('name') ? 'border-red-400/70' : 'border-white/10'
                    }`}
                    placeholder='Dein Name'
                  />
                  {hasError('name') && <p className='mt-2 text-xs text-red-300'>{errors.name}</p>}
                </div>
                <div>
                  <label
                    htmlFor='lead-email'
                    className='text-sm text-white/80'>
                    E-Mail
                  </label>
                  <input
                    id='lead-email'
                    type='email'
                    required
                    value={formState.email}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, email: event.target.value }))
                    }
                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                    className={`mt-2 w-full rounded-xl border bg-[#050B12]/40 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                      hasError('email') ? 'border-red-400/70' : 'border-white/10'
                    }`}
                    placeholder='dein.name@email.de'
                  />
                  {hasError('email') && <p className='mt-2 text-xs text-red-300'>{errors.email}</p>}
                </div>
                <PrimaryButton
                  className='w-full'
                  type='submit'
                  disabled={loading}
                  aria-busy={loading}>
                  {loading ? 'Wird gesendet…' : 'Jetzt Link anfordern'}
                </PrimaryButton>
                <p className='text-xs text-white/50'>
                  Kein Spam. Kein Verkauf. Keine weiteren Nachrichten.
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
