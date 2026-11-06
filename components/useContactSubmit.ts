'use client';

import { useState, type FormEvent } from 'react';

import { useFormShield } from '@/components/FormShield';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Gemeinsame Logik der drei Kontaktformulare (ContactForm, ContactFormNlp,
 * ContactFormWeb). Die Formulare unterscheiden sich bewusst in Feldern und
 * Optik (CLAUDE.md §1, §8) – nicht aber im Ablauf:
 *
 *   idle → loading → success | error
 *
 * Bot-Schutz ist eingebaut: `shield.fields` muss im <form> stehen, der
 * Payload wird hier automatisch ergänzt. Ein Formular über diesen Hook kann
 * den Schutz also nicht vergessen.
 */
export function useContactSubmit() {
  const shield = useFormShield();
  const [status, setStatus] = useState<Status>('idle');
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  /** Alle Pflichtfelder gültig + Einwilligung gesetzt (native Formularprüfung). */
  const [ready, setReady] = useState(false);

  /**
   * An <form onInput onChange>. Nutzt die eingebaute Browser-Prüfung
   * (required, type=email, maxLength) – keine zweite, eigene Regelsammlung.
   */
  function onFormInput(e: FormEvent<HTMLFormElement>) {
    setReady(e.currentTarget.checkValidity());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Unvollständig: nichts senden, sondern dem Browser die fehlenden Felder
    // markieren lassen (inkl. Fokus aufs erste) – der Button ist nur optisch
    // deaktiviert (aria-disabled), damit er erreichbar und erklärbar bleibt.
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    setStatus('loading');

    const form = e.currentTarget;
    const data: Record<string, unknown> = {
      ...Object.fromEntries(new FormData(form).entries()),
      ...shield.payload(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted({ name: String(data.name || ''), email: String(data.email || '') });
      setStatus('success');
      form.reset();
      setReady(false);
    } catch {
      setStatus('error');
    }
  }

  return {
    status,
    loading: status === 'loading',
    submitted,
    shieldFields: shield.fields,
    onSubmit,
    ready,
    onFormInput,
    reset: () => {
      setReady(false);
      setStatus('idle');
    },
  };
}
