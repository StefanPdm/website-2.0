import Link from 'next/link';

export default function ImpressumPage() {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <main className='mx-auto max-w-4xl px-4 py-24'>
        <h1 className='text-3xl font-bold tracking-tight text-white'>Impressum</h1>
        <p className='mt-2 text-sm text-slate-400'>Angaben gemäß § 5 TMG</p>

        <section className='mt-8 space-y-1 text-slate-200'>
          <p className='font-medium'>StefanPdm (Platzhalter: vollständiger Name/Firma)</p>
          <p>Straße Hausnummer</p>
          <p>PLZ Ort</p>
          <p>Deutschland</p>
        </section>

        <section className='mt-6 space-y-1 text-slate-200'>
          <p>
            E‑Mail:{' '}
            <a
              className='underline hover:text-white'
              href='mailto:PLACEHOLDER@domain.tld'>
              PLACEHOLDER@domain.tld
            </a>
          </p>
          <p>Telefon: +49 (0) PLACEHOLDER</p>
          <p>USt‑IdNr.: DE000000000 (Platzhalter)</p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Vertreten durch</h2>
          <p>Platzhalter – Vertretungsberechtigte Person(en) / Geschäftsführung</p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Inhaltlich verantwortlich</h2>
          <p>gemäß § 55 Abs. 2 RStV: StefanPdm (Platzhalter, sofern abweichend, mit Anschrift)</p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online‑Streitbeilegung (OS) bereit:{' '}
            <a
              className='underline hover:text-white'
              href='https://ec.europa.eu/consumers/odr'
              target='_blank'
              rel='noopener noreferrer'>
              https://ec.europa.eu/consumers/odr
            </a>
            . Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        {/* Haftungshinweise (aus haftung/ zusammengeführt) */}
        <section className='mt-10 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Haftung für Inhalte</h2>
          <p>
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Haftung für Links</h2>
          <p>
            Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber verantwortlich.
          </p>
        </section>
        <section className='mt-6 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>Urheberrecht</h2>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
            Zustimmung.
          </p>
        </section>

        <div className='mt-10 flex flex-wrap gap-4 text-sm'>
          <Link
            href='/'
            className='text-sky-300 underline hover:text-white'>
            Zur Startseite
          </Link>
          <Link
            href='/datenschutz'
            className='text-sky-300 underline hover:text-white'>
            Datenschutzerklärung
          </Link>
          <Link
            href='/cookies'
            className='text-sky-300 underline hover:text-white'>
            Cookie‑Einstellungen
          </Link>
        </div>
      </main>
    </div>
  );
}
