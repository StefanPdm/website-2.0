import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import HubLink from '@/components/HubLink';
import HubTilt from '@/components/HubTilt';
import InfoOrb from '@/components/InfoOrb';
import { RootStructuredData } from '@/components/StructuredData';

// § 5 DDG: Impressum muss von jeder Seite aus erreichbar sein – auch vom Hub.
// Beide Welten haben eigene Rechtstexte, deshalb beide verlinkt.
const legalLinks = [
  { label: 'Impressum Coaching', href: '/coaching/impressum' },
  { label: 'Impressum Web', href: '/webdevelopment/impressum' },
  { label: 'Datenschutz Coaching', href: '/coaching/datenschutz' },
  { label: 'Datenschutz Web', href: '/webdevelopment/datenschutz' },
  { label: 'Widerruf', href: '/widerruf' },
];

/**
 * Prüfbare Belege, die um das Foto kreisen (§10 Beweispflicht).
 * `angle` = Startwinkel auf der Bahn: 0° hinten (oben), 180° vorn (unten).
 */
const facts = [
  { label: 'DVNLP-zertifiziert', angle: 45 },
  { label: '20+ Jahre Unternehmer', angle: 135 },
  { label: 'Next.js · React · WordPress', angle: 225 },
  { label: 'Potsdam · Berlin · online', angle: 315 },
];

/** Vorne liegt die untere Bahnhälfte – dort laufen die Belege vor dem Foto. */
function isFront(angle: number) {
  return angle > 90 && angle < 270;
}


const InfoOrbTitel = `"Stefan, du musst dich entscheiden! Entweder du bist Entwickler oder Coach!"`;
const InfoOrbText = `Das hörte ich beim Launch von einem Marketing-Profi. "Konzentriere dich auf eine Sache! - Alles andere versteht niemand."
  Meine Antwort: **„Warum? Genau das macht mich aus. Ich bin beides.“**

In der Psychologie gibt es den Persönlichkeitstyp **Scanner**. Das sind Menschen, die viele Interessen und Talente haben, aber oft das Gefühl, sich entscheiden zu müssen, weil die Gesellschaft das erwartet.

Seit dem berühmten Buch von Barbara Sher über Scanner wissen wir: **Du musst dich nicht entscheiden.**

**Scanner** können viele Dinge parallel tun. Dabei vermischen sich ihre Leidenschaften oft — und genau daraus entsteht etwas Eigenes.
Das ist auch mein Ansatz: Webentwicklung und Coaching sind für mich zwei Seiten derselben Medaille. Beide Bereiche profitieren voneinander und machen mich zu einem vielseitigen Dienstleister.

Wenn du magst, probier doch einfach beides aus. Ich bin hier, um dich auf beiden Wegen zu begleiten — egal, ob du eine Website brauchst oder Klarheit in deinem Kopf willst.`;

