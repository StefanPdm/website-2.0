/**
 * Seitenhintergrund von Welt B (seit 2026-11).
 *
 * Derselbe Look wie die linke Hälfte der Startseite: Nachtblau, Brand-Licht
 * #1D6FA8 → #7A2C8E, 32px-Raster, langsamer Scan-Balken. Wer auf der
 * Startseite „Webdevelopment“ wählt, landet damit ohne Bruch hier.
 *
 * Reines CSS statt der früheren LightPillar (WebGL): kein three.js im
 * Seitenhintergrund, und der Text liegt auf ruhigem, dunklem Grund – die
 * Lichtsäule hatte stellenweise den Kontrast unter 4,5 : 1 gedrückt.
 * Klassen `.web-backdrop*` in app/globals.css.
 */
export default function WebBackdrop() {
  return (
    <div
      aria-hidden='true'
      className='web-backdrop'>
      <span className='web-backdrop__grid' />
      <span className='hub-scan web-backdrop__scan' />
    </div>
  );
}
