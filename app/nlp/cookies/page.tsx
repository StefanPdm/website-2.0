export const metadata = {
  title: 'Cookies | NLP Coaching',
  description: 'Hinweise zu eingesetzten Cookies und Ihren Einstellungsmoeglichkeiten.',
};

export default function CookiesPage() {
  return (
    <main className='relative z-10 mx-auto max-w-4xl px-4 py-48 min-h-[calc(100vh-145px)]'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--text)] ring-1 ring-[var(--border)]'>
          Rechtliches · Cookies
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]'>
          Cookie-Hinweise
        </h1>
        <p className='mt-3 text-[var(--muted)] max-w-2xl'>
          Hier erfahren Sie, welche Cookies wir im NLP-Bereich einsetzen.
        </p>
      </header>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Verwendung von Cookies?</h2>
        <p className='text-[var(--muted)]'>
          Diese Website verwendet keine Cookies. Es werden keine Informationen auf Ihrem Gerät
          gespeichert oder abgerufen, die Ihre Privatsphäre beeinträchtigen könnten.
        </p>
      </section>

      <p className='mt-8 text-xs text-[var(--muted)]'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
