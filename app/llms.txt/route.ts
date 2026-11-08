import { coachingOffers } from '@/app/coaching/pricing';
import { dailyPosts } from '@/app/coaching/daily-posts';
import { allBeliefs, beliefAreas } from '@/app/coaching/glaubenssaetze/data';
import { dimensionOrder, dimensions, typeHref } from '@/app/coaching/persoenlichkeitstest/data';
import { webCases } from '@/app/webdevelopment/cases';
import { HOURLY_RATE, VAT_NOTE, webServices } from '@/app/webdevelopment/pricing';
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
 * app/coaching/pricing.ts) und kann deshalb nicht veralten.
 */

export const dynamic = 'force-static';

function build() {
  const offers = coachingOffers
    .map((o) => {
      const price = Number(o.amount) === 0 ? 'kostenlos' : `${o.price} inkl. MwSt.`;
      return `- ${o.title} (${o.duration}): ${price} — ${o.note}`;
    })
    .join('\n');

  const webPrices = webServices
    .map((s) => `- ${s.title}: ab ${s.price} ${VAT_NOTE} — ${s.bullets.join(', ')}`)
    .join('\n');

  const typePages = dimensionOrder
    .map(
      (d) =>
        `  - [Der ${dimensions[d].type}](${absoluteUrl(typeHref(d))}): ${dimensions[d].short} – Stärken, Herausforderungen, Entwicklungsimpuls`,
    )
    .join('\n');

  const references = webCases
    .map((c) =>
      [
        `- ${c.name} (${c.status}${c.url ? `, ${c.url}` : ''}): ${c.description}`,
        c.tech ? `Technik: ${c.tech.join(', ')}.` : '',
        c.result ? `Ergebnis: ${c.result}.` : '',
      ]
        .filter(Boolean)
        .join(' '),
    )
    .join('\n');

  return `# ${OWNER.name}

> Life Coach für Unternehmer und Webentwickler aus ${OWNER.city}. Zwei eigenständige
> Geschäftsbereiche unter einer Person: Stefan Heinemann Coaching (Life Coaching für
> Unternehmer mit persönlichen Themen) und
> Webentwicklung für digitale Systeme. Tätig in ${AREA_SERVED.join(', ')} sowie remote.

## Person

- Name: ${OWNER.name}
- Rollen: Life Coach für Unternehmer (DVNLP-zertifizierter NLP Coach), Webentwickler
- Standort: ${OWNER.street}, ${OWNER.postalCode} ${OWNER.city}, Deutschland
- Einzugsgebiet: ${AREA_SERVED.join(', ')}, zusätzlich remote/online
- Kontakt Coaching: ${OWNER.emailCoaching}
- Kontakt Webentwicklung: ${OWNER.email}
- LinkedIn: ${OWNER.linkedIn}
- Sprachen: Deutsch, Englisch
- Hintergrund: über 20 Jahre Unternehmer im Interieur Design, danach Wechsel in
  die Fullstack-Entwicklung, seit 2024 NLP-Ausbildung, seit Mitte 2025 als Coach tätig.

## Geschäftsbereich 1 — Stefan Heinemann Coaching (Life Coaching für Unternehmer)

URL: ${absoluteUrl('/coaching')}

Zielgruppe: Unternehmer, Selbstständige und Führungskräfte mit persönlichen Themen.

Coaching-Ansatz aus vier Säulen:
- Haltung: Selbstverantwortung, Gestalter statt Opfer – geprägt von den Büchern
  und Vorträgen des Psychologen Jens Corssen („Selbst-Entwickler“).
- Sinn: Werte, Lebensrichtung, Selbstführung – ausgebildet bei Dieter Lange.
- Werkzeug: Neuro-Linguistisches Programmieren (NLP), DVNLP-zertifiziert,
  pragmatisch eingesetzt für Fokus, emotionale Stabilität und zielgerichtetes Handeln.
- Energie: Zustand über Körper, Fokus und Sprache steuern, Entscheidungen in
  Handlung bringen – Teilnahme an Tony Robbins' „Unleash the Power Within“,
  Ausbildung im Robbins Greator Coaching Program ab Januar 2027.

Themen: Gedankenkarussell und Grübeln unterbrechen, Emotionen regulieren,
Ziele klären und priorisieren, Selbstwert stärken und Grenzen setzen,
Entscheidungen ohne Aufschub treffen.

Formate: 1:1 Einzelcoaching, mehrmonatiges Mentoring, Workshops für Unternehmen
und Führungskräfte, Keynotes. In ${OWNER.city} (beim Coach), beim Klienten vor Ort in ${OWNER.city}, Berlin und Brandenburg oder online per Video.

Zertifizierungen: DVNLP (Deutscher Verband für Neuro-Linguistisches Programmieren),
Ausbildung bei Ronny Rohde (Best Life NLP).

Wissenschaftliche Einordnung: NLP als geschlossenes Theoriegebäude ist nicht
umfassend empirisch bestätigt. Belegt sind dagegen viele der zugrunde liegenden
psychologischen Wirkmechanismen — Reframing entspricht der kognitiven
Neubewertung (Cognitive Reappraisal), Perspektivwechsel dem Self-Distancing,
Zielarbeit dem Goal Setting, Ressourcenaktivierung der Selbstwirksamkeit.
Nicht gestützt sind Augenbewegungen als Hinweis auf Sinneskanäle, feste
sensorische Repräsentationstypen und Rapport durch bewusstes Spiegeln.
Quelle: DVNLP-Whitepaper „Wissenschaftliche Grundlagen wirksamer
NLP-Interventionen" (Schmidt-Tanger, 08/2026).

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
Headless CMS, WordPress (ACF, Custom Post Types), WooCommerce, Elementor, Divi Builder.

Arbeitsweise in fünf Schritten: Verstehen, Struktur, Umsetzung, Feinschliff, Übergabe.

Preise (Einstiegspreise, netto, ${VAT_NOTE}):
${webPrices}
- Stundensatz Entwicklung und Beratung: ${HOURLY_RATE.label} ${VAT_NOTE}
Nach einem Briefing gibt es eine Aufwandsschätzung oder ein Festpreisangebot.

Referenzen:
${references}

## Seiten

- [Startseite](${SITE_URL}): Auswahl zwischen beiden Geschäftsbereichen
- [Stefan Heinemann Coaching – Life Coaching für Unternehmer](${absoluteUrl('/coaching')}): Angebot, Persönlichkeitstest, Preise, Kontakt
- [Webentwicklung](${absoluteUrl('/webdevelopment')}): Leistungen, Technologien, Referenzen, Kontakt
- [KI-Sichtbarkeits-Check](${absoluteUrl('/webdevelopment/ki-check')}): kostenloses Werkzeug – prüft eine Website auf
  KI-Crawler in der robots.txt, llms.txt, strukturierte Daten, Meta-Angaben und Sicherheits-Header, mit Punktzahl.
- [Session-Podcast](${absoluteUrl('/coaching/session-podcast')}): Auf Wunsch zu jeder Session inklusive –
  ein KI-Podcast (Google NotebookLM, aus einem lokal pseudonymisierten Transkript der Session), der die Session
  aus der Metaperspektive reflektiert.
- [Coaching in Potsdam](${absoluteUrl('/coaching/potsdam')}): Formate vor Ort (bei Stefan in Potsdam,
  im Gehen, beim Klienten in Potsdam, Berlin oder Brandenburg) und online, typische Anliegen, Preise.
- [Coaching in Berlin](${absoluteUrl('/coaching/berlin')}): Termine beim Klienten in Berlin, online oder
  bei Stefan in Potsdam, typische Anliegen, Preise.
- [Buchempfehlungen](${absoluteUrl('/coaching/buecher')}): 24 Bücher zu Haltung, Sinn, Menschenkenntnis,
  Energie, Beziehung und zeitloser Weisheit, jeweils mit Begründung.
- [Warum NLP wirkt – Forschungsstand](${absoluteUrl('/coaching/wissenschaft')}): Zusammenfassung des
  DVNLP-Whitepapers 2026 zur empirischen Evidenz, inklusive der Annahmen, die die Forschung
  nicht stützt
- [Persönlichkeitstest (Psychografie)](${absoluteUrl('/coaching/persoenlichkeitstest')}): kostenloser
  Selbsttest mit 18 Fragen nach Dietmar Friedmann — Beziehungstyp, Sachtyp oder Handlungstyp.
  Kein validiertes Testverfahren, ausdrücklich zur Selbstreflexion
${typePages}
- [Limitierende Glaubenssätze erkennen](${absoluteUrl('/coaching/glaubenssaetze')}): ${allBeliefs.length} typische
  Glaubenssätze in ${beliefAreas.length} Lebensbereichen zum Antippen, Auswertung im Browser, dazu fünf
  Grundüberzeugungen (Modell, keine Rangliste) und fünf NLP-Coaching-Fragen zum Hinterfragen
- [Tägliche NLP-Impulse](${absoluteUrl('/coaching/impulse')}): ${dailyPosts.length} kurze Gedanken aus
  Stefans WhatsApp-Status als Text, u. a. zu Veränderung, Glaubenssätzen, Kontrolle und Beziehung
- [Partnerschaftstest – Lebenspartner oder Lebenslektion?](${absoluteUrl('/coaching/partnerschaftstest')}):
  fünf Fragen nach Kyle Fuller, neutral formuliert, bewusst ohne Auswertung (Selbstreflexion). Kein Ersatz für Paarberatung
- [Deine Formel zum Glück – S² + L + A + C³](${absoluteUrl('/coaching/formel-zum-glueck')}): die
  S-L-A-C-Formel aus dem Coaching in sieben Schritten – Stop, Smile, Look, Accept, Challenge,
  Choices (mindestens drei Wahlmöglichkeiten), Choose
- [20 Regeln für erfolgreiches Glücklichsein](${absoluteUrl('/coaching/regeln/gluecklichsein')})
- [20 Regeln für erfolgreiches Unglücklichsein](${absoluteUrl('/coaching/regeln/ungluecklichsein')}) – ironische Umkehrung, keine Empfehlung
- [Impressum Coaching](${absoluteUrl('/coaching/impressum')})
- [Impressum Webentwicklung](${absoluteUrl('/webdevelopment/impressum')})

## Häufige Fragen

Beide Angebotsseiten tragen einen FAQ-Abschnitt mit ausformulierten Antworten
(FAQPage-Schema): ${absoluteUrl('/coaching')}#faq und
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