function FactOrbit({ layer }: { layer: 'back' | 'front' }) {
  return (
    <div
      aria-hidden='true'
      className={`hub-orbit hub-orbit--${layer}`}>
      <div className='hub-orbit__plane'>
        <span className='hub-orbit__ring' />
        {facts.map((fact) => (
          <span
            key={fact.label}
            className='hub-orbit__pos'
            style={
              {
                '--a': `${fact.angle}deg`,
                '--delay': `${-(fact.angle / 360) * 36}s`,
                '--visible': (layer === 'front') === isFront(fact.angle) ? 1 : 0,
              } as CSSProperties
            }>
            <span className='hub-orbit__fact'>{fact.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Die sechs Flächen des Web-Würfels (Ausrichtung in globals.css, .hub-cube__face--*) */
const cubeFaces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
/** Atem-Ringe um die Coaching-Kugel: Verzögerung in Sekunden */
const breathRings = [0, 1.6, 3.2];

/**
 * Lichter über den offenen Händen – je Welt das Motiv ihres Hintergrunds, in 3D
 * (reines CSS, kein WebGL auf /):
 * Web = gläserner Rasterwürfel mit Scan-Ebene (Struktur, Technik),
 * Coaching = warme Kugel mit schrägen Atem-Ringen („Ruhe im Kopf“).
 * Positionen passen zu portrait-beide-haende.webp (.hub-light in globals.css).
 */
function HandLights() {
  return (
    <>
      <span
        aria-hidden='true'
        className='hub-light hub-light--web'>
        <span className='hub-light__spill' />
        <span className='hub-light__halo' />
        <span className='hub-light__scene'>
          <span className='hub-cube'>
            {cubeFaces.map((face) => (
              <span
                key={face}
                className={`hub-cube__face hub-cube__face--${face}`}
              />
            ))}
            <span className='hub-cube__scan' />
            <span className='hub-cube__core' />
          </span>
        </span>
      </span>

      <span
        aria-hidden='true'
        className='hub-light hub-light--coach'>
        <span className='hub-light__spill' />
        <span className='hub-light__halo' />
        <span className='hub-light__scene'>
          <span className='hub-sun'>
            <span className='hub-sun__plane'>
              {breathRings.map((delay) => (
                <span
                  key={delay}
                  className='hub-sun__ring'
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </span>
            <span className='hub-sun__ball' />
          </span>
        </span>
      </span>
    </>
  );
}

export default function Home() {
  return (
    <div className='hub-page'>
      <RootStructuredData />
      <main className='hub-main'>
          {/*
            Zwei Welten an einer Naht. Jede Hälfte ist ein Link über die volle
            Fläche; Hover/Fokus verschiebt die Naht (CSS :has), ein Klick lässt
            die Welt den Bildschirm füllen (HubLink). Das Foto steht auf der Naht.
          */}
          <section
            className='hub'
            aria-labelledby='hub-title'>
            <HubLink
              side='web'
              href='/webdevelopment'
              className='hub-half hub-half--web'>
              <div
                aria-hidden='true'
                className='hub-bg hub-bg--web'>
                <span className='hub-scan' />
              </div>
              <div className='hub-copy hub-copy--web'>
                <span className='hub-eyebrow'>Webdevelopment</span>
                <h2 className='hub-claim'>
                  Dein digitaler <br className='hidden lg:inline' />
                  Vorsprung.
                </h2>
                <span className='hub-text'>
                  Websites, Shops, Kundenportale und Plugins – gebaut mit 20 Jahren
                  Unternehmerblick.
                </span>
                <span className='hub-cta hub-cta--web'>
                  <span className='hub-cta-label'>Zur Webentwicklung</span>
                  <span aria-hidden='true'>→</span>
                </span>
              </div>
            </HubLink>

            <HubLink
              side='coach'
              href='/coaching'
              className='hub-half hub-half--coach'>
              <div
                aria-hidden='true'
                className='hub-bg hub-bg--coach'>
                <span className='hub-breath' />
              </div>
              <div className='hub-copy hub-copy--coach'>
                <span className='hub-eyebrow'>Life Coaching</span>
                <h2 className='hub-claim'>
                  Ruhe <br className='hidden lg:inline' />
                  im Kopf.
                </h2>
                <span className='hub-text'>
                  Für Unternehmer, die nach außen funktionieren – und innen wieder Klarheit
                  brauchen.
                </span>
                <span className='hub-cta hub-cta--coach'>
                  <span className='hub-cta-label'>Zum Coaching</span>
                  <span aria-hidden='true'>→</span>
                </span>
              </div>
            </HubLink>

            {/* Mobil: Struktur der Welten auch oben hinter Kopf und Foto,
                an der Naht zugeschnitten (am Desktop übernehmen das die Hälften) */}
            <div
              aria-hidden='true'
              className='hub-top-bg hub-top-bg--web hub-bg hub-bg--web'>
              <span className='hub-scan' />
            </div>
            <div
              aria-hidden='true'
              className='hub-top-bg hub-top-bg--coach hub-bg hub-bg--coach'>
              <span className='hub-breath' />
            </div>

            <span
              aria-hidden='true'
              className='hub-seam'
            />

            <header className='hub-top'>
              <Link
                href='/'
                className='landing-brand hub-brand'>
                <Image
                  src='/logos/logo-zeichen.svg'
                  alt=''
                  width={55}
                  height={50}
                  className='h-11 w-auto'
                />
                <span>
                  <span className='landing-name block'>Stefan Heinemann</span>
                  <span className='landing-role block'>Life Coach & Webentwickler · Potsdam</span>
                </span>
              </Link>
            </header>

            <div className='hub-head'>
              <h1
                id='hub-title'
                className='hub-title'>
                Zwei Welten. <br className='sm:hidden' />
                Eine Entscheidung.
              </h1>
              <p className='hub-sub'>
                Beides persönlich. Beides von mir.
                <br />
                In Potsdam, Berlin und online.
              </p>
              <p className='hub-facts'>
                {facts.map((fact) => fact.label).join(' · ')}
              </p>
            </div>

            <div className='hub-stage'>
              <span
                aria-hidden='true'
                className='hub-rim hub-rim--web'
              />
              <span
                aria-hidden='true'
                className='hub-rim hub-rim--coach'
              />
              <FactOrbit layer='back' />
              <Image
                src='/images-startseite/portrait-beide-haende.webp'
                alt='Stefan Heinemann hält beide Hände offen nach vorn – über der einen schwebt das Licht der Webentwicklung, über der anderen das des Coachings'
                width={1136}
                height={1136}
                sizes='(min-width: 1024px) 640px, 90vw'
                priority
                className='hub-photo'
              />
              {/* Mobil: deckender Auslauf in den Hintergrundfarben – eine Maske
                  am Foto würde die hinteren Belege durch den Körper scheinen lassen */}
              <span
                aria-hidden='true'
                className='hub-photo-fade'
              />
              <span
                aria-hidden='true'
                className='hub-logo-glow hub-logo-glow--web'
              />
              <span
                aria-hidden='true'
                className='hub-logo-glow hub-logo-glow--coach'
              />
              <HandLights />
              <FactOrbit layer='front' />
              <HubTilt />
            </div>

            {/* Infokugel: mobil oben rechts in der Kopfzeile, am Desktop über dem
                Foto (eigene Ebene in Bühnengröße, siehe .hub-info-slot) */}
            <div className='hub-stage hub-info-slot'>
              <InfoOrb
                headline={InfoOrbTitel}
                text={InfoOrbText}
                label='Warum beides?'
                buttonClassName='hub-info'
              />
            </div>
          </section>

          {/* Kein Kontakt auf der Startseite: Jede Welt hat ihr eigenes Formular. */}
          <div className='hub-below'>
            {/* Je ein kostenloser Einstieg pro Welt, in deren Farbe */}
            <div className='hub-freebies'>
              <Link
                href='/webdevelopment/ki-check'
                className='hub-kicheck'>
                <span className='hub-kicheck__badge'>Kostenlos</span>
                <span className='hub-kicheck__q'>Findet ChatGPT deine Website?</span>
                <span className='hub-kicheck__name'>KI-Check</span>
                <span
                  aria-hidden='true'
                  className='hub-kicheck__arrow'>
                  →
                </span>
              </Link>
              <Link
                href='/coaching/persoenlichkeitstest'
                className='hub-kicheck hub-kicheck--coach'>
                <span className='hub-kicheck__badge'>Kostenlos</span>
                <span className='hub-kicheck__q'>Wie tickst du?</span>
                <span className='hub-kicheck__name'>Persönlichkeitstest</span>
                <span
                  aria-hidden='true'
                  className='hub-kicheck__arrow'>
                  →
                </span>
              </Link>
            </div>

            <p className='landing-tip'>Tipp: Bei mir kannst du jederzeit wechseln. Oder beides machen.</p>

            <footer className='landing-footer'>
              <nav
                aria-label='Rechtliches'
                className='landing-legal'>
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </footer>
          </div>
      </main>
    </div>
  );
}
