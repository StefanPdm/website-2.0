'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

import { useContactSubmit } from '@/components/useContactSubmit';
import { LIMITS } from '@/lib/form-guard';

export default function ContactFormNlp() {
  const { status, loading, submitted, shieldFields, onSubmit, ready, onFormInput, reset } =
    useContactSubmit();

  if (status === 'success') {
    return (
      <div className='rounded-3xl border border-card-border bg-[var(--surface-strong)] p-6 text-[var(--text)] shadow-[0_20px_60px_var(--glow)] backdrop-blur-xl'>
        <div className='flex items-start gap-4'>
          <span className='grid h-12 w-12 place-items-center rounded-full bg-(--accent)/15 text-accent ring-1 ring-(--accent)/30'>
            <CheckCircle2 className='h-7 w-7' />
          </span>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-[var(--text)]'>
              Danke{submitted?.name ? `, ${submitted.name}` : ''}!
            </h3>
            <p className='mt-1 text-sm text-[var(--muted)]'>
              Ich melde mich in der Regel innerhalb von 24–48 Stunden für ein kurzes Kennenlernen.
            </p>
            <button
              type='button'
              onClick={reset}
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
              onClick={reset}
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
      onInput={onFormInput}
      onChange={onFormInput}
      className='rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-6 text-[var(--text)] shadow-[0_20px_60px_var(--glow)] backdrop-blur-xl'>
      <div className='grid gap-4'>
        {shieldFields}
        <div className='grid gap-1'>
          <label
            htmlFor='nlp-name'
            className='text-sm font-medium text-[var(--muted)]'>Name *</label>
          <input
            id='nlp-name'
            name='name'
            required
            maxLength={LIMITS.name}
            autoComplete='name'
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='nlp-email'
            className='text-sm font-medium text-[var(--muted)]'>E-Mail *</label>
          <input
            id='nlp-email'
            name='email'
            type='email'
            required
            maxLength={LIMITS.email}
            autoComplete='email'
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='nlp-phone'
            className='text-sm font-medium text-[var(--muted)]'>Telefon (optional)</label>
          <input
            id='nlp-phone'
            name='phone'
            type='tel'
            maxLength={LIMITS.phone}
            autoComplete='tel'
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='nlp-topic'
            className='text-sm font-medium text-[var(--muted)]'>Thema *</label>
          <select
            id='nlp-topic'
            name='topic'
            required
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'>
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
          <label
            htmlFor='nlp-sessionType'
            className='text-sm font-medium text-[var(--muted)]'>Format *</label>
          <select
            id='nlp-sessionType'
            name='sessionType'
            required
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'>
            {/* Reihenfolge folgt der Preisübersicht: erst Einstieg, dann Umfang. */}
            <option value=''>Bitte wählen</option>
            <option>Klarheits-Session / Erstgespräch (30 Min., kostenlos)</option>
            <option>Startersession (240 Min.)</option>
            <option>Folgesession (180 Min.)</option>
            <option>5er-Paket</option>
            <option>10er-Paket</option>
            <option>Mentoring (3 Monate)</option>
            <option>Mentoring (6 Monate)</option>
            <option>Workshop: Sprache (Firmen)</option>
            <option>NLP Essentials</option>
            <option>Noch unklar – bitte beraten</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='nlp-preferredTime'
            className='text-sm font-medium text-[var(--muted)]'>Bevorzugte Zeit *</label>
          <select
            id='nlp-preferredTime'
            name='preferredTime'
            required
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'>
            <option value=''>Bitte wählen</option>
            <option>Vormittags</option>
            <option>Nachmittags</option>
            <option>Abends</option>
            <option>Flexibel</option>
          </select>
        </div>
        <div className='grid gap-1'>
          <label
            htmlFor='nlp-message'
            className='text-sm font-medium text-[var(--muted)]'>Nachricht *</label>
          <textarea
            id='nlp-message'
            name='message'
            rows={5}
            required
            maxLength={LIMITS.message}
            className='w-full min-w-0 rounded-xl border border-border bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'></textarea>
        </div>
        {/*
          Einwilligung: Der Hinweistext ist das Label, der Link steht daneben.
          Läge er im Label, würde ein Klick darauf zusätzlich das Häkchen
          umschalten — und eine Einwilligung ist nur wirksam, wenn der Text
          auch erreichbar ist.
        */}
        <div className='flex items-start gap-2 text-xs text-[var(--muted)]'>
          <input
            id='nlp-privacy'
            type='checkbox'
            name='privacy'
            required
            className='mt-1 h-4 w-4 shrink-0 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]'
          />
          <p>
            <label htmlFor='nlp-privacy'>
              Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten zu.
            </label>{' '}
            <a
              href='/coaching/datenschutz'
              target='_blank'
              rel='noopener noreferrer'
              className='underline underline-offset-2 transition hover:text-[var(--text)]'>
              Datenschutz ansehen
            </a>
          </p>
        </div>
        {/*
          Unvollständig = optisch deaktiviert, aber bewusst nicht `disabled`:
          Ein echtes disabled ist für Tastatur und Screenreader unsichtbar, man
          erfährt nie, warum es nicht weitergeht. aria-disabled + Hinweis +
          Klick markiert die fehlenden Felder (useContactSubmit).
        */}
        <button
          type='submit'
          disabled={loading}
          aria-busy={loading}
          aria-disabled={!ready || undefined}
          aria-describedby={ready ? undefined : 'nlp-submit-hint'}
          className='h-11 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-sm font-semibold text-[var(--button-text)] shadow-[0_0_24px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:bg-none aria-disabled:bg-(--surface-strong) aria-disabled:text-(--subtle) aria-disabled:shadow-none aria-disabled:ring-1 aria-disabled:ring-border aria-disabled:hover:shadow-none'>
          {loading ? 'Wird gesendet…' : 'Anfrage senden'}
        </button>
        {!ready && (
          <p
            id='nlp-submit-hint'
            className='-mt-2 text-xs text-(--subtle)'>
            Bitte fülle alle Pflichtfelder (*) aus und stimme den Datenschutzhinweisen zu.
          </p>
        )}
        <p className='text-xs text-[var(--muted)]'>
          Antwort in der Regel innerhalb von 24–48 Stunden.
        </p>
      </div>
    </form>
  );
}
