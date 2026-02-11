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
      <div className='rounded-3xl border border-white/15 bg-white/5 p-6 text-white shadow-[0_20px_60px_rgba(0,229,255,0.12)] backdrop-blur-xl'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30'>
            <CheckCircle2 className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-white'>
              Danke{submittedName ? `, ${submittedName}` : ''}!
            </h3>
            <p className='mt-1 text-sm text-white/70'>
              Ich melde mich in der Regel innerhalb von 24–48 Stunden für ein kurzes Kennenlernen.
            </p>
            <button
              type='button'
              onClick={() => setStatus(null)}
              className='mt-4 h-10 rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10'>
              Weitere Nachricht schreiben
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='rounded-3xl border border-rose-400/40 bg-rose-500/10 p-6 text-white'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-rose-500/20 text-rose-200 ring-1 ring-rose-300/30'>
            <XCircle className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-white'>Leider ein Fehler</h3>
            <p className='mt-1 text-sm text-white/70'>
              Bitte versuche es später erneut oder schreibe direkt per E‑Mail.
            </p>
            <button
              type='button'
              onClick={() => setStatus(null)}
              className='mt-4 h-10 rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10'>
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
      className='rounded-3xl border border-white/15 bg-white/5 p-6 text-white shadow-[0_20px_60px_rgba(0,229,255,0.12)] backdrop-blur-xl'>
      <div className='grid gap-4'>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-white/80'>Name *</label>
          <input
            name='name'
            required
            className='h-11 rounded-xl border border-white/15 bg-[#050B12]/60 px-3 text-sm text-white/90 outline-none transition focus:border-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-white/80'>E-Mail *</label>
          <input
            name='email'
            type='email'
            required
            className='h-11 rounded-xl border border-white/15 bg-[#050B12]/60 px-3 text-sm text-white/90 outline-none transition focus:border-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-white/80'>Telefon (optional)</label>
          <input
            name='phone'
            type='tel'
            className='h-11 rounded-xl border border-white/15 bg-[#050B12]/60 px-3 text-sm text-white/90 outline-none transition focus:border-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-white/80'>Thema *</label>
          <select
            name='topic'
            required
            className='h-11 rounded-xl border border-white/15 bg-[#050B12]/60 px-3 text-sm text-white/90 outline-none transition focus:border-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'>
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
          <label className='text-sm font-medium text-white/80'>Format *</label>
          <select
            name='sessionType'
            required
            className='h-11 rounded-xl border border-white/15 bg-[#050B12]/60 px-3 text-sm text-white/90 outline-none transition focus:border-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'>
            <option value=''>Bitte wählen</option>
            <option>Kennenlernen (15 Min.)</option>
            <option>1:1 Intensiv (90 Min.)</option>
            <option>Coaching-Serie (6 Sessions)</option>
            <option>VIP Performance (12 Wochen)</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-white/80'>Bevorzugte Zeit *</label>
          <select
            name='preferredTime'
            required
            className='h-11 rounded-xl border border-white/15 bg-[#050B12]/60 px-3 text-sm text-white/90 outline-none transition focus:border-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'>
            <option value=''>Bitte wählen</option>
            <option>Vormittags</option>
            <option>Nachmittags</option>
            <option>Abends</option>
            <option>Flexibel</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-white/80'>Nachricht *</label>
          <textarea
            name='message'
            rows={5}
            required
            className='rounded-xl border border-white/15 bg-[#050B12]/60 px-3 py-2 text-sm text-white/90 outline-none transition focus:border-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'></textarea>
        </div>
        <label className='flex items-start gap-2 text-xs text-white/60'>
          <input
            type='checkbox'
            name='privacy'
            required
            className='mt-1 h-4 w-4 rounded border border-white/20 bg-white/5 text-[#7DE3FF] focus:ring-2 focus:ring-[#7DE3FF]/40'
          />
          Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten zu.
        </label>
        <button
          type='submit'
          disabled={loading}
          className='h-11 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#22C55E] text-sm font-semibold text-[#001018] shadow-[0_0_24px_rgba(0,229,255,0.25)] transition hover:shadow-[0_0_32px_rgba(0,229,255,0.4)] disabled:opacity-60'>
          {loading ? 'Wird gesendet…' : 'Anfrage senden'}
        </button>
        <p className='text-xs text-white/50'>Antwort in der Regel innerhalb von 24–48 Stunden.</p>
      </div>
    </form>
  );
}
