import HeroCheckForm from '@/app/webdevelopment/components/HeroCheckForm';
import HeroPortrait from '@/app/webdevelopment/components/HeroPortrait';
import LiveMetrics from '@/app/webdevelopment/components/LiveMetrics';

/** Hero-Variante A „Split + Beleg-Band“ (Git-Tag `hero-variante-a`). */
export default function HeroSplit({ trustItems }: { trustItems: string[] }) {
  return (
    <>
    {/* Hero Section – Split oben, Beleg-Band unten (2026-11) */}
    <section className='relative overflow-hidden pt-32 pb-16 md:pt-36 lg:pb-24'>
      <div className='relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16'>
          {/* Links: nur das Wesentliche */}
          <div className='flex flex-col items-start'>
            <p className='mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
              Webentwicklung in Potsdam · 20 Jahre Unternehmer
            </p>
            <h1 className='mb-8 text-[2rem] font-extrabold leading-tight tracking-tight text-white md:text-[2.75rem]'>
              20 Jahre habe ich ein Unternehmen geführt.
              <br />
              <span className='bg-linear-to-r from-[#9bc7ff] via-accent-web to-white bg-clip-text text-transparent'>
                Heute baue ich die Systeme, die ich damals gebraucht hätte.
              </span>
            </h1>
            <p className='mb-10 max-w-130 text-lg text-slate-300'>
              Webentwicklung aus Potsdam für Unternehmer, Coaches und Teams in Berlin und
              Brandenburg: Websites, Shops und Kundenportale mit Struktur, Performance und
              Zukunftssicherheit – statt Bastellösungen.
            </p>
            <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
              <a
                href='#kontakt'
                className='web-cta w-full px-6 py-3.5 text-center text-sm font-semibold sm:w-auto'>
                Projekt anfragen
              </a>
              <a
                href='#technologien'
                className='w-full rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto'>
                Technologien ansehen
              </a>
            </div>
          </div>
          {/* Rechts: Porträt, so hoch wie die Textspalte – mobil zuerst */}
          <div className='order-first w-full lg:order-none'>
            <HeroPortrait />
          </div>
        </div>

        {/* Beleg-Band: KI-Check · Live-Messung · Arbeitsweise */}
        <div className='mt-16 grid gap-6 rounded-3xl border border-white/10 bg-[#030a13]/60 p-5 backdrop-blur-md md:p-6 lg:mt-20 lg:grid-cols-[1.15fr_1.15fr_0.7fr] lg:items-center lg:gap-8'>
          {/* Adresse eingeben → scrollt zum Check im Röntgenblick-Abschnitt und prüft */}
          <HeroCheckForm className='lg:px-2' />
          <LiveMetrics />
          <ul className='grid gap-3 text-sm text-slate-300 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:border-white/10 lg:pl-8'>
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
    </section>
    </>
  );
}
