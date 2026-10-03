'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

import { useContactSubmit } from '@/components/useContactSubmit';

export default function ContactFormWeb() {
  const { status, loading, submitted, shieldFields, onSubmit, reset } = useContactSubmit();

  if (status === 'success') {
    return (
      <div className='rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-6 text-slate-100 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)]'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40 text-emerald-300'>
            <CheckCircle2 className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-white'>
              Danke{submitted?.name ? `, ${submitted.name}` : ''}!
            </h3>
            <p className='mt-1 text-sm text-slate-300'>
              Ich melde mich innerhalb von 24–48 Stunden, um die nächsten sinnvollen Schritte zu
              besprechen.
            </p>
            <button
              type='button'
              onClick={reset}
              className='mt-4 h-10 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15'>
              Neue Anfrage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-slate-100'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-red-500/20 ring-1 ring-red-400/40 text-red-300'>
            <XCircle className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-white'>Senden fehlgeschlagen</h3>
            <p className='mt-1 text-sm text-slate-300'>
              Bitte lade die Seite neu oder versuche es erneut.
            </p>
            <button
              type='button'
              onClick={reset}
              className='mt-4 h-10 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15'>
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
      className='rounded-2xl border border-white/15 bg-white/5 p-6 text-slate-100 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)]'>
      <div className='grid gap-4'>
        {shieldFields}
        <div className='grid gap-1'>
          <label
            htmlFor='web-name'
            className='text-sm font-medium text-slate-200'>Name *</label>
          <input
            id='web-name'
            name='name'
            required
            className='h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'
          />
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-email'
            className='text-sm font-medium text-slate-200'>E-Mail *</label>
          <input
            id='web-email'
            name='email'
            type='email'
            required
            className='h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'
          />
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-company'
            className='text-sm font-medium text-slate-200'>Firma (optional)</label>
          <input
            id='web-company'
            name='company'
            className='h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'
          />
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-website'
            className='text-sm font-medium text-slate-200'>Website (optional)</label>
          <input
            id='web-website'
            name='website'
            type='url'
            placeholder='https://…'
            className='h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'
          />
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-projectType'
            className='text-sm font-medium text-slate-200'>Projektart *</label>
          <select
            id='web-projectType'
            name='projectType'
            required
            className='select-caret h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'>
            <option value=''>Bitte wählen</option>
            <option>Website / Landingpage</option>
            <option>Web App / Kundenportal</option>
            <option>System / Automatisierung</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-scope'
            className='text-sm font-medium text-slate-200'>Umfang *</label>
          <select
            id='web-scope'
            name='scope'
            required
            className='select-caret h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'>
            <option value=''>Bitte wählen</option>
            <option>Design + Entwicklung</option>
            <option>Entwicklung (Design vorhanden)</option>
            <option>Weiterentwicklung / Refactor</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-budget'
            className='text-sm font-medium text-slate-200'>Budget (optional)</label>
          <select
            id='web-budget'
            name='budget'
            className='select-caret h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'>
            <option value=''>Budgetrahmen</option>
            <option>Unter 2.500 €</option>
            <option>2.500 – 7.500 €</option>
            <option>7.500 – 15.000 €</option>
            <option>15.000 €+</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-timeline'
            className='text-sm font-medium text-slate-200'>Zeitrahmen *</label>
          <select
            id='web-timeline'
            name='timeline'
            required
            className='select-caret h-11 w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 text-black outline-none focus:border-white/40 focus:bg-white/15 focus:text-white/90'>
            <option value=''>Bitte wählen</option>
            <option>2–4 Wochen</option>
            <option>1–2 Monate</option>
            <option>3+ Monate</option>
            <option>Flexibel</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='web-message'
            className='text-sm font-medium text-slate-200'>Nachricht *</label>
          <textarea
            id='web-message'
            name='message'
            rows={5}
            required
            className='w-full min-w-0 rounded-xl border border-white/20 bg-white/40 px-3 py-2 text-black placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15'></textarea>
        </div>
        {/* Hinweistext als Label, Link daneben – siehe ContactFormNlp. */}
        <div className='flex items-start gap-2 text-xs text-slate-300'>
          <input
            id='web-privacy'
            type='checkbox'
            name='privacy'
            required
            className='mt-1 shrink-0 accent-[#2dd4bf]'
          />
          <p>
            <label htmlFor='web-privacy'>
              Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten zu.
            </label>{' '}
            <a
              href='/webdevelopment/datenschutz'
              target='_blank'
              rel='noopener noreferrer'
              className='underline underline-offset-2 transition hover:text-white'>
              Datenschutz ansehen
            </a>
          </p>
        </div>
        <button
          type='submit'
          disabled={loading}
          aria-busy={loading}
          className='h-11 rounded-xl bg-linear-to-r from-[#1D6FA8] to-[#7A2C8E] text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60'>
          {loading ? 'Wird gesendet…' : 'Anfrage senden'}
        </button>
        <p className='text-xs text-slate-400'>Kein Spam. Kein Weiterverkauf.</p>
      </div>
    </form>
  );
}
