import type { Metadata } from 'next';

// canonical + openGraph.url explizit: sonst erbt die Seite beides vom Layout
// und erklärt sich zum Duplikat der Welt-Startseite (CLAUDE.md §13).
export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Stefan Heinemann Coaching',
  description:
    'Informationen zur Verarbeitung personenbezogener Daten bei Stefan Heinemann Coaching, Potsdam.',
  alternates: { canonical: '/coaching/datenschutz' },
  openGraph: {
    title: 'Datenschutzerklärung – Stefan Heinemann Coaching',
    description:
      'Informationen zur Verarbeitung personenbezogener Daten bei Stefan Heinemann Coaching, Potsdam.',
    url: '/coaching/datenschutz',
  },
};

export default function DatenschutzPage() {
  return (
    <div className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
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
              href='mailto:coach.stefan@heinemann.berlin'>
              coach.stefan@heinemann.berlin
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

      {/* Session-Podcast: nur mit ausdrücklicher Einwilligung (Art. 9 DSGVO), siehe PodcastSection. */}
      <section className='rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[var(--border)] mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          Session-Podcast (KI-gestützte Zusammenfassung)
        </h2>
        <div className='space-y-3 text-[var(--muted)]'>
          <p>
            Auf ausdrücklichen Wunsch erstelle ich nach einer Coaching-Session einen Audio-Podcast,
            der die Session zusammenfasst und reflektiert. Dazu zeichne ich die Session – nur mit Ihrer
            vorherigen Zustimmung – auf und lasse daraus ein Transkript und eine Zusammenfassung
            erstellen. Aus dem Transkript entferne ich auf meinem eigenen Rechner Namen und
            Angaben, die eine Identifizierung ermöglichen (Pseudonymisierung). Erst dieses
            bereinigte Transkript wird weiterverarbeitet.
          </p>
          <p>
            Für Aufnahme, Transkript und Zusammenfassung nutze ich den Dienst Plaud der Plaud Inc., 8 The
            Green, Ste A, Dover, Delaware 19901, USA, als Auftragsverarbeiter. Plaud speichert die
            Daten nach eigenen Angaben für Konten in der EU in einem Rechenzentrum in Frankfurt am
            Main. Da Plaud ein US-Unternehmen ist und für Transkription und Zusammenfassung
            KI-Dienste weiterer Anbieter einsetzt, kann eine Übermittlung in die USA nicht
            ausgeschlossen werden; sie erfolgt auf Grundlage der EU-Standardvertragsklauseln
            (Art. 46 Abs. 2 lit. c DSGVO). Aufnahme, ungekürztes Transkript und Zusammenfassung bleiben
            sechs Monate bei Plaud gespeichert und werden danach gelöscht. Plaud verwendet die Daten nicht zum Training von
            KI-Modellen.
          </p>
          <p>
            Den Podcast selbst erstelle ich mit dem Dienst NotebookLM der Google Ireland Limited, Gordon House,
            Barrow Street, Dublin 4, Irland. Dabei wird das pseudonymisierte Transkript an Google
            übermittelt und dort verarbeitet. Eine Verarbeitung durch die Google LLC in den USA kann
            nicht ausgeschlossen werden; die Google LLC ist nach dem EU-US Data Privacy Framework
            zertifiziert.
          </p>
          <p>
            Da Coaching-Inhalte Angaben zur Gesundheit enthalten können, erfolgt die Verarbeitung
            ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a
            und Art. 9 Abs. 2 lit. a DSGVO). Die Einwilligung ist freiwillig – das Coaching findet
            ohne sie ebenso statt – und kann jederzeit mit Wirkung für die Zukunft widerrufen
            werden. Den fertigen Podcast erhalten ausschließlich Sie. Pseudonymisiertes Transkript und
            Podcast bleiben in meinem NotebookLM-Konto gespeichert, damit Sie den Podcast auch später
            noch erhalten können. Auf Ihren Wunsch lösche ich sie jederzeit.
          </p>
        </div>
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
    </div>
  );
}
