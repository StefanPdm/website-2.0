import Image from 'next/image';

import BreathRings from '@/app/coaching/components/BreathRings';
import { SecondaryButton } from '@/app/coaching/components/Buttons';

/**
 * „Kennst du das?“ – Wiedererkennung direkt nach dem Hero (seit 2026-11).
 * Die Regel-Karten von früher stehen jetzt in der Impulse-Reihe.
 *
 * Ursprünglich Ersatz der früheren Testimonial-Sektion.
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
  'Die Firma läuft. Du funktionierst – aber innen fühlt es sich nach Pflichtprogramm an.',
  'Entscheidungen drehen sich nachts im Kopf, statt getroffen zu werden.',
  'Es gibt kaum jemanden, mit dem du offen über dich reden kannst.',
  'Der nächste Erfolg soll es richten – und tut es dann doch nicht.',
  'Abends bist du müde, aber nicht zufrieden.',
  'Ruhe fühlt sich unproduktiv an, statt erholsam.',
];

export default function FulfilmentSection() {
  return (
    <section
      id='erfuellung'
      className='relative flex min-h-[80dvh] flex-col items-center justify-center overflow-hidden border-y border-(--border) py-20'>
      <BreathRings className='-left-56 -top-40 w-[640px]' />
      <div className='container relative mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Kennst du das?</p>
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

        {/* Die eigene Geschichte mit Gesicht – Hochformat-Foto, Potsdam. */}
        <div className='mx-auto mt-16 grid max-w-4xl items-center gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12'>
          <div className='relative mx-auto aspect-2/3 w-full max-w-xs overflow-hidden rounded-3xl border border-border md:max-w-none'>
            <Image
              src='/images-nlp/portrait-park-potsdam.webp'
              alt='Stefan Heinemann im Abendlicht in einem Potsdamer Schlosspark'
              fill
              sizes='(min-width: 768px) 320px, 320px'
              className='object-cover object-top'
            />
          </div>
          <div className='space-y-5 text-center md:text-left'>
            <p className='text-base leading-relaxed text-(--muted) sm:text-lg'>
              Ich kenne das nicht aus Büchern. Über zwanzig Jahre habe ich ein Unternehmen
              aufgebaut, das nach jedem messbaren Maßstab erfolgreich war – und bin trotzdem in
              Erschöpfung und Depression gelandet. Weil ich mein Glück im Außen gesucht habe.
            </p>
            <p className='text-base leading-relaxed text-(--text) sm:text-lg'>
              Erfüllung entsteht nicht durch das nächste Ziel. Sie entsteht durch eine Haltung, die
              man täglich neu wählt.
            </p>
          </div>
        </div>

        <div className='mt-10 flex justify-center'>
          <SecondaryButton href='#kontakt'>Darüber sprechen – unverbindlich</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
