import Image from 'next/image';

import HeroCheckForm from '@/app/webdevelopment/components/HeroCheckForm';
import LiveMetrics from '@/app/webdevelopment/components/LiveMetrics';

/**
 * Hero-Variante B „Foto als Bühne“: Das Foto füllt rechts randlos bis an den
 * Bildschirmrand und läuft nach links ins Nachtblau aus; der Text steht links
 * darüber. Der Röntgen-Scan (`.hero-xray*` in globals.css) läuft über das
 * ganze Bild. Unten eine kompakte Leiste mit KI-Check und Live-Messung.
 */
export default function HeroStage({ trustItems }: { trustItems: string[] }) {
  return (
    <section className='relative overflow-hidden'>
      {/* Bühne: Foto randlos */}
      <div className='hero-xray hero-stage__photo relative h-[58svh] w-full lg:absolute lg:inset-0 lg:h-auto'>
        <Image
          src='/images-webdevelopment/stefan-heinemann-arbeitsplatz.webp'
          alt='Stefan Heinemann, Webentwickler aus Potsdam, an seinem Arbeitsplatz vor zwei Monitoren mit Code'
          fill
          priority
          sizes='100vw'
          className='object-cover object-[75%_20%]'
        />
        <div
          aria-hidden='true'
          className='hero-xray__blueprint absolute inset-0'>
          <Image
            src='/images-webdevelopment/stefan-heinemann-arbeitsplatz-bauplan.webp'
            alt=''
            fill
            sizes='100vw'
            className='object-cover object-[75%_20%]'
          />
          <span className='hero-xray__grid absolute inset-0' />
        </div>
        <span
          aria-hidden='true'
          className='hero-xray__beam pointer-events-none absolute inset-x-0'
        />
        {/* Ausläufe ins Nachtblau: links (Desktop), unten (beide), oben (Kopfzeile) */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 bg-linear-to-t from-[#06101c] via-[#06101c]/10 to-[#06101c]/40 lg:bg-[linear-gradient(90deg,#06101c_0%,#06101c_18%,rgba(6,16,28,0.8)_38%,rgba(6,16,28,0)_65%),linear-gradient(0deg,#06101c_0%,rgba(6,16,28,0)_35%),linear-gradient(180deg,rgba(6,16,28,0.6)_0%,rgba(6,16,28,0)_25%)]'
        />
        <span
          aria-hidden='true'
          className='absolute right-6 bottom-6 hidden font-mono text-[11px] text-accent-web/80 lg:block'>
          stefan.heinemann · Entwickler × Unternehmer
        </span>
      </div>

      {/* Raster über dem Auslauf links – wie im Seitenhintergrund, damit links keine
          Leerfläche entsteht */}
      <span
        aria-hidden='true'
        className='hero-stage__grid pointer-events-none absolute inset-0 hidden lg:block'
      />

      {/* Editor-Leiste am linken Rand (nur sehr breite Bildschirme): Zeilennummern,
          Linie mit Lichtpunkt im Takt des Scans, senkrechte Ortszeile. Rein dekorativ. */}
      <div
        aria-hidden='true'
        className='hero-rail pointer-events-none absolute inset-y-0 left-0 hidden 2xl:flex'>
        <ol className='hero-rail__numbers'>
          {Array.from({ length: 24 }, (_, i) => (
            <li key={i}>{String(i + 1).padStart(2, '0')}</li>
          ))}
        </ol>
        <span className='hero-rail__line'>
          <span className='hero-rail__dot' />
        </span>
        <span className='hero-rail__label'>Potsdam · Berlin · Brandenburg — seit 20 Jahren Unternehmer</span>
      </div>

      {/* Text über der Bühne */}
      <div className='relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6 md:px-8 lg:justify-center lg:pt-36 2xl:max-w-[86rem] 2xl:pl-40'>
        <div className='-mt-24 max-w-xl lg:mt-0'>
          <p className='mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10 backdrop-blur'>
            Webentwicklung in Potsdam · 20 Jahre Unternehmer
          </p>
          <h1 className='mb-8 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-[3.1rem]'>
            20 Jahre habe ich ein Unternehmen geführt.
            <br />
            <span className='bg-linear-to-r from-[#9bc7ff] via-accent-web to-white bg-clip-text text-transparent'>
              Heute baue ich die Systeme, die ich damals gebraucht hätte.
            </span>
          </h1>
          <p className='mb-10 max-w-md text-lg text-slate-300'>
            Websites, Shops und Kundenportale aus Potsdam – mit Struktur, Performance und
            Zukunftssicherheit statt Bastellösungen.
          </p>
          <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
            <a
              href='#kontakt'
              className='web-cta w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto'>
              Projekt anfragen
            </a>
            <a
              href='#technologien'
              className='w-full rounded-xl border border-white/20 bg-[#06101c]/60 px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto'>
              Technologien ansehen
            </a>
          </div>
          <ul className='mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300'>
            {trustItems.map((item) => (
              <li
                key={item}
                className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-[#86C243]' />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Leiste unten: KI-Check + Live-Messung */}
      <div className='relative z-10 mx-auto mt-12 w-full max-w-6xl px-4 pb-16 sm:px-6 md:px-8 lg:mt-16 lg:pb-16 2xl:max-w-[86rem] 2xl:pl-40'>
        <div className='grid gap-5 rounded-3xl border border-white/10 bg-[#030a13]/75 p-5 backdrop-blur-md md:p-6 lg:grid-cols-2 lg:items-center lg:gap-8'>
          <HeroCheckForm className='lg:px-2' />
          <LiveMetrics />
        </div>
      </div>
    </section>
  );
}
