/**
 * Meldet alle Seiten der Sitemap per IndexNow zur Neu-Indexierung an.
 *
 * Warum das lohnt: IndexNow wird von **Bing**, Yandex, Seznam und Naver
 * unterstützt. Statt zu warten, bis ein Crawler vorbeikommt, ist eine geänderte
 * Seite meist innerhalb von Minuten im Index.
 *
 * Für die Sichtbarkeit in KI-Antworten ist das überproportional wertvoll:
 * Die Websuche von ChatGPT stützt sich neben dem eigenen Crawler wesentlich
 * auf Bings Index. Google unterstützt IndexNow nicht — dort bleibt es bei
 * Sitemap und Search Console.
 *
 * Aufruf **nach** einem Deploy (die URLs müssen live erreichbar sein):
 *
 *     pnpm indexnow
 *
 * Der Schlüssel liegt als Datei in public/ und muss unter
 * https://www.heinemann.berlin/<schlüssel>.txt abrufbar sein — sonst lehnt
 * IndexNow die Meldung ab. Inhalt der Datei = Dateiname ohne .txt.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'www.heinemann.berlin';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

/** Schlüsseldatei in public/ finden – 32 Hex-Zeichen plus .txt. */
function readKey() {
  const publicDir = path.join(ROOT, 'public');
  const file = fs.readdirSync(publicDir).find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
  if (!file) {
    throw new Error(
      'Keine IndexNow-Schlüsseldatei in public/ gefunden. ' +
        'Erwartet wird <32-Hex-Zeichen>.txt mit dem Schlüssel als Inhalt.',
    );
  }
  const key = file.replace(/\.txt$/, '');
  const content = fs.readFileSync(path.join(publicDir, file), 'utf8').trim();
  if (content !== key) {
    throw new Error(`Inhalt von ${file} stimmt nicht mit dem Dateinamen überein.`);
  }
  return key;
}

/**
 * Pfade aus app/sitemap.ts lesen.
 *
 * Bewusst per Textauswertung statt Import: Die Datei ist TypeScript und
 * importiert next-Typen — ein reines Node-Skript könnte sie nicht laden,
 * ohne eine Build-Kette aufzusetzen.
 */
function readPaths() {
  const source = fs.readFileSync(path.join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  const paths = [...source.matchAll(/\{\s*path:\s*'([^']+)'/g)].map((m) => m[1]);
  if (paths.length === 0) throw new Error('Keine Pfade in app/sitemap.ts gefunden.');
  return paths;
}

async function main() {
  const key = readKey();
  const urlList = readPaths().map((p) => `https://${HOST}${p === '/' ? '/' : p}`);

  console.log(`IndexNow → ${urlList.length} URLs, Host ${HOST}`);
  for (const url of urlList) console.log('  ' + url);

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `https://${HOST}/${key}.txt`,
      urlList,
    }),
  });

  // IndexNow antwortet 200 oder 202 bei Erfolg; 202 heißt „Schlüssel wird noch geprüft".
  if (response.status === 200 || response.status === 202) {
    console.log(`\nOK (HTTP ${response.status}) – Meldung angenommen.`);
    return;
  }

  const hints = {
    400: 'Ungültiges Format.',
    403: 'Schlüssel nicht gültig – ist die Datei unter keyLocation live erreichbar?',
    422: 'URLs gehören nicht zum angegebenen Host.',
    429: 'Zu viele Anfragen – später erneut versuchen.',
  };
  console.error(`\nFehlgeschlagen: HTTP ${response.status}. ${hints[response.status] ?? ''}`);
  console.error(await response.text());
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
