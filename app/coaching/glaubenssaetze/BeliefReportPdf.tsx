/* eslint-disable jsx-a11y/alt-text -- react-pdf-<Image> kennt kein alt, es ist kein HTML-Bild */
import { Circle, Document, Font, Image, Link, Page, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

import { allBeliefs, beliefAreas, coachingQuestions } from '@/app/coaching/glaubenssaetze/data';
import { absoluteUrl, OWNER } from '@/lib/site';

/**
 * PDF-Auswertung des Glaubenssatz-Checks – entsteht komplett im Browser
 * (@react-pdf/renderer, per dynamic import erst beim Klick geladen). Nichts
 * verlässt das Gerät; Schriften, Logo und Foto kommen von der eigenen Domain.
 *
 * Farben = Welt A „Morgenlicht & Bernstein“ (§3.2), als feste Werte, weil
 * react-pdf keine CSS-Variablen kennt. Bei Änderung der Tokens hier nachziehen.
 */

const C = {
  cream: '#f7efe4',
  paper: '#fffaf3',
  walnut: '#2b1b10',
  text: '#2b1a0f',
  muted: '#6a5242',
  subtle: '#86705f',
  copper: '#9a4c17',
  copper2: '#7d3b12',
  amber: '#f6b35a',
  amberSoft: '#ffd49a',
  creamOnDark: '#fbefdf',
  mutedOnDark: '#e2d3c1',
  line: '#e6d6c3',
  lineStrong: '#d4bda4',
  wash: '#f1e2cf',
};

let fontsReady = false;
function registerFonts() {
  if (fontsReady) return;
  const base = `${window.location.origin}/fonts/pdf`;
  Font.register({
    family: 'PublicSans',
    fonts: [
      { src: `${base}/public-sans-latin-400-normal.woff`, fontWeight: 400 },
      { src: `${base}/public-sans-latin-600-normal.woff`, fontWeight: 600 },
      { src: `${base}/public-sans-latin-700-normal.woff`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: 'Fraunces',
    fonts: [{ src: `${base}/fraunces-latin-300-italic.woff`, fontWeight: 300, fontStyle: 'italic' }],
  });
  // Keine Silbentrennung (§4)
  Font.registerHyphenationCallback((word) => [word]);
  fontsReady = true;
}

const s = StyleSheet.create({
  page: {
    fontFamily: 'PublicSans',
    fontSize: 10,
    color: C.text,
    backgroundColor: C.cream,
    paddingTop: 54,
    paddingBottom: 70,
    paddingHorizontal: 52,
    lineHeight: 1.5,
  },
  dark: { backgroundColor: C.walnut, color: C.creamOnDark },
  eyebrow: { fontSize: 8, letterSpacing: 2.4, textTransform: 'uppercase', color: C.copper },
  h2: { fontSize: 24, fontWeight: 600, marginTop: 8, lineHeight: 1.2 },
  lead: { fontSize: 11, color: C.muted, marginTop: 8, maxWidth: 400 },
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 52,
    right: 52,
    fontSize: 8,
    color: C.subtle,
    borderTopWidth: 0.6,
    borderTopColor: C.line,
    paddingTop: 8,
  },
  card: {
    backgroundColor: C.paper,
    borderWidth: 0.8,
    borderColor: C.line,
    borderRadius: 10,
    padding: 16,
  },
  writeLine: { borderBottomWidth: 0.7, borderBottomColor: C.lineStrong, height: 19 },
});

/** Atem-Ringe – Signatur von Welt A, hier als statische Linien. */
function Rings({ size, color, style }: { size: number; color: string; style?: object }) {
  const rings = [
    { r: 70, o: 0.5 },
    { r: 120, o: 0.4 },
    { r: 175, o: 0.3 },
    { r: 235, o: 0.2 },
    { r: 295, o: 0.12 },
  ];
  return (
    <Svg
      viewBox='0 0 600 600'
      style={{ width: size, height: size, position: 'absolute', ...style }}>
      {rings.map(({ r, o }) => (
        <Circle
          key={r}
          cx='300'
          cy='300'
          r={r}
          fill='none'
          stroke={color}
          strokeWidth={1.4}
          strokeOpacity={o}
        />
      ))}
    </Svg>
  );
}

function Dots({ count, total, on = C.copper, off = C.lineStrong }: { count: number; total: number; on?: string; off?: string }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            marginLeft: 4,
            backgroundColor: i < count ? on : off,
          }}
        />
      ))}
    </View>
  );
}

