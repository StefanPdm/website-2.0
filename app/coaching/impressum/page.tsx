import type { Metadata } from 'next';

// canonical + openGraph.url explizit: sonst erbt die Seite beides vom Layout
// und erklärt sich zum Duplikat der Welt-Startseite (CLAUDE.md §13).
export const metadata: Metadata = {
  title: 'Impressum – Stefan Heinemann Coaching',
  description:
    'Anbieterkennzeichnung nach § 5 DDG und rechtliche Hinweise für Stefan Heinemann Coaching, Potsdam.',
  alternates: { canonical: '/coaching/impressum' },
  openGraph: {
    title: 'Impressum – Stefan Heinemann Coaching',
    description:
      'Anbieterkennzeichnung nach § 5 DDG und rechtliche Hinweise für Stefan Heinemann Coaching, Potsdam.',
    url: '/coaching/impressum',
  },
};

export default function ImpressumPage() {
  return (
    <div className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-medium text-[var(--text)]'>
          Rechtliches · Informationen nach § 5 DDG
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]'>
          Impressum
        </h1>
        <p className='mt-3 text-[var(--muted)] max-w-2xl'>
          Anbieterkennzeichnung, Kontaktangaben und rechtlich erforderliche Hinweise für den
          Bereich Stefan Heinemann Coaching.
        </p>
      </header>

      <section className='rounded-2xl border border-card-border bg-[var(--surface)] p-6 mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Anbieter</h2>
        <div className='space-y-1 text-[var(--muted)]'>
          <p>Stefan Heinemann</p>
          <p>Schmiedegasse 53</p>
          <p>14469 Potsdam, Deutschland</p>
        </div>
        <div className='mt-4 space-y-1 text-[var(--muted)]'>
          <p>
            E-Mail:{' '}
            <a
              className='underline decoration-[var(--text)]/30 hover:text-[var(--text)]'
              href='mailto:coach.stefan@heinemann.berlin'>
              coach.stefan@heinemann.berlin
            </a>
          </p>
        </div>
        <div className='mt-4 grid gap-1 text-[var(--muted)]'>
          <p>Vertretungsberechtigt: Stefan Heinemann</p>

          <p>Steuerliche ID: 54 265 071 397</p>
        </div>
      </section>

      <section className='rounded-2xl border border-card-border bg-[var(--surface)] p-6 mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)
        </h2>
        <p className='text-[var(--muted)]'>Stefan Heinemann, Anschrift wie oben.</p>
      </section>

      <section className='rounded-2xl border border-card-border bg-[var(--surface)] p-6 mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>
          EU-Streitschlichtung / Verbraucherschlichtung
        </h2>
        <p className='text-[var(--muted)]'>
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className='rounded-2xl border border-card-border bg-[var(--surface)] p-6 mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Haftung für Inhalte</h2>
        <p className='text-[var(--muted)]'>
          Als Diensteanbieter sind wir nach § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
          Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
          möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
        </p>
      </section>

      <section className='rounded-2xl border border-card-border bg-[var(--surface)] p-6 mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Haftung für Links</h2>
        <p className='text-[var(--muted)]'>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
          Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
          ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </section>

      <section className='rounded-2xl border border-card-border bg-[var(--surface)] p-6 mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Urheberrecht</h2>
        <p className='text-[var(--muted)]'>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
          nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
          dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
          beachtet und Inhalte als solche gekennzeichnet.
        </p>
      </section>

      <section className='rounded-2xl border border-card-border bg-[var(--surface)] p-6 mb-6'>
        <h2 className='text-xl font-semibold text-[var(--text)] mb-3'>Bildnachweis</h2>
        <p className='text-[var(--muted)]'>
          Ein Teil der Bilder mit Personen auf diesen Seiten ist mit Künstlicher Intelligenz
          erzeugt: die Fotos in den Kopfbereichen der Unterseiten sowie die Bilder in den
          Abschnitten zu Podcast, Partnerschaft und Büchern. Es handelt sich um Symbolbilder; sie
          zeigen keine Klientinnen oder Klienten.
        </p>
      </section>

      <p className='mt-8 text-xs text-[var(--muted)]'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </div>
  );
}
