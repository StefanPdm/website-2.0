import Link from 'next/link';

export default function DatenschutzPage() {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <main className='mx-auto max-w-4xl px-4 py-24'>
        <h1 className='text-3xl font-bold tracking-tight text-white'>Datenschutzerklärung</h1>
        <p className='mt-2 text-sm text-slate-400'>
          Stand: <span className='tabular-nums'>{new Date().toLocaleDateString('de-DE')}</span>
        </p>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>1. Verantwortlicher</h2>
          <p>
            StefanPdm (Platzhalter: vollständiger Name/Firma), Straße Hausnummer, PLZ Ort,
            Deutschland
          </p>
          <p>
            E‑Mail:{' '}
            <a
              className='underline hover:text-white'
              href='mailto:PLACEHOLDER@domain.tld'>
              PLACEHOLDER@domain.tld
            </a>
          </p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>2. Zwecke und Rechtsgrundlagen</h2>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Bereitstellung der Website und Server-Logfiles (Art. 6 Abs. 1 lit. f DSGVO)</li>
            <li>
              Beantwortung von Anfragen über das Kontaktformular (Art. 6 Abs. 1 lit. b/f DSGVO)
            </li>
            <li>Reichweitenmessung/Statistik, nur mit Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</li>
          </ul>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>3. Hosting und Auftragsverarbeitung</h2>
          <p>
            Die Website wird bei <span className='font-medium'>PLACEHOLDER HOST</span> gehostet. Es
            besteht ein Vertrag zur Auftragsverarbeitung gem. Art. 28 DSGVO. Serverstandort:
            PLACEHOLDER (z. B. EU/EWR).
          </p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>4. Server-Logfiles</h2>
          <p>
            Folgende Daten werden beim Aufruf verarbeitet und nach kurzer Zeit automatisch gelöscht:
          </p>
          <ul className='list-disc pl-6 space-y-1'>
            <li>IP‑Adresse (gekürzt oder anonymisiert, sofern möglich)</li>
            <li>Datum/Uhrzeit, Zeitzone</li>
            <li>URL, Referrer, User‑Agent</li>
          </ul>
          <p>
            Rechtsgrundlage ist unser berechtigtes Interesse an der sicheren Bereitstellung (Art. 6
            Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>5. Cookies und Einwilligungen</h2>
          <p>
            Wir setzen nur technisch notwendige Cookies ohne Einwilligung ein. Für optionale Dienste
            (z. B. Analytics) holen wir vorab Ihre Einwilligung ein. Details und Verwaltung in den{' '}
            <Link
              href='/cookies'
              className='underline hover:text-white'>
              Cookie‑Einstellungen
            </Link>
            .
          </p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>6. Drittinhalte & Übermittlungen</h2>
          <p>
            Eingebundene Inhalte/Provider (Platzhalter):{' '}
            <span className='italic'>
              z. B. Vercel (Hosting), Unsplash (Bilder), Google Fonts (lokal/remote), Form‑Provider
            </span>
            . Soweit erforderlich erfolgt Abschluss eines AV‑Vertrags; Übermittlungen in Drittländer
            nur mit geeigneten Garantien (Art. 46 DSGVO) oder Einwilligung.
          </p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>7. Speicherdauer</h2>
          <p>
            Wir verarbeiten personenbezogene Daten nur so lange, wie es für die genannten Zwecke
            erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
          </p>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>8. Ihre Rechte</h2>
          <ul className='list-disc pl-6 space-y-1'>
            <li>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit</li>
            <li>Widerspruch gegen Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO</li>
            <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft</li>
            <li>Beschwerde bei einer Aufsichtsbehörde (z. B. LfDI Ihres Bundeslands)</li>
          </ul>
        </section>

        <section className='mt-8 space-y-3 text-slate-200'>
          <h2 className='text-xl font-semibold text-white'>9. Kontakt</h2>
          <p>
            Für Datenschutzanfragen wenden Sie sich an:{' '}
            <span className='font-medium'>PLACEHOLDER DATENSCHUTZ KONTAKT</span> – E‑Mail:{' '}
            <a
              className='underline hover:text-white'
              href='mailto:PLACEHOLDER@domain.tld'>
              PLACEHOLDER@domain.tld
            </a>
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
