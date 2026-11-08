import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import {
  Battery,
  Cog,
  Hourglass,
  type LucideIcon,
  MessageCircle,
  Moon,
  Trophy,
} from 'lucide-react';

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

/**
 * Jeder Satz hat ein 3D-Icon mit eigener, ruhiger Bewegung (`.sym3d*` in
 * globals.css): das Zahnrad dreht sich im Pflichtprogramm, der Mond wiegt sich
 * zwischen funkelnden Sternen, in der Sprechblase tippt jemand – und schickt
 * nie ab, der Pokal jubelt kurz und kippt dann um, der Akku entlädt sich, in
 * der Sanduhr rieselt Sand – dann dreht sie sich um.
 * Rein dekorativ, bei reduzierter Bewegung steht alles.
 */
const symptoms = [
  {
    text: 'Die Firma läuft. Du funktionierst – aber innen fühlt es sich nach Pflichtprogramm an.',
    Icon: Cog,
    motion: 'spin',
  },
  {
    text: 'Entscheidungen drehen sich nachts im Kopf, statt getroffen zu werden.',
    Icon: Moon,
    motion: 'night',
  },
  {
    text: 'Es gibt kaum jemanden, mit dem du offen über dich reden kannst.',
    Icon: MessageCircle,
    motion: 'typing',
  },
  {
    text: 'Der nächste Erfolg soll es richten – und tut es dann doch nicht.',
    Icon: Trophy,
    motion: 'cheer',
  },
  {
    text: 'Abends bist du müde, aber nicht zufrieden.',
    Icon: Battery,
    motion: 'drain',
  },
  {
    text: 'Ruhe fühlt sich unproduktiv an, statt erholsam.',
    Icon: Hourglass,
    motion: 'sand',
  },
];

/** Ebenen je Icon: dicht hintereinander gestaffelt ergeben sie eine feine Kante. */
const LAYERS = [0, 1, 2, 3];

/** Funken beim Jubel des Pokals: Flugrichtung in px. */
const SPARKS = [
  [-14, -12],
  [14, -14],
  [-18, 2],
  [18, 0],
  [0, -18],
];

/** Zusätze, die mit dem Icon im Raum liegen (Sterne, Tipp-Punkte, Ladung). */
const extras: Record<string, ReactNode> = {
  night: (
    <>
      <span className='sym3d__star sym3d__star--a' />
      <span className='sym3d__star sym3d__star--b' />
      <span className='sym3d__star sym3d__star--c' />
    </>
  ),
  typing: (
    <span className='sym3d__typing'>
      <span />
      <span />
      <span />
    </span>
  ),
  drain: <span className='sym3d__charge' />,
  cheer: (
    <>
      {SPARKS.map(([dx, dy], i) => (
        <span
          key={i}
          className='sym3d__spark'
          style={{ '--dx': `${dx}px`, '--dy': `${dy}px` } as CSSProperties}
        />
      ))}
    </>
  ),
  sand: (
    <>
      <span className='sym3d__sand sym3d__sand--top' />
      <span className='sym3d__sand sym3d__stream' />
      <span className='sym3d__sand sym3d__sand--bottom' />
    </>
  ),
};

/**
 * 3D-Icon: vier dicht gestaffelte Ebenen geben dem feinen Linien-Icon Tiefe
 * (vorn Kupfer, nach hinten dunkler), dazu eine eigene Bewegung im Raum.
 */
function Icon3D({ Icon, motion, delay }: { Icon: LucideIcon; motion: string; delay: number }) {
  return (
    <span
      aria-hidden='true'
      className='sym3d'
      style={{ '--delay': `${delay}s` } as CSSProperties}>
      <span className={`sym3d__obj sym3d--${motion}`}>
        {LAYERS.map((z) => (
          <Icon
            key={z}
            className='sym3d__layer'
            style={{ '--z': z } as CSSProperties}
          />
        ))}
        {extras[motion]}
      </span>
      <span className='sym3d__shadow' />
    </span>
  );
}

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
        <ul className='mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {symptoms.map(({ text, Icon, motion }, index) => (
            <li
              key={text}
              className='symptom-card group flex items-start gap-4 rounded-2xl border border-card-border bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:bg-surface-strong hover:shadow-[0_18px_40px_var(--card-shade),0_0_34px_var(--glow)]'>
              <Icon3D
                Icon={Icon}
                motion={motion}
                delay={index * -1.3}
              />
              <p className='pt-0.5 text-sm leading-relaxed text-(--text) sm:text-[0.95rem]'>{text}</p>
            </li>
          ))}
        </ul>

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
