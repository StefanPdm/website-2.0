import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/**
 * Zugekaufte Effekt-Komponenten (react-bits). Sie werden nicht von uns
 * gepflegt und bewusst nicht umformatiert — siehe CLAUDE.md §6.
 */
const VENDOR_COMPONENTS = [
  'components/CardNav.jsx',
  'components/CardSwap.jsx',
  'components/ElectricBorder.jsx',
  'components/FloatingLines.jsx',
  'components/Hyperspeed.jsx',
  'components/HyperSpeedPresets.js',
  'components/LaserFlow.tsx',
  'components/LightPillar.jsx',
  'components/PixelCard.jsx',
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  {
    /**
     * Für Vendor-Code werden gezielt die Regeln abgeschaltet, die dort
     * systematisch anschlagen — nicht die Dateien insgesamt ignoriert.
     * So bleiben echte Fehler (Syntax, ungenutzte Variablen mit Tippfehler,
     * kaputte Imports) weiterhin sichtbar, und `npx eslint .` ist wieder ein
     * belastbares Signal für den selbst geschriebenen Code.
     *
     * Wird eine dieser Komponenten irgendwann durch eigene ersetzt, gehört
     * sie aus dieser Liste heraus.
     */
    files: VENDOR_COMPONENTS,
    rules: {
      // three.js-Objekte sind ohne Weiteres nicht sauber zu typisieren.
      '@typescript-eslint/no-explicit-any': 'off',
      // WebGL-Initialisierung setzt State direkt im Effekt (Fallback-Erkennung).
      'react-hooks/set-state-in-effect': 'off',
      // Canvas-/Galerie-Code nutzt <img> statt next/image.
      '@next/next/no-img-element': 'off',
      // Aufgefangene, aber nicht ausgewertete Fehlerobjekte.
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]);

export default eslintConfig;
