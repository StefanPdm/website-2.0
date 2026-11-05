'use client';

import { HeartPulse, RefreshCw, ShieldCheck, Target } from 'lucide-react';

import GlassCard from '@/components/GlassCard';

const workItems = [
  {
    title: 'Gedankenkarussell',
    text: 'Mehr innere Ruhe, weniger Dauerschleifen im Kopf.',
    detail:
      'Wir identifizieren wiederkehrende Gedankenketten, entkoppeln sie von Stressreaktionen und trainieren Fokus-Wechsel. Du bekommst klare Anker für den Alltag, damit Grübeln nicht mehr automatisch übernimmt.',
    points: ['Klarer denken', 'Selbststeuerung stärken'],
    icon: RefreshCw,
    how: [
      'Gedankenmuster erkennen & benennen',
      'Stopp- & Reframe-Techniken aufbauen',
      'Fokus-Rituale für Alltag & Arbeit',
    ],
  },
  {
    title: 'Emotionen regulieren',
    text: 'Trigger bewusster wahrnehmen und souveräner reagieren.',
    detail:
      'Wir entschlüsseln Trigger, stabilisieren den inneren Zustand und üben neue Reaktionen in realen Situationen. So entsteht Ruhe, ohne Gefühle zu unterdrücken.',
    points: ['Gelassen bleiben', 'Stress schneller lösen'],
    icon: HeartPulse,
    how: [
      'Trigger-Map & Auslöser analysieren',
      'State-Management für Sofort-Beruhigung',
      'Neue Reaktionsketten verankern',
    ],
  },
  {
    title: 'Ziele, die wirklich passen',
    text: 'Fokus setzen, Prioritäten ordnen und dranbleiben.',
    detail:
      'Wir prüfen Ziele auf innere Stimmigkeit, klären Prioritäten und bauen messbare Schritte. Du bekommst eine klare Roadmap mit realistischen Meilensteinen.',
    points: ['Konsequent handeln', 'Energie zielgerichtet nutzen'],
    icon: Target,
    how: [
      'Zielbild schärfen & Werte checken',
      'Prioritäten-Filter für Entscheidungen',
      'Umsetzungsplan mit Wochenfokus',
    ],
  },
  {
    title: 'Selbstwert & Grenzen',
    text: 'Klar kommunizieren, Nein sagen und dich selbst ernst nehmen.',
    detail:
      'Wir stärken Selbstbild und Sprache, üben klare Grenzen und trainieren Konfliktgespräche. So entsteht Sicherheit in Auftreten und Beziehungen.',
    points: ['Sicher auftreten', 'Grenzen respektieren'],
    icon: ShieldCheck,
    how: [
      'Selbstbild stärken & innere Regeln klären',
      'Grenzen formulieren & halten üben',
      'Konfliktgespräche strukturiert führen',
    ],
  },
];

export default function WorkSection() {
  return (
    <section className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] overflow-hidden bg-[var(--section-bg-accent)]'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-(--text) sm:text-4xl'>Wobei dir Coaching hilft</h2>
          <p className='mt-4 text-base text-(--text)/70 sm:text-lg'>Ruhe im Körper. Fokus im Leben.</p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-4'>
          {workItems.map((item) => (
            <GlassCard
              key={item.title}
              className='flex flex-col p-6'>
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-surface-strong ring-1 ring-border text-xl'>
                  <item.icon
                    aria-hidden='true'
                    className='h-5 w-5 text-accent'
                  />
                </div>
                <h3 className='text-lg font-semibold text-(--text)'>{item.title}</h3>
              </div>
              <p className='mt-4 text-sm text-(--text)/70'>{item.text}</p>
              <p className='mt-3 text-xs text-(--subtle) leading-relaxed'>{item.detail}</p>
              <ul className='mt-4 mb-4 space-y-2 text-xs text-(--subtle)'>
                {item.points.map((point) => (
                  <li
                    key={point}
                    className='flex items-center gap-2'>
                    <span className='h-1.5 w-1.5 rounded-full bg-(--accent-soft)' />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {/* mt-auto: „So erreichen wir das“ sitzt in allen vier Karten am unteren Rand */}
              <div className='mt-auto rounded-xl border border-border bg-surface p-3'>
                <p className='text-xs uppercase tracking-[0.2em] text-(--subtle)'>
                  So erreichen wir das
                </p>
                <ul className='mt-2 space-y-2 text-xs text-(--text)/70'>
                  {item.how.map((step) => (
                    <li
                      key={step}
                      className='flex items-start gap-2'>
                      <span className='mt-1 h-1.5 w-1.5 rounded-full bg-(--accent-soft)' />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
