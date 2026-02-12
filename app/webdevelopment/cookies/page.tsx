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
        <h2 className='text-xl font-semibold text-white mb-3'>Verwendung von Cookies</h2>
        <p className='text-slate-300'>
          Diese Website verwendet keine Cookies. Es werden keine Informationen auf Ihrem Gerät
          gespeichert oder abgerufen, die Ihre Privatsphäre beeinträchtigen könnten.
        </p>
      </section>

      <p className='mt-8 text-xs text-slate-500'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
