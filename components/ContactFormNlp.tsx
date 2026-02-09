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
      <div className='rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_30px_70px_-60px_rgba(11,27,43,0.4)]'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200'>
            <CheckCircle2 className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-[#0B1B2B]'>
              Danke{submittedName ? `, ${submittedName}` : ''}!
            </h3>
            <p className='mt-1 text-sm text-slate-600'>
              Ich melde mich in der Regel innerhalb von 24–48 Stunden für ein kurzes Kennenlernen.
            </p>
            <button
              type='button'
              onClick={() => setStatus(null)}
              className='mt-4 h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0B1B2B] hover:bg-slate-50'>
              Weitere Nachricht schreiben
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='rounded-3xl bg-white p-6 ring-1 ring-rose-200'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-rose-100 text-rose-700 ring-1 ring-rose-200'>
            <XCircle className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-[#0B1B2B]'>Leider ein Fehler</h3>
            <p className='mt-1 text-sm text-slate-600'>
              Bitte versuche es später erneut oder schreibe direkt per E‑Mail.
            </p>
            <button
              type='button'
              onClick={() => setStatus(null)}
              className='mt-4 h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0B1B2B] hover:bg-slate-50'>
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
      className='rounded-3xl bg-white p-6 ring-1 ring-slate-200'>
      <div className='grid gap-4'>
        <div className='grid gap-1'>
          <label className='text-sm font-medium'>Name *</label>
          <input
            name='name'
            required
            className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium'>E-Mail *</label>
          <input
            name='email'
            type='email'
            required
            className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium'>Telefon (optional)</label>
          <input
            name='phone'
            type='tel'
            className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium'>Thema *</label>
          <select
            name='topic'
            required
            className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
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
          <label className='text-sm font-medium'>Format *</label>
          <select
            name='sessionType'
            required
            className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
            <option value=''>Bitte wählen</option>
            <option>Kennenlernen (15 Min.)</option>
            <option>1:1 Intensiv (90 Min.)</option>
            <option>Coaching-Serie (6 Sessions)</option>
            <option>VIP Performance (12 Wochen)</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium'>Bevorzugte Zeit *</label>
          <select
            name='preferredTime'
            required
            className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
            <option value=''>Bitte wählen</option>
            <option>Vormittags</option>
            <option>Nachmittags</option>
            <option>Abends</option>
            <option>Flexibel</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium'>Nachricht *</label>
          <textarea
            name='message'
            rows={5}
            required
            className='rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-400'></textarea>
        </div>
        <label className='flex items-start gap-2 text-xs text-slate-600'>
          <input
            type='checkbox'
            name='privacy'
            required
            className='mt-1'
          />
          Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten zu.
        </label>
        <button
          type='submit'
          disabled={loading}
          className='h-11 rounded-xl bg-[#0B1B2B] text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60'>
          {loading ? 'Wird gesendet…' : 'Anfrage senden'}
        </button>
        <p className='text-xs text-slate-500'>Antwort in der Regel innerhalb von 24–48 Stunden.</p>
      </div>
    </form>
  );
}
