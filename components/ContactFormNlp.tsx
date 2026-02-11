'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function ContactFormNlp() {
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      setSubmittedName(String(data.name || ''));
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  if (status === 'success') {
    return (
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
              Ich melde mich in der Regel innerhalb von 24–48 Stunden für ein kurzes Kennenlernen.
            </p>
            <button
              type='button'
              onClick={() => setStatus(null)}
              className='mt-4 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-strong)]'>
              Weitere Nachricht schreiben
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='rounded-3xl border border-rose-400/40 bg-rose-500/10 p-6 text-[var(--text)]'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-rose-500/20 text-rose-700 ring-1 ring-rose-300/30'>
            <XCircle className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-[var(--text)]'>Leider ein Fehler</h3>
            <p className='mt-1 text-sm text-[var(--muted)]'>
              Bitte versuche es später erneut oder schreibe direkt per E‑Mail.
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
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className='rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-6 text-[var(--text)] shadow-[0_20px_60px_var(--glow)] backdrop-blur-xl'>
      <div className='grid gap-4'>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-[var(--muted)]'>Name *</label>
          <input
            name='name'
            required
            className='h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-[var(--muted)]'>E-Mail *</label>
          <input
            name='email'
            type='email'
            required
            className='h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-[var(--muted)]'>Telefon (optional)</label>
          <input
            name='phone'
            type='tel'
            className='h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-[var(--muted)]'>Thema *</label>
          <select
            name='topic'
            required
            className='h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'>
            <option value=''>Bitte wählen</option>
            <option>Klarheit / Fokus</option>
            <option>Beziehung</option>
            <option>Business</option>
            <option>Selbstwert</option>
            <option>Stress / Überforderung</option>
            <option>Anderes</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-[var(--muted)]'>Format *</label>
          <select
            name='sessionType'
            required
            className='h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'>
            <option value=''>Bitte wählen</option>
            <option>Kennenlernen (15 Min.)</option>
            <option>1:1 Intensiv (90 Min.)</option>
            <option>Coaching-Serie (6 Sessions)</option>
            <option>VIP Performance (12 Wochen)</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-[var(--muted)]'>Bevorzugte Zeit *</label>
          <select
            name='preferredTime'
            required
            className='h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'>
            <option value=''>Bitte wählen</option>
            <option>Vormittags</option>
            <option>Nachmittags</option>
            <option>Abends</option>
            <option>Flexibel</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-[var(--muted)]'>Nachricht *</label>
          <textarea
            name='message'
            rows={5}
            required
            className='rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'></textarea>
        </div>
        <label className='flex items-start gap-2 text-xs text-[var(--muted)]'>
          <input
            type='checkbox'
            name='privacy'
            required
            className='mt-1 h-4 w-4 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
          Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten zu.
        </label>
        <button
          type='submit'
          disabled={loading}
          className='h-11 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-sm font-semibold text-[var(--button-text)] shadow-[0_0_24px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] disabled:opacity-60'>
          {loading ? 'Wird gesendet…' : 'Anfrage senden'}
        </button>
        <p className='text-xs text-[var(--muted)]'>
          Antwort in der Regel innerhalb von 24–48 Stunden.
        </p>
      </div>
    </form>
  );
}
