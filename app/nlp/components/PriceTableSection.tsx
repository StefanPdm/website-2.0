'use client';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';

const prices = [
  {
    title: 'Startersession',
    duration: 'ca. 150 min',
    price: '339,15 €',
    icon: '🚀',
    mentoring: false,
    highlight: false,
    bullets: [
      'Tiefen-Check: Standort, Ziele, innere Blockaden.',
      'Erste NLP-Interventionen für sofortige Klarheit.',
      'Konkreter Umsetzungsplan für die nächsten 14 Tage.',
    ],
    note: 'Ideal als intensiver Einstieg und Orientierung.',
  },
  {
    title: 'Folgesession',
    duration: 'ca. 90 min',
    price: '226,10 €',
    icon: '⚡',
    mentoring: false,
    highlight: false,
    bullets: [
      'Vertiefung & Feintuning deiner Ziele.',
      'Arbeit an Mustern, Entscheidungen, innerer Ruhe.',
      'Stabilisierung und Fortschrittskontrolle.',
    ],
    note: 'Perfekt für nachhaltige Umsetzung im Alltag.',
  },
  {
    title: 'Mentoring 3 Monate',
    duration: '3 Monate Begleitung',
    price: '2.990,00 €',
    icon: '⭐',
    mentoring: true,
    highlight: true,
    bullets: [
      'Strategische Zielarbeit & Identitäts-Alignment.',
      'Regelmäßige Sessions + WhatsApp-Support.',
      'Schnelle Interventionen bei Stress & Blockaden.',
      'Messbare Fortschritte mit klarer Roadmap.',
    ],
    note: 'Beliebt für Fokus, Klarheit und schnelle Ergebnisse.',
  },
  {
    title: 'Mentoring 6 Monate',
    duration: '6 Monate Begleitung',
    price: '4.990,00 €',
    icon: '🏆',
    mentoring: true,
    highlight: false,
    bullets: [
      'Tiefe Transformation mit stabiler Umsetzung.',
      'Langfristige Routinen und mentale Stärke.',
      'Verankerung neuer Gewohnheiten & Entscheidungen.',
    ],
    note: 'Für nachhaltige Veränderung und dauerhafte Wirkung.',
  },
];

export default function PriceTableSection() {
  return (
    <section
      id='workshops'
      className='relative py-20 flex flex-col justify-center items-center min-h-[60dvh] backdrop-blur-2xl bg-(--section-bg-accent)'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Preisübersicht</h2>
          <p className='mt-4 text-base text-white/70 sm:text-lg'>
            Klar, transparent, ohne versteckte Kosten. Wähle das Paket, das zu deinem Ziel passt.
          </p>
        </div>
        <div className='mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4'>
          {prices.map((item) => {
            const isMentoring = item.mentoring;

            return (
              <GlassCard
                key={item.title}
                className={`flex h-full flex-col p-6 text-left ${
                  item.highlight
                    ? 'ring-1 ring-(--accent)/45 shadow-[0_0_60px_var(--glow-strong)]'
                    : ''
                }`}>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] ${
                        isMentoring
                          ? 'border-(--accent)/40 bg-(--accent)/10 font-semibold text-accent'
                          : 'border-(--accent)/40 bg-white/5 text-white/70'
                      }`}>
                      {isMentoring ? 'Mentoring' : 'Session'}
                    </span>
                    <p className='mt-3 text-xs uppercase tracking-[0.3em] text-white/60'>
                      {item.duration}
                    </p>
                    <h3 className='mt-2 text-lg font-semibold text-white'>{item.title}</h3>
                  </div>
                  <div className='flex flex-col items-end gap-2'>
                    <span className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg'>
                      {item.icon}
                    </span>
                    {item.highlight && (
                      <span className='rounded-full border border-(--accent)/40 bg-(--accent)/15 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-accent'>
                        Beliebt
                      </span>
                    )}
                  </div>
                </div>
                <div className='mt-6 text-3xl font-semibold text-white'>{item.price}</div>
                <p className='mt-2 text-xs text-white/60'>inkl. MwSt.</p>
                <ul className='mt-5 space-y-3 text-sm text-white/75 flex-1'>
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className='flex gap-2'>
                      <span className='text-accent'>•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className='mt-6 text-xs text-white/60'>{item.note}</p>
                {item.highlight ? (
                  <PrimaryButton
                    href='#kontakt'
                    className='mt-6 w-full'>
                    Jetzt anfragen
                  </PrimaryButton>
                ) : (
                  <SecondaryButton
                    href='#kontakt'
                    className='mt-6 w-full'>
                    Beratung sichern
                  </SecondaryButton>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
