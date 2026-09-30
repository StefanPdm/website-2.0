import Image from 'next/image';

/**
 * „Wer baut das?" – die Person hinter Welt B.
 *
 * Steht bewusst direkt vor den Referenzen: erst die Person, dann die Belege.
 * Wer einen Freelancer sucht, kauft zuerst den Menschen – und Google bewertet
 * erkennbare Erfahrung (E-E-A-T) ausdrücklich mit.
 *
 * Gestaltung: Das Portrait trägt einen Auswahlrahmen wie in einem Design-Tool
 * (gestrichelte Box, Eckgriffe, Ebenen-Label). Rein dekorativ und `aria-hidden`
 * – ein Augenzwinkern für die Zielgruppe, ohne Information zu transportieren.
 *
 * Server Component: reiner Lesestoff, kein State, kein Effekt.
 */

const stats = [
  { value: '20+', label: 'Jahre Unternehmer' },
  { value: 'bis 20', label: 'Mitarbeitende geführt' },
  { value: '3', label: 'Filialen' },
];

/** Aus dem Text abgeleitet: die Schnittstelle, an der gearbeitet wird. */
const intersection = [
  { title: 'Mensch', text: 'Zuhören, nachfragen, verstehen.' },
  { title: 'Unternehmen', text: 'Ziel, Vertrauen, Wirtschaftlichkeit.' },
  { title: 'Technik', text: 'Sauber, zuverlässig, verständlich.' },
];

const handles = ['-left-1.5 -top-1.5', '-right-1.5 -top-1.5', '-bottom-1.5 -left-1.5', '-bottom-1.5 -right-1.5'];

