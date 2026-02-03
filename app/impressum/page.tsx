import Link from 'next/link';

export default function ImpressumPage() {
  return (
    <div className='page-shell'>
      <main className='content-page'>
        <nav className='site-nav'>
          <Link
            className='brand'
            href='/'>
            Studio Fokus
          </Link>
          <div className='nav-links'>
            <Link href='/'>Start</Link>
            <Link href='/webdevelopment'>Webdesign</Link>
            <Link href='/nlp'>NLP</Link>
            <Link href='/contact'>Kontakt</Link>
          </div>
        </nav>

        <section className='content-card'>
          <span className='eyebrow'>Impressum</span>
          <h1 className='home-title'>Angaben gemäß § 5 TMG</h1>
          <div className='service-section'>
            <p>Dein Name / Studio Fokus</p>
            <p>Straße + Hausnummer</p>
            <p>PLZ Ort</p>
            <p>Deutschland</p>
            <br />
            <p>E-Mail: hello@studiofokus.de</p>
            <p>Telefon: +49 (0) 123 456789</p>
            <br />
            <p>USt-IdNr.: DE000000000</p>
          </div>
        </section>
      </main>
    </div>
  );
}
