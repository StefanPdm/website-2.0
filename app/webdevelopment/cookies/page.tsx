export const metadata = {
  title: 'Cookies | Web Development',
  description: 'Hinweise zu eingesetzten Cookies und Ihren Einstellungsmöglichkeiten.',
};

export default function CookiesPage() {
  return (
    <main className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
          Rechtliches · Cookies
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white'>
          Cookie-Hinweise
        </h1>
        <p className='mt-3 text-slate-300 max-w-2xl'>
          Hier erfahren Sie, welche Cookies wir einsetzen, zu welchen Zwecken und wie Sie Ihre
          Einstellungen verwalten können.
        </p>
      </header>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Was sind Cookies?</h2>
        <p className='text-slate-300'>
          Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie dienen
          dazu, grundlegende Funktionen bereitzustellen, die Nutzung zu analysieren oder Inhalte zu
          personalisieren.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Arten von Cookies</h2>
        <ul className='list-disc pl-5 space-y-1 text-slate-300'>
          <li>Technisch notwendige Cookies (erforderlich für die Grundfunktionen)</li>
          <li>Statistik‑Cookies (anonymisierte Nutzungsanalyse)</li>
          <li>Komfort‑/Funktional‑Cookies (z. B. Spracheinstellungen)</li>
        </ul>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Rechtsgrundlagen</h2>
        <p className='text-slate-300'>
          Der Einsatz technisch nicht notwendiger Cookies erfolgt auf Grundlage Ihrer Einwilligung
          (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Technisch notwendige Cookies werden auf
          Grundlage unseres berechtigten Interesses an einer funktionsfähigen Website gesetzt (Art.
          6 Abs. 1 lit. f DSGVO, § 25 Abs. 2 Nr. 2 TTDSG).
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Einstellungen ändern</h2>
        <p className='text-slate-300'>
          Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder
          anpassen. Nutzen Sie hierfür die Cookie‑Einstellungen:
        </p>
        <div className='mt-4'>
          <a
            href='#'
            className='rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10'>
            Cookie‑Einstellungen öffnen
          </a>
        </div>
        <p className='mt-4 text-slate-300'>
          Zudem können Sie Cookies über die Einstellungen Ihres Browsers löschen oder blockieren.
        </p>
      </section>

      <p className='mt-8 text-xs text-slate-500'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
