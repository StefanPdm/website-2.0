import Link from 'next/link';

export default function AgbPage() {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <main className='mx-auto max-w-4xl px-4 py-24'>
        <h1 className='text-3xl font-bold tracking-tight text-white'>
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <p className='mt-2 text-sm text-slate-400'>
          Platzhalter – bitte projektspezifisch anpassen.
        </p>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>1. Geltungsbereich</h2>
          <p>
            Diese AGB gelten für alle Verträge zwischen StefanPdm (Anbieter) und Auftraggebern über
            Web‑/Software‑Dienstleistungen.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>2. Leistungen</h2>
          <p>
            Leistungsumfang, Zeitplan und Vergütung werden im jeweiligen Angebot/Vertrag festgelegt.
            Änderungswünsche werden gesondert beauftragt.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>3. Mitwirkungspflichten</h2>
          <p>
            Der Auftraggeber stellt rechtzeitig alle erforderlichen Inhalte, Zugänge und Freigaben
            bereit und gewährleistet Rechtefreiheit bereitgestellter Inhalte.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>4. Vergütung & Zahlungsbedingungen</h2>
          <p>
            Sofern nicht anders vereinbart: Netto‑Preise zuzüglich gesetzlicher Umsatzsteuer;
            Zahlungsziel 14 Tage nach Rechnungsstellung ohne Abzug.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>5. Nutzungsrechte</h2>
          <p>
            Nutzungsrechte an Arbeitsergebnissen gehen nach vollständiger Zahlung in dem vertraglich
            vereinbarten Umfang auf den Auftraggeber über.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>6. Haftung</h2>
          <p>
            Der Anbieter haftet unbeschränkt bei Vorsatz/Grober Fahrlässigkeit sowie für Verletzung
            von Leben, Körper oder Gesundheit. Im Übrigen nur für vorhersehbare, vertragstypische
            Schäden.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>7. Gewährleistung</h2>
          <p>
            Mängel sind unverzüglich anzuzeigen. Nachbesserung innerhalb angemessener Frist.
            Weitergehende Ansprüche richten sich nach gesetzlichen Vorschriften.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>8. Vertraulichkeit & Datenschutz</h2>
          <p>
            Vertrauliche Informationen sind geheim zu halten. Es gilt ergänzend die{' '}
            <Link
              href='/datenschutz'
              className='underline hover:text-white'>
              Datenschutzerklärung
            </Link>
            .
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>9. Schlussbestimmungen</h2>
          <p>
            Es gilt deutsches Recht. Gerichtsstand ist – soweit zulässig – PLACEHOLDER
            GERICHTSSTAND. Salvatorische Klausel.
          </p>
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
