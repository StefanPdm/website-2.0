import Link from 'next/link';

import GlassCard from '@/components/GlassCard';
import { gluecklichsein, ungluecklichsein } from '@/app/nlp/regeln/data';

/**
 * Ersetzt die frühere Testimonial-Sektion.
 *
 * Zwei Gründe für den Tausch: Sechs anonyme Fünf-Sterne-Stimmen mit
 * Stock-Portraits lesen sich als erfunden und schaden dem Vertrauen mehr als
 * sie nützen. Und die eigentliche Frage der Zielgruppe steht bisher nirgends
 * auf der Seite — obwohl Stefans eigene Geschichte genau davon handelt.
 *
 * Die Sektion stellt die Frage und übergibt an die beiden Regel-Unterseiten,
 * die sie von zwei Seiten beantworten.
 */

const symptoms = [
  'Von außen läuft es. Innen fühlt es sich nach Pflichtprogramm an.',
  'Der nächste Erfolg soll es richten – und tut es dann doch nicht.',
  'Du funktionierst zuverlässig und weißt nicht mehr, was du eigentlich willst.',
  'Abends bist du müde, aber nicht zufrieden.',
  'Du erfüllst Erwartungen, die nie jemand ausgesprochen hat.',
  'Ruhe fühlt sich unproduktiv an, statt erholsam.',
];

const cards = [
  {
    data: ungluecklichsein,
    kicker: 'Der Umweg',
    teaser:
      'Zwanzig Muster, mit denen Unglücklichsein zuverlässig gelingt. Ironisch gemeint – und trotzdem der schnellste Weg, sich selbst wiederzuerkennen.',
    accentFrom: '#fb7185',
    accentTo: '#94a3b8',
  },
  {
    data: gluecklichsein,
    kicker: 'Die Richtung',
    teaser:
      'Zwanzig Sätze, an denen ich mich selbst ausrichte. Keine Technik, keine Methode – eine Haltung, die man täglich neu wählt.',
    accentFrom: 'var(--accent)',
    accentTo: 'var(--accent-2)',
  },
];

export default function FulfilmentSection() {
  return (
    <section
      id='erfuellung'
      className='relative flex min-h-[80dvh] flex-col items-center justify-center border-y border-(--border) py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Die ehrliche Frage</p>
          <h2 className='mt-5 text-3xl font-semibold text-(--text) sm:text-4xl'>
            Beruflich erfolgreich – und trotzdem nicht erfüllt?
          </h2>
          <p className='mt-5 text-base leading-relaxed text-(--muted) sm:text-lg'>
            Es ist die Frage, die kaum jemand laut stellt: Warum fühlt sich ein Leben, das von außen
            gelingt, von innen manchmal so leer an?
          </p>
        </div>

        {/* Wiedererkennung vor Lösung */}
        <div className='mx-auto mt-14 grid max-w-4xl gap-x-8 gap-y-0 sm:grid-cols-2'>
          {symptoms.map((symptom) => (
            <div
              key={symptom}
              className='flex items-start gap-3 border-b border-(--border) py-4 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0'>
              <span
                aria-hidden='true'
                className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
              />
              <p className='text-sm leading-relaxed text-(--muted)'>{symptom}</p>
            </div>
          ))}
        </div>

        <div className='mx-auto mt-14 max-w-3xl space-y-5 text-center'>
          <p className='text-base leading-relaxed text-(--muted) sm:text-lg'>
            Ich kenne das nicht aus Büchern. Über zwanzig Jahre habe ich ein Unternehmen aufgebaut,
            das nach jedem messbaren Maßstab erfolgreich war – und bin trotzdem in Erschöpfung und
            Depression gelandet. Weil ich mein Glück im Außen gesucht habe.
          </p>
          <p className='text-base leading-relaxed text-(--text) sm:text-lg'>
            Erfüllung entsteht nicht durch das nächste Ziel. Sie entsteht durch eine Haltung, die
            man täglich neu wählt.
          </p>
        </div>

        {/* Übergabe an die beiden Regelwerke */}
        <div className='mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2'>
          {cards.map((card) => (
            <Link
              key={card.data.slug}
              href={card.data.href}
              className='group/card block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl'>
              <GlassCard className='relative flex h-full flex-col overflow-hidden p-7'>
                <span
                  aria-hidden='true'
                  className='absolute inset-x-0 top-0 h-1'
                  style={{
                    background: `linear-gradient(90deg, ${card.accentFrom}, ${card.accentTo})`,
                  }}
                />
                <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>{card.kicker}</p>
                <h3 className='mt-4 text-xl font-semibold text-(--text) sm:text-2xl'>
                  {card.data.title}
                </h3>
                <p className='mt-4 flex-1 text-sm leading-relaxed text-(--muted)'>{card.teaser}</p>
                <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover/card:gap-3'>
                  Alle 20 Regeln lesen
                  <span aria-hidden='true'>→</span>
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
