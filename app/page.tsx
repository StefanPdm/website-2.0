import Link from 'next/link';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import InfoOrb from '@/components/InfoOrb';

export default function Home() {
  const useWarmPills = true;
  const InfoOrbTitel = `"Stefan, du musst dich entscheiden! Entweder du bist Entwickler oder NLP Coach!"`;
  const InfoOrbText = `Das hörte ich beim Launch von einem Marketing-Profi. "Konzentriere dich auf eine Sache! - Alles andere versteht niemand."
  Meine Antwort: **„Warum? Genau das macht mich aus. Ich bin beides.“**

In der Psychologie gibt es den Persönlichkeitstyp **Scanner**. Das sind Menschen, die viele Interessen und Talente haben, aber oft das Gefühl, sich entscheiden zu müssen, weil die Gesellschaft das erwartet. 

Seit dem berühmten Buch von Barbara Sher über Scanner wissen wir: **Du musst dich nicht entscheiden.**

**Scanner** können viele Dinge parallel tun. Dabei vermischen sich ihre Leidenschaften oft — und genau daraus entstehen einzigartige Ergebnisse.
Das ist auch mein Ansatz: Webentwicklung und NLP-Coaching sind für mich zwei Seiten derselben Medaille. Beide Bereiche profitieren voneinander und machen mich zu einem vielseitigen Dienstleister.

Wenn du magst, probier doch einfach beides aus. Ich bin hier, um dich auf beiden Wegen zu begleiten — egal, ob du eine Website brauchst oder Klarheit in deinem Kopf willst.`;

  const pillScheme = useWarmPills
    ? {
        devPill: '/images-startseite/green-pill.webp',
        nlpPill: '/images-startseite/orange-pill.webp',
        devColors: {
          border: 'rgba(34, 197, 94, 0.25)',
          borderStrong: 'rgba(34, 197, 94, 0.6)',
          shadow: 'rgba(16, 122, 60, 0.18)',
          shadowStrong: 'rgba(16, 122, 60, 0.35)',
          glow: 'rgba(34, 197, 94, 0.35)',
          pillGlow: 'rgba(34, 197, 94, 0.45)',
        },
        nlpColors: {
          border: 'rgba(245, 158, 11, 0.25)',
          borderStrong: 'rgba(245, 158, 11, 0.6)',
          shadow: 'rgba(180, 83, 9, 0.18)',
          shadowStrong: 'rgba(180, 83, 9, 0.35)',
          glow: 'rgba(245, 158, 11, 0.35)',
          pillGlow: 'rgba(245, 158, 11, 0.45)',
        },
      }
    : {
        devPill: '/blue-pill.webp',
        nlpPill: '/red-pill.webp',
        devColors: {
          border: 'rgba(99, 179, 237, 0.25)',
          borderStrong: 'rgba(99, 179, 237, 0.6)',
          shadow: 'rgba(29, 111, 168, 0.18)',
          shadowStrong: 'rgba(29, 111, 168, 0.35)',
          glow: 'rgba(29, 111, 168, 0.35)',
          pillGlow: 'rgba(99, 179, 237, 0.45)',
        },
        nlpColors: {
          border: 'rgba(248, 113, 113, 0.25)',
          borderStrong: 'rgba(248, 113, 113, 0.6)',
          shadow: 'rgba(239, 68, 68, 0.18)',
          shadowStrong: 'rgba(239, 68, 68, 0.35)',
          glow: 'rgba(239, 68, 68, 0.35)',
          pillGlow: 'rgba(248, 113, 113, 0.45)',
        },
      };

  return (
    <div className='landing-shell'>
      <main className='landing-main'>
        {/* Header */}
        <header className='pt-4 w-full max-w-7xl sticky top-0 z-50 mx-auto flex items-center justify-between'>
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
        <section className='landing-grid pt-10 md:pt-20 '>
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
              <a
                className='landing-cta landing-cta--ghost w-full sm:w-auto'
                href='#root-contact'>
                Kontakt
              </a>
            </div>
            {/* orbits */}
            <div className='orbit-system'>
              <div className='orbit-center' />

              <div className='orbit-ring orbit-ring--four'>
                <div className='orbit-item'>
                  <div className='orbit-item__shell'>
                    <div className='orbit-item__content'>
                      <Image
                        src='/logos/nlp-logo.svg'
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
                        alt='Webdesign'
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
                        alt='Tony Robbins'
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
                        alt='Next.js'
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className='orbit-badge'>Next.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          {/* Balance Image */}
          <div className='flex flex-col items-center justify-star mt-20 md:-mt-28'>
            <div className='pointer-events-none relative isolate  md:w-96'>
              <span className='absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF]/20 blur-3xl' />
              <Image
                src='/images-startseite/portrait-balance-free.webp'
                alt='Stefan Heinemann'
                width={800}
                height={800}
                priority
              />
            </div>
            {/* Choise your path cards */}
            <div
              className='choice-card relative'
              id='choose'>
              <div className='choice-title mb-8'>Wähle deinen Weg</div>
              <InfoOrb
                headline={InfoOrbTitel}
                text={InfoOrbText}
                buttonClassName='absolute -top-4 right-2 xl:right-4 z-20 cursor-pointer'
              />

              <div className='choice-grid'>
                {/* left card */}
                <Link
                  className='choice-tile choice-tile--dev relative'
                  href='/webdevelopment/'
                  style={
                    {
                      '--choice-border': pillScheme.devColors.border,
                      '--choice-border-strong': pillScheme.devColors.borderStrong,
                      '--choice-shadow': pillScheme.devColors.shadow,
                      '--choice-shadow-strong': pillScheme.devColors.shadowStrong,
                      '--choice-glow': pillScheme.devColors.glow,
                      '--choice-pill-glow': pillScheme.devColors.pillGlow,
                    } as React.CSSProperties
                  }>
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
                      src={pillScheme.devPill}
                      alt={useWarmPills ? 'Grüne Pille' : 'Blaue Pille'}
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
                    <span className='choice-link'>
                      {useWarmPills ? 'Grüne Pille wählen →' : 'Blaue Pille wählen →'}
                    </span>
                  </div>
                </Link>

                {/* right card */}
                <Link
                  className='choice-tile choice-tile--nlp relative'
                  href='/nlp'
                  style={
                    {
                      '--choice-border': pillScheme.nlpColors.border,
                      '--choice-border-strong': pillScheme.nlpColors.borderStrong,
                      '--choice-shadow': pillScheme.nlpColors.shadow,
                      '--choice-shadow-strong': pillScheme.nlpColors.shadowStrong,
                      '--choice-glow': pillScheme.nlpColors.glow,
                      '--choice-pill-glow': pillScheme.nlpColors.pillGlow,
                    } as React.CSSProperties
                  }>
                  <div className='choice-logo-big'>
                    <Image
                      src='/logos/nlp-logo.svg'
                      alt='NLP Logo'
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className='choice-pill-slot'>
                    <Image
                      className='choice-pill-image'
                      src={pillScheme.nlpPill}
                      alt={useWarmPills ? 'Orange Pille' : 'Rote Pille'}
                      width={64}
                      height={64}
                      quality={100}
                    />
                  </div>
                  <div className='choice-meta'>
                    <div className='choice-heading'>NLP Coaching</div>
                    <div className='choice-text'>Kopf. Körper. Fokus.</div>
                    <br />
                    <span className='choice-link'>
                      {useWarmPills ? 'Orange Pille wählen →' : 'Rote Pille wählen →'}
                    </span>
                  </div>
                </Link>
              </div>
              <div className='choice-footer'>Minimal. Premium. Klar. © Stefan Heinemann</div>
            </div>
          </div>
        </section>

        {/* Hidden contact section, revealed on click and scrolled into view */}
        <section
          id='root-contact'
          className='landing-grid contact-grid contact-grid--hidden pt-8'>
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
