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
