export const metadata = {
  title: 'Datenschutzerklaerung | NLP Coaching',
  description: 'Informationen zur Verarbeitung personenbezogener Daten im Bereich NLP Coaching.',
};

export default function DatenschutzPage() {
  return (
    <main className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--text)] ring-1 ring-[var(--border)]'>
          Rechtliches · DSGVO
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]'>
          Datenschutzerklärung
        </h1>
        <p className='mt-3 text-[var(--muted)] max-w-2xl'>
          Mit den nachfolgenden Hinweisen informieren wir Sie ueber Art, Umfang und Zwecke der
          Verarbeitung personenbezogener Daten bei der Nutzung dieses NLP-Angebots.
        </p>
      </header>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Verantwortlicher</h2>
        <div className='space-y-1 text-[var(--muted)]'>
          <p>Stefan Heinemann</p>
          <p>
            E-Mail:&nbsp;
            <a
              className='underline decoration-[var(--text)]/30 hover:text-[var(--text)]'
              href='mailto:webdeveloper@heinemann.berlin'>
              webdeveloper@heinemann.berlin
            </a>
          </p>
        </div>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          Zugriffsdaten (Server-Logs)
        </h2>
        <p className='text-[var(--muted)]'>
          Beim Aufruf der Seiten werden automatisch Informationen in so genannten Server-Logfiles
          erhoben und gespeichert. Erfasst werden u. a. IP-Adresse, Datum und Uhrzeit des Abrufs,
          abgerufene URL, Referrer-URL, verwendeter Browser, Betriebssystem. Die Verarbeitung
          erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          sicheren und störungsfreien Bereitstellung).
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Kontaktaufnahme</h2>
        <p className='text-[var(--muted)]'>
          Bei der Kontaktaufnahme (z. B. per Formular oder E-Mail) werden die Angaben zur
          Bearbeitung der Anfrage und für den Fall von Anschlussfragen verarbeitet (Art. 6 Abs. 1
          lit. b oder f DSGVO). Pflichtangaben sind als solche gekennzeichnet. Die Daten werden
          gelöscht, sobald sie für die Zwecke ihrer Verarbeitung nicht mehr erforderlich sind.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Cookies</h2>
        <p className='text-[var(--muted)]'>Wir verwenden keine Cookies.</p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          Rechtsgrundlagen und Zwecke
        </h2>
        <ul className='space-y-2 text-[var(--muted)]'>
          <li>Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung / vorvertragliche Maßnahmen</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO – Wahrung berechtigter Interessen</li>
          <li>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung (z. B. für optionale Cookies)</li>
        </ul>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          Drittanbieter / Auftragsverarbeiter
        </h2>
        <p className='text-[var(--muted)]'>
          Soweit Dienstleister beauftragt werden (z. B. Hosting), erfolgt dies auf Grundlage eines
          Vertrages zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Eine Drittlandsübermittlung findet
          nur statt, wenn geeignete Garantien vorliegen (Art. 44 ff. DSGVO).
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Speicherdauer</h2>
        <p className='text-[var(--muted)]'>
          Sofern in dieser Erklärung nicht anders angegeben, löschen wir personenbezogene Daten
          grundsätzlich, sobald der Zweck der Verarbeitung entfällt und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Ihre Rechte</h2>
        <ul className='list-disc pl-5 space-y-1 text-[var(--muted)]'>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Öschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
          <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
      </section>

      <p className='mt-8 text-xs text-[var(--muted)]'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
