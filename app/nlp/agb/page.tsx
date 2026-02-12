export const metadata = {
  title: 'AGB | NLP Coaching',
  description: 'Allgemeine Geschäftsbedingungen für den Bereich NLP Coaching.',
};

export default function AgbPage() {
  return (
    <main className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--text)] ring-1 ring-[var(--border)]'>
          Rechtliches · AGB
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]'>
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className='mt-3 text-[var(--muted)] max-w-2xl'>
          Diese AGB gelten für die Leistungen im Bereich NLP Coaching.
        </p>
      </header>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          §1 Gegenstand des Vertrages
        </h2>
        <p className='text-[var(--muted)]'>
          Der Coach erbringt Coaching-Leistungen auf Basis NLP-orientierter Methoden. Coaching ist
          ein prozessorientierter Begleitprozess und keine Therapie oder Erfolgsgarantie.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§2 Abgrenzung zu Therapie</h2>
        <p className='text-[var(--muted)]'>
          Coaching ersetzt keine medizinische oder psychotherapeutische Behandlung.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          §3 Verantwortung des Klienten
        </h2>
        <p className='text-[var(--muted)]'>
          Der Klient handelt eigenverantwortlich fuer Entscheidungen, Handlungen und Ergebnisse.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§4 Keine Erfolgsgarantie</h2>
        <p className='text-[var(--muted)]'>
          Es wird kein bestimmter wirtschaftlicher, persönlicher oder gesundheitlicher Erfolg
          geschuldet.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§5 Vergütung</h2>
        <p className='text-[var(--muted)]'>
          Die Vergütung ist, sofern nicht anders vereinbart, vor Leistungsbeginn fällig.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§6 Haftung</h2>
        <p className='text-[var(--muted)]'>
          Haftung besteht nur bei Vorsatz und grober Fahrlässigkeit.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§7 Geltungsbereich</h2>
        <p className='text-[var(--muted)]'>
          Diese AGB gelten für alle Coaching-Leistungen des Coaches.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§8 Leistungsbeschreibung</h2>
        <p className='text-[var(--muted)]'>
          Coaching ist ein prozessorientierter Unterstützungsprozess zur Selbstreflexion.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§9 Keine Erfolgsgarantie</h2>
        <p className='text-[var(--muted)]'>Es wird kein Erfolg geschuldet.</p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§10 Eigenverantwortung</h2>
        <p className='text-[var(--muted)]'>
          Der Klient trägt die volle Verantwortung für seine Entscheidungen und Ergebnisse.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>§11 Widerrufsrecht</h2>
        <p className='text-[var(--muted)]'>
          Verbrauchern steht ein gesetzliches Widerrufsrecht zu.
        </p>
      </section>

      <p className='mt-8 text-xs text-[var(--muted)]'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
