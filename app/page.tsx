'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [showContact, setShowContact] = useState(false);

  const handleContactClick = () => {
    if (!showContact) setShowContact(true);
    // Wait for reveal, then scroll smoothly into view
    requestAnimationFrame(() => {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInput = contactRef.current?.querySelector(
          'input[name="name"]',
        ) as HTMLInputElement | null;
        firstInput?.focus();
      }, 60);
    });
  };

  return (
    <div className='landing-shell'>
      <main className='landing-main'>
        {/* Header */}
        <header className='landing-header'>
          <div className='landing-brand'>
            <div className='w-12 h-12'>
              <Image
                src='/Global-Logo-SH-1.webp'
                alt='Studio Fokus Logo'
                width={120}
                height={120}
              />
            </div>
            <div>
              <div className='landing-name'>Stefan Heinemann</div>
              <div className='landing-role'>Coaching & Webdevelopment</div>
            </div>
          </div>
          <div className='landing-tags hidden md:flex'>
            <span>klar</span>
            <span>sauber</span>
            <span>wirksam</span>
          </div>
        </header>
        {/* Entscheidung */}
        <section className='landing-grid pt-20 md:pt-10'>
          <div className='landing-left'>
            <span className='landing-badge'>Wähle deinen Weg</span>
            <h1 className='landing-title'>
              Zwei Welten.
              <br />
              Eine Entscheidung.
            </h1>
            <span className='landing-subtitle'>Du bekommst entweder: </span>
            <ul className='landing-subtitle'>
              <li>⋙ innere Klarheit &nbsp; → &nbsp; NLP Coaching</li>
              <li>⋙ digitale Systeme &nbsp; → &nbsp; Webdevelopment</li>
            </ul>
            <span className='landing-subtitle'>Beides sauber. Beides persönlich. Ohne Blabla.</span>
            <div className='landing-actions'>
              <a
                className='landing-cta landing-cta--primary inline-flex md:hidden'
                href='#choose'>
                Jetzt wählen
              </a>
              <button
                type='button'
                className='cursor-pointer landing-cta landing-cta--ghost w-full sm:w-auto'
                onClick={handleContactClick}>
                Kontakt
              </button>
            </div>
          </div>

          {/* right side */}
          <div className='landing-right'>
            {/* orbits */}
            <div className='orbit-system'>
              <div className='orbit-center' />

              <div className='orbit-ring orbit-ring--four'>
                <div className='orbit-item'>
                  <div className='orbit-item__shell'>
                    <div className='orbit-item__content'>
                      <Image
                        src='/nlp-logo.svg'
                        alt='NLP'
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className='orbit-badge'>NLP</span>
                  </div>
                </div>
              </div>

              <div className='orbit-ring orbit-ring--two'>
                <div className='orbit-item'>
                  <div className='orbit-item__shell'>
                    <div className='orbit-item__content'>
                      <Image
                        src='/webdesign-logo.png'
                        alt='Web'
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className='orbit-badge'>Webdesign</span>
                  </div>
                </div>
              </div>

              <div className='orbit-ring orbit-ring--three'>
                <div className='orbit-item'>
                  <div className='orbit-item__shell'>
                    <div className='orbit-item__content'>
                      <Image
                        src='/tony-robbins.png'
                        alt='Web'
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className='orbit-badge'>Tony Robbins</span>
                  </div>
                </div>
              </div>

              <div className='orbit-ring orbit-ring--one'>
                <div className='orbit-item'>
                  <div className='orbit-item__shell'>
                    <div className='orbit-item__content'>
                      <Image
                        src='/Nextjs_Symbol.svg'
                        alt='Web'
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className='orbit-badge'>Next.js</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Choise your path cards */}
            <div
              className='choice-card mt-20 md:mt-8'
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

        {/* Hidden contact section, revealed on click and scrolled into view */}
        <section
          id='root-contact'
          ref={contactRef}
          style={{ display: showContact ? 'block' : 'none' }}
          className='landing-grid contact-grid pt-8'>
          <div className='landing-left'>
            <span className='landing-badge'>Kontakt</span>
            <h2 className='landing-title'>Lass uns sprechen.</h2>
            <p className='landing-subtitle'>
              Kurze Beschreibung reicht. Ich melde mich ehrlich zurück.
            </p>
            <div className='contact-points'>
              <div>Antwort i. d. R. innerhalb von 24–48 Stunden.</div>
              <div>Vertraulich. Persönlich. Ohne Umwege.</div>
            </div>
          </div>

          <div className='contact-card mt-16 md:mt-0 px-4! md:px-unset'>
            <h3 className='contact-title'>Nachricht senden</h3>
            <p className='contact-subtitle'>
              Erzähl mir kurz, worum es geht – Website, Coaching oder etwas anderes.
            </p>
            <ContactForm />
          </div>
        </section>

        <div className='landing-tip'>
          Tipp: Bei mir kannst du jederzeit wechseln. Oder beides machen. 😁
        </div>
      </main>
    </div>
  );
}
