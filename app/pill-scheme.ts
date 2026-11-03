/**
 * Pillen-Schema der früheren Startseite (Wahlkarten mit Pille, bis 2026-11).
 *
 * Seit dem Umbau auf „Naht + Foto“ nicht mehr angezeigt. Bewusst aufbewahrt
 * (CLAUDE.md §3.1): Wer die Wahlkarten zurückholen will, findet hier beide
 * Farbschemata und in globals.css die `.choice-*`-Klassen. Das Markup steht im
 * Git-Verlauf von app/page.tsx (Commit vor dem Umbau).
 *
 * warm = grün/orange (zuletzt aktiv), cold = blau/rot (Matrix-Referenz).
 */
export const pillSchemes = {
  warm: {
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
  },
  cold: {
    devPill: '/images-startseite/blue-pill.webp',
    nlpPill: '/images-startseite/red-pill.webp',
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
  },
} as const;