/**
 * Fußzeile als ein fester Text. Seitenzahlen über `render` zeichnete react-pdf
 * hier nicht (weder als eigener Text noch als View) – darum ohne Zähler.
 */
function Footer() {
  return (
    <Text
      style={s.footer}
      fixed>
      Stefan Heinemann Coaching · heinemann.berlin/coaching · {OWNER.emailCoaching}
    </Text>
  );
}

function Brand({ onDark }: { onDark?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        src={`${window.location.origin}/logos/logo-zeichen-512.png`}
        style={{ width: 40, height: 40 }}
      />
      <View style={{ marginLeft: 8 }}>
        <Text style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.2, color: onDark ? C.creamOnDark : C.text }}>
          STEFAN HEINEMANN{' '}
          <Text style={{ fontWeight: 400, color: onDark ? C.amber : C.copper }}>COACHING</Text>
        </Text>
        <Text style={{ fontSize: 7.5, letterSpacing: 1.2, color: onDark ? C.mutedOnDark : C.muted, marginTop: 1 }}>
          LIFE COACHING FÜR UNTERNEHMER
        </Text>
      </View>
    </View>
  );
}

export type BeliefReportProps = { picked: number[]; created: Date };

export default function BeliefReportPdf({ picked, created }: BeliefReportProps) {
  registerFonts();

  const chosen = new Set(picked);
  const areas = beliefAreas.map((area) => ({
    ...area,
    mine: area.beliefs.filter((belief) => chosen.has(belief.id)),
  }));
  const max = Math.max(...areas.map((area) => area.mine.length));
  const loudest = areas.filter((area) => area.mine.length === max && max > 0);
  const mine = areas.flatMap((area) => area.mine.map((belief) => ({ ...belief, area: area.title })));
  const date = created.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Document
      title='Deine Glaubenssätze – persönliche Auswertung'
      author={OWNER.name}
      creator='heinemann.berlin'
      producer='heinemann.berlin'
      subject='Auswertung des Glaubenssatz-Checks'
      language='de-DE'>
      {/* 1 · Titel */}
      <Page
        size='A4'
        style={[s.page, s.dark, { paddingBottom: 52 }]}>
        <Rings
          size={560}
          color={C.amber}
          style={{ right: -190, top: 210 }}
        />
        <Brand onDark />

        <View style={{ marginTop: 150 }}>
          <Text style={[s.eyebrow, { color: C.amberSoft }]}>Persönliche Auswertung</Text>
          <Text style={{ fontSize: 50, fontWeight: 600, lineHeight: 1.05, marginTop: 14, color: C.creamOnDark }}>
            Deine{'\n'}Glaubenssätze
          </Text>
          <Text style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 300, fontSize: 18, color: C.amberSoft, marginTop: 18, maxWidth: 340, lineHeight: 1.35 }}>
            Welche Sätze in dir laufen – und was ihr Gegenteil wäre.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 70 }}>
          <View style={{ width: 150 }}>
            <Text style={{ fontSize: 44, fontWeight: 600, color: C.amber, lineHeight: 1 }}>{mine.length}</Text>
            <Text style={{ fontSize: 9.5, color: C.mutedOnDark, marginTop: 6 }}>
              von {allBeliefs.length} Sätzen{'\n'}wiedererkannt
            </Text>
          </View>
          <View style={{ flex: 1, borderLeftWidth: 0.8, borderLeftColor: '#5a4030', paddingLeft: 20, maxWidth: 260 }}>
            <Text style={[s.eyebrow, { color: C.amberSoft }]}>Am lautesten</Text>
            <Text style={{ fontSize: 14, fontWeight: 600, color: C.creamOnDark, marginTop: 6, lineHeight: 1.3 }}>
              {loudest.map((area) => area.title).join('\n')}
            </Text>
            {loudest.length === 1 && (
              <Text style={{ fontSize: 9.5, color: C.mutedOnDark, marginTop: 4 }}>{loudest[0].fear}</Text>
            )}
          </View>
        </View>

        <View style={{ position: 'absolute', left: 52, right: 52, bottom: 40 }}>
          <Text style={{ fontSize: 8.5, color: C.mutedOnDark }}>Erstellt am {date}</Text>
          <Text style={{ fontSize: 8.5, color: C.mutedOnDark, marginTop: 2 }}>
            Diese Auswertung ist in deinem Browser entstanden. Niemand außer dir kennt sie.
          </Text>
        </View>
      </Page>

      {/* 2 · Landkarte + Anleitung */}
      <Page
        size='A4'
        style={s.page}>
        <Footer />
        <Text style={s.eyebrow}>Überblick</Text>
        <Text style={s.h2}>Deine Landkarte</Text>
        <Text style={s.lead}>
          Zehn Lebensbereiche, je fünf Sätze. Die gefüllten Punkte sind die Sätze, die du bei dir
          wiedererkannt hast.
        </Text>

        <View style={{ marginTop: 18 }}>
          {areas.map((area, index) => {
            const hot = area.mine.length === max && max > 0;
            return (
              <View
                key={area.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: hot ? 10 : 0,
                  marginHorizontal: hot ? -10 : 0,
                  borderBottomWidth: 0.6,
                  borderBottomColor: C.line,
                  backgroundColor: hot ? C.wash : undefined,
                  borderRadius: hot ? 6 : 0,
                }}>
                <Text style={{ width: 22, fontSize: 8.5, color: C.copper, fontWeight: 600 }}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10.5, fontWeight: hot ? 600 : 400 }}>{area.title}</Text>
                  <Text style={{ fontSize: 8.5, color: C.subtle }}>{area.fear}</Text>
                </View>
                <Dots
                  count={area.mine.length}
                  total={area.beliefs.length}
                />
              </View>
            );
          })}
        </View>
      </Page>

      {/* 3 · Arbeitsblätter */}
      <Page
        size='A4'
        style={s.page}>
        <Footer />
        <Text style={s.eyebrow}>Zum Bearbeiten</Text>
        <Text style={s.h2}>{mine.length === 1 ? 'Dein Glaubenssatz' : `Deine ${mine.length} Glaubenssätze`}</Text>
        <Text style={[s.lead, { marginBottom: 18 }]}>
          Platz für deine Antworten. Druck die Seiten aus oder nimm ein eigenes Heft dazu.
        </Text>
        <View
          style={[s.card, { marginBottom: 16, backgroundColor: C.wash, borderColor: C.wash }]}
          wrap={false}>
          <Text style={{ fontSize: 13, fontWeight: 600 }}>So arbeitest du mit jedem Satz</Text>
          <Text style={{ fontSize: 9.5, color: C.muted, marginTop: 4 }}>
            Einen Satz nach dem anderen – schriftlich und ohne Eile. Beginne mit dem, der sich am
            schwersten anfühlt.
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={{ flex: 1.15, paddingRight: 16 }}>
              <Step
                n={1}
                title='Bring ihn ins Wanken'
              />
              {coachingQuestions.map((entry, index) => (
                <Text
                  key={entry.question}
                  style={{ fontSize: 9.5, color: C.muted, marginTop: 4, paddingLeft: 26 }}>
                  <Text style={{ color: C.copper, fontWeight: 600 }}>{index + 1}. </Text>
                  {entry.question}
                </Text>
              ))}
            </View>
            <View style={{ flex: 1 }}>
              <Step
                n={2}
                title='Dreh ihn um'
              />
              <Text style={{ fontSize: 9.5, color: C.muted, marginTop: 4, paddingLeft: 26 }}>
                Was wäre das Gegenteil? Formuliere es erst selbst. Dann such drei Beispiele aus
                deinem Leben, in denen das Gegenteil mindestens genauso wahr ist.
              </Text>
              <Text style={{ fontSize: 9, color: C.subtle, marginTop: 6, paddingLeft: 26 }}>
                Meine Vorschläge stehen am Ende – erst lesen, wenn du selbst formuliert hast.
              </Text>
            </View>
          </View>
        </View>
        {mine.map((belief) => (
          <View
            key={belief.id}
            style={[s.card, { marginBottom: 12, padding: 14 }]}
            wrap={false}>
            <Text style={[s.eyebrow, { fontSize: 7.5 }]}>{belief.area}</Text>
            <Text style={{ fontSize: 15, fontWeight: 600, marginTop: 5, lineHeight: 1.3 }}>„{belief.text}“</Text>
            <Text style={{ fontSize: 9, color: C.muted, marginTop: 9 }}>Mein Gegenteil:</Text>
            <View style={s.writeLine} />
            <View style={s.writeLine} />
            <Text style={{ fontSize: 9, color: C.muted, marginTop: 9 }}>
              Drei Beispiele, in denen das Gegenteil stimmt:
            </Text>
            {[1, 2, 3].map((n) => (
              <View
                key={n}
                style={[s.writeLine, { flexDirection: 'row', alignItems: 'flex-end' }]}>
                <Text style={{ fontSize: 8.5, color: C.copper, fontWeight: 600, marginBottom: 3 }}>{n}.</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>

      {/* 4 · Gegenteile */}
      <Page
        size='A4'
        style={s.page}>
        <Footer />
        <Text style={s.eyebrow}>Erst nach dem eigenen Versuch lesen</Text>
        <Text style={s.h2}>Mögliche Gegenteile</Text>
        <Text style={[s.lead, { marginBottom: 18 }]}>
          Meine Vorschläge – keine neuen Sätze zum Auswendiglernen, sondern eine Gegenprobe: Könnte
          das hier genauso wahr sein?
        </Text>
        {mine.map((belief) => (
          <View
            key={belief.id}
            style={{ flexDirection: 'row', paddingVertical: 9, borderBottomWidth: 0.6, borderBottomColor: C.line }}
            wrap={false}>
            <View style={{ width: 3, borderRadius: 2, backgroundColor: C.copper, marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 9, color: C.subtle }}>„{belief.text}“</Text>
              <Text style={{ fontSize: 11.5, fontWeight: 600, marginTop: 3, lineHeight: 1.35 }}>„{belief.opposite}“</Text>
            </View>
          </View>
        ))}
      </Page>

      {/* 5 · Gedanke + Kontakt */}
      <Page
        size='A4'
        style={[s.page, s.dark]}>
        <Rings
          size={520}
          color={C.amber}
          style={{ left: -170, top: -150 }}
        />
        <Brand onDark />
        <View style={{ marginTop: 80, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 300, fontSize: 24, lineHeight: 1.35, textAlign: 'center', maxWidth: 420, color: C.creamOnDark }}>
            „Wer wäre ich, wenn ich aufhören würde zu glauben, dass ich{' '}
            <Text style={{ color: C.amberSoft }}>jemand anderes</Text> sein muss?“
          </Text>
          <Text style={{ fontSize: 10.5, color: C.mutedOnDark, textAlign: 'center', maxWidth: 380, marginTop: 14 }}>
            Manchmal besteht die größte Veränderung nicht darin, etwas Neues zu werden – sondern alte
            Vorstellungen loszulassen, wer wir angeblich sein müssen.
          </Text>
        </View>

        <View
          style={{ marginTop: 70, flexDirection: 'row', backgroundColor: '#3a2618', borderRadius: 14, padding: 20, borderWidth: 0.8, borderColor: '#5a4030' }}
          wrap={false}>
          <Image
            src={`${window.location.origin}/images-nlp/pdf-portrait.jpg`}
            style={{ width: 130, height: 130, borderRadius: 10, objectFit: 'cover' }}
          />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Text style={[s.eyebrow, { color: C.amberSoft }]}>Lass uns darüber sprechen</Text>
            <Text style={{ fontSize: 17, fontWeight: 600, marginTop: 6, color: C.creamOnDark }}>{OWNER.name}</Text>
            <Text style={{ fontSize: 9.5, color: C.mutedOnDark, marginTop: 2 }}>
              Life Coaching für Unternehmer · Potsdam, Berlin und online
            </Text>
            <Text style={{ fontSize: 9.5, color: C.mutedOnDark, marginTop: 10 }}>
              Die hartnäckigsten Glaubenssätze fühlen sich wie Tatsachen an. Im Coaching untersuchen
              wir sie gemeinsam. Das Erstgespräch ist kostenlos.
            </Text>
            <View style={{ marginTop: 12 }}>
              <Link
                src={`mailto:${OWNER.emailCoaching}`}
                style={{ fontSize: 10, color: C.amber, textDecoration: 'none' }}>
                {OWNER.emailCoaching}
              </Link>
              <Link
                src={absoluteUrl('/coaching#kontakt')}
                style={{ fontSize: 10, color: C.amber, textDecoration: 'none', marginTop: 2 }}>
                heinemann.berlin/coaching
              </Link>
              <Text style={{ fontSize: 9, color: C.mutedOnDark, marginTop: 4 }}>
                {OWNER.street} · {OWNER.postalCode} {OWNER.city}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ position: 'absolute', left: 52, right: 52, bottom: 36 }}>
          <Text style={{ fontSize: 7.5, color: C.mutedOnDark, lineHeight: 1.45 }}>
            Diese Auswertung ist eine Anregung zur Selbstreflexion und ersetzt keine Therapie. Wenn
            es dir gerade sehr schlecht geht: Telefonseelsorge, rund um die Uhr und kostenfrei, 0800
            111 0 111 oder 0800 111 0 222.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: C.copper, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
        <Text style={{ fontSize: 9, fontWeight: 700, color: C.paper, lineHeight: 1 }}>{n}</Text>
      </View>
      <Text style={{ fontSize: 11, fontWeight: 600 }}>{title}</Text>
    </View>
  );
}
