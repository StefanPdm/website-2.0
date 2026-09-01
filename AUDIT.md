# AUDIT — Schwachstellen & Optimierungen

Stand: 2026-08-31 · Branch `main` · Next.js 16.1.6
Grundlage: Code-Review aller Routen, Production-Build, ESLint-Lauf,
generiertes CSS/HTML, Asset-Inventar.
Verifiziert: Build läuft grün, 23 statische Routen, keine TS-Fehler.

Legende: **P0** = vor dem nächsten Deploy · **P1** = diesen Sprint · **P2** = geplant

---

## Zusammenfassung

Die Seite ist konzeptionell stark: die Zwei-Welten-Trennung funktioniert, die
Designsprachen sind eigenständig und konsequent, die Tonalität sitzt.
Die Probleme liegen in drei Bereichen:

1. **Auslieferung** — ~150 MB in `public/`, drei parallele WebGL-Kontexte, kein Lazy-Loading.
2. **Stille Defekte** — CSS-Klassen ohne Wirkung, verwaiste Seiten, ein Formular das nichts sendet, ein Menü das im Tablet-Bereich nicht öffnet.
3. **Konversion & Vertrauen** — Kontakt auf `/` versteckt, Preissprung ohne Brücke, Testimonials ohne Beleg.

Insgesamt **24 Befunde**: 7× P0, 10× P1, 7× P2.
**Erledigt: 20 von 24.** Alle P0 und alle P1 sind geschlossen.
**#19 zurückgenommen** — kein Befund, sondern gestalterische Absicht.
Sprint 0 Bot-Schutz · Sprint 1 stille Defekte · Sprint 2 Gewicht ·
Sprint 3 Zugänglichkeit · Sprint 4 Konversion.

**Offen:** #18 (Vendor-Lint) · #23 (Orbit-Magic-Numbers) · #24 (Resttexte)

---

# A. Technik

### #1 · ✅ ERLEDIGT (01.09.2026) · `public/` ist ~150 MB groß und enthält Quelldateien

**Belegt.** Größte Dateien:

| Datei | Größe |
|---|---|
| `images-startseite/portrait-fireballs.psd` | 19,1 MB |
| `images-nlp/testimonial-f-10.png` | 9,3 MB |
| `images-startseite/portrait-fireballs-2.png` | 8,3 MB |
| `images-nlp/portrait-workshop.png` | 8,2 MB |
| `matrix-landing-assets/…/noise.png` | 8,2 MB |
| `images-nlp/Gemini_Generated_Image_*.png` (2×) | 15,5 MB |
| `Global-logo-02.png` | 7,7 MB |
| `images-nlp/vorlage_galery.psd` | 5,9 MB |
| Ordner `images-nlp/` | **73 MB** |
| Ordner `images-startseite/` | **48 MB** |

**Wirkung:** Jedes Vercel-Deployment schleppt das mit (Build- und Deploy-Zeit,
Speicherkontingent). Schwerer wiegt: **`public/` ist öffentlich abrufbar** —
die `.psd`-Dateien und die Gemini-Rohbilder sind für jeden herunterladbar.
Und die 9-MB-Testimonial-PNGs sind identisch mit bereits vorhandenen `.webp`-Versionen.

**Fix:**
```
1. .psd raus aus public/ (nach ../design-source/, außerhalb des Repos oder .gitignore)
2. matrix-landing-assets/ prüfen — wird von keiner Komponente referenziert → löschen
3. Alle PNG mit vorhandenem .webp-Zwilling löschen
   (portrait-treppe, portrait-workshop, portrait-balance, green-pill, orange-pill …)
4. Testimonial-PNGs → WebP, Zielbreite 96px (werden mit sizes='48px' gerendert!)
5. project-images/ ist Duplikat von case-images-videos/ → einen Ordner behalten
```
Realistisches Ziel: **unter 8 MB**.

> Die Testimonial-Bilder sind der krasseste Fall: 9,3 MB Quelle für ein
> 48×48px-Avatar. `next/image` optimiert das zwar zur Laufzeit, aber die
> Originaldatei liegt trotzdem im Deployment und im Git-Verlauf.

---

### #2 · ✅ ERLEDIGT (01.09.2026) · Domain-Schreibweise ist an drei Stellen uneinheitlich

**Belegt:**

| Datei | Wert |
|---|---|
| `app/layout.tsx:18` | `https://www.heinemann.berlin` |
| `app/robots.ts:4` | `https://www.heinemann.berlin` |
| `app/sitemap.ts:4` | `https://heinemann.berlin` ← **ohne www** |
| `app/api/nlp-guide/route.ts:14` | `https://heinemann.berlin` ← **ohne www** |

**Wirkung:** Die Sitemap meldet Google 13 URLs, deren Canonical-Tag auf eine
*andere* Host-Variante zeigt. Google muss raten, welche Version indexiert wird —
klassischer Ranking-Verlust durch Duplicate Content. Zusätzlich zeigen die
Download-Links in den Leitfaden-Mails auf die Nicht-www-Variante.

**Fix:** Eine gemeinsame Konstante, z. B. `lib/site.ts`:
```ts
export const SITE_URL = 'https://www.heinemann.berlin';
```
und in allen vier Dateien importieren. Zusätzlich in Vercel einen 301-Redirect
`heinemann.berlin` → `www.heinemann.berlin` setzen (Domains-Einstellung).

---

### #3 · ✅ ERLEDIGT (01.09.2026) · NLP-Menü öffnet zwischen 768 px und 1023 px nicht

**Belegt** in `app/nlp/components/NlpHeader.tsx`:

| Element | Zeile | Klasse | sichtbar bei |
|---|---|---|---|
| Desktop-Nav | 56 | `lg:flex` (sonst `hidden`) | ≥ 1024 |
| Hamburger-Button | 111 | `lg:hidden` | < 1024 |
| Dropdown-Panel | 118 | **`md:hidden`** | **< 768** |

