import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import MissingPath from '@/components/MissingPath';

/**
 * 404 – Welt 0 (seit 2026-11). Wie die Startseite zwei Hälften an einer Naht:
 * links Welt B (Nachtblau, Raster, Scan), rechts Welt A (Espresso, Atem-Ringe).
 * Die große 404 sitzt auf der Naht und ist halb blau, halb Bernstein.
 * Jede Hälfte bietet Wege in ihre Welt. Reines CSS (`.nf-*` in globals.css),
 * kein WebGL. Next.js setzt für diese Seite selbst `noindex`.
 */

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
};

const webLinks = [
  { label: 'Webentwicklung', hint: 'Websites, Web-Apps, Relaunch', href: '/webdevelopment' },
  { label: 'KI-Sichtbarkeits-Check', hint: '11 Prüfpunkte, Ergebnis sofort', href: '/webdevelopment/ki-check' },
];

const coachLinks = [
  { label: 'Life Coaching für Unternehmer', hint: 'Potsdam, Berlin und online', href: '/coaching' },
  { label: 'Glaubenssätze erkennen', hint: '50 Sätze zum Antippen', href: '/coaching/glaubenssaetze' },
  { label: 'Persönlichkeitstest', hint: '18 Fragen, Auswertung sofort', href: '/coaching/persoenlichkeitstest' },
];

// § 5 DDG: Impressum von jeder Seite aus erreichbar
const legalLinks = [
  { label: 'Impressum Coaching', href: '/coaching/impressum' },
  { label: 'Impressum Web', href: '/webdevelopment/impressum' },
  { label: 'Datenschutz Coaching', href: '/coaching/datenschutz' },
  { label: 'Datenschutz Web', href: '/webdevelopment/datenschutz' },
];

const rings = [70, 120, 175, 235, 295];

function WayList({ links, tone }: { links: typeof webLinks; tone: 'web' | 'coach' }) {
  return (
    <ul className='nf-ways'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`nf-way nf-way--${tone}`}>
            <span>
              <span className='nf-way__label'>{link.label}</span>
              <span className='nf-way__hint'>{link.hint}</span>
            </span>
            <ArrowRight
              aria-hidden='true'
              className='nf-way__arrow'
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function NotFound() {
  return (
    <main className='nf'>
      {/* Hintergründe der beiden Welten */}
      <div
        aria-hidden='true'
        className='nf-bg'>
        <div className='nf-bg__web'>
          <span className='nf-bg__grid' />
          <span className='hub-scan' />
        </div>
        <div className='nf-bg__coach'>
          <svg
            viewBox='0 0 600 600'
            className='nf-rings'>
            {rings.map((r, index) => (
              <circle
                key={r}
                cx='300'
                cy='300'
                r={r}
                style={{ animationDelay: `${index * 0.9}s` }}
              />
            ))}
          </svg>
        </div>
        <span className='nf-seam' />
      </div>

      <header className='nf-head'>
        <Link
          href='/'
          className='nf-brand'>
          <Image
            src='/logos/logo-zeichen.svg'
            alt=''
            width={55}
            height={50}
            className='h-9 w-auto'
          />
          <span>Stefan Heinemann</span>
        </Link>
      </header>

      <div className='nf-hero'>
        <p
          className='nf-code'
          aria-hidden='true'>
          404
        </p>
        <h1 className='nf-title'>Diese Seite gibt es nicht.</h1>
        <p className='nf-lead'>Aber zwei Wege, die weiterführen.</p>
      </div>

      <div className='nf-halves'>
        {/* Welt B */}
        <section
          className='nf-half nf-half--web'
          aria-labelledby='nf-web'>
          <p className='nf-eyebrow nf-eyebrow--web'>Webdevelopment</p>
          <div className='nf-terminal'>
            <p>
              <span className='nf-terminal__prompt'>$</span> GET <MissingPath />
            </p>
            <p className='nf-terminal__error'>← 404 Not Found</p>
            <p className='nf-terminal__note'>{'// Link veraltet oder vertippt.'}</p>
          </div>
          <h2
            id='nf-web'
            className='nf-claim'>
            Ein toter Link.
            <br />
            Passiert. Sollte aber nicht.
          </h2>
          <WayList
            links={webLinks}
            tone='web'
          />
        </section>

        {/* Welt A */}
        <section
          className='nf-half nf-half--coach'
          aria-labelledby='nf-coach'>
          <p className='nf-eyebrow nf-eyebrow--coach'>Coaching</p>
          <h2
            id='nf-coach'
            className='nf-claim nf-claim--coach'>
            Verlaufen ist auch
            <br />
            eine Richtung.
          </h2>
          <p className='nf-text'>
            Manchmal führt der Umweg genau dahin, wo du eigentlich hinwolltest. Zum Beispiel hierhin:
          </p>
          <WayList
            links={coachLinks}
            tone='coach'
          />
        </section>
      </div>

      <footer className='nf-foot'>
        <Link
          href='/'
          className='nf-home'>
          Zur Startseite
        </Link>
        <nav
          aria-label='Rechtliches'
          className='nf-legal'>
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </footer>
    </main>
  );
}
