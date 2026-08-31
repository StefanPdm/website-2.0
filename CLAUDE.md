# CLAUDE.md — UI/UX-Manual & Entwicklungsleitfaden

Verbindliche Referenz für jede Weiterentwicklung dieser Seite.
Bei Konflikt zwischen bestehendem Code und diesem Dokument gilt dieses Dokument —
Abweichungen im Code sind Altlasten (siehe `AUDIT.md`), keine Vorbilder.

---

## 1. Produkt & Informationsarchitektur

Ein Betreiber (**Stefan Heinemann**, Potsdam), **zwei Geschäftsbereiche**, **drei Designwelten**.

```
/                          Welt 0 — Entscheidungs-Hub ("Zwei Welten. Eine Entscheidung.")
├── /webdevelopment        Welt B — Webdevelopment            (Marke: Stefan Heinemann)
│   └── /impressum  /datenschutz  /cookies
└── /nlp                   Welt A — NLP Coaching              (Marke: SNAC Coaching)
    ├── /impressum  /datenschutz  /cookies  /agb
    └── /guide-download    Token-Landing für Lead-Magnet
/widerruf                  Widerrufsbelehrung (B2C)
/api/contact               Kontaktformular → SMTP (nodemailer)
/api/nlp-guide             Lead-Magnet: HMAC-Token erzeugen + Mail
/api/nlp-guide/download    Token prüfen → PDF ausliefern
```

**Kernregel der IA:** Die Startseite verkauft nicht — sie **sortiert**. Sie hat genau
eine Aufgabe: den Besucher in Welt A oder Welt B zu führen. Jede neue Sektion auf `/`
muss diese Entscheidung *unterstützen*, nicht davon ablenken.

**Kernregel der Welten:** Welt A und Welt B teilen sich **keine visuelle Sprache** —
nur Person, Tonalität und technisches Fundament. Ein Bauteil aus Welt B darf nie
unverändert in Welt A landen (und umgekehrt). Gemeinsam sind ausschließlich:
Next.js-Konventionen, `/api/contact`, `lib/utils.ts`, die Absätze zu Tonalität (§10)
und die A11y-Baseline (§11).

---

## 2. Tech-Stack & Konventionen