Im Bereich **768–1023 px** ist also der Burger-Button sichtbar, das Panel aber
per CSS ausgeblendet. **Der Klick macht sichtbar nichts.** Gleichzeitig gibt es
dort keine Desktop-Navigation → in diesem Bereich ist die NLP-Seite komplett
unnavigierbar. Das trifft iPad-Hochformat (768) und iPad-Querformat (1024 grenzwertig).

**Zweiter Fehler in derselben Datei:** Der Kontakt-Button existiert zweimal —
`inline-flex lg:hidden!` (Zeile 87) und `hidden! xl:inline-flex!` (Zeile 100).
Zwischen **1024 und 1279 px ist keiner von beiden sichtbar**, ebenso wenig der
Theme-Toggle (`xl:inline-flex`).

**Fix:** Panel auf `lg:hidden` ändern, den zweiten CTA auf `hidden lg:inline-flex`,
Theme-Toggle auf `lg:inline-flex`. Danach 768 / 1024 / 1280 durchklicken.

---

### #4 · ✅ ERLEDIGT (01.09.2026) · CSS-Klassen ohne Wirkung — `@theme`-Block fehlt

**Belegt:** `app/globals.css` importiert `shadcn/tailwind.css`, aber diese Datei
enthält (verifiziert in `node_modules/shadcn/dist/tailwind.css`) **nur Keyframes
und Custom-Variants — keine einzige Farbdefinition**. Ein `@theme`-Block existiert
nirgends im Projekt.

Damit erzeugen folgende Klassen **keine CSS-Regel**. Im generierten Stylesheet
(`.next/dev/static/chunks/app_globals_css_*.css`, 129 KB) sind sie nicht vorhanden —
`grep` liefert 0 Treffer:

| Klasse | Fundstellen | Folge |
|---|---|---|
| `text-accent` | ProgrammeSection ×2, PriceTableSection ×2, NlpHeader ×1 | Aufzählungspunkte + „Premium"-Badge erben Textfarbe statt Akzent |
| `text-accent-web` | webdevelopment/page.tsx ×2 | „Step 1–5" + Prozess-Icons ohne Akzentfarbe |
| `border-border` | 15× in NlpHeader, GuideSection, NlpIntroSection, TestimonialsSection, guide-download | greift nur zufällig, weil `@layer base { * { border-color: var(--border) } }` existiert |
| `border-[--border]` | ContactSection ×1, ProgrammeSection ×1, AboutSection ×3 | Tailwind v4 kennt diese v3-Kurzform nicht mehr — korrekt wäre `border-(--border)` |

**Wirkung:** Die Akzentfarbe fehlt an genau den Stellen, die Aufmerksamkeit
lenken sollen (Preis-Badges, Prozessschritte, Programm-Highlights). Optisch wirkt
das wie „vergessene Hierarchie", ist aber ein Konfigurationsfehler.

**Fix:** In `app/globals.css` ergänzen:
```css
@theme inline {
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
  --color-accent-soft: var(--accent-soft);
  --color-border: var(--border);
  --color-surface: var(--surface);
  --color-accent-web: #86C243;   /* oder #2dd4bf – Entscheidung Welt B */
}
```
und die fünf `border-[--border]` auf `border-(--border)` umstellen.
Danach visuell gegenprüfen: Die Seite ändert sich sichtbar.

---

### #5 · ✅ ERLEDIGT (01.09.2026) · Drei Kontaktformulare ohne Label-Verknüpfung

> **Behoben.** 25 Label/Feld-Paare über alle vier Formulare verknüpft
> (`root-`, `web-`, `nlp-`, `lead-` als Präfix). Verifiziert: kein
> verwaistes Label, kein Feld ohne Label.
>
> Die Consent-Checkboxen verlinken jetzt die Datenschutzerklärung der jeweiligen
> Welt — der Hinweistext ist das Label, der Link steht daneben. Läge er im
> Label, würde ein Klick darauf zusätzlich das Häkchen umschalten.
>
> **Zusatzbefund:** Die GuideSection erhebt eine E-Mail-Adresse und versendet
> eine Nachricht, hatte aber **gar keine Einwilligung**. Checkbox ergänzt; der
> Wert wird jetzt auch übertragen und von `/api/nlp-guide` erzwungen — vorher
> hätte eine reine Client-Checkbox nichts belegt.
>
> **Offen und juristisch zu klären:** Die Startseite hat keine eigene
> Datenschutzerklärung. Ihr Formular verlinkt deshalb beide Welten. Eine
> gemeinsame Fassung unter `/datenschutz` wäre sauberer.

**Belegt** in `components/ContactForm.tsx`, `ContactFormWeb.tsx`, `ContactFormNlp.tsx`:
alle `<label>` stehen als Geschwister neben dem Feld, ohne `htmlFor`, und die
Felder haben keine `id`. Beispiel `ContactFormNlp.tsx:97`:
```tsx
<label className='text-sm font-medium text-[var(--muted)]'>Name *</label>
<input name='name' required className='…' />
```

