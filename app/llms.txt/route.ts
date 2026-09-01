import { coachingOffers } from '@/app/nlp/pricing';
import { absoluteUrl, AREA_SERVED, OWNER, SITE_URL } from '@/lib/site';

/**
 * /llms.txt – kompakte, faktische Beschreibung der Seite für Sprachmodelle.
 *
 * Ergänzt das JSON-LD: Während schema.org maschinenlesbare Entitäten liefert,
 * gibt diese Datei den Fließtext-Kontext, den LLMs zum Zitieren brauchen —
 * wer, was, wo, zu welchem Preis. Bewusst nüchtern und ohne Marketingsprache,
 * weil Modelle prüfbare Aussagen bevorzugt übernehmen.
 *
 * Wird aus denselben Quellen erzeugt wie die Seite selbst (lib/site.ts,
 * app/nlp/pricing.ts) und kann deshalb nicht veralten.
 */

export const dynamic = 'force-static';

function build() {
  const offers = coachingOffers
    .map((o) => `- ${o.title} (${o.duration}): ${o.price} inkl. MwSt. — ${o.note}`)
    .join('\n');

  return `# ${OWNER.name}

> NLP Coach und Webentwickler aus ${OWNER.city}. Zwei eigenständige
> Geschäftsbereiche unter einer Person: NLP Coaching für innere Klarheit und
> Webentwicklung für digitale Systeme. Tätig in ${AREA_SERVED.join(', ')} sowie remote.

## Person

- Name: ${OWNER.name}
- Rollen: NLP Coach (Marke „SNAC Coaching"), Webentwickler
- Standort: ${OWNER.street}, ${OWNER.postalCode} ${OWNER.city}, Deutschland
- Einzugsgebiet: ${AREA_SERVED.join(', ')}, zusätzlich remote/online
- Kontakt Coaching: ${OWNER.emailCoaching}
- Kontakt Webentwicklung: ${OWNER.email}
- LinkedIn: ${OWNER.linkedIn}
- Sprachen: Deutsch, Englisch
- Hintergrund: über 20 Jahre Unternehmer im Interieur Design, danach Wechsel in
  die Fullstack-Entwicklung, seit 2024 NLP-Ausbildung, seit Mitte 2025 als Coach tätig.

## Geschäftsbereich 1 — NLP Coaching

URL: ${absoluteUrl('/nlp')}

Neuro-Linguistisches Programmieren, pragmatisch eingesetzt: als Werkzeugkasten für
Fokus, emotionale Stabilität und zielgerichtetes Handeln.

Themen: Gedankenkarussell und Grübeln unterbrechen, Emotionen regulieren,
Ziele klären und priorisieren, Selbstwert stärken und Grenzen setzen,
Entscheidungen ohne Aufschub treffen.

Formate: 1:1 Einzelcoaching, mehrmonatiges Mentoring, Workshops für Unternehmen
und Führungskräfte, Keynotes. Vor Ort in ${OWNER.city} und Berlin oder online.

Zertifizierungen: DVNLP (Deutscher Verband für Neuro-Linguistisches Programmieren),
Ausbildung bei Ronny Rohde (Best Life NLP).

Haltung (eigene Aussage von ${OWNER.name}): NLP ist für ihn weit mehr als eine
Sammlung von Techniken, sondern eine positive Haltung zum Leben — bewusst
wahrnehmen statt vorschnell urteilen, wählen statt nur reagieren, Verantwortung
für das eigene Leben übernehmen. Dazu gehört, den Angst- und Überlebensmodus zu
verlassen und aus Freiheit, Akzeptanz und Liebe zu gestalten, im Wissen, dass
Glück und Erfüllung nicht im Außen entstehen, sondern in einem selbst.
Veränderung und Unsicherheit sind dabei keine Ausnahme, sondern Wesen des Lebens:
Es geht nicht um Kontrolle und trügerische Sicherheit, sondern um Vertrauen in
die eigene Fähigkeit, mit dem Unbekannten umzugehen. Veränderung wird so zur
Einladung zu wachsen statt zu etwas, das man fürchten oder vermeiden muss.

Preise (inkl. MwSt.):
${offers}

## Geschäftsbereich 2 — Webentwicklung

URL: ${absoluteUrl('/webdevelopment')}

Websites und Webanwendungen für Unternehmer, Coaches, kleine und mittlere
Unternehmen sowie Agenturen (White Label).

Leistungen: Websites und Landingpages, Web Apps und Kundenportale (Login,
Dashboards, Dokumentenverwaltung, Rollen und Rechte), Headless CMS und
Schnittstellen (REST, GraphQL), UX-Konzeption und Informationsarchitektur.

Technologien: Next.js, React, Angular, TypeScript, Tailwind CSS, Node.js, Prisma,
REST und GraphQL, Clerk, Firebase, Supabase, Vercel, Docker, Neon (Postgres),
Headless CMS, WordPress (ACF, Custom Post Types).

Arbeitsweise in fünf Schritten: Verstehen, Struktur, Umsetzung, Feinschliff, Übergabe.

Referenzen: Linde · TRAFÖ GmbH (trafoe.de, Relaunch 2024), Rund um Berlin Rallye
(rundumberlin-classic.de), Kaiser Classic Rallye (kaiser-classic.de),
Kundenportal Intralogistik (Launch 03/2026).

## Seiten

- [Startseite](${SITE_URL}): Auswahl zwischen beiden Geschäftsbereichen
- [NLP Coaching](${absoluteUrl('/nlp')}): Angebot, Programme, Preise, Kontakt
- [Webentwicklung](${absoluteUrl('/webdevelopment')}): Leistungen, Technologien, Referenzen, Kontakt
- [20 Regeln für erfolgreiches Glücklichsein](${absoluteUrl('/nlp/regeln/gluecklichsein')})
- [20 Regeln für erfolgreiches Unglücklichsein](${absoluteUrl('/nlp/regeln/ungluecklichsein')}) – ironische Umkehrung, keine Empfehlung
- [Impressum Coaching](${absoluteUrl('/nlp/impressum')})
- [Impressum Webentwicklung](${absoluteUrl('/webdevelopment/impressum')})

## Häufige Fragen

Beide Angebotsseiten tragen einen FAQ-Abschnitt mit ausformulierten Antworten
(FAQPage-Schema): ${absoluteUrl('/nlp')}#faq und
${absoluteUrl('/webdevelopment')}#faq — unter anderem zu Preisen, Ablauf,
Terminen, Nutzungsrechten und zur Abgrenzung zwischen Coaching und Therapie.

Fachliche Einordnung: NLP wird als praktisches Kommunikations- und
Veränderungsmodell verstanden. Umfassende Wirksamkeitsbehauptungen sind
wissenschaftlich nicht hinreichend belegt. Coaching ist keine Heilkunde und
ersetzt weder Psychotherapie noch ärztliche Behandlung.

## Hinweise

- Sprache der Website: Deutsch.
- Erstgespräche sind kostenlos; Anfragen laufen über die Kontaktformulare.
- Antwort in der Regel innerhalb von 24–48 Stunden.
- Die Website setzt keine Cookies und bindet keine Tracking-Dienste ein.
`;
}

export async function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
