import Link from 'next/link';

export default function WiderrufPage() {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <main className='mx-auto max-w-4xl px-4 py-24'>
        <h1 className='text-3xl font-bold tracking-tight text-white'>Widerrufsbelehrung (B2C)</h1>
        <p className='mt-2 text-sm text-slate-400'>
          Gilt nur, sofern Verträge mit Verbrauchern (§ 13 BGB) im Fernabsatz geschlossen werden.
        </p>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Widerrufsrecht</h2>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
            widerrufen. Die Frist beginnt mit Vertragsschluss.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Folgen des Widerrufs</h2>
          <p>
            Im Falle des Widerrufs erstatten wir alle Zahlungen unverzüglich und spätestens binnen
            vierzehn Tagen ab Eingang der Mitteilung über den Widerruf. Für diese Rückzahlung
            verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
            eingesetzt haben.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Erlöschen des Widerrufsrechts</h2>
          <p>
            Das Widerrufsrecht erlischt, wenn wir die Dienstleistung vollständig erbracht haben und
            mit der Ausführung erst begonnen haben, nachdem Sie ausdrücklich zugestimmt und
            bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung
            verlieren.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Muster‑Widerrufsformular</h2>
          <div className='rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-slate-300'>
            <p>
              (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und
              senden es zurück.)
            </p>
            <p className='mt-2'>An: StefanPdm, E‑Mail: PLACEHOLDER@domain.tld</p>
            <p className='mt-2'>
              Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über die
              Erbringung der folgenden Dienstleistung: ______
            </p>
            <p className='mt-2'>Bestellt am: ______ / erhalten am: ______</p>
            <p className='mt-2'>Name des/der Verbraucher(s): ______</p>
            <p className='mt-2'>Anschrift des/der Verbraucher(s): ______</p>
            <p className='mt-2'>Datum/Unterschrift: ______</p>
          </div>
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