| Bereich | Festlegung |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Sprache | TypeScript strict. Neue Dateien **immer** `.tsx`/`.ts` — nie `.jsx` |
| Styling | Tailwind CSS v4 (CSS-first, `@import 'tailwindcss'`), zusätzlich `app/globals.css` |
| UI-Primitives | shadcn/ui (`new-york`, baseColor `neutral`), Radix, `lucide-react` |
| Icons | `lucide-react` (UI-Icons), `react-icons/si` + `/fa6` (Tech-Logos, nur Welt B) |
| Motion | GSAP (`CardNav`, `CardSwap`), CSS-Keyframes (Rest) |
| 3D/WebGL | three.js + postprocessing — **nur Welt A/B-Hintergründe**, nie auf `/` |
| Mail | nodemailer über SMTP (ENV). `resend` ist installiert, aber **ungenutzt** |
| Paketmanager | **pnpm** (`packageManager: pnpm@9.15.0`) — kein npm/yarn |
| Hosting | **Vercel** |
| Sprache der UI | Deutsch, Duzen (du/dir), außer in Rechtstexten (dort „Sie") |

### Code-Stil (aus dem Bestand abgeleitet, bitte beibehalten)

- Alias `@/*` → Projektroot. Imports: externe Libs → `@/components` → `@/app/...` → relativ.
- Einfache Anführungszeichen in JSX-Attributen (`className='…'`).
- Statische Inhalte als `const`-Arrays **oberhalb** der Komponente, dann `.map()`.
  Kein Inline-Array direkt im JSX (Ausnahme: unter drei triviale Strings).
- `'use client'` nur wenn wirklich nötig (State, Effekt, Event, WebGL).
  Sektionen ohne Interaktion bleiben Server Components.
- Sektions-Komponenten von `/nlp` liegen in `app/nlp/components/`,
  welten-übergreifend Wiederverwendbares in `components/`.

### Ordnerkonvention für neue Sektionen

```
app/<welt>/components/<Name>Section.tsx   # eine Sektion = eine Datei
```

---

## 3. Design-Tokens

### 3.1 Welt 0 — Startseite (Entscheidungs-Hub)

Definiert in `app/globals.css` unter `.landing-*` / `.choice-*` / `.orbit-*`.

| Rolle | Wert |
|---|---|
| Grundfläche | `#070b12` + zwei Radial-Glows: `rgba(29,111,168,.25)` @15%/20%, `rgba(246,179,90,.16)` @85%/70% |
| Raster-Overlay | `rgba(255,255,255,.04)`, 48×48px, Opacity `.5` |
| Text primär | `#f8fafc` |
| Text sekundär | `rgba(226,232,240,.7)` |
| Text tertiär | `rgba(226,232,240,.5)` |
| Flächen (Karten) | `rgba(7,11,18,.75)` + `backdrop-filter: blur(16px)` |
| Rahmen | `rgba(255,255,255,.12)` |
| CTA primär | `linear-gradient(120deg,#9bc7ff,#ffffff)` auf `#0b1b2b` |
| CTA ghost | `rgba(255,255,255,.05)` / Rahmen `rgba(255,255,255,.2)` |
| Radius | Karten `28px`, Kacheln `20px`, Chips/Buttons `999px` |
| Schatten | `0 40px 80px -60px rgba(0,0,0,.8)` |

**Farbcodierung der Entscheidung** (per Inline-CSS-Variable in `app/page.tsx`, Schema `useWarmPills`):

| | Webdevelopment („grüne Pille") | NLP („orange Pille") |
|---|---|---|
| Rahmen | `rgba(34,197,94,.25)` → hover `.6` | `rgba(245,158,11,.25)` → hover `.6` |
| Glow | `rgba(34,197,94,.35)` | `rgba(245,158,11,.35)` |
| Schatten | `rgba(16,122,60,.18)` → hover `.35` | `rgba(180,83,9,.18)` → hover `.35` |

> Das kalte Alt-Schema (blau/rot, Matrix-Referenz) liegt als `useWarmPills = false`
> daneben. **Nicht löschen**, aber auch nicht mischen — es ist ein vollständiger,
> umschaltbarer Zweitzustand.

### 3.2 Welt A — NLP Coaching

Zwei umschaltbare Themes auf demselben Layout (`NlpLayoutClient`, Toggle im Header).
Alle Werte als CSS-Variablen auf `.theme-cool` / `.theme-warm`.

| Token | `.theme-cool` (Default) | `.theme-warm` |
|---|---|---|
| `--bg` | `#050b12` | `#fff6ea` |
| `--text` | `#e6f7ff` | `#2b1a0f` |
| `--muted` | `rgba(230,247,255,.75)` | `rgba(43,26,15,.75)` |
| `--accent` | `#00e5ff` | `#eaa765` |
| `--accent-2` | `#22c55e` | `#b97029` |
| `--accent-soft` | `#7de3ff` | `rgba(0,0,0,.8)` |
| `--surface` | `rgba(255,255,255,.05)` | `rgba(255,255,255,.26)` |
| `--surface-strong` | `rgba(255,255,255,.10)` | `rgba(255,255,255,.45)` |
| `--border` | `rgba(255,255,255,.20)` | `rgba(0,0,0,.55)` |
| `--border-strong` | `rgba(255,255,255,.45)` | `rgba(0,0,0,.75)` |
| `--button-text` | `#001018` | `#2b1a0f` |
| `--glow` / `--glow-strong` | `rgba(0,229,255,.24)` / `.36` | `rgba(232,160,90,.25)` / `.40` |
| `--hero-glow` / `--hero-fade` | `rgba(0,229,255,.35)` / `rgba(5,11,18,.6)` | `rgba(241,195,138,.45)` / `rgba(255,246,234,.85)` |
| `--section-bg-accent` | `rgba(255,255,255,.05)` | `#ff9e001f` |
| Textur | Radial-Glows + 26px-Gitter, `background-attachment: fixed` | dito, 28px-Gitter |

**Regel Welt A:** In neuen Komponenten **ausschließlich** diese Variablen benutzen.
Kanonische Tailwind-v4-Schreibweise ist die Klammerform `text-(--text)`,
`bg-(--surface)`, `border-(--border)` — die Langform `text-[var(--text)]` ist
gleichwertig, erzeugt aber eine Lint-Warnung. **Nicht** verwenden:
`border-[--border]` (v3-Syntax, in v4 wirkungslos).
Feste Hex-Werte oder `text-white/70` funktionieren im Warm-Theme nur, weil `globals.css`
sie per `!important` überschreibt — das ist eine Altlast und für neue Klassen **nicht** vorgesehen.

Font Welt A: `Public_Sans` (in `NlpLayoutClient` geladen).

### 3.3 Welt B — Webdevelopment

| Rolle | Wert |
|---|---|
| Grundfläche | `#0B1B2B` |
| Text primär | `text-white` |
| Text sekundär | `text-slate-300` |
| Text tertiär | `text-slate-400` / `-500` (Footer) |
| Flächen | `bg-white/5`, Rahmen `border-white/15` bzw. `/20` |
| Brand-Gradient (CTA) | `from-[#1D6FA8] to-[#7A2C8E]` |
| Akzent „Beweis/Check" | `#86C243` (Trust-Punkte, Listen-Bullets) |
| Akzent „Technik" | `#2dd4bf` (ElectricBorder, Case-Hover-Glow) |
| Hintergrund-Licht | `LightPillar` top `#1D6FA8` → bottom `#7A2C8E`, `mix-blend-mode: screen` |
| Radius | Karten `rounded-2xl` (16px) / innen `rounded-[22px]`, CTA `rounded-xl` |
| Schatten | `0 30px 70px -60px rgba(0,0,0,.6)` |

Font Welt B: global (`--font-body` = Plus Jakarta Sans).

### 3.4 Global (Root-Layout)

- `--font-body`: **Plus Jakarta Sans** (300/400/500/600/700)
- `--font-display`: **Syne** (500/600/700/800)
- `themeColor`: `#0b1118`, `colorScheme: 'dark light'`, `<html lang="de">`

---

## 4. Typografie

| Ebene | Welt 0 | Welt A | Welt B |
|---|---|---|---|
| Eyebrow / Badge | `.landing-badge` — 0.75rem, `tracking .2em`, uppercase, Pill | `text-xs uppercase tracking-[0.3em] text-(--accent-soft)` | `text-xs font-medium` in Pill `bg-white/10 ring-1 ring-white/10` |
| H1 | `clamp(2.2rem, 4vw, 3.5rem)`, 700, `tracking -0.02em` | `text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight` | `text-4xl md:text-5xl font-extrabold tracking-tight` |
| H2 | `.landing-title` (wie H1) | `text-3xl sm:text-4xl font-semibold` | `text-3xl font-bold tracking-tight` |
| H3 | `.choice-heading` 600 | `text-lg font-semibold` | `text-lg font-semibold` |
| Lead | `1.05rem`, `line-height 1.7` | `text-base sm:text-lg text-white/70` | `text-lg text-slate-300` |
| Body | `0.95rem` | `text-sm text-white/75` | `text-sm text-slate-300` |
| Meta / Label | `0.75–0.85rem` | `text-xs text-white/60` | `text-xs text-slate-300` |
| Overline in Karten | – | `text-[11px] uppercase tracking-[0.2em] text-white/50` | `text-xs uppercase tracking-[0.2em] text-slate-300` |

**Regeln**

- Genau **ein `<h1>` pro Route**. Sektionen beginnen mit `<h2>`, Karten mit `<h3>`. Keine Ebene überspringen.
- Zeilenumbrüche in Headlines mit `<br />` sind erlaubt und **Teil der Marke**
  („Klare Websites. / Saubere Systeme. / Entwicklung, die trägt.") — Dreiklang beibehalten.
- Maximale Lesebreite: `max-w-2xl` (Welt B), `max-w-3xl` zentriert (Welt A), `max-w-xl` für Leads.
- Kein `text-justify`, keine Silbentrennung.

---

## 5. Layout, Raster & Rhythmus

| | Welt 0 | Welt A | Welt B |
|---|---|---|---|
| Container | `min(1280px,100%)`, Padding `clamp(1.5rem,6vw,4.5rem)` | `container mx-auto px-4` | `mx-auto max-w-6xl px-4` |
| Sektionshöhe | vollflächig (`min-height:100vh`) | `min-h-[60dvh]` … `min-h-[80dvh]` | `min-h-[60vh]` … `min-h-[90vh]` |
| Vertikaler Abstand | `gap: 1rem` im Main | `py-20` (Standard), `py-28`/`py-40` für Kontakt/Über | `py-16` (Standard), `py-32` für Cases/Kontakt |
| Grid Karten | `repeat(auto-fit, minmax(160px,1fr))` | `lg:grid-cols-3` / `lg:grid-cols-4`, `gap-6` | `sm:grid-cols-2 lg:grid-cols-4`, `gap-4` |
| Split-Layout | `repeat(auto-fit,minmax(280px,1fr))` | `lg:grid-cols-[1.1fr_0.9fr]` | `md:grid-cols-2` |

**Sektions-Trenner**

- Welt A: `border-y border-[var(--border)]` + alternierend `bg-[var(--section-bg-accent)]`.
- Welt B: `border-y border-white/20` + `backdrop-blur-md` + `ring-1 ring-white/10`.
- **Rhythmus-Regel:** nie zwei akzentuierte Sektionen hintereinander. Muster A–B–A–B.

**Breakpoints** — Tailwind-Default (`sm 640 / md 768 / lg 1024 / xl 1280`).
Custom-CSS auf `/` nutzt zusätzlich `≤640`, `641–900`, `901–1200` und
`max-height:700px and (orientation:landscape)`.

> ⚠️ **Zwingend:** Jede Sichtbarkeitsregel muss über **alle** Breakpoints hinweg
> vollständig sein. Nav-Trigger und Nav-Panel **immer** am selben Breakpoint schalten
> (aktuell verletzt, siehe `AUDIT.md` #3).

---

## 6. Komponenten-Inventar

### Welten-übergreifend (`components/`)

| Komponente | Zweck | Einsatz |
|---|---|---|
| `GlassCard` | Standard-Karte Welt A. Nutzt `--surface-strong`, `--border-strong`, `--glow`. Hover: `-translate-y-1` | **nur Welt A** |
| `InfoOrb` | Schwebender Info-Button + Portal-Modal mit Mini-Markdown (`**fett**`) | `/` (Scanner-Story) |
| `ScrollToTop` | Fixed Button ab `scrollY > 240` | Welt B |
| `CaseCard` | Referenzkarte mit Tilt-Effekt + Video/Bild + Info-Leiste | Welt B |
| `ContactForm` / `ContactFormNlp` / `ContactFormWeb` | drei Varianten desselben Endpunkts | `/` / Welt A / Welt B |
| `ContactRevealButton` | blendet `.contact-grid--hidden` ein | ⚠️ derzeit ungenutzt |

### Effekt-Komponenten (react-bits, `.jsx`)

`CardNav`, `CardSwap`, `DomeGallery`, `ElectricBorder`, `FloatingLines`,
`Hyperspeed`, `LaserFlow`, `LightPillar`, `PixelCard`, `ProfileCard.css`

**Regeln für Effekt-Komponenten**

1. Sie sind **Vendor-Code**. Nicht umformatieren, nicht „aufräumen" —
   nur gezielt patchen und den Patch kommentieren.
2. Sie sind **ausgeschlossen von der Lint-Sauberkeit** (`any`, `setState-in-effect`).
   Neuer eigener Code muss lint-clean sein.
3. **Jede** neue Einbindung erfolgt über `next/dynamic` mit `{ ssr: false }` —
   Vorbild: `FloatingLines` in `HeroSection`.

### Effekt-Zuordnung (verbindlich)

| Effekt | Welt | Rolle |
|---|---|---|
| `FloatingLines` | A | Hero-Hintergrund (Themefarben) |
| `LaserFlow` | A | Transformation-Sektion |
| `LightPillar` | B | globaler Seitenhintergrund (`fixed inset-0`) |
| `Hyperspeed` | B | Streifen unter „Digitale Lösungen" |
| `ElectricBorder` | B | Rahmen um Technologie-/Zielgruppen-/Kontaktkarten |
| `PixelCard` | B | Service- und Prozesskarten |
| `CardSwap` | B | Hero-Kompetenzstapel |
| `CardNav` | B | Header-Navigation |
| Orbit-System (CSS) | 0 | Kompetenz-Umlaufbahnen |

---

## 7. Buttons & CTA-Hierarchie

**Genau eine Primär-Aktion pro Viewport.** Sekundäres immer als Ghost/Outline.

### Welt 0

```
.landing-cta--primary   Gradient hell → dunkler Text, Radius 999px   → "Jetzt wählen"
.landing-cta--ghost     transparent + Rahmen                          → "Kontakt"
.choice-link            Textlink mit "→"                              → in den Wahlkacheln
```

### Welt A — `app/nlp/components/Buttons.tsx`

```
<PrimaryButton>    Gradient --accent → --accent-2, Text --button-text,
                   shadow 0 0 30px var(--glow), rounded-full, px-6 py-3
<SecondaryButton>  bg --surface, ring --border, Text --text
```

Beide rendern `<Link>` bei `href`, sonst `<button>`. Beide unterstützen
`disabled` und `aria-busy`. **Keine neuen Button-Varianten anlegen** —
diese zwei erweitern.

### Welt B (Tailwind inline)

```
primär:    rounded-xl bg-linear-to-r from-[#1D6FA8] to-[#7A2C8E] px-5 py-3
           text-sm font-semibold text-white transition hover:opacity-90
sekundär:  rounded-xl border border-white/20 bg-white/5 px-5 py-3 hover:bg-white/10
```

**Fokus-Sichtbarkeit (Pflicht, alle Welten):**
`focus-visible:outline-none focus-visible:ring-2` + weltspezifische Ringfarbe.
Ein Interaktionselement ohne sichtbaren Fokus geht nicht in Produktion.

**Mobile:** primäre CTAs `w-full sm:w-auto`.

---

## 8. Formulare

Alle Formulare posten JSON an **`POST /api/contact`**.
Feldnamen sind der Vertrag zur Route — beim Hinzufügen eines Feldes **immer**
`ContactPayload` in `app/api/contact/route.ts` **und** Plain-/HTML-Mail mitpflegen.

| Feld | Typ | `/` | Welt A | Welt B |
|---|---|---|---|---|
| `name`, `email`, `message`, `privacy` | Pflicht | ✓ | ✓ | ✓ |
| `projectType`, `budget`, `timeline` | Select | ✓ | – | ✓ |
| `company`, `website`, `scope` | – | – | – | ✓ |
| `phone`, `topic`, `sessionType`, `preferredTime` | – | – | ✓ | – |

**Verbindliche Formular-Regeln**

1. Jedes `<label>` braucht `htmlFor`, jedes Feld eine `id`. *(aktuell verletzt — `AUDIT.md` #5)*
2. Pflichtfelder mit `*` **und** `required`.
3. Consent-Checkbox `name="privacy"`, `required`, mit **verlinktem** Text
   auf die Datenschutzerklärung der jeweiligen Welt.
4. Drei Zustände: `idle` → `loading` (Button `disabled` + `aria-busy` + „Wird gesendet…")
   → `success` | `error`. Erfolgs-/Fehlerkarte ersetzt das Formular und bietet
   einen Rückweg („Neue Nachricht schreiben").
5. Erfolgstext nennt die **Antwortzeit 24–48 Stunden** — konsistent auf der ganzen Seite.
6. Feldhöhe `h-11`, Radius `rounded-xl`, Abstand `gap-4`.
7. Selects in Welt 0/B nutzen `.select-caret` (eigener Pfeil, `appearance:none`).
8. **Jedes** Formular bindet den Bot-Schutz ein — ohne Ausnahme, sonst ist die
   Route über dieses eine Formular wieder offen:

```tsx
import { useFormShield } from '@/components/FormShield';

const shield = useFormShield();
// im Submit-Handler:
const data: Record<string, unknown> = {
  ...Object.fromEntries(new FormData(form).entries()),
  ...shield.payload(),          // Honeypot-Wert + Ausfüllzeit
};
// im JSX, direkt im <form>:
{shield.fields}
```

Serverseitig entscheidet `lib/anti-spam.ts` (`scoreSubmission`, `isRateLimited`).
Die Prüfung läuft **vor jedem `sendMail`** — nie danach. Drei Ausgänge:

| Score | Verhalten |
|---|---|
| Honeypot gefüllt oder ≥ 6 | still `200`, **keine** Mail (Bot bekommt kein Erkennungssignal) |
| 3–5 | Mail an dich mit `[SPAM?]`-Betreff und Warnbanner, **keine** Bestätigung an den Absender |
| < 3 | normal, beide Mails |

Grundsatz: **kein Lead geht verloren, solange Zweifel bestehen.** Die
Bestätigungsmail geht nie an eine verdächtige Adresse — sie ist frei wählbar
und wäre sonst ein Mail-Relay über deine SMTP-Reputation.

---

## 9. Motion & Effekt-Budget

**Harte Obergrenze: maximal ein aktiver WebGL-Kontext pro Viewport.**
Alles Weitere ist ein CSS-Effekt oder existiert nicht.

| Zweck | Dauer | Easing |
|---|---|---|
| Hover Farbe/Schatten | 200 ms | `ease` |
| Karten-Lift | 200 ms, `-translate-y-1` | `ease` |
| Panel/Menü öffnen | 500 ms | `ease-in-out` |
| Modal-Einflug | 620–1000 ms | `cubic-bezier(.22,.8,.2,1)` |
| Ambient-Loop (Orbit, Puls) | 2.6 s – 22 s | `linear` / `ease-in-out` |
| Karussell-Wechsel | 700 ms | `ease-out` |

**Regeln**

- Nur `transform` und `opacity` animieren. Kein `top`/`left`/`width`/`height`.
- Ambient-Animationen sind **dekorativ** → immer `aria-hidden` bzw. `pointer-events-none`.
- Auto-Rotationen (`CardSwap` 3500 ms, About-Slider 4500 ms) brauchen eine
  manuelle Steuerung (Dots) oder `pauseOnHover`.
- **`prefers-reduced-motion` respektieren.** Neue Animationen kommen mit
  `@media (prefers-reduced-motion: reduce)`-Abschaltung. *(global noch offen — `AUDIT.md` #6)*
- Autoplay-Videos: `muted loop playsInline` — Pflicht, sonst blockiert iOS.

---

## 10. Content, Tonalität & Beweisführung

**Stimme:** Direkt, reduziert, ehrlich. Duzen. Kurze Hauptsätze.
Dreiklänge als Stilmittel („Kopf. Körper. Fokus." / „klar. sauber. wirksam.").

**Erlaubt:** „Ich melde mich ehrlich zurück." · „Wenn es nicht passt, sage ich das." ·
„Ohne esoterischen Nebel." · „Kein Overengineering. Kein Plugin-Chaos."

**Verboten:** Superlative ohne Beleg, „revolutionär", „einzigartig", Agentur-Wir
(es ist **eine** Person), Emoji in Fließtext (nur als Icon-Slot in Karten).

**Beweispflicht:** Jede Zahl und jedes Testimonial muss echt und belegbar sein.

- Preise inkl. MwSt.-Angabe (Welt A) bzw. „zzgl. MwSt." (B2B-Workshop).
- Testimonials: Vorname + Initiale. **Wenn die Portraits generiert sind, gehört
  ein Hinweis darunter** — sonst ist es irreführende Werbung (§ 5 UWG).
- Keine Erfolgsversprechen bei Coaching („Heilung", „garantiert") —
  Ergebnisse als Ziel formulieren, nicht als Zusage.

**Cross-Selling:** Der Wechsel zwischen den Welten muss immer möglich sein
(NLP-Header → „Hauptseite", Web-Nav → „Zurück zur Hauptseite", Landing-Tipp).
Das ist die Scanner-Story des Betreibers und ein bewusstes Alleinstellungsmerkmal.

---

## 11. Accessibility-Baseline (nicht verhandelbar)

- `<html lang="de">`, semantische Landmarks (`header`/`nav`/`main`/`footer`).
- Kontrast **≥ 4.5:1** für Text. Kritisch: `text-white/50` und `text-white/60`
  auf `#050b12` sowie das gesamte `.theme-warm` — **vor Merge messen**.
- Fokus sichtbar auf **jedem** interaktiven Element.
- Klickbare Karten: `role='button'` + `tabIndex={0}` + `onKeyDown` (Enter/Space)
  — oder besser gleich ein echtes `<button>`/`<a>`.
- Modals: `role='dialog'`, `aria-modal='true'`, `aria-label`, Escape schließt,
  Body-Scroll gesperrt, **Fokus-Falle** und **Fokus-Rückgabe** an den Auslöser.
  *(Fokus-Handling fehlt derzeit — `AUDIT.md` #6)*
- Dekorative Bilder `alt=''`; inhaltliche Bilder mit beschreibendem Alt.
- Icon-only-Buttons brauchen `aria-label`.
- Toggles: `aria-pressed`. Aufklappbares: `aria-expanded`.
- Kein Text unter 12px außer Meta-Zeilen.
- Touch-Targets ≥ 44×44px.

---

## 12. Bilder, Video & Assets

- **Immer `next/image`.** `<img>` nur in Vendor-Code.
- Format: **WebP** für Fotos, **SVG** für Logos. Keine PSD, keine unkomprimierten PNG in `public/`.
- **Obergrenze pro Datei in `public/`: 500 KB.** *(aktuell massiv verletzt — `AUDIT.md` #1)*
- `priority` **nur** für das LCP-Bild einer Route — maximal eines.
- `sizes` bei jedem `fill`-Bild angeben.
- `quality={100}` ist die Ausnahme, nicht der Standard (`next.config.ts` erlaubt `[100, 75]`).
- Video: `.webm`, `muted loop playsInline`, unter dem Fold `preload='none'` + `poster`.
- **`public/` ist öffentlich.** Nichts dort ablegen, was gated sein soll —
  gated Dateien gehören nach `private-documents/` und werden über eine Route ausgeliefert.

### Namenskonvention

```
public/images-startseite/   Welt 0
public/images-nlp/          Welt A
public/case-images-videos/  Welt B (Referenzen)
public/logos/               Marken- & Zertifikatslogos
public/icons/               UI-Icons
```

Dateinamen: kebab-case, beschreibend, ASCII, **ohne Leerzeichen und ohne Datum**
(`portrait-coaching.webp`, nicht `ChatGPT Image 3. Feb. 2026, 16_42_42.png`).

---

## 13. SEO & Metadata

- `metadataBase` und **alle** URLs verwenden kanonisch **`https://www.heinemann.berlin`**.
  Eine Schreibweise, überall — Layout, `robots.ts`, `sitemap.ts`, API-Routen.
  *(aktuell uneinheitlich — `AUDIT.md` #2)*
- Jede Route exportiert `metadata` mit `title`, `description`, `alternates.canonical`,
  `openGraph`, `twitter`.
- Titel-Template: `'%s | Stefan Heinemann'`.
- **OG-Bild pro Welt**, echte **1200×630**. Kein Logo als OG-Bild.
- Neue Route → **immer** Eintrag in `app/sitemap.ts`. Seiten ohne Einstiegs-Link
  gehören *nicht* in die Sitemap, sondern entfernt oder verlinkt.
- JSON-LD ist Pflicht für neue Angebotsseiten:
  `Person`/`ProfessionalService` auf `/`, `Service` auf `/nlp` und `/webdevelopment`,
  `Offer` bei Preisen. *(fehlt komplett — `AUDIT.md` #4)*

---

## 14. Rechtliches (DE)

Jede Welt hat ihren **eigenen** Rechtsbereich — Impressum, Datenschutz, Cookies
(Welt A zusätzlich AGB). Wird eine Welt inhaltlich erweitert, sind die Rechtstexte
Teil des Tickets, nicht ein Nachtrag.

- Impressum nach **§ 5 DDG**, aus jedem Footer maximal einen Klick entfernt.
- Datenschutz muss **jede** Datenverarbeitung abdecken, die der Code tatsächlich vornimmt —
  insbesondere: Kontaktformular, die dabei **mitgesendeten IP-/Geo-/Browser-Daten**,
  den NLP-Leitfaden-Versand und **Vercel als Auftragsverarbeiter**.
- Die Cookie-Seiten behaupten „Diese Website verwendet keine Cookies".
  **Das ist eine bindende Zusage:** Sobald Analytics, Consent-Tool, Kartendienst,
  eingebettetes Video oder Werbe-Pixel dazukommt, müssen Cookie-Banner **und** Text
  im selben Commit angepasst werden.
- Preise B2C inkl. MwSt., B2B klar als „zzgl. MwSt.".
- Widerrufsbelehrung bei Verbraucherverträgen — aus beiden Welten verlinken.

---

## 15. Deployment (Vercel)

- Auto-Deploy von `main`. Preview-Deploys pro Branch.
- **Environment-Variablen** (Vercel Project Settings, alle Environments):
  `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`,
  `OWNER_EMAIL`, `DOWNLOAD_TOKEN_SECRET`.
  `SMTP_TLS_REJECT_UNAUTHORIZED` nur im Notfall auf `false` — **nie** in Produktion.
- `.env` ist gitignored und muss es bleiben. Secrets nie ins Repo.
- `/api/*` läuft als Node-Runtime (nodemailer + `fs`). **Kein Edge-Runtime**
  für diese Routen.
- `private-documents/` muss im Deployment enthalten sein (File-Tracing) —
  nach jedem Deploy den Guide-Download einmal durchklicken.
- Bilder aus `public/` fließen in jedes Deployment. Große Binaries kosten
  Build- und Deploy-Zeit → siehe §12.
- **Vercel Analytics / Speed Insights**: sobald aktiviert, Cookie-/Datenschutztexte
  anpassen (§14).

---

## 16. Definition of Done — neue Sektion oder Seite

1. In die **richtige Welt** einsortiert, ausschließlich deren Tokens verwendet.
2. Nur eine H-Ebene tiefer als die Umgebung; genau ein `<h1>` pro Route.
3. Responsive geprüft bei **360 / 768 / 1024 / 1280 / 1920** px
   — inklusive des Bereichs 768–1023, in dem sich Nav-Bugs verstecken.
4. Landscape-Phone (`max-height: 700px`) geprüft.
5. Tastaturbedienung vollständig, Fokus sichtbar, Modals mit Escape + Fokus-Rückgabe.
6. Kontraste gemessen — auch im **Warm-Theme** von Welt A.
7. Bilder als WebP < 500 KB, `sizes` gesetzt, höchstens ein `priority`.
8. Kein zweiter WebGL-Kontext im selben Viewport.
9. `prefers-reduced-motion` berücksichtigt.
10. Genau eine primäre CTA; sie führt zu `#kontakt` bzw. `/api/contact`.
11. Neue Route: `metadata` + `sitemap.ts` + interner Link + ggf. JSON-LD.
12. `pnpm build` und `npx eslint .` laufen ohne **neue** Fehler.
13. Rechtstexte geprüft, falls neue Daten verarbeitet oder neue Preise genannt werden.

---

## 17. Bekannte Altlasten

Der vollständige, priorisierte Audit steht in **`AUDIT.md`**.
Kurzfassung dessen, was beim Anfassen der jeweiligen Datei mitzureparieren ist:

- `text-accent`, `text-accent-web`, `border-border`, `bg-accent` sowie `border-[--border]`
  erzeugen **keine CSS-Regel** — es fehlt der `@theme`-Block. Nicht kopieren.
- `/about` und `/contact` sind verwaiste Altseiten mit falscher Marke („Studio Fokus");
  das Formular auf `/contact` sendet nichts.
- Rund 900 Zeilen toter CSS in `app/globals.css` (Block `.teaser-*` bis `.cta-*`).
- `app/nlp/components/WorkshopsSection.tsx` und `components/ContactRevealButton.tsx`
  werden nirgends gerendert.
- Der NLP-Leitfaden liegt trotz Token-Gate dreifach frei in `public/`.
- Das Theme-Umschalten in Welt A überschreibt Tailwind-Klassen per `!important` —
  neue Komponenten müssen über die CSS-Variablen laufen, damit dieser Block sterben kann.