export default function AboutDeveloperSection() {
  return (
    <section
      id='ueber-mich'
      aria-labelledby='ueber-mich-titel'
      // Kein overflow-clip hier: Er schnitte Glow und Eckgriffe an der Sektionskante
      // hart ab. Horizontales Scrollen verhindert schon der Seiten-Wrapper.
      className='relative mx-auto max-w-6xl px-4 py-24 md:py-32'>
      <div className='grid items-center gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-20'>
        {/* Portrait mit Auswahlrahmen – px-3 lässt Rahmen (-inset-3) und Eckgriffe
            auch am Bildschirmrand vollständig stehen */}
        <div className='px-3'>
          <figure className='relative mx-auto mt-10 w-full max-w-sm md:mt-0 md:max-w-none'>
            <div
              aria-hidden='true'
              className='absolute -inset-10 -z-10 rounded-[48px] bg-linear-to-br from-[#1D6FA8]/45 via-transparent to-[#7A2C8E]/45 blur-3xl'
            />

            <div className='relative overflow-hidden rounded-[28px] ring-1 ring-white/15 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)]'>
              <Image
                src='/images-webdevelopment/stefan-heinemann-webentwickler.webp'
                alt='Stefan Heinemann, Webentwickler aus Potsdam, mit verschränkten Armen und orangefarbener Brille'
                width={800}
                height={1000}
                sizes='(min-width: 768px) 38vw, 90vw'
                className='h-auto w-full'
              />
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-[#0B1B2B] via-[#0B1B2B]/60 to-transparent'
              />
              <figcaption className='absolute inset-x-0 bottom-0 p-6'>
                <span className='block text-lg font-semibold text-white'>Stefan Heinemann</span>
                <span className='mt-1 block text-xs text-slate-300'>
                  Webentwickler · Unternehmer · New Solutions Creator
                </span>
              </figcaption>
            </div>

            {/* Auswahlrahmen wie in einem Design-Tool */}
            <div
              aria-hidden='true'
              className='pointer-events-none absolute -inset-3 rounded-[34px] border border-dashed border-accent-web/60'>
              {handles.map((position) => (
                <span
                  key={position}
                  className={`absolute h-3 w-3 rounded-[3px] border border-accent-web bg-[#0B1B2B] ${position}`}
                />
              ))}
              <span className='absolute -top-9 left-0 rounded-md bg-accent-web px-2 py-1 font-mono text-xs font-semibold text-[#0B1B2B]'>
                stefan.heinemann
              </span>
              <span className='absolute -bottom-9 right-0 rounded-md border border-white/15 bg-[#0B1B2B]/80 px-2 py-1 font-mono text-xs text-slate-300 backdrop-blur-md'>
                Unternehmer × Entwickler
              </span>
            </div>
          </figure>
        </div>

        {/* Text */}
        <div>
          <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
            Wer baut das?
          </p>
          <h2
            id='ueber-mich-titel'
            className='mt-6 text-3xl font-bold tracking-tight text-white'>
            Webentwicklung mit Unternehmerblick
          </h2>
          <p className='mt-5 text-lg leading-relaxed text-slate-300'>
            Ich bin Stefan Heinemann – Webentwickler, Unternehmer und New Solutions Creator. Bevor
            ich in die IT wechselte, führte ich über 20 Jahre ein eigenes Unternehmen mit mehreren
            Filialen und bis zu 20 Mitarbeitenden. Deshalb betrachte ich eine Website nie nur als
            technisches Projekt: Sie muss zum Unternehmen passen, Vertrauen schaffen und ein
            konkretes Ziel erfüllen.
          </p>

          <dl className='mt-8 grid grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md'>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className='flex flex-col-reverse gap-1 px-4 py-4 sm:px-5'>
                <dt className='text-xs text-slate-300'>{stat.label}</dt>
                <dd className='bg-linear-to-r from-accent-web to-white bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className='mt-8 text-sm leading-relaxed text-slate-300'>
            Heute entwickle ich moderne Websites, Online-Shops und individuelle Kundenportale – von
            WordPress und WooCommerce bis zu maßgeschneiderten Anwendungen mit Next.js, React und
            modernen Datenbanksystemen. Dabei verbinde ich sauberes Design, zuverlässige Technik und
            eine verständliche Nutzerführung mit dem Blick für wirtschaftlich sinnvolle Lösungen.
          </p>
          <p className='mt-4 text-sm leading-relaxed text-slate-300'>
            Meine besondere Stärke liegt an der Schnittstelle zwischen Mensch, Unternehmen und
            Technik. Ich höre zu, frage nach und übersetze auch komplexe Anforderungen in Lösungen,
            die einfach funktionieren. Ohne Fachchinesisch, ohne digitale Spielereien um ihrer
            selbst willen – dafür persönlich, lösungsorientiert und mit dem Anspruch, Verantwortung
            für das Ergebnis zu übernehmen.
          </p>

          {/* Schnittstelle: drei Knoten auf einer Linie */}
          <div className='relative mt-10'>
            <span
              aria-hidden='true'
              className='absolute bottom-2 left-1.5 top-2 w-px bg-linear-to-b from-[#1D6FA8] via-accent-web to-[#7A2C8E] sm:bottom-auto sm:left-0 sm:top-1.5 sm:h-px sm:w-full sm:bg-linear-to-r'
            />
            <ul
              aria-label='Die Schnittstelle, an der ich arbeite'
              className='grid gap-6 sm:grid-cols-3 sm:gap-4'>
              {intersection.map((item) => (
                <li
                  key={item.title}
                  className='relative pl-8 sm:pl-0 sm:pt-8'>
                  <span
                    aria-hidden='true'
                    className='absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-accent-web bg-[#0B1B2B] shadow-[0_0_14px_rgba(45,212,191,0.6)] sm:top-0'
                  />
                  <span className='block text-sm font-semibold text-white'>{item.title}</span>
                  <span className='mt-1 block text-xs text-slate-300'>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Leitsatz */}
      <blockquote className='relative mx-auto mt-24 max-w-4xl text-center'>
        <span
          aria-hidden='true'
          className='mx-auto mb-10 block h-px w-24 bg-linear-to-r from-transparent via-accent-web to-transparent'
        />
        <p className='relative text-2xl font-semibold leading-snug tracking-tight text-white md:text-4xl'>
          Ich entwickle nicht einfach Websites.{' '}
          <span className='bg-linear-to-r from-accent-web via-[#9bd7ff] to-white bg-clip-text text-transparent'>
            Ich schaffe digitale Lösungen, die Menschen verstehen und Unternehmen wirklich
            weiterbringen.
          </span>
        </p>
      </blockquote>
    </section>
  );
}
