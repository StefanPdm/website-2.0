import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <main className='mx-auto max-w-4xl px-4 py-24'>
        <h1 className='text-3xl font-bold tracking-tight text-white'>Cookie‑Einstellungen</h1>
        <p className='mt-2 text-sm text-slate-400'>
          Verwalten Sie optionale Cookies und erfahren Sie mehr.
        </p>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Technisch notwendige Cookies</h2>
          <p>
            Diese sind erforderlich, um Grundfunktionen der Website bereitzustellen. Sie können
            nicht deaktiviert werden.
          </p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Optionale Cookies (Einwilligung)</h2>
          <p>
            Für Statistik/Komfort/Marketing setzen wir nur mit Ihrer Einwilligung Cookies. Hier
            können Sie eine
            <span className='font-medium'> Platzhalter‑Schaltfläche</span> integrieren (z. B. von
            einem Consent‑Tool), um Einstellungen zu ändern.
          </p>
          <div className='mt-4 rounded-xl border border-white/15 bg-white/5 p-4'>
            <p className='text-sm text-slate-300'>
              Consent‑Manager: <span className='italic'>PLACEHOLDER CMP</span> – Hier
              Integration/Toggles ergänzen.
            </p>
          </div>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Weitere Informationen</h2>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <Link
                href='/datenschutz'
                className='underline hover:text-white'>
                Datenschutzerklärung
              </Link>
            </li>
            <li>
              Browser‑Einstellungen: Sie können Cookies generell über die Einstellungen Ihres
              Browsers verwalten und löschen.
            </li>
          </ul>
        </section>

        <div className='mt-10'>
          <Link
            href='/'
            className='text-sky-300 underline hover:text-white'>
            Zur Startseite
          </Link>
        </div>
      </main>
    </div>
  );
}
