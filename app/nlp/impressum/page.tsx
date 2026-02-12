export const metadata = {
  title: 'Impressum | NLP Coaching',
  description: 'Anbieterkennzeichnung und rechtliche Hinweise fuer den Bereich NLP Coaching.',
};

export default function ImpressumPage() {
  return (
    <main className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
          Rechtliches · Informationen nach § 5 TMG
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white'>
          Impressum
        </h1>
        <p className='mt-3 text-slate-300 max-w-2xl'>
          Anbieterkennzeichnung, Kontaktangaben und rechtlich erforderliche Hinweise fuer den
          Bereich NLP Coaching.
        </p>
      </header>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Anbieter</h2>
        <div className='space-y-1 text-slate-300'>
          <p>Stefan Heinemann</p>
          <p>Strasse Hausnummer</p>
          <p>PLZ Ort, Deutschland</p>
        </div>
        <div className='mt-4 space-y-1 text-slate-300'>
          <p>
            E-Mail:{' '}
            <a
              className='underline decoration-white/30 hover:text-white'
              href='mailto:mail@example.com'>
              mail@example.com
            </a>
          </p>
          <p>Telefon: +49 (0) 000 000000</p>
        </div>
        <div className='mt-4 grid gap-1 text-slate-300'>
          <p>Vertretungsberechtigt: Stefan Heinemann</p>
          <p>USt-IdNr.: DE000000000 (falls vorhanden)</p>
          <p>Registergericht: — (falls vorhanden)</p>
          <p>Registernummer: — (falls vorhanden)</p>
        </div>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>
          Verantwortlich fuer den Inhalt (§ 18 Abs. 2 MStV)
        </h2>
        <p className='text-slate-300'>Stefan Heinemann, Anschrift wie oben.</p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>
          EU-Streitschlichtung / Verbraucherschlichtung
        </h2>
        <p className='text-slate-300'>
          Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          <a
            className='ml-1 underline decoration-white/30 hover:text-white'
            href='https://ec.europa.eu/consumers/odr'
            target='_blank'
            rel='noopener noreferrer'>
            https://ec.europa.eu/consumers/odr
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Haftung fuer Inhalte</h2>
        <p className='text-slate-300'>
          Als Diensteanbieter sind wir nach § 7 Abs. 1 TMG fuer eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, uebermittelte oder gespeicherte fremde
          Informationen zu ueberwachen oder nach Umstaenden zu forschen, die auf eine rechtswidrige
          Taetigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberuehrt. Eine
          diesbezuegliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
          Rechtsverletzung moeglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir
          diese Inhalte umgehend entfernen.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Haftung fuer Links</h2>
        <p className='text-slate-300'>
          Unser Angebot enthaelt Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb koennen wir fuer diese fremden Inhalte auch keine Gewaehr
          uebernehmen. Fuer die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf moegliche Rechtsverstoesse ueberprueft. Rechtswidrige Inhalte waren zum
          Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
          verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
          zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
          entfernen.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>Urheberrecht</h2>
        <p className='text-slate-300'>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung ausserhalb der Grenzen des Urheberrechtes beduerfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
          nur fuer den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
          dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
          beachtet und Inhalte als solche gekennzeichnet.
        </p>
      </section>

      <p className='mt-8 text-xs text-slate-500'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
