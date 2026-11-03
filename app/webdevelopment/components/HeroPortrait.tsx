import Image from 'next/image';

/**
 * Hero-Porträt von Welt B mit Röntgen-Scan.
 *
 * Zwei deckungsgleiche Bilder: das Foto und eine Bauplan-Version (Kanten,
 * türkis, aus dem Foto erzeugt – ffmpeg edgedetect, siehe CLAUDE.md §6).
 * Ein Scan-Balken – derselbe wie auf der Startseite – läuft über das Bild;
 * nur in seinem Band ist der Bauplan sichtbar (CSS-Maske, `.hero-xray*` in
 * globals.css). Reines CSS, kein WebGL; bei reduzierter Bewegung bleibt das
 * Foto ohne Scan stehen.
 *
 * Rahmen mit Ecken und Maßangabe zitieren ein Design-Tool – wie das
 * Portrait in „Wer baut das?“, rein dekorativ.
 */
export default function HeroPortrait() {
  return (
    <figure className='hero-xray relative w-full'>
      <div className='relative overflow-hidden rounded-3xl border border-white/15 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9),0_0_60px_-20px_rgba(29,111,168,0.6)] max-sm:aspect-4/3 sm:aspect-3/2 lg:aspect-square'>
        <Image
          src='/images-webdevelopment/stefan-heinemann-arbeitsplatz.webp'
          alt='Stefan Heinemann, Webentwickler aus Potsdam, an seinem Arbeitsplatz vor zwei Monitoren mit Code'
          fill
          priority
          sizes='(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw'
          className='object-cover object-[78%_center]'
        />
        <div
          aria-hidden='true'
          className='hero-xray__blueprint absolute inset-0'>
          <Image
            src='/images-webdevelopment/stefan-heinemann-arbeitsplatz-bauplan.webp'
            alt=''
            fill
            sizes='(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw'
            className='object-cover object-[78%_center]'
          />
          <span className='hero-xray__grid absolute inset-0' />
        </div>
        <span
          aria-hidden='true'
          className='hero-xray__beam pointer-events-none absolute inset-x-0'
        />
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#06101c]/80 to-transparent'
        />
      </div>

      {/* Design-Tool-Rahmen */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -inset-3 hidden rounded-[1.9rem] border border-dashed border-accent-web/30 sm:block'>
        {['-left-1.5 -top-1.5', '-right-1.5 -top-1.5', '-left-1.5 -bottom-1.5', '-right-1.5 -bottom-1.5'].map(
          (pos) => (
            <span
              key={pos}
              className={`absolute h-3 w-3 rounded-sm border border-accent-web bg-[#06101c] ${pos}`}
            />
          ),
        )}
        <span className='absolute -bottom-7 right-0 font-mono text-[11px] text-accent-web/80'>
          stefan.heinemann · Entwickler × Unternehmer
        </span>
      </div>
    </figure>
  );
}
