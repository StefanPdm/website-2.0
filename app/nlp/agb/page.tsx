export const metadata = {
  title: 'AGB | NLP Coaching',
  description: 'Allgemeine Geschaeftsbedingungen fuer den Bereich NLP Coaching.',
};

export default function AgbPage() {
  return (
    <main className='relative z-10 mx-auto max-w-4xl px-4 py-48'>
      <header className='mb-10'>
        <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10'>
          Rechtliches · AGB
        </p>
        <h1 className='mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white'>
          Allgemeine Geschaeftsbedingungen
        </h1>
        <p className='mt-3 text-slate-300 max-w-2xl'>
          Diese AGB gelten fuer die Leistungen im Bereich NLP Coaching. Bitte passen Sie die
          Platzhalter an Ihr konkretes Angebot und Ihre Prozesse an.
        </p>
      </header>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>1. Geltungsbereich</h2>
        <p className='text-slate-300'>
          Diese Bedingungen gelten fuer alle Vertraege zwischen Stefan Heinemann (nachfolgend
          &quot;Anbieter&quot;) und dem Kunden ueber NLP Coaching und verwandte Dienstleistungen.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>2. Leistungen</h2>
        <p className='text-slate-300'>
          Der Anbieter erbringt Coaching-Leistungen nach individueller Vereinbarung. Ein konkreter
          Erfolg ist nicht geschuldet. Termine, Umfang und Inhalte werden im Vorfeld abgestimmt.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>3. Vertragsschluss</h2>
        <p className='text-slate-300'>
          Ein Vertrag kommt zustande, wenn der Kunde ein Angebot annimmt und der Anbieter dies
          bestaetigt (z. B. per E-Mail) oder die Leistung erbracht wird.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>4. Verguetung</h2>
        <p className='text-slate-300'>
          Es gelten die jeweils vereinbarten Preise. Rechnungen sind, sofern nicht anders
          vereinbart, innerhalb von 14 Tagen faellig.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>5. Terminabsagen</h2>
        <p className='text-slate-300'>
          Vereinbarte Termine koennen bis 48 Stunden vorher kostenfrei verschoben oder abgesagt
          werden. Bei spaeterer Absage kann die Leistung anteilig berechnet werden.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>6. Haftung</h2>
        <p className='text-slate-300'>
          Der Anbieter haftet nur fuer Schaeden, die auf vorsatz oder grober Fahrlaessigkeit
          beruhen. Fuer leichte Fahrlaessigkeit haftet der Anbieter nur bei Verletzung wesentlicher
          Vertragspflichten.
        </p>
      </section>

      <section className='rounded-2xl border border-white/15 bg-white/5 p-6 ring-1 ring-white/10 mb-6'>
        <h2 className='text-xl font-semibold text-white mb-3'>7. Schlussbestimmungen</h2>
        <p className='text-slate-300'>
          Es gilt deutsches Recht. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die
          Wirksamkeit der uebrigen Bestimmungen unberuehrt.
        </p>
      </section>

      <p className='mt-8 text-xs text-slate-500'>
        Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
      </p>
    </main>
  );
}
