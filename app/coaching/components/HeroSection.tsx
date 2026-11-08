import { getImageProps } from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Compass } from 'lucide-react';

import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';

/** Fakten als Textzeile mit Häkchen – bewusst nicht als Pillen, die wie Buttons wirken. */
const heroFacts = ['DVNLP-zertifiziert', 'Bei mir, bei dir oder online', 'Ø 180 Min pro Session'];

/*
 * Art Direction: Hochformat-Foto für hochkant gehaltene Displays, Querformat
 * sonst. next/image kann das nicht mit einer Quelle – `getImageProps` liefert
 * die optimierten srcSets für ein <picture> (offizielles Next.js-Muster, darum
 * hier ausnahmsweise <img>).
 */
const heroAlt = 'Stefan Heinemann im Coaching-Gespräch mit einem Klienten in Potsdam';
const {
  props: { srcSet: portraitSrcSet },
} = getImageProps({
  src: '/images-nlp/coaching-gespraech-hoch.webp',
  alt: heroAlt,
  width: 1024,
  height: 1536,
  sizes: '100vw',
});
const { props: landscapeProps } = getImageProps({
  src: '/images-nlp/coaching-gespraech.webp',
  alt: heroAlt,
  width: 1536,
  height: 1024,
  sizes: '100vw',
  priority: true,
});

/**
 * Hero mit echtem Foto als Bühne (2026-11). Ersetzt Portraitrahmen und
 * FloatingLines: Coaching verkauft sich über Person und Haltung, nicht über
 * Effekte – und die Seite spart einen WebGL-Kontext.
 *
 * Bildaufbau (Querformat): Stefan sitzt rechts, links liegt eine dunkle Wand.
 * Hochformat: Stefan im oberen Drittel, unten Platz für den Text. Der Verlauf
 * in --bg legt die Textfläche genau dorthin (Desktop: von links, Mobil: von
 * unten). Funktioniert in beiden Themes, weil der Verlauf die Theme-Farbe nutzt.
 */
export default function HeroSection() {
  return (
    <section
      id='start'
      className='tone-dark relative isolate flex min-h-dvh items-end overflow-hidden lg:items-center'>
      <picture className='absolute inset-0 -z-20'>
        <source
          media='(orientation: portrait)'
          srcSet={portraitSrcSet}
        />
        <img
          {...landscapeProps}
          alt={heroAlt}
          className='h-full w-full object-cover object-[60%_15%] landscape:object-[75%_center]'
        />
      </picture>
      <div
        aria-hidden='true'
        className='hero-veil absolute inset-0 -z-10'
      />

      <div className='container mx-auto px-4 pb-14 pt-[42dvh] lg:pb-24 lg:pt-40'>
        <div className='max-w-xl'>
          {/* Die H1 trägt die Suchfrage, die große Zeile darunter die Ansprache. */}
          {/* hero-eyebrow: enger dunkler Schatten um die Buchstaben – mobil lag die Zeile bei 3,7 : 1 */}
          <h1 className='hero-eyebrow text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Life Coaching für Unternehmer · Potsdam, Berlin &amp; online
          </h1>
          <p className='mt-5 text-4xl font-semibold leading-tight text-(--text) sm:text-5xl lg:text-6xl'>
            Dein Unternehmen läuft.
            <br />
            Und du?
          </p>
          <p className='mt-6 text-base text-(--muted) sm:text-lg'>
            Für Unternehmer, die nach außen funktionieren – und innen wieder Klarheit, Ruhe und
            Richtung brauchen. Ohne esoterischen Nebel.
          </p>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <PrimaryButton
              href='#kontakt'
              className='w-full sm:w-auto'>
              Kostenloses Erstgespräch
            </PrimaryButton>
            <SecondaryButton
              href='#ansatz'
              className='w-full sm:w-auto'>
              Wie ich arbeite
            </SecondaryButton>
          </div>

          <ul className='mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-(--muted)'>
            {heroFacts.map((item) => (
              <li
                key={item}
                className='flex items-center gap-1.5'>
                <Check
                  aria-hidden='true'
                  className='h-4 w-4 text-accent'
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Kostenloser Einstieg – Gegenstück zum KI-Check in Welt B */}
          <Link
            href='/coaching/persoenlichkeitstest'
            className='group mt-8 flex w-full max-w-md items-center gap-4 rounded-2xl border border-card-border bg-(--bg)/70 p-4 backdrop-blur transition hover:border-(--accent)/80 hover:bg-(--accent)/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
            <span className='grid h-11 w-11 shrink-0 place-items-center rounded-full bg-(--accent)/15 text-accent ring-1 ring-(--accent)/40'>
              <Compass
                aria-hidden='true'
                className='h-5 w-5'
              />
            </span>
            <span className='min-w-0 flex-1'>
              <span className='block text-sm font-semibold text-(--text)'>
                Wie tickst du? Kostenloser Persönlichkeitstest
              </span>
              <span className='block text-xs text-(--muted)'>18 Fragen · Auswertung sofort</span>
            </span>
            <ArrowRight
              aria-hidden='true'
              className='h-5 w-5 shrink-0 text-accent transition group-hover:translate-x-1'
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
