import Link from 'next/link';

export default function AboutPage() {
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
            <Link href='/impressum'>Impressum</Link>
          </div>
        </nav>

        <section className='content-card'>
          <span className='eyebrow'>Über mich</span>
          <h1 className='home-title'>Klarheit, Gestaltung, Wirkung.</h1>
          <p className='home-subtitle'>
            Ich kombiniere strategisches Webdesign mit einem Coaching-Ansatz, der Menschen in ihre
            Kraft bringt. Mein Fokus liegt auf klaren Botschaften, ruhiger Präsenz und modernen,
            minimalen Markenauftritten.
          </p>
        </section>

        <section className='content-card'>
          <h2 className='section-title'>Werte</h2>
          <div className='service-grid'>
            <div className='service-tile'>
              <h3>Klarheit</h3>
              <p>Klare Kommunikation, klare Designs, klare Entscheidungen.</p>
            </div>
            <div className='service-tile'>
              <h3>Ruhe</h3>
              <p>Fokus auf das Wesentliche – ohne Ablenkung.</p>
            </div>
            <div className='service-tile'>
              <h3>Wirkung</h3>
              <p>Design und Coaching mit messbarer Veränderung.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
