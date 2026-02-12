'use client';

import { useMemo, useState } from 'react';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton } from '@/app/nlp/components/Buttons';

export default function GuideSection() {
  const [formState, setFormState] = useState({ name: '', email: '' });
  const [touched, setTouched] = useState({ name: false, email: false });

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

  return (
    <section
      id='leitfaden'
      className='relative py-20 border-y border-[var(--border)]'>
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
            <form
              suppressHydrationWarning
              onSubmit={(event) => {
                event.preventDefault();
                setTouched({ name: true, email: true });
              }}
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
              <PrimaryButton className='w-full'>Jetzt herunterladen</PrimaryButton>
              <p className='text-xs text-white/50'>Kein Spam. Abmeldung jederzeit.</p>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
