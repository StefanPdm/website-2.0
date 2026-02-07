import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NLP Coaching · Klarheit. Fokus. Veränderung.',
  description:
    'NLP-Coaching für Menschen, die viel leisten – und wieder bei sich ankommen wollen. Praktisch, direkt, ohne Blabla.',
};

const trustItems = [
  '100+ Sessions',
  'Online möglich',
  'Vertraulich',
  'In 60–90 Min. spürbar mehr Klarheit',
];

const focusAreas = [
  {
    title: 'Gedankenkarussell stoppen',
    description: 'Kurze Tools für sofort mehr Ruhe & Entscheidungsfähigkeit.',
  },
  {
    title: 'Emotionen regulieren',
    description: 'Trigger verstehen, reagieren statt explodieren.',
  },
  {
    title: 'Ziele, die wirklich passen',
    description: 'Fokus finden, Prioritäten setzen, dranbleiben.',
  },
];

const offers = [
  {
    title: '1:1 Intensiv (90 Min.)',
    subtitle: 'Wenn du schnell Klarheit brauchst.',
    details: ['1 Session', 'Konkrete Interventionen', 'Sofort-Transfer'],
    cta: 'Intensiv anfragen',
  },
  {
    title: 'Coaching-Serie (6 Sessions)',
    subtitle: 'Wenn du nachhaltig Muster verändern willst.',
    details: ['6 Sessions', 'Zwischen-Impulse', 'Alltags-Transfer'],
    cta: 'Serie starten',
  },
  {
    title: 'VIP Performance (12 Wochen)',
    subtitle: 'Wenn du Performance + Erfüllung verbinden willst.',
    details: ['12 Wochen', 'Direktzugang', 'Strategie + Umsetzung'],
    cta: 'VIP Gespräch',
  },
];

const steps = [
  {
    title: 'Kennenlernen',
    description: '15 Minuten, ob’s passt und was du brauchst.',
  },
  {
    title: 'Zielbild & Ist-Analyse',
    description: 'Wir klären, was konkret anders sein soll.',
  },
  {
    title: 'Interventionen',
    description: 'NLP-Formate, die Wirkung zeigen – direkt im Gespräch.',
  },
  {
    title: 'Transfer in den Alltag',
    description: 'Praktische Routinen, klare nächste Schritte.',
  },
  {
    title: 'Follow-up',
    description: 'Check-in, Feinschliff, nächste Etappe.',
  },
];

const testimonials = [
  {
    quote: '„Nach einer Session war’s im Kopf plötzlich still – und ich wusste, was zu tun ist.“',
    author: 'Klient · Unternehmer',
  },
  {
    quote: '„Sehr klar, sehr menschlich. Kein Tschakka – sondern echte Umsetzung.“',
    author: 'Klientin · Führungskraft',
  },
  {
    quote: '„Trigger erkannt, Muster gelöst. Und ich hab Tools, die ich täglich nutze.“',
    author: 'Klient · Privat',
  },
];

const faqs = [
  {
    question: 'Ist das Therapie?',
    answer:
      'Nein. Coaching ist zukunfts- und lösungsorientiert. Wenn therapeutische Unterstützung sinnvoll ist, empfehle ich das transparent.',
  },
  {
    question: 'Funktioniert das online wirklich?',
    answer:
      'Ja. Die meisten Formate funktionieren online sehr gut – klar strukturiert, mit Fokus auf Transfer.',
  },
  {
    question: 'Wie schnell sehe ich Ergebnisse?',
    answer:
      'Viele spüren bereits nach 1–2 Sessions mehr Klarheit. Nachhaltige Veränderungen brauchen oft mehrere Wochen.',
  },
  {
    question: 'Was, wenn ich nicht weiß, was ich will?',
    answer:
      'Dann starten wir genau dort. Wir sortieren Gedanken, finden Prioritäten und schaffen Orientierung.',
  },
];

