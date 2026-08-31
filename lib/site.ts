/**
 * Einzige Quelle für Domain, Stammdaten und Suchbegriffe.
 *
 * Wichtig: Die kanonische Domain steht **nur hier**. Sie war zuvor an vier
 * Stellen mit zwei verschiedenen Schreibweisen hinterlegt (mit/ohne www),
 * was Google zu Duplicate-Content-Raten gezwungen hat.
 */

export const SITE_URL = 'https://www.heinemann.berlin';

/** Absolute URL aus einem internen Pfad. */
export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

// ---------------------------------------------------------------------------
// Stammdaten (Quelle: Impressum – bei Änderung dort UND hier pflegen)
// ---------------------------------------------------------------------------

export const OWNER = {
  name: 'Stefan Heinemann',
  email: 'webdeveloper@heinemann.berlin',
  street: 'Schmiedegasse 53',
  postalCode: '14469',
  city: 'Potsdam',
  region: 'Brandenburg',
  country: 'DE',
  linkedIn: 'https://www.linkedin.com/in/stefan-h-317377267/',
} as const;

/** Wo gearbeitet wird – vor Ort und remote. */
export const AREA_SERVED = ['Potsdam', 'Berlin', 'Brandenburg', 'Deutschland'] as const;

// ---------------------------------------------------------------------------
// Suchbegriffe
// ---------------------------------------------------------------------------
//
// Ermittelt aus dem tatsächlichen Leistungsangebot der Seite, dem Standort
// (Potsdam/Berlin/Brandenburg) und den Themen, die in den Sektionen konkret
// behandelt werden. Bewusst auf Begriffe beschränkt, die die Seite auch
// wirklich einlöst – Keywords ohne passenden Inhalt schaden mehr als sie nützen.

/** Welt A – NLP Coaching. Lokal + Thema + Format. */
export const KEYWORDS_NLP = [
  // Kern + Ort
  'NLP Coaching Potsdam',
  'NLP Coach Potsdam',
  'NLP Coaching Berlin',
  'NLP Coach Berlin',
  'Coaching Potsdam',
  'Coaching Berlin',
  'NLP Brandenburg',
  // Leistung
  'Business Coaching Potsdam',
  'Persönlichkeitsentwicklung Potsdam',
  'Mentaltraining Berlin',
  'Entscheidungscoaching',
  'Selbstwert Coaching',
  'Kommunikationstraining Berlin',
  'Führungskräfte Coaching Potsdam',
  'NLP Workshop Unternehmen',
  'Einzelcoaching online',
  // Anliegen (das, wonach Betroffene wirklich suchen)
  'Klarheit im Kopf',
  'Gedankenkarussell stoppen',
  'limitierende Glaubenssätze auflösen',
  'Grenzen setzen lernen',
  'Emotionen regulieren',
  'Coaching nach Burnout',
  // Methode & Nachweis
  'Neuro Linguistisches Programmieren',
  'Reframing',
  'Timeline Arbeit',
  'DVNLP zertifizierter Coach',
] as const;

/** Welt B – Webdevelopment. Lokal + Technologie + Projekttyp. */
export const KEYWORDS_WEB = [
  // Kern + Ort
  'Webentwicklung Potsdam',
  'Webentwickler Potsdam',
  'Webentwicklung Berlin',
  'Webentwickler Berlin',
  'Webdesign Potsdam',
  'Freelance Webentwickler Brandenburg',
  // Technologie
  'Next.js Entwickler Berlin',
  'React Entwickler Berlin',
  'Angular Entwickler Brandenburg',
  'TypeScript Entwickler Potsdam',
  'Headless CMS Entwickler',
  'WordPress Entwickler Potsdam',
  // Projekttyp
  'Web App Entwicklung Berlin',
  'Kundenportal entwickeln lassen',
  'Landingpage erstellen lassen',
  'Website Relaunch Berlin',
  'Schnittstellen und APIs',
  'Performance Optimierung Website',
] as const;

/** Welt 0 – die Klammer über beides. */
export const KEYWORDS_ROOT = [
  'Stefan Heinemann',
  'NLP Coach und Webentwickler',
  'Coaching und Webentwicklung Potsdam',
  'Coaching Berlin',
  'Webentwicklung Berlin',
  'NLP Coaching Potsdam',
  'Webdevelopment Potsdam',
] as const;
