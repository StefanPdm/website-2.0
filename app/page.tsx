import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
          <div className='landing-tags'>
            <span>klar</span>
            <span>sauber</span>
            <span>wirksam</span>
          </div>
        </header>

        <section className='landing-grid'>
          <div className='landing-left'>
            <span className='landing-badge'>Wähle deinen Weg</span>
            <h1 className='landing-title'>
              Zwei Welten.
              <br />
              Eine Entscheidung.
            </h1>
            <p className='landing-subtitle'>
              Du bekommst entweder innere Klarheit (NLP Coaching) oder digitale Systeme
              (Webdevelopment). Beides sauber. Beides persönlich. Ohne Blabla.
            </p>
            <div className='landing-actions'>
              <a
                className='landing-cta landing-cta--primary'
                href='#choose'>
                Jetzt wählen
              </a>
              <Link
                className='landing-cta landing-cta--ghost'
                href='/contact'>
                Kontakt
              </Link>
            </div>
          </div>

          <div className='landing-right'>
            <div className='orbit'>
              <div className='orbit-item orbit-item--one'>
                <Image
                  src='/nlp-logo.svg'
                  alt='NLP'
                  width={40}
                  height={40}
                />
              </div>
              <div className='orbit-item orbit-item--two'>
                <Image
                  src='/webdesign.svg'
                  alt='Web'
                  width={40}
                  height={40}
                />
              </div>
              <div className='orbit-item orbit-item--three'>
                <span>UI</span>
              </div>
              <div className='orbit-item orbit-item--four'>
                <span>API</span>
              </div>
            </div>
            {/* Choise your path cards */}
            <div
              className='choice-card'
              id='choose'>
              <div className='choice-title mb-8'>Wähle deinen Weg</div>

              <div className='choice-grid'>
                {/* left card */}
                <Link
                  className='choice-tile choice-tile--nlp relative'
                  href='/nlp'>
                  <div className='choice-logo-big'>
                    <Image
                      src='/nlp-logo.svg'
                      alt='NLP Logo'
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className='choice-pill-slot'>
                    <Image
                      className='choice-pill-image'
                      src='/red-pill.webp'
                      alt='Rote Pille'
                      width={64}
                      height={64}
                      quality={100}
                    />
                  </div>
                  <div className='choice-meta'>
                    <div className='choice-heading'>NLP Coaching</div>
                    <div className='choice-text'>Kopf. Körper. Fokus.</div>
                    <br />
                    <span className='choice-link'>Rote Pille wählen →</span>
                  </div>
                </Link>
                {/* right card */}
                <Link
                  className='choice-tile choice-tile--dev relative'
                  href='/dev'>
                  <div className='choice-logo-big'>
                    <Image
                      src='/webdesign-logo.svg'
                      alt='Webdevelopment Logo'
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className='choice-pill-slot'>
                    <Image
                      className='choice-pill-image'
                      src='/blue-pill.webp'
                      alt='Blaue Pille'
                      width={64}
                      height={64}
                      quality={100}
                    />
                  </div>
                  <div className='choice-meta'>
                    <div className='choice-heading'>Webdevelopment</div>
                    <div className='choice-text'>
                      Websites. Shops.
                      <br />
                      Systeme.
                    </div>
                    <br />
                    <span className='choice-link'>Blaue Pille wählen →</span>
                  </div>
                </Link>
              </div>
              <div className='choice-footer'>Minimal. Premium. Klar. © Stefan</div>
            </div>
          </div>
        </section>

        <div className='landing-tip'>
          Tipp: Hover/Tap auf eine Karte – die Seite „entscheidet“ optisch mit dir 🙂
        </div>
      </main>
    </div>
  );
}
