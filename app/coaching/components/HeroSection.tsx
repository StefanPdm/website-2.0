import { getImageProps } from 'next/image';

import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';

const heroChips = ['Erstgespräch kostenlos', 'Bei mir, bei dir oder online', 'Ø 180 Min pro Session'];

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
      className='relative isolate flex min-h-dvh items-end overflow-hidden lg:items-center'>
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
        className='absolute inset-0 -z-10 bg-linear-to-t from-(--bg) via-(--bg)/85 to-(--bg)/5 lg:bg-linear-to-r lg:from-(--bg) lg:via-(--bg)/70 lg:to-transparent'
      />

      <div className='container mx-auto px-4 pb-14 pt-[42dvh] lg:pb-24 lg:pt-40'>
        <div className='max-w-xl'>
          {/* Die H1 trägt die Suchfrage, die große Zeile darunter die Ansprache. */}
          <h1 className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
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

          <ul className='mt-8 flex flex-wrap gap-2'>
            {heroChips.map((item) => (
              <li
                key={item}
                className='rounded-full border border-border bg-surface px-4 py-2 text-xs text-(--text) backdrop-blur'>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
