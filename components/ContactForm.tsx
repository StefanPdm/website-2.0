'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className='rounded-2xl border border-white/15 bg-white/5 p-6 text-slate-100 mt-8'>
      <div className='grid gap-4'>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-slate-200'>Name *</label>
          <input
            required
            name='name'
            className='h-11 rounded-xl border border-white/20 bg-white/20 px-3 text-slate-950 font-bold placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-slate-200'>E-Mail *</label>
          <input
            required
            name='email'
            type='email'
            className='h-11 rounded-xl border border-white/20 bg-white/20 px-3 text-slate-950 font-bold placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15'
          />
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-slate-200'>Projektart *</label>
          <select
            required
            name='projectType'
            className='h-11 rounded-xl border border-white/20 bg-white/20 px-3 text-slate-950 font-bold outline-none focus:border-white/40 focus:bg-white/15'>
            <option value=''>Bitte wählen</option>
            <option>Website / Landingpage</option>
            <option>Web App / Kundenportal</option>
            <option>System / Automatisierung</option>
            <option>Etwas anderes</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-slate-200'>Budget (optional)</label>
          <select
            name='budget'
            className='h-11 rounded-xl border border-white/20 bg-white/20 px-3 text-slate-950 font-bold outline-none focus:border-white/40 focus:bg-white/15'>
            <option value=''>Budgetrahmen</option>
            <option>Unter 2.500 €</option>
            <option>2.500 – 7.500 €</option>
            <option>7.500 – 15.000 €</option>
            <option>15.000 €+</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-slate-200'>Zeitrahmen *</label>
          <select
            required
            name='timeline'
            className='h-11 rounded-xl border border-white/20 bg-white/20 px-3 text-slate-950 font-bold outline-none focus:border-white/40 focus:bg-white/15'>
            <option value=''>Bitte wählen</option>
            <option>2–4 Wochen</option>
            <option>1–2 Monate</option>
            <option>3+ Monate</option>
            <option>Flexibel</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label className='text-sm font-medium text-slate-200'>Nachricht *</label>
          <textarea
            required
            name='message'
            rows={5}
            className='rounded-xl border border-white/20 bg-white/20 px-3 py-2 text-slate-950 font-bold placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15'></textarea>
        </div>
        <label className='flex items-start gap-2 text-xs text-slate-300'>
          <input
            required
            type='checkbox'
            name='privacy'
            className='mt-1 accent-[#2dd4bf]'
          />
          Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten zur
          Kontaktaufnahme zu.
        </label>
        <button
          type='submit'
          disabled={loading}
          className='h-11 rounded-xl bg-linear-to-r from-[#1D6FA8] to-[#7A2C8E] text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60'>
          {loading ? 'Wird gesendet…' : 'Anfrage senden'}
        </button>
        {status === 'success' && (
          <p className='text-xs text-emerald-300'>Danke! Die Anfrage wurde versendet.</p>
        )}
        {status === 'error' && (
          <p className='text-xs text-red-300'>
            Leider ist ein Fehler aufgetreten. Bitte später erneut versuchen.
          </p>
        )}
        <p className='text-xs text-slate-400'>
          Kein Spam. Kein Weiterverkauf. Antwort in der Regel innerhalb von 24–48 Stunden.
        </p>
      </div>
    </form>
  );
}