**Wirkung:** Screenreader lesen unbeschriftete Felder vor („Eingabefeld,
leer"). Klick aufs Label fokussiert das Feld nicht. Browser-Autofill greift
schlechter. Das betrifft **jeden Lead-Kanal der Seite**.

Positiv-Beispiel im eigenen Code: `GuideSection.tsx` macht es richtig
(`htmlFor='lead-name'` + `id='lead-name'`) — das Muster einfach übertragen.

**Zusatz:** Die Consent-Checkbox nennt „Datenschutzhinweise", **verlinkt sie aber
nicht**. Für eine wirksame DSGVO-Einwilligung muss der Text erreichbar sein.
`GuideSection` (Lead-Magnet mit E-Mail-Erfassung) hat **gar keine Consent-Checkbox**.

---

### #6 · ✅ ERLEDIGT (01.09.2026) · Modals ohne Fokus-Management

> **Erledigt:** InfoOrb mountet das Modal nur noch bei `isOpen`, die beiden
> `priority`-Bilder sind entfernt – sie konkurrierten mit dem echten LCP-Bild
> der Startseite, obwohl das Modal geschlossen war.
>
> **Ebenfalls behoben:** `components/useModal.ts` bündelt Fokus-Falle,
> Fokus-Rückgabe an den Auslöser, Escape und Scroll-Sperre. Eingesetzt in allen
> vier Dialogen (NLP-Grundlagen, Programme, Werdegang, InfoOrb). InfoOrb hatte
> Escape und Scroll-Sperre schon einzeln — die sind jetzt durch die gemeinsame
> Implementierung ersetzt.
>
> Korrektur zur ursprünglichen Formulierung: Es sind **vier** Dialoge, nicht fünf.

**Belegt:** Fünf Modals — `NlpIntroSection`, `ProgrammeSection`, `AboutSection`,
`InfoOrb` — setzen korrekt `role='dialog'`, `aria-modal='true'` und schließen per
Escape (InfoOrb) bzw. Overlay-Klick. **Keines** setzt den Fokus beim Öffnen ins
Modal, hält ihn dort fest, oder gibt ihn beim Schließen an den Auslöser zurück.

**Wirkung:** Tastaturnutzer tabben aus dem geöffneten Modal in die dahinterliegende
Seite und finden nicht mehr zurück. Screenreader lesen den Hintergrund mit.

**Zusätzlich bei `InfoOrb`:** Das Modal ist **immer im DOM** (nur `opacity-0
pointer-events-none`). Beide Portrait-Bilder darin tragen `priority` (Zeile 143
und 154) — also lädt die Startseite **zwei Kopien von `portrait-fireballs.webp`
mit höchster Priorität**, obwohl das Modal geschlossen ist. Das konkurriert direkt
mit dem echten LCP-Bild `portrait-balance-free.webp` (das ebenfalls `priority` hat).

**Fix:**
```
1. InfoOrb: Modal nur rendern wenn isOpen (bedingtes createPortal)
2. priority von den Modal-Bildern entfernen
3. Gemeinsamen Hook useFocusTrap(ref, isOpen) bauen und in alle 5 Modals einsetzen
4. Escape-Handler von InfoOrb in die anderen Modals übernehmen (fehlt dort)
```

---

### #7 · ✅ ERLEDIGT (2026-08-31) · `/api/contact` ohne Spam- und Missbrauchsschutz

> **Behoben.** Neu: `lib/anti-spam.ts` (Scoring, Rate-Limit) und
> `components/FormShield.tsx` (Honeypot + Ausfüllzeit), eingebunden in alle vier
> Formulare. Die Prüfung läuft in beiden Routen **vor jedem `sendMail`**.
>
> **Korrektur zur ursprünglichen Empfehlung:** Der vorgeschlagene Origin-Header-Check
> wurde *nicht* umgesetzt — er wäre wirkungslos. Das eingegangene Spam-Sample zeigt
> `Origin: https://www.heinemann.berlin` und einen korrekten Referer: der Bot lädt
> die Seite mit einem echten Headless-Browser. Stattdessen greift die
> Client-Hints-Plausibilität (siehe unten).
>
> Verifiziert gegen das reale Sample und sieben Legitim-Fälle:
>
> ```
> [DROP   ] score= 12  Bot-Sample vom 31.08.
>             - Plattform-Widerspruch: UA sagt macOS, Hint sagt Linux
>             - Versions-Widerspruch: UA Chrome 142, Hint Chromium 134
>             - Nachricht ohne jedes Leerzeichen
>             - Name wirkt wie ein Zufallsstring
>             - Website wirkt wie eine Zufallsdomain
> [DROP   ] score=100  Bot faellt in den Honeypot
> [ACCEPT ] score=  0  Chrome/Windows · Safari/iPhone · Firefox/Linux
> [ACCEPT ] score=  0  Chrome/Android · langer einteiliger Name, kurze Nachricht
> [SUSPECT] score=  3  sehr schnell abgeschickt, sonst unauffaellig
> ```
>
> Offen als Aufrüstpfad: Das Rate-Limit liegt im Arbeitsspeicher der
> Lambda-Instanz. Gegen Bursts wirkt es, über viele Instanzen hinweg ist es
> ein Näherungswert. Umstellung auf `@vercel/kv` betrifft nur `isRateLimited()`.

<details>
<summary>Ursprüngliche Befundbeschreibung</summary>

**Belegt:** `app/api/contact/route.ts` hat kein Rate-Limiting, keinen Honeypot,
kein Captcha und keine Origin-Prüfung. Die Route versendet pro Aufruf **zwei
E-Mails** (Owner + Bestätigung an die eingegebene Adresse).

**Wirkung:** Ein Skript kann die Route in Schleife aufrufen und darüber
(a) das Owner-Postfach fluten und (b) **fremde Adressen mit Bestätigungsmails
bombardieren** — die Mail geht an eine ungeprüfte, vom Angreifer gewählte Adresse.
Das ist ein offener Mail-Relay-Vektor über die eigene SMTP-Reputation und kann zur
Sperrung des Absenders führen. `/api/nlp-guide` hat dasselbe Problem.

**Fix (Reihenfolge nach Aufwand/Wirkung):**
```
1. Honeypot-Feld (versteckt, name='website2') → bei Inhalt 200 zurückgeben, nichts senden
2. Zeitschwelle: verstecktes Timestamp-Feld, < 3 Sek. Ausfüllzeit = Bot
3. Rate-Limit pro IP (Upstash Redis / @vercel/kv), z. B. 3 Anfragen / 10 Min
4. Origin-Header gegen SITE_URL prüfen
5. Optional: Cloudflare Turnstile (DSGVO-freundlicher als reCAPTCHA)
```

</details>

---

### #8 · ✅ ERLEDIGT (01.09.2026) · Drei WebGL-Kontexte gleichzeitig auf `/webdevelopment`

**Belegt** in `app/webdevelopment/page.tsx` — alle statisch importiert, kein `next/dynamic`:

| Komponente | Basis | Zeilen | Läuft |
|---|---|---|---|
| `LightPillar` | three.js | 365 | permanent, `fixed inset-0`, gesamte Seite |
| `Hyperspeed` | three.js + postprocessing | 1162 | permanent, Streifen in „Digitale Lösungen" |
| `CardSwap` | GSAP | 200 | permanent, Hero, 3,5-s-Loop |
| `ElectricBorder` | SVG-Filter/Turbulenz | 322 | **6 Instanzen** gleichzeitig |
| `PixelCard` | Canvas 2D | 295 | **9 Instanzen** gleichzeitig |

Production-Chunks: **477 KB**, 219 KB, 207 KB, 116 KB, 110 KB.
Dazu vier **autoplayende** `.webm` in der Cases-Sektion, zusammen **~11 MB**,
ohne `preload='none'`, ohne `poster` — sie laden sofort beim Seitenaufruf,
obwohl sie weit unter dem Fold liegen.

**Wirkung:** Auf Mobilgeräten Dauerlast auf GPU und Akku, spürbares Ruckeln beim
Scrollen, hoher Datenverbrauch. Zwei permanente `requestAnimationFrame`-Loops
plus 9 Canvas-Instanzen ist deutlich mehr, als der visuelle Gewinn rechtfertigt.
Ironischerweise verkauft genau diese Seite „Performance-Optimierung".

**Fix:**
```
1. Hyperspeed + LightPillar via next/dynamic({ ssr:false })
2. Effekte nur mounten wenn im Viewport (IntersectionObserver)
   und window.innerWidth >= 1024 und !prefers-reduced-motion
3. Auf einen der beiden WebGL-Hintergründe reduzieren (Empfehlung: LightPillar
   behalten, Hyperspeed als statisches Bild oder CSS-Gradient ersetzen)
4. Videos: preload='none' + poster, autoPlay erst bei Sichtbarkeit
5. PixelCard-Instanzen halbieren (Prozess-Sektion braucht keine Canvas-Animation)
```
Erwartung: Erste sinnvolle Interaktion deutlich schneller, Lighthouse-Performance
mobil realistisch von „rot" auf „gelb/grün".

---

### #9 · ✅ ERLEDIGT (01.09.2026) · `/about` und `/contact` sind verwaiste Altseiten mit falscher Marke

**Belegt:**

- Beide Routen werden gebaut (`.next/server/app/about.html`, `contact.html`) und
  stehen in `app/sitemap.ts` (Priority 0.6 und 0.5).
- **Kein einziger interner Link** zeigt darauf (`grep` über `app/` + `components/`: 0 Treffer).
- Beide zeigen den Markennamen **„Studio Fokus"** (`app/about/page.tsx:12`) —
  eine alte, nicht mehr verwendete Marke.
- Beide verlinken auf **`/impressum`** — diese Route **existiert nicht** (404).
- **Das Formular auf `/contact` hat keinen `onSubmit`, kein `action` und keine
  `method`.** Es rendert einen Submit-Button, der die Seite neu lädt und die
  Eingaben verwirft. Jeder Lead, der dort landet, geht verloren.

**Wirkung:** Google indexiert zwei Seiten mit falschem Markennamen, kaputten
Links und einem Formular, das nichts tut — und die Sitemap lädt aktiv dazu ein.

**Fix:** Beide Routen **löschen** (die Inhalte existieren besser in `/nlp` und
`/webdevelopment`) und aus `sitemap.ts` entfernen. Falls die URLs erhalten bleiben
sollen: 301 auf `/` in `next.config.ts`.

---

### #10 · ✅ ERLEDIGT (01.09.2026) · Der Lead-Magnet ist nicht geschützt

**Belegt:** Das HMAC-Token-System (`/api/nlp-guide` erzeugt, `/api/nlp-guide/download`
prüft Signatur + 7-Tage-Ablauf) ist sauber gebaut. Es ist nur wirkungslos, weil
dieselbe PDF öffentlich unter drei URLs liegt:

```
public/logos/NLP-Leitfaden_SNAC.pdf          1.274.964 Bytes
public/logos/NLP-Leitfaden_SNAC (1).pdf      1.274.964 Bytes   ← identisch
public/images-startseite/NLP-Leitfaden_SNAC.pdf  1.274.964 Bytes  ← identisch
private-documents/NLP-Leitfaden_SNAC.pdf     1.274.964 Bytes   ← das geschützte Original
```

Alle vier Dateien sind byteweise gleich. `https://…/logos/NLP-Leitfaden_SNAC.pdf`
liefert den Leitfaden ohne Token, ohne E-Mail, ohne Formular.

**Wirkung:** Der gesamte Lead-Funnel ist umgehbar; die drei Kopien können in
Suchergebnissen auftauchen.

**Fix:** Die drei Kopien in `public/` löschen. Nur `private-documents/` behalten.
Danach den Download-Flow einmal auf einem Preview-Deployment testen — die Route
liest per `fs.readFile(process.cwd() + '/private-documents/…')`, das muss vom
Vercel-File-Tracing erfasst sein.

---

### #11 · ✅ ERLEDIGT (01.09.2026) · OG-Bild ist 341×300 px, deklariert als 1200×630

**Belegt:** `public/Global-Logo-SH-1.webp` — tatsächliche Abmessungen **341 × 300 px**
(VP8X-Header ausgelesen), 67 KB. Deklariert wird in `app/layout.tsx`,
`app/nlp/layout.tsx` und `app/webdevelopment/layout.tsx` jeweils `width: 1200,
height: 630`.

**Wirkung:** LinkedIn, WhatsApp, Slack und X verwerfen oder verkleinern Bilder,
die deutlich unter der deklarierten Größe liegen — der Link-Preview wird zur
winzigen Kachel oder fällt ganz weg. Für einen Coach/Entwickler, der über LinkedIn
teilt, ist das direkt Reichweitenverlust.

**Zusatz:** Alle drei Welten nutzen **dasselbe** Bild. Ein geteilter NLP-Link ist
optisch nicht von einem Webdevelopment-Link zu unterscheiden.

**Fix:** Drei echte 1200×630-Bilder anlegen — oder besser: `opengraph-image.tsx`
pro Route mit `ImageResponse` generieren (Next.js-Bordmittel, kein Asset nötig,
immer korrekt dimensioniert).

---

### #12 · ✅ ERLEDIGT (01.09.2026) · Rund 900 Zeilen totes CSS

**Belegt:** `app/globals.css` hat 2069 Zeilen. Der Block von ca. Zeile 356 bis 1270
stammt aus einer früheren Designiteration. Prüfung per `grep` über `app/` und
`components/` — 0 Treffer für:

```
.teaser-grid .teaser-card .teaser-cta .service-page .service-shell .service-hero
.service-section .service-card .service-pills .service-list .service-metrics
.hero-stage .hero-video .hero-overlay .hero-grid .hero-content .hero-actions
.hero-visual .hero-orb .hero-logo .hero-title .hero-subtitle .section
.section-eyebrow .section-subtitle .service-bands .service-band .section-video
.video-shell .video-bg .video-overlay .section-split .section-web .section-nlp
.split-text .split-visual .orb-web .orb-nlp .feature-grid .feature-card
.testimonial-grid .testimonial-card .section-cta .cta-card .cta-actions
.cta-button .card-shine .card-glow .logo-badge .reveal .theme-web .theme-nlp
@keyframes float, pulse, orbFloat, reveal
```

Weitere Klassen (`.page-shell`, `.content-page`, `.content-card`, `.site-nav`,
`.brand`, `.nav-links`, `.service-tile`, `.form-input`, `.form-textarea`,
`.form-button`) werden **ausschließlich** von den verwaisten Seiten `/about`
und `/contact` benutzt — fallen also mit Befund #9 ebenfalls weg.

**Wirkung:** Jeder Besucher lädt ~40 % der Stylesheet-Bytes umsonst.
Schwerer wiegt der Wartungsaufwand: Wer die Datei liest, kann nicht unterscheiden,
was aktiv ist. Genau das erschwert konsistente Weiterentwicklung.

**Fix:** Block löschen, danach `pnpm build` und alle Routen visuell gegenprüfen.
`.orbit-*`, `.choice-*`, `.landing-*`, `.contact-*`, `.theme-cool`, `.theme-warm`,
`.glow-cyan`, `.info-*`-Keyframes und `drift`/`orbitSpin`/`pillPulse` **behalten**.

---

### #13 · ✅ ERLEDIGT (01.09.2026) · Toter Code und ungenutzte Abhängigkeiten

| Fund | Beleg |
|---|---|
| `app/nlp/components/WorkshopsSection.tsx` (45 Z.) | nicht in `app/nlp/page.tsx` importiert |
| `components/ContactRevealButton.tsx` (38 Z.) | nirgends importiert |
| `components/DomeGallery.jsx` (684 Z.) + `.css` (212 Z.) | nirgends importiert |
| `components/ProfileCard.css` (612 Z.) | Kommentar in `webdevelopment/page.tsx:35` bestätigt: „ProfileCard removed" |
| `components/PixelCard.d.ts` | doppelt zur Inline-Typisierung in der Seite |
| `resend` (Dependency) | installiert, kein Import — nodemailer wird benutzt |
| `@use-gesture/react` | nur von `DomeGallery` benötigt → mit entfernen |
| `.github/copilot-instructions.md` | Scaffolding-Checkliste ohne Projektbezug |

`WorkshopsSection` benutzt zudem `id='workshops'` — dieselbe ID wie
`PriceTableSection`. Würde sie eingebunden, wäre die Nav-Verlinkung „Preise"
doppeldeutig.

**Fix:** Löschen. `pnpm remove resend @use-gesture/react` nach Entfernen von DomeGallery.

---

### #14 · P1 · Smooth Scroll funktioniert in Welt A nicht

**Belegt:** `app/nlp/NlpLayoutClient.tsx:45` setzt `scroll-smooth` auf einem
`<div>`. `scroll-behavior` wirkt aber nur auf dem **scrollenden** Element —
das ist hier das `<html>`, nicht dieser Div.

**Wirkung:** Alle Anker-Links im NLP-Header (`#ueber`, `#programme`, `#workshops`)
springen hart. Nur der Kontakt-Button springt weich, weil er per JS
`scrollIntoView({ behavior: 'smooth' })` aufruft (`NlpHeader.tsx:22`) — die
Inkonsistenz ist im Code sichtbar.

**Fix:** In `app/globals.css`:
```css
html { scroll-behavior: smooth; scroll-padding-top: 6rem; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```
`scroll-padding-top` ist wichtig: beide Welten haben einen `fixed` Header, der
sonst die Überschrift der angesprungenen Sektion verdeckt.

---

### #15 · ✅ ERLEDIGT (01.09.2026) · `prefers-reduced-motion` wird nirgends berücksichtigt

**Belegt:** 0 Treffer für `prefers-reduced-motion` im gesamten Projekt.
Dauerhaft laufend: Orbit-Ringe (14–22 s), `pillPulse` (2,6 s), `info-orb-float`
(6 s), `info-orb-ring` (2,8 s), `drift` (18 s), `CardSwap` (3,5 s), About-Slider
(4,5 s), plus die WebGL-Loops.

**Wirkung:** Für Nutzer mit vestibulären Beschwerden ist die Seite unangenehm bis
unbenutzbar. WCAG 2.1 Erfolgskriterium **2.3.3** (AAA) und **2.2.2** (AA, für
Auto-Bewegung > 5 s mit Pausemöglichkeit) sind nicht erfüllt.

**Fix:** Global in `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```
Zusätzlich in den WebGL-/GSAP-Komponenten `matchMedia('(prefers-reduced-motion:
reduce)')` abfragen und gar nicht erst mounten.

---

### #16 · ✅ ERLEDIGT (01.09.2026) · Kein strukturiertes Datenmarkup (JSON-LD)

**Belegt:** 0 Treffer für `ld+json` in `.next/server/app/index.html`.

**Wirkung:** Für einen lokalen Dienstleister mit klaren Preisen ist das die
günstigste SEO-Maßnahme überhaupt. Ohne `LocalBusiness`/`Person` erscheint kein
Knowledge-Panel, ohne `Offer` keine Preis-Rich-Snippets, ohne `Review` keine Sterne.
Die Preisdaten für `Offer` liegen bereits strukturiert in
`PriceTableSection.tsx` — nur nicht maschinenlesbar.

**Fix:** Pro Route ein `<script type='application/ld+json'>`:
- `/` → `Person` + `ProfessionalService` (Adresse aus dem Impressum: Schmiedegasse 53, 14469 Potsdam)
- `/nlp` → `Service` + `Offer` (aus dem `prices`-Array generieren) + `FAQPage`
- `/webdevelopment` → `Service` + `ItemList` der Cases

---

### #17 · ✅ ERLEDIGT (01.09.2026) · Keine Security-Header

**Belegt:** `next.config.ts` enthält nur `images` und `redirects`.
Kein `headers()`, kein `poweredByHeader: false`.

**Fix:**
```ts
async headers() {
  return [{ source: '/:path*', headers: [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  ]}];
}
```
Eine CSP ist wegen der Inline-Styles der Effekt-Komponenten aufwändiger —
zunächst im `Report-Only`-Modus testen.

---

### #18 · P2 · ESLint: 11 Fehler, 2 Warnungen

**Belegt** (`npx eslint .`):
- `components/LaserFlow.tsx` — 9× `@typescript-eslint/no-explicit-any`
- `components/LightPillar.jsx:36,99` — `react-hooks/set-state-in-effect`
  (synchrones `setState` im Effekt → Kaskaden-Renders)
- `components/DomeGallery.jsx:653` — `<img>` statt `next/image`

Alles Vendor-Code. **Der Build läuft trotzdem grün**, weil Next.js ESLint beim
Build nicht ausführt.

**Fix:** Vendor-Verzeichnis in `eslint.config.mjs` per `globalIgnores` ausnehmen
oder gezielte `eslint-disable`-Kommentare setzen — damit `npx eslint .` wieder
ein aussagekräftiges Signal für eigenen Code liefert. Die `set-state-in-effect`-
Fälle in `LightPillar` lohnen einen echten Fix (`useSyncExternalStore` oder
Lazy-Init im State), sie erzeugen bei jedem Mount einen Doppel-Render.

---

# B. UI / UX

### #19 · ⛔ KEIN BEFUND — gestalterische Absicht

> **Zurückgenommen (01.09.2026).** Das Ausblenden ist gewollt: Die Startseite
> soll am Desktop auf eine Bildschirmhöhe passen, und die Entscheidung zwischen
> den beiden Welten soll nicht durch ein Formular verwässert werden.
>
> Meine ursprüngliche Bewertung hat den Zweck der Seite verkannt — sie sortiert,
> sie verkauft nicht. Der Zustand ist wiederhergestellt und in `app/page.tsx`
> sowie `app/globals.css` als Absicht dokumentiert, damit er beim nächsten
> Durchgang nicht erneut als Defekt eingestuft wird.
>
> Bewusst in Kauf genommen: Ein per `display:none` ausgeblendeter Abschnitt
> steht nicht im Accessibility-Tree. Der Kontaktweg bleibt über den
> Kontakt-Button, die Kontaktbereiche beider Welten und die Impressen erreichbar.

<details>
<summary>Ursprüngliche Befundbeschreibung</summary>

**Belegt:** `app/page.tsx:294` gibt der Kontakt-Sektion die Klasse
`contact-grid--hidden`, in `globals.css:1908` definiert als `display: none`.
Sichtbar wird sie nur über `#root-contact:target { display: grid; }` — also
ausschließlich durch Klick auf den Anker `#root-contact`.

**Probleme daraus:**

1. Der Weg zurück fehlt: Ist die Sektion einmal offen, gibt es kein Schließen —
   nur ein weiterer Ankerwechsel blendet sie wieder aus.
2. `display:none` nimmt das Formular aus dem DOM-Fluss **und** aus der
   Accessibility-Tree. Screenreader und Suchmaschinen sehen kein Kontaktangebot.
3. Klickt der Nutzer „Kontakt", während `#root-contact` bereits im URL steht,
   passiert nichts.
4. Die dafür gebaute Komponente `ContactRevealButton` wird gar nicht verwendet
   (Befund #13) — die Lösung existiert also, ist aber nicht angeschlossen.

**Wirkung:** Auf der Seite mit dem meisten Traffic ist der einzige direkte
Kontaktweg unsichtbar, es sei denn, der Besucher findet und klickt einen
sekundären Ghost-Button.

**Empfehlung:** Sektion **dauerhaft sichtbar** machen. Sie steht ohnehin unter der
Entscheidung — sie lenkt dort nicht ab, sondern fängt die auf, die sich nicht
entscheiden wollen. Genau das ist die dritte Zielgruppe der Scanner-Story.

</details>

---

### #20 · ✅ ERLEDIGT (01.09.2026) · Der Preis-Einstieg in Welt A ist zu steil

**Belegt** aus `PriceTableSection.tsx` und `ProgrammeSection.tsx`:

| Angebot | Preis |
|---|---|
| Startersession (150 Min) | 339,15 € |
| Folgesession (90 Min) | 226,10 € |
| Mentoring 3 Monate | 2.990,00 € |
| Mentoring 6 Monate | 4.990,00 € |
| Workshop (B2B) | ab 1.200,00 €/Tag |

Der günstigste Einstieg ist eine 339-€-Session. Zwischen „kostenloses
Erstgespräch" (überall die CTA) und 339 € gibt es nichts.

**Weitere Beobachtungen:**

- Die Preise sind **nicht rund** (339,15 € / 226,10 € / 892,50 €). Das wirkt wie
  ein umgerechneter Netto-Betrag und untergräbt die Aussage „Klar, transparent,
  ohne versteckte Kosten" direkt darüber. 339 € oder 349 € liest sich souveräner.
- **Die Programme-Sektion und die Preistabelle widersprechen sich teilweise:**
  „1:1 Tiefenwandel ab 339,15 €" (Programme) vs. „Startersession 339,15 €"
  (Preistabelle) — für den Leser sind das zwei Produkte zum selben Preis.
  „NLP Essentials ab 892,50 €" taucht in der Preistabelle gar nicht auf.
- Der Verweis „(weitere Infos unten)" im Programme-Preis ist kein Link.
- „Nur für Firmenkunden !!!" — drei Ausrufezeichen widersprechen der sonst
  ruhigen, klaren Tonalität. Besser: ein Badge „B2B".

**Empfehlung:**
```
1. Einstiegsangebot ergänzen: "Klarheits-Session, 60 Min, 149 €"
   → schließt die Lücke zwischen Gratis-Gespräch und 339 €
2. Preise runden
3. Programme und Preistabelle zu EINER Preisarchitektur zusammenführen
   (Programme = Was, Preistabelle = Wie viel, mit eindeutiger Zuordnung)
4. Ratenzahlung bei den Mentorings ausweisen (2.990 € ist eine hohe Einmalhürde)
```

---

### #21 · ✅ ERLEDIGT (01.09.2026) · Testimonials ohne jeden Vertrauensanker

> **Gelöst durch Ersetzen statt Reparieren.** Die Sektion wurde durch
> `FulfilmentSection` abgelöst: die Frage "Beruflich erfolgreich – und trotzdem
> nicht erfüllt?" mit Stefans eigener Geschichte als Beleg. Damit entfällt das
> § 5 UWG-Risiko der vermutlich generierten Kundenportraits vollständig.
> Die sechs Avatar-Dateien liegen in `design-source/`.

**Belegt** in `TestimonialsSection.tsx`: sechs Stimmen, jeweils Vorname +
Initiale, jeweils 5 Sterne (`StarRow` ist hartcodiert, immer fünf), Portraits aus
`/images-nlp/testimonial-f-*.png` und `testimonial-m-*.png`.

**Problem:** Die Bilddateien liegen als 1,6–9,3 MB große PNG neben
`Gemini_Generated_Image_*.png` im selben Ordner — das legt nahe, dass es
generierte Portraits sind. Falls ja, sind sie ohne Kennzeichnung als Kundenbilder
**irreführende Werbung nach § 5 UWG** und abmahnfähig.

Unabhängig davon: Sechs anonyme Fünf-Sterne-Bewertungen mit Stock-artigen
Portraits sind das Muster, das Besucher als „ausgedacht" lesen — sie schaden
dem Vertrauen mehr, als sie nützen.

**Empfehlung, gestaffelt nach Realisierbarkeit:**
```
1. Echte Kundenstimmen einholen, mit schriftlicher Freigabe für Foto + Vorname
2. Wo kein Foto freigegeben ist: Initialen-Avatar statt Stock/KI-Portrait
3. Kontext ergänzen: "3 Monate Mentoring, 2025" — konkreter Bezug wirkt stärker
   als ein Foto
4. Ein einziges ausführliches, verifizierbares Testimonial schlägt sechs kurze
5. Falls generierte Bilder bleiben: sichtbarer Hinweis "Symbolbilder,
   Kundenstimmen anonymisiert wiedergegeben"
```
Die vorhandenen **Zertifizierungslogos** (DVNLP, Ronny Rohde) in der About-Sektion
sind der stärkere und rechtlich unbedenkliche Vertrauensanker — die gehören
weiter nach oben, idealerweise in den Hero-Bereich.

---

### #22 · ✅ ERLEDIGT (01.09.2026) · Welt B hat keine Preisorientierung

**Belegt:** `/webdevelopment` nennt im gesamten Seiteninhalt keinerlei Preise oder
Größenordnungen. Die einzige Zahlenangabe steckt **im Formular** — das
Budget-Select in `ContactFormWeb.tsx:154` bietet „Unter 2.500 € / 2.500–7.500 € /
7.500–15.000 € / 15.000 €+".

**Wirkung:** Der Besucher erfährt die Preisdimension erst, wenn er bereits im
Formular steht — und dort als **Frage an ihn**, nicht als Angebot. Das ist die
ungünstigste Reihenfolge: Wer ein zu kleines Budget hat, schreibt trotzdem
(kostet Zeit); wer ein passendes hat, springt vorher ab, weil er „Agenturpreise"
befürchtet. Die Seite sagt selbst „Nicht für jeden. Aber für die Richtigen" —
genau dafür braucht es den Filter **vor** dem Formular, nicht darin.

**Empfehlung:** Die Werte, die im Select bereits stehen, sichtbar machen:
eine Orientierungszeile pro Service-Karte („Landingpage ab 2.500 €",
„Web App ab 7.500 €") oder eine kompakte „Investitionsrahmen"-Box vor dem
Kontaktabschnitt. Die Zahlen sind schon festgelegt — sie stehen nur an der
falschen Stelle.

---

### #23 · P2 · Startseite: Orbit-Positionierung ist mit Magic Numbers gebaut

**Belegt** in `globals.css` — die `.orbit-system` wird über vier Breakpoints mit
fest verdrahteten Pixelwerten verschoben:

```css
.orbit-system                    { transform: translate(0px, -190px); }
@media (max-width:640px)         { transform: translate(-137px, -36px); }
@media (641px–900px)             { transform: translate(-176px, -140px); }
@media (901px–1200px)            { transform: translate(-70px, -165px); }
@media (max-height:700px)        { transform: translate(50px, -131px); }
```
Dazu `.orbit-center { transform: translate(100px, 100px) !important; }` und
`.choice-card { width: 90% !important; }`.

**Wirkung:** Zwischen den Breakpoints (z. B. 1201–1400 px, 901 px exakt) sitzt
das Orbit-System nicht dort, wo es soll. Jede Änderung an Hero-Text oder Bild
verschiebt es erneut und erzwingt Nachjustierung an fünf Stellen. Das ist der
Hauptgrund, warum die Startseite bei künftigen Änderungen brechen wird.

**Empfehlung:** Orbit-System per Grid oder `position:absolute` **relativ zum
Elternelement** positionieren statt per `translate` in Pixeln, und `left/top` in
Prozent angeben. Die `!important`-Regeln entfernen. Aufwand ca. 1–2 Stunden,
zahlt sich bei jeder weiteren Änderung aus.

**Ebenfalls hier:** `.orbit-system` hat `pointer-events: none` — die Orbit-Badges
(„NLP", „Webdesign", „Next.js", „Tony Robbins") sind also reine Dekoration.
Sie sehen aber klickbar aus. Entweder verlinken oder visuell entschärfen.

---

### #24 · P2 · Inhaltliche Fehler und Inkonsistenzen

| Fund | Ort | Korrektur |
|---|---|---|
| Mentor-Name in zwei Schreibweisen | `AboutSection.tsx` | Logo/Link sagen **„Ronny Rohde"** / `ronnyrohde.com`, der Fließtext sagt **„Rony Rhode"** mit Link auf **`https://ronyrhode.com`** — vermutlich tote Domain. Vereinheitlichen und Link prüfen. |
| Tippfehler | `AboutSection.tsx` | „Spannen**s**tes Projekt" → „Spannendstes Projekt" |
| Fehlender Umlaut | `AboutSection.tsx` | „Deutscher Verband **fur** NLP" → „für" |
| Fehlende Umlaute in Rechtstexten | `nlp/impressum`, `nlp/cookies`, `api/nlp-guide` | „fuer", „gueltig", „Gruessen", „ungueltig" — durchgängig auf Umlaute umstellen |
| Alt-Text falsch | `app/page.tsx:74` | `alt='Studio Fokus Logo'` — alte Marke, sollte „Stefan Heinemann Logo" sein |
| Alt-Texte nichtssagend | `AboutSection.tsx` | `alt='Certification 1'` / `'Certification 2'` → „DVNLP – Deutscher Verband für NLP" |
| Vier identische Alt-Texte | `AboutSection.tsx` | Alle vier Slider-Bilder haben `alt='Stefan Heinemann'` → je Situation beschreiben |
| Platzhalter-Text | `webdevelopment/page.tsx` | „Kompetenz 1/42", „2/42", „3/42" — die 42 ist offensichtlich Platzhalter und wirkt unseriös |
| Copyright-Jahr fest | `NlpFooter.tsx:44` | `© 2026` hartcodiert. Welt B macht es richtig mit `new Date().getFullYear()` |
| Footer-Markenkonflikt | `app/page.tsx:288` | `.choice-footer` sagt „Minimal. Premium. Klar." — die Startseite verspricht sonst „klar. sauber. wirksam." |
| Anker-Benennung | `NlpHeader.tsx` | Nav-Label „Preise" zeigt auf `#workshops` (= Preistabelle). ID auf `#preise` umbenennen |
| Rechtliches Welt B | `webdevelopment/page.tsx` Footer | Kein Link auf AGB oder `/widerruf` — Welt A hat beides |
| `/widerruf` verwaist | – | Existiert und steht in der Sitemap, wird aber von keiner Seite verlinkt |
| Datenschutz unvollständig | beide `datenschutz`-Seiten | Nennen Server-Logs, aber **nicht**: dass das Kontaktformular IP, Geodaten (Stadt/Region/Land/Koordinaten), User-Agent und Referer per E-Mail an den Betreiber sendet (`api/contact/route.ts:104–135`); den Leitfaden-Versand; Vercel als Auftragsverarbeiter namentlich. Bitte anwaltlich prüfen lassen. |

---

## Vorgeschlagene Reihenfolge

**Sprint 0 — Spam-Stopp** ✅ erledigt 31.08.2026
`#7`

**Sprint 1 — „aufräumen, was stillschweigend kaputt ist"** ✅ erledigt 01.09.2026
`#4` @theme · `#3` Nav-Breakpoints · `#2` Domain · `#9` Altseiten löschen ·
`#10` PDF-Kopien löschen · `#13` toten Code löschen · `#12` totes CSS löschen ·
`#24` Textkorrekturen

**Sprint 2 — „Gewicht runter"** ✅ erledigt 01.09.2026
`#1` Assets · `#8` Effekt-Budget + Video-Lazy-Loading · `#6` InfoOrb-Priority

**Sprint 3 — „Zugänglichkeit & Sicherheit"** ✅ erledigt 01.09.2026
`#5` Labels + Consent-Links · `#6` Fokus-Falle ·
`#14` Smooth Scroll · `#15` reduced-motion · `#17` Security-Header

**Sprint 4 — „Konversion"** ✅ erledigt 01.09.2026
`#19` Kontakt sichtbar · `#20` Preisarchitektur · `#21` Testimonials ·
`#22` Budgetrahmen Welt B · `#11` OG-Bilder · `#16` JSON-LD

**Backlog**
`#23` Orbit-Refactor · `#18` ESLint-Hygiene

---

## Was ausdrücklich gut ist

Damit beim Aufräumen nichts verloren geht — das hier bitte **nicht** anfassen:

- Die **Zwei-Welten-Trennung** ist konsequent durchgezogen. Beide Welten haben
  eine eigene, wiedererkennbare Handschrift und trotzdem dieselbe Stimme.
- Das **Theme-Variablen-System** in Welt A (`.theme-cool`/`.theme-warm`) ist die
  saubere Lösung — ein Toggle, zwei vollständige Stimmungen, kein Doppel-Layout.
- Das **HMAC-Token-System** für den Lead-Magnet ist korrekt gebaut
  (signierte Payload, Ablaufdatum, `no-store`, Signaturvergleich vor Parsing).
- Die **Formular-Zustandsführung** (idle/loading/success/error mit Rückweg) ist
  in allen drei Formularen konsistent und nutzerfreundlich.
- Die **Doppelmail** (Owner + Bestätigung mit Zusammenfassung an den Interessenten)
  ist ein Detail, das viele Seiten weglassen.
- Die **Modal-Inhalte** in Welt A (Programme, NLP-Grundlagen, Werdegang) sind
  inhaltlich stark und ehrlich — besonders der Burnout-Abschnitt. Das ist echte
  Differenzierung in einem Markt voller Floskeln.
- Die **Scanner-Story** im InfoOrb dreht die vermeintliche Schwäche
  („entscheide dich") in ein Alleinstellungsmerkmal. Das trägt die ganze Seite.
