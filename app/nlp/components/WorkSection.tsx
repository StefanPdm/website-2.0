'use client';

import GlassCard from '@/components/GlassCard';

const workItems = [
  {
    title: 'Gedankenkarussell',
    text: 'Mehr innere Ruhe, weniger Dauerschleifen im Kopf.',
    detail:
      'Wir identifizieren wiederkehrende Gedankenketten, entkoppeln sie von Stressreaktionen und trainieren Fokus-Wechsel. Du bekommst klare Anker für den Alltag, damit Grübeln nicht mehr automatisch übernimmt.',
    points: ['Klarer denken', 'Selbststeuerung stärken'],
    icon: '🌀',
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
    icon: '💗',
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
    icon: '🎯',
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
    icon: '🛡️',
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
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Woran ich arbeite</h2>
          <p className='mt-4 text-base text-white/70 sm:text-lg'>Ruhe im Körper. Fokus im Leben.</p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-4'>
          {workItems.map((item) => (
            <GlassCard
              key={item.title}
              className='p-6'>
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 text-xl'>
                  <span aria-hidden='true'>{item.icon}</span>
                </div>
                <h3 className='text-lg font-semibold text-white'>{item.title}</h3>
              </div>
              <p className='mt-4 text-sm text-white/70'>{item.text}</p>
              <p className='mt-3 text-xs text-white/60 leading-relaxed'>{item.detail}</p>
              <ul className='mt-4 space-y-2 text-xs text-white/60'>
                {item.points.map((point) => (
                  <li
                    key={point}
                    className='flex items-center gap-2'>
                    <span className='h-1.5 w-1.5 rounded-full bg-[#7DE3FF]' />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className='mt-4 rounded-xl border border-white/10 bg-white/5 p-3'>
                <p className='text-[11px] uppercase tracking-[0.2em] text-white/50'>
                  So erreichen wir das
                </p>
                <ul className='mt-2 space-y-2 text-xs text-white/70'>
                  {item.how.map((step) => (
                    <li
                      key={step}
                      className='flex items-start gap-2'>
                      <span className='mt-1 h-1.5 w-1.5 rounded-full bg-[#7DE3FF]' />
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