export default function NlpPage() {
  return (
    <div className='min-h-screen bg-[#F8FAFC] text-[#0F172A]'>
      <header className='sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur'>
        <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3'>
          <Link
            className='flex items-center gap-3 font-semibold text-[#0B1B2B]'
            href='/'>
            <span className='grid h-9 w-9 place-items-center rounded-xl bg-[#1D6FA8] text-white'>
              N
            </span>
            <span className='leading-tight'>
              <span className='block text-sm'>NLP Coaching</span>
              <span className='block text-xs font-normal text-slate-500'>Klar. Warm. Wirksam.</span>
            </span>
          </Link>

          <nav className='hidden items-center gap-6 text-sm text-slate-600 md:flex'>
            <Link
              href='/'
              className='hover:text-slate-900'>
              Start
            </Link>
            <a
              href='#coaching'
              className='hover:text-slate-900'>
              Coaching
            </a>
            <a
              href='#ablauf'
              className='hover:text-slate-900'>
              Ablauf
            </a>
            <a
              href='#ueber'
              className='hover:text-slate-900'>
              Über mich
            </a>
            <a
              href='#stimmen'
              className='hover:text-slate-900'>
              Stimmen
            </a>
            <a
              href='#kontakt'
              className='hover:text-slate-900'>
              Kontakt
            </a>
          </nav>

          <a
            href='#kontakt'
            className='inline-flex items-center justify-center rounded-xl bg-[#0B1B2B] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90'>
            Kostenloses Kennenlernen
          </a>
        </div>
      </header>

      <section className='relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#1D6FA8]/10 via-[#86C243]/10 to-[#7A2C8E]/10 blur-3xl'></div>
          <div className='absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[#F6B35A]/25 blur-2xl'></div>
        </div>

        <div className='relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24'>
          <div>
            <p className='inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200'>
              <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
              Online & vor Ort · vertraulich · klarer Prozess
            </p>

            <h1 className='mt-5 text-4xl font-extrabold tracking-tight text-[#0B1B2B] md:text-5xl'>
              Klarheit im Kopf.
              <br className='hidden md:block' />
              Ruhe im Körper.
              <br className='hidden md:block' />
              Fokus im Leben.
            </h1>

            <p className='mt-4 text-lg text-slate-600'>
              NLP-Coaching für Menschen, die viel leisten – und wieder bei sich ankommen wollen.
              Praktisch, direkt, ohne Blabla.
            </p>

            <div className='mt-7 flex flex-wrap gap-3'>
              <a
                href='#kontakt'
                className='rounded-xl bg-[#0B1B2B] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'>
                Kennenlerngespräch buchen
              </a>
              <a
                href='#ablauf'
                className='rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0B1B2B] ring-1 ring-slate-200 transition hover:bg-slate-50'>
                Wie ich arbeite
              </a>
            </div>

            <div className='mt-8 grid grid-cols-2 gap-3 text-sm text-slate-600 md:grid-cols-4'>
              {trustItems.map((item) => (
                <div
                  key={item}
                  className='rounded-xl bg-white px-3 py-3 text-center ring-1 ring-slate-200'>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className='relative'>
            <div className='aspect-square w-full overflow-hidden rounded-[28px] bg-white/70 ring-1 ring-slate-200 shadow-[0_40px_80px_-60px_rgba(11,27,43,0.6)]'>
              <div className='flex h-full items-center justify-center bg-gradient-to-br from-[#1D6FA8]/10 via-white to-[#F6B35A]/20 text-sm text-slate-500'>
                Portrait / Hero-Visual
              </div>
            </div>
            <div className='pointer-events-none absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-3xl bg-[#7A2C8E]/20 blur-xl md:block'></div>
          </div>
        </div>
      </section>

      <section
        id='coaching'
        className='mx-auto max-w-6xl px-4 py-16'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>Woran wir arbeiten</h2>
          <p className='mt-3 text-slate-600'>
            Du bringst das Thema – ich bring Struktur, Fragen und Interventionen. Ziel: spürbare
            Veränderung, die im Alltag hält.
          </p>
        </div>

        <div className='mt-10 grid gap-5 md:grid-cols-3'>
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className='rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_30px_70px_-60px_rgba(11,27,43,0.4)]'>
              <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D6FA8]/10 text-[#1D6FA8]'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.6'
                  className='h-5 w-5'>
                  <circle
                    cx='12'
                    cy='12'
                    r='8'
                  />
                  <path d='M12 8v4l3 2' />
                </svg>
              </div>
              <div className='text-base font-semibold text-[#0B1B2B]'>{area.title}</div>
              <p className='mt-2 text-sm text-slate-600'>{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white/60 py-16 ring-1 ring-slate-200/60'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>Pakete</h2>
              <p className='mt-3 text-slate-600'>
                Wähle das Format, das zu deinem Tempo passt. Klar definiert, mit einem starken
                nächsten Schritt.
              </p>
            </div>
            <a
              href='#kontakt'
              className='inline-flex items-center justify-center rounded-xl bg-[#7A2C8E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90'>
              Angebot wählen
            </a>
          </div>

          <div className='mt-10 grid gap-5 md:grid-cols-3'>
            {offers.map((offer) => (
              <div
                key={offer.title}
                className='rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_30px_70px_-60px_rgba(11,27,43,0.4)]'>
                <div className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
                  Angebot
                </div>
                <h3 className='mt-3 text-lg font-semibold text-[#0B1B2B]'>{offer.title}</h3>
                <p className='mt-2 text-sm text-slate-600'>{offer.subtitle}</p>
                <ul className='mt-4 space-y-2 text-sm text-slate-600'>
                  {offer.details.map((detail) => (
                    <li
                      key={detail}
                      className='flex items-center gap-2'>
                      <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <a
                  href='#kontakt'
                  className='mt-6 inline-flex items-center text-sm font-semibold text-[#1D6FA8] hover:text-[#0B1B2B]'>
                  {offer.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id='ablauf'
        className='mx-auto max-w-6xl px-4 py-16'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>Ablauf</h2>
          <p className='mt-3 text-slate-600'>
            Schritt für Schritt, klar strukturiert. So entsteht Sicherheit und Verbindlichkeit.
          </p>
        </div>

        <div className='mt-8 grid gap-5 md:grid-cols-5'>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className='rounded-2xl bg-white p-5 ring-1 ring-slate-200'>
              <div className='text-xs font-semibold text-slate-400'>Schritt {index + 1}</div>
              <div className='mt-1 text-sm font-semibold text-[#0B1B2B]'>{step.title}</div>
              <p className='mt-2 text-sm text-slate-600'>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id='ueber'
        className='mx-auto max-w-6xl px-4 py-16'>
        <div className='grid gap-10 md:grid-cols-2 md:items-center'>
          <div className='aspect-[4/3] overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200'>
            <div className='flex h-full items-center justify-center bg-gradient-to-br from-[#1D6FA8]/10 via-white to-[#F6B35A]/20 text-sm text-slate-500'>
              Über-mich Bild
            </div>
          </div>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>Über mich</h2>
            <p className='mt-4 text-slate-600'>
              Ich arbeite klar, wertschätzend – und manchmal mit einem Augenzwinkern. Mir geht’s
              nicht um „Motivation“, sondern um echte Veränderung, die im Alltag hält.
            </p>
            <div className='mt-6 grid gap-3 text-sm text-slate-700'>
              <div className='rounded-2xl bg-white p-4 ring-1 ring-slate-200'>
                Klarer Prozess statt Blabla
              </div>
              <div className='rounded-2xl bg-white p-4 ring-1 ring-slate-200'>
                Wärmende Präsenz, direkte Fragen
              </div>
              <div className='rounded-2xl bg-white p-4 ring-1 ring-slate-200'>
                Transfer: Umsetzung zählt
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id='stimmen'
        className='bg-white py-16 ring-1 ring-slate-200/60'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
            <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>Stimmen</h2>
            <div className='inline-flex items-center gap-2 rounded-full bg-[#1D6FA8]/10 px-3 py-1 text-xs font-medium text-[#1D6FA8]'>
              ⭐ 5.0 · 40+ Bewertungen
            </div>
          </div>
          <div className='mt-8 grid gap-5 md:grid-cols-3'>
            {testimonials.map((item) => (
              <figure
                key={item.author}
                className='rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200'>
                <blockquote className='text-sm text-slate-700'>{item.quote}</blockquote>
                <figcaption className='mt-4 text-xs font-semibold text-slate-500'>
                  {item.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 py-16'>
        <div className='grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>Free Resource</h2>
            <p className='mt-3 text-slate-600'>
              PDF „Trigger-Reset in 3 Minuten“ – eine kurze Übung für sofort mehr Ruhe. Perfekt für
              zwischendurch.
            </p>
            <ul className='mt-4 space-y-2 text-sm text-slate-600'>
              <li className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
                3-Minuten-Übung, sofort anwendbar
              </li>
              <li className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
                Mini-Guide zum Ausdrucken
              </li>
              <li className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-[#86C243]'></span>
                Kein Spam, jederzeit abmeldbar
              </li>
            </ul>
          </div>
          <div className='rounded-3xl bg-white p-6 ring-1 ring-slate-200 shadow-[0_30px_70px_-60px_rgba(11,27,43,0.4)]'>
            <div className='text-sm font-semibold text-[#0B1B2B]'>PDF sofort erhalten</div>
            <p className='mt-2 text-sm text-slate-600'>
              Trag dich kurz ein und wir schicken dir den Download.
            </p>
            <form className='mt-4 grid gap-3'>
              <input
                type='email'
                required
                placeholder='E-Mail-Adresse'
                className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
              />
              <button
                type='submit'
                className='h-11 rounded-xl bg-gradient-to-r from-[#7A2C8E] to-[#1D6FA8] text-sm font-semibold text-white transition hover:opacity-90'>
                PDF erhalten
              </button>
            </form>
            <p className='mt-3 text-xs text-slate-500'>Datenschutzfreundlich. Kein Weitergeben.</p>
          </div>
        </div>
      </section>

      <section className='bg-white/60 py-16 ring-1 ring-slate-200/60'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>FAQ</h2>
            <p className='mt-3 text-slate-600'>
              Antworten auf die wichtigsten Fragen – klar und ohne Umwege.
            </p>
          </div>
          <div className='mt-8 grid gap-4 md:grid-cols-2'>
            {faqs.map((item) => (
              <div
                key={item.question}
                className='rounded-2xl bg-white p-6 ring-1 ring-slate-200'>
                <div className='text-sm font-semibold text-[#0B1B2B]'>{item.question}</div>
                <p className='mt-2 text-sm text-slate-600'>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id='kontakt'
        className='mx-auto max-w-6xl px-4 py-16'>
        <div className='grid gap-8 md:grid-cols-2 md:items-start'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-[#0B1B2B]'>Kontakt</h2>
            <p className='mt-3 text-slate-600'>
              Schreib mir kurz, worum’s geht. Ich melde mich zeitnah zurück – in der Regel innerhalb
              von 24–48 Stunden.
            </p>
            <div className='mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200'>
              <div className='text-sm font-semibold text-[#0B1B2B]'>Kostenloses Kennenlernen</div>
              <p className='mt-2 text-sm text-slate-600'>
                15 Minuten. Du bekommst Klarheit, ob Coaching jetzt der richtige Schritt ist.
              </p>
            </div>
            <div className='mt-6 text-sm text-slate-600'>
              <p className='font-semibold text-[#0B1B2B]'>Online & vor Ort</p>
              <p>Diskret, zuverlässig und strukturiert.</p>
            </div>
          </div>

          <form className='rounded-3xl bg-white p-6 ring-1 ring-slate-200'>
            <div className='grid gap-4'>
              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Name *</label>
                <input
                  required
                  name='name'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
                />
              </div>

              <div className='grid gap-1'>
                <label className='text-sm font-medium'>E-Mail *</label>
                <input
                  required
                  name='email'
                  type='email'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
                />
              </div>

              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Telefon (optional)</label>
                <input
                  name='phone'
                  type='tel'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'
                />
              </div>

              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Anliegen *</label>
                <select
                  required
                  name='topic'
                  className='h-11 rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400'>
                  <option value=''>Bitte wählen</option>
                  <option>Klarheit / Fokus</option>
                  <option>Beziehung</option>
                  <option>Business</option>
                  <option>Selbstwert</option>
                  <option>Stress / Überforderung</option>
                  <option>Anderes</option>
                </select>
              </div>

              <div className='grid gap-1'>
                <label className='text-sm font-medium'>Nachricht *</label>
                <textarea
                  required
                  name='message'
                  rows={5}
                  className='rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-slate-400'></textarea>
              </div>

              <label className='flex items-start gap-2 text-xs text-slate-600'>
                <input
                  required
                  type='checkbox'
                  name='privacy'
                  className='mt-1'
                />
                Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Daten
                zur Kontaktaufnahme zu.
              </label>

              <button
                type='submit'
                className='h-11 rounded-xl bg-[#0B1B2B] text-sm font-semibold text-white transition hover:opacity-90'>
                Anfrage senden
              </button>

              <p className='text-xs text-slate-500'>
                Antwort in der Regel innerhalb von 24–48 Stunden. Vertraulich, wie es sein soll.{' '}
                <a
                  href='/impressum'
                  className='underline'>
                  Datenschutz
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>

      <footer className='border-t border-slate-200 bg-white'>
        <div className='mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between'>
          <div>© {new Date().getFullYear()} · NLP Coaching</div>
          <div className='flex gap-4'>
            <Link
              href='/'
              className='hover:text-slate-900'>
              Start
            </Link>
            <a
              href='/impressum'
              className='hover:text-slate-900'>
              Impressum
            </a>
            <a
              href='/impressum'
              className='hover:text-slate-900'>
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
