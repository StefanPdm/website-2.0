import Link from 'next/link';

const trustItems = ['Persönlich & direkt', 'Sauberer Code', 'Wartbar & skalierbar'];

const services = [
  {
    title: 'Websites & Landingpages',
    intro: 'Websites, die führen – nicht verwirren.',
    bullets: [
      'SEO-ready',
      'Mobile-first',
      'Saubere Informationsarchitektur',
      'Schnelle Ladezeiten',
    ],
  },
  {
    title: 'Web Apps & Kundenportale',
    intro: 'Individuelle Anwendungen statt Insellösungen.',
    bullets: ['Login-Bereiche', 'Dashboards', 'Dokumentenverwaltung', 'Rollen & Rechte'],
  },
  {
    title: 'Headless & Schnittstellen',
    intro: 'Systeme, die miteinander sprechen.',
    bullets: [
      'Headless CMS',
      'REST & GraphQL APIs',
      'Automatisierungen',
      'Entkoppelte Architekturen',
    ],
  },
  {
    title: 'UX & Struktur',
    intro: 'Technik folgt Klarheit.',
    bullets: [
      'UX-Konzeption',
      'Seiten- & Datenstruktur',
      'Klare Nutzerflüsse',
      'Verständliche Logik',
    ],
  },
];

const techStack = {
  Frontend: ['Next.js', 'Angular', 'React', 'Tailwind CSS'],
  'Backend & Daten': ['Node.js', 'Prisma', 'REST', 'GraphQL'],
  'Auth & Infrastruktur': ['Clerk', 'Firebase', 'Supabase', 'Vercel', 'Docker'],
  'CMS & Inhalte': ['Headless CMS', 'WordPress (ACF, CPTs)'],
  Qualität: ['Performance-Optimierung', 'SEO-Basics', 'Wartbarkeit', 'Saubere Übergabe'],
};

const processSteps = [
  {
    title: 'Verstehen',
    description: 'Ziel, Nutzer, Kontext. Was soll entstehen – und wofür?',
  },
  {
    title: 'Struktur',
    description: 'Seiten, Daten, Prozesse. Klare Architektur statt Flickwerk.',
  },
  {
    title: 'Umsetzung',
    description: 'Sauberer Code, verständlich aufgebaut. Wartbar und erweiterbar.',
  },
  {
    title: 'Feinschliff',
    description: 'Performance, UX, Details. Spürbar – auch wenn unsichtbar.',
  },
  {
    title: 'Übergabe',
    description: 'Dokumentiert, erklärt, nutzbar. Kein Blackbox-Projekt.',
  },
];

const audiences = [
  'Unternehmer & Selbstständige',
  'Coaches & Berater',
  'Kleine bis mittlere Unternehmen',
  'Agenturen (White Label)',
];

const cases = ['Interne Projekte', 'Kundenportal', 'B2B-Websites'];

