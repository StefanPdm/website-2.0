import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className='landing-shell'>
      <main className='landing-main'>
        <header className='landing-header'>
          <div className='landing-brand'>
            <span className='landing-logo'>S</span>
            <div>
              <div className='landing-name'>Stefan</div>
              <div className='landing-role'>Coaching & Development</div>
            </div>
          </div>
          <nav className='landing-nav'>
            <Link
              href='/'
              className='landing-nav__link'>
              Start
            </Link>
            <Link
              href='/webdevelopment'
              className='landing-nav__link'>
              Webdevelopment
            </Link>
            <Link
              href='/nlp'
              className='landing-nav__link'>
              NLP Coaching
            </Link>
            <Link
              href='/impressum'
              className='landing-nav__link'>
              Impressum
            </Link>
          </nav>
        </header>

        <section className='landing-grid contact-grid'>
          <div className='landing-left'>
            <span className='landing-badge'>Kontakt</span>
            <h1 className='landing-title'>Lass uns sprechen.</h1>
            <p className='landing-subtitle'>
              Kurz schildern reicht. Ich melde mich ehrlich zurück und gebe dir eine klare
              Einschätzung.
            </p>
            <div className='contact-points'>
              <div>Antwort in der Regel innerhalb von 24–48 Stunden.</div>
              <div>Vertraulich. Persönlich. Ohne Umwege.</div>
            </div>
          </div>

          <div className='contact-card'>
            <h2 className='contact-title'>Nachricht senden</h2>
            <p className='contact-subtitle'>
              Erzähl mir kurz, worum es geht – Website, Coaching oder etwas anderes.
            </p>
            <form className='contact-form-dark'>
              <div className='form-row'>
                <input
                  className='form-input-dark'
                  type='text'
                  name='name'
                  placeholder='Name'
                  required
                />
                <input
                  className='form-input-dark'
                  type='email'
                  name='email'
                  placeholder='E-Mail'
                  required
                />
              </div>
              <div className='form-row'>
                <input
                  className='form-input-dark'
                  type='text'
                  name='topic'
                  placeholder='Thema'
                />
                <input
                  className='form-input-dark'
                  type='text'
                  name='timeline'
                  placeholder='Zeitrahmen'
                />
              </div>
              <textarea
                className='form-textarea-dark'
                name='message'
                placeholder='Deine Nachricht'
                required
                rows={5}
              />
              <label className='form-privacy'>
                <input
                  type='checkbox'
                  required
                />
                Ich habe die Datenschutzhinweise gelesen.
              </label>
              <button
                className='contact-button'
                type='submit'>
                Nachricht senden
              </button>
              <p className='contact-note'>Kein Spam. Keine Weitergabe. Nur Klarheit.</p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
