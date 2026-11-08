import type { ReactElement } from 'react';

/**
 * Gemeinsames Layout für die generierten Open-Graph-Bilder.
 *
 * Ersetzt das bisherige Logo-Asset, das mit 341×300 px ausgeliefert, aber als
 * 1200×630 deklariert wurde – LinkedIn und WhatsApp haben die Vorschau deshalb
 * verworfen. Hier entsteht das Bild zur Build-Zeit in echter Zielgröße, und
 * jede Welt bekommt ihr eigenes Motiv statt dreimal desselben Logos.
 *
 * Achtung: `next/og` rendert nur eine Teilmenge von CSS. Jedes Element mit mehr
 * als einem Kind braucht ein explizites `display: 'flex'`.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

type OgCardProps = {
  /** Kleine Zeile über der Überschrift, z. B. der Markenname. */
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Orte/Reichweite – für lokale Auffindbarkeit auch im geteilten Bild. */
  footer: string;
  background: string;
  accent: string;
  textColor: string;
  mutedColor: string;
};

export function OgCard({
  eyebrow,
  title,
  subtitle,
  footer,
  background,
  accent,
  textColor,
  mutedColor,
}: OgCardProps): ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background,
        fontFamily: 'sans-serif',
      }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: accent,
            marginRight: 18,
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: accent,
          }}>
          {eyebrow}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: textColor,
          }}>
          {title}
        </div>
        <div style={{ fontSize: 36, marginTop: 24, color: mutedColor, lineHeight: 1.3 }}>
          {subtitle}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 28, color: mutedColor }}>{footer}</div>
        <div style={{ fontSize: 28, color: textColor, fontWeight: 600 }}>heinemann.berlin</div>
      </div>
    </div>
  );
}

type OgPhotoCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
  /** JPG/PNG als data:-URI (next/og liest kein WebP), 560×630. */
  photo: string;
};

/**
 * Welt-A-Vorschau mit Foto (seit 2026-11): links Text auf Espresso, rechts das
 * Motiv der Seite, weich verlaufend. Für Seiten, die oft geteilt werden.
 */
export function OgPhotoCard({ eyebrow, title, subtitle, footer, photo }: OgPhotoCardProps): ReactElement {
  const accent = '#f6b35a';
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#140c06', fontFamily: 'sans-serif' }}>
      <div
        style={{
          width: 640,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 56px 56px 72px',
          background: 'linear-gradient(135deg, #140c06 0%, #2e1a0b 70%, #24150a 100%)',
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: accent, marginRight: 16 }} />
          <div style={{ fontSize: 22, letterSpacing: 5, textTransform: 'uppercase', color: accent }}>{eyebrow}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, color: '#fbefdf' }}>
            {title}
          </div>
          <div style={{ fontSize: 28, marginTop: 22, color: 'rgba(251,239,223,0.78)', lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 22, color: 'rgba(251,239,223,0.72)' }}>{footer}</div>
          <div style={{ fontSize: 22, color: '#fbefdf', fontWeight: 600 }}>heinemann.berlin</div>
        </div>
      </div>
      <div style={{ position: 'relative', width: 560, height: '100%', display: 'flex' }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og rendert nur <img> */}
        <img
          src={photo}
          alt=''
          width={560}
          height={630}
          style={{ width: 560, height: 630, objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 140,
            height: '100%',
            background: 'linear-gradient(90deg, #24150a 0%, rgba(36,21,10,0) 100%)',
          }}
        />
      </div>
    </div>
  );
}

/** Liest ein Foto aus public/og zur Build-Zeit als data:-URI. */
export async function ogPhoto(name: string) {
  const { readFile } = await import('node:fs/promises');
  const { join } = await import('node:path');
  const data = await readFile(join(process.cwd(), 'public', 'og', `${name}.jpg`));
  return `data:image/jpeg;base64,${data.toString('base64')}`;
}