export default function WebdevelopmentPage() {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <header className='sticky top-0 z-50 border-b border-white/10 bg-[#0B1B2B]/80 backdrop-blur'>
        <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3'>
          <Link
            className='flex items-center gap-3 font-semibold text-white'
            href='/'>
            <span className='grid h-9 w-9 place-items-center rounded-xl bg-[#1D6FA8] text-white'>
              S
            </span>
            <span className='leading-tight'>
              <span className='block text-sm'>[Dein Name] Systems</span>
              <span className='block text-xs font-normal text-slate-300'>
                Klare Systeme. Digitale Wirkung.
              </span>
            </span>
          </Link>

          <nav className='hidden items-center gap-6 text-sm text-slate-300 md:flex'>
            <Link
              href='/'
              className='hover:text-white'>
              Start
            </Link>
            <a
              href='#leistungen'
              className='hover:text-white'>
              Leistungen
            </a>
            <a
              href='#technologien'
              className='hover:text-white'>
              Technologien
            </a>
            <a
              href='#prozess'
              className='hover:text-white'>
              Arbeitsweise
            </a>
            <a
              href='#zielgruppe'
              className='hover:text-white'>
              Für wen
            </a>
            <a
              href='#kontakt'
              className='hover:text-white'>
              Kontakt
            </a>
          </nav>

          <a
            href='#kontakt'
            className='inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0B1B2B] transition hover:opacity-90'>
            Projekt anfragen
          </a>
        </div>
      </header>

      <section className='relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute -top-24 right-0 h-72 w-[48rem] rounded-full bg-gradient-to-r from-[#1D6FA8]/20 via-[#7A2C8E]/10 to-transparent blur-3xl'></div>
          <div className='absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#F6B35A]/20 blur-2xl'></div>
        </div>

        <div className='relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24'>
          <div>
            <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
              Technischer Möglichmacher · Klarheit & Struktur
            </p>
            <h1 className='mt-5 text-4xl font-extrabold tracking-tight text-white md:text-5xl'>
              Klare Websites.
              <br className='hidden md:block' />
              Saubere Systeme.
              <br className='hidden md:block' />
              Entwicklung, die trägt.
            </h1>
            <p className='mt-4 text-lg text-slate-300'>
              Webentwicklung für Unternehmer, Coaches und Teams, die keine Bastellösungen wollen –
              sondern Struktur, Performance und Zukunftssicherheit.
            </p>
            <div className='mt-7 flex flex-wrap gap-3'>
              <a
                href='#kontakt'
                className='rounded-xl bg-gradient-to-r from-[#1D6FA8] to-[#7A2C8E] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
                Projekt anfragen
              </a>
              <a
                href='#technologien'
                className='rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10'>
                Technologien ansehen
              </a>
            </div>
            <div className='mt-6 flex flex-wrap gap-4 text-sm text-slate-300'>
              {trustItems.map((item) => (
                <span
                  key={item}
                  className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className='relative'>
            <div className='rounded-3xl bg-white/10 p-6 ring-1 ring-white/10 shadow-[0_40px_80px_-60px_rgba(0,0,0,0.7)]'>
              <div className='grid gap-4'>
                <div className='rounded-2xl bg-white/95 p-4 text-xs text-slate-500'>
                  UI Mockups / Code Snippets
                </div>
                <div className='rounded-2xl bg-white/95 p-4 text-xs text-slate-500'>
                  Architektur & Systeme
                </div>
                <div className='rounded-2xl bg-white/95 p-4 text-xs text-slate-500'>
                  Skalierbare Prozesse
                </div>
              </div>
            </div>
            <div className='pointer-events-none absolute -bottom-6 -right-6 hidden h-24 w-24 rounded-3xl bg-[#1D6FA8]/30 blur-xl md:block'></div>
          </div>
        </div>
      </section>

      <section
        id='leistungen'
        className='mx-auto max-w-6xl px-4 py-16'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-white'>
            Digitale Lösungen mit Struktur.
          </h2>
          <p className='mt-3 text-slate-300'>
            Ich entwickle Websites und Webanwendungen, die nicht nur gut aussehen, sondern logisch
            aufgebaut, verständlich und langfristig nutzbar sind.
          </p>
          <p className='mt-3 text-slate-300'>
            Kein Overengineering. Kein Plugin-Chaos. Sondern klare Systeme, die funktionieren.
          </p>
        </div>
        <div className='mt-10 grid gap-5 md:grid-cols-2'>
          {services.map((service) => (
            <div
              key={service.title}
              className='rounded-2xl bg-white/95 p-6 text-slate-900 ring-1 ring-white/20 shadow-[0_30px_70px_-60px_rgba(0,0,0,0.6)]'>
              <h3 className='text-lg font-semibold text-[#0B1B2B]'>{service.title}</h3>
              <p className='mt-2 text-sm text-slate-600'>{service.intro}</p>
              <ul className='mt-4 space-y-2 text-sm text-slate-600'>
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full bg-[#1D6FA8]'></span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id='technologien'
        className='bg-white/5 py-16 ring-1 ring-white/10'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>
              Bewährte Technologien. Sauber eingesetzt.
            </h2>
            <p className='mt-3 text-slate-300'>
              Ich arbeite mit modernen, stabilen Technologien – nicht, um zu beeindrucken, sondern
              um nachhaltige Lösungen zu bauen.
            </p>
          </div>
          <div className='mt-8 grid gap-6 md:grid-cols-2'>
            {Object.entries(techStack).map(([title, items]) => (
              <div
                key={title}
                className='rounded-2xl bg-white/95 p-6 text-slate-900 ring-1 ring-white/20'>
                <div className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                  {title}
                </div>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {items.map((item) => (
                    <span
                      key={item}
                      className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id='prozess'
        className='mx-auto max-w-6xl px-4 py-16'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-white'>
            Strukturierter Prozess. Klare Kommunikation.
          </h2>
          <p className='mt-3 text-slate-300'>
            Ich baue keine Projekte, die nur „funktionieren“. Ich baue Systeme, die verstanden
            werden.
          </p>
        </div>
        <div className='mt-8 grid gap-5 md:grid-cols-5'>
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className='rounded-2xl bg-white/95 p-5 text-slate-900 ring-1 ring-white/20'>
              <div className='text-xs font-semibold text-slate-400'>Step {index + 1}</div>
              <div className='mt-1 text-sm font-semibold text-[#0B1B2B]'>{step.title}</div>
              <p className='mt-2 text-sm text-slate-600'>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id='zielgruppe'
        className='bg-white/5 py-16 ring-1 ring-white/10'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-white'>
              Nicht für jeden. Aber für die Richtigen.
            </h2>
            <p className='mt-3 text-slate-300'>
              Wenn dir Klarheit, saubere Lösungen und langfristiges Denken wichtig sind, passen wir
              gut zusammen.
            </p>
          </div>
          <div className='mt-8 grid gap-4 md:grid-cols-2'>
            {audiences.map((audience) => (
              <div
                key={audience}
                className='rounded-2xl bg-white/95 p-4 text-sm text-slate-700 ring-1 ring-white/20'>
                {audience}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-16'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-white'>Cases</h2>
          <p className='mt-3 text-slate-300'>
            Projekte, die aktuell nicht öffentlich sind – aber Struktur, Wirkung und Klarheit
            beweisen.
          </p>
        </div>
        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {cases.map((item) => (
            <div
              key={item}
              className='rounded-2xl bg-white/95 p-5 text-sm text-slate-700 ring-1 ring-white/20'>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section
        id='kontakt'
        className='mx-auto max-w-6xl px-4 py-16'>
        <div className='grid gap-8 md:grid-cols-2 md:items-start'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-white'>Projekt anfragen</h2>
            <p className='mt-3 text-slate-300'>
              Beschreib mir kurz dein Vorhaben – Website, Web App oder System. Ich melde mich
              ehrlich zurück und sage dir, ob ich der Richtige dafür bin und wie ein sinnvoller
              nächster Schritt aussieht.
            </p>
            <div className='mt-6 rounded-2xl bg-white/95 p-6 text-slate-700 ring-1 ring-white/20'>
              <div className='text-sm font-semibold text-[#0B1B2B]'>Klarheit & Struktur</div>
              <p className='mt-2 text-sm text-slate-600'>
                Du bekommst eine klare Einschätzung, keine Verkaufsfloskel. Wenn es nicht passt,
                sage ich das.
              </p>
            </div>
          </div>

          <form className='rounded-3xl bg-white p-6 text-slate-900 ring-1 ring-white/20'>
            <div className='grid gap-4'>
              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Name *</label>
                <input
                  required
                  name='name'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
                />
              </div>
              <div className='grid gap-1'>
                <label className='text-sm font-medium'>E-Mail *</label>
                <input
                  required
                  name='email'
                  type='email'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
                />
              </div>
              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Projektart *</label>
                <select
                  required
                  name='projectType'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
                  <option value=''>Bitte wählen</option>
                  <option>Website / Landingpage</option>
                  <option>Web App / Kundenportal</option>
                  <option>System / Automatisierung</option>
                  <option>Etwas anderes</option>
                </select>
              </div>
              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Budget (optional)</label>
                <select
                  name='budget'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
                  <option value=''>Budgetrahmen</option>
                  <option>Unter 2.500 €</option>
                  <option>2.500 – 7.500 €</option>
                  <option>7.500 – 15.000 €</option>
                  <option>15.000 €+</option>
                </select>
              </div>
              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Zeitrahmen *</label>
                <select
                  required
                  name='timeline'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
                  <option value=''>Bitte wählen</option>
                  <option>2–4 Wochen</option>
                  <option>1–2 Monate</option>
                  <option>3+ Monate</option>
                  <option>Flexibel</option>
                </select>
              </div>
              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Nachricht *</label>
                <textarea
                  required
                  name='message'
                  rows={5}
                  className='rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-400'></textarea>
              </div>
              <label className='flex items-start gap-2 text-xs text-slate-600'>
                <input
                  required
                  type='checkbox'
                  name='privacy'
                  className='mt-1'
                />
                Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten
                zur Kontaktaufnahme zu.
              </label>
              <button
                type='submit'
                className='h-11 rounded-xl bg-gradient-to-r from-[#1D6FA8] to-[#7A2C8E] text-sm font-semibold text-white transition hover:opacity-90'>
                Anfrage senden
              </button>
              <p className='text-xs text-slate-500'>
                Kein Spam. Kein Weiterverkauf. Antwort in der Regel innerhalb von 24–48 Stunden.
              </p>
            </div>
          </form>
        </div>
      </section>

      <footer className='border-t border-white/10 bg-[#0B1B2B]'>
        <div className='mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between'>
          <div>[Dein Name] · Web Development · Klare Systeme für digitale Ideen.</div>
          <div className='flex gap-4'>
            <Link
              href='/'
              className='hover:text-white'>
              Start
            </Link>
            <a
              href='/impressum'
              className='hover:text-white'>
              Impressum
            </a>
            <a
              href='/impressum'
              className='hover:text-white'>
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
