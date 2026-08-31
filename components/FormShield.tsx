'use client';

import { useEffect, useRef } from 'react';

import { ELAPSED_FIELD, HONEYPOT_FIELD } from '@/lib/anti-spam';

/**
 * Unsichtbarer Bot-Schutz für jedes Formular der Seite.
 *
 * Verwendung:
 *   const shield = useFormShield();
 *   ...
 *   const data = { ...Object.fromEntries(new FormData(form).entries()), ...shield.payload() };
 *   ...
 *   <form>{shield.fields}…</form>
 *
 * Das Honeypot-Feld ist für Menschen unerreichbar (aus dem Viewport geschoben,
 * nicht fokussierbar, aria-hidden), für einen Bot, der stumpf alle Inputs
 * befüllt, aber sichtbar. Es wird bewusst *nicht* per display:none versteckt —
 * einige Bots überspringen ausgeblendete Felder.
 */
export function useFormShield() {
  // Bewusst im Effekt gesetzt, nicht beim Render: Date.now() ist unrein und
  // würde bei einem erneuten Render einen instabilen Startwert liefern.
  const mountedAt = useRef<number | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const fields = (
    <div
      aria-hidden='true'
      className='pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden'>
      <label htmlFor={HONEYPOT_FIELD}>Bitte dieses Feld leer lassen</label>
      <input
        ref={honeypotRef}
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type='text'
        tabIndex={-1}
        autoComplete='off'
        defaultValue=''
      />
    </div>
  );

  /**
   * Wird ans Payload gehängt. Der Honeypot-Wert kommt über die Ref, damit das
   * auch in Formularen funktioniert, die ihren State kontrolliert halten und
   * gar kein FormData einlesen (z. B. GuideSection).
   */
  const payload = () => ({
    [ELAPSED_FIELD]: mountedAt.current === null ? null : Date.now() - mountedAt.current,
    [HONEYPOT_FIELD]: honeypotRef.current?.value ?? '',
  });

  return { fields, payload };
}
