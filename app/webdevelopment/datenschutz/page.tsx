export const metadata = {
  title: 'Datenschutzerklärung | Web Development',
  description: 'Informationen zur Verarbeitung personenbezogener Daten im Bereich Web Development.',
};

export default function DatenschutzPage() {
  return (
    <main className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
          Rechtliches · DSGVO
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white'>
          Datenschutzerklärung
        </h1>
        <p className='mt-3 text-slate-300 max-w-2xl'>
          Mit den nachfolgenden Hinweisen informieren wir Sie über Art, Umfang und Zwecke der
          Verarbeitung personenbezogener Daten bei der Nutzung dieses Angebots.
        </p>
      </header>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Verantwortlicher</h2>
        <div className='space-y-1 text-slate-300'>
          <p>Stefan Heinemann</p>
          <p>Straße Hausnummer · PLZ Ort</p>
          <p>
            E-Mail:{' '}
            <a
              className='underline decoration-white/30 hover:text-white'
              href='mailto:mail@example.com'>
              mail@example.com
            </a>
          </p>
        </div>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Zugriffsdaten (Server-Logs)</h2>
        <p className='text-slate-300'>
          Beim Aufruf der Seiten werden automatisch Informationen in so genannten Server-Logfiles
          erhoben und gespeichert. Erfasst werden u. a. IP-Adresse, Datum und Uhrzeit des Abrufs,
          abgerufene URL, Referrer-URL, verwendeter Browser, Betriebssystem. Die Verarbeitung
          erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          sicheren und störungsfreien Bereitstellung).
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Kontaktaufnahme</h2>
        <p className='text-slate-300'>
          Bei der Kontaktaufnahme (z. B. per Formular oder E‑Mail) werden die Angaben zur
          Bearbeitung der Anfrage und für den Fall von Anschlussfragen verarbeitet (Art. 6 Abs. 1
          lit. b oder f DSGVO). Pflichtangaben sind als solche gekennzeichnet. Die Daten werden
          gelöscht, sobald sie für die Zwecke ihrer Verarbeitung nicht mehr erforderlich sind.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Cookies</h2>
        <p className='text-slate-300'>
          Wir verwenden Cookies, um grundlegende Funktionen bereitzustellen und die Nutzung zu
          analysieren. Details zu eingesetzten Cookies, Speicherfristen und Widerrufsmöglichkeiten
          finden Sie in unseren{' '}
          <a
            className='underline decoration-white/30 hover:text-white'
            href='/webdevelopment/cookies'>
            Cookie-Hinweisen
          </a>
          .
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Rechtsgrundlagen und Zwecke</h2>
        <ul className='space-y-2 text-slate-300'>
          <li>Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung / vorvertragliche Maßnahmen</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO – Wahrung berechtigter Interessen</li>
          <li>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung (z. B. für optionale Cookies)</li>
        </ul>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>
          Drittanbieter / Auftragsverarbeiter
        </h2>
        <p className='text-slate-300'>
          Soweit Dienstleister beauftragt werden (z. B. Hosting), erfolgt dies auf Grundlage eines
          Vertrages zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Eine Drittlandsübermittlung findet
          nur statt, wenn geeignete Garantien vorliegen (Art. 44 ff. DSGVO).
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Speicherdauer</h2>
        <p className='text-slate-300'>
          Sofern in dieser Erklärung nicht anders angegeben, löschen wir personenbezogene Daten
          grundsätzlich, sobald der Zweck der Verarbeitung entfällt und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Ihre Rechte</h2>
        <ul className='list-disc pl-5 space-y-1 text-slate-300'>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch (Art. 21 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
          <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
      </section>

      <p className='mt-8 text-xs text-slate-500'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
