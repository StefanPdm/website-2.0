import Image from 'next/image';

import GlassCard from '@/components/GlassCard';
import {
  MotifAction,
  MotifClarity,
  MotifEvidence,
  MotifInsight,
  MotifRelation,
} from '@/app/coaching/components/Motifs';
import { PrimaryButton } from '@/app/coaching/components/Buttons';
import { mechanisms } from '@/app/coaching/wissenschaft/data';

/** Die fünf am besten belegten Mechanismen – als Beleg statt bloßer Behauptung. */
const topMechanisms = mechanisms.filter((m) => m.rating === 5).slice(0, 5);

/**
 * Die vier Säulen des Coaching-Konzepts.
 *
 * `source` beschreibt den Bezug so, wie er belegbar ist – nicht stärker.
 * Ausgebildet: NLP (DVNLP). Dieter Lange: Lebensschule über Greator.
 * Aus Büchern und Vorträgen: Jens Corssen. Tony Robbins: „Unleash the Power
 * Within“ 2025 besucht; Certification-Ausbildung im Robbins Greator Coaching
 * Program gebucht (Start 21.01.2027, Stand 2026-11). Muss zur Liste
 * „Ausbildungen“ in AboutSection passen.
 * PFLEGEN: nach Programmstart „Ab Januar 2027 vertiefe ich“ → „Derzeit vertiefe
 * ich“; einen Titel („Certified Coach according to the Robbins Greator Coaching
 * Certification“) erst nach bestandener Prüfung nennen – die Practitioner-Stufe
 * berechtigt laut Anbieter zu keinem Coaching-Titel.
 * Vor jeder Änderung prüfen, ob der Wortlaut noch stimmt (§ 5 UWG) –
 * und „Tony Robbins Coaching“ nie als eigene Leistung bezeichnen.
 */
const pillars = [
  {
    key: 'haltung',
    overline: 'Psychologie · Jens Corssen',
    title: 'Haltung',
    claim: 'Gestalter statt Opfer',
    text: 'Nicht die Umstände entscheiden, sondern deine Antwort darauf. Mit Jens Corssens Bild vom Selbst-Entwickler schauen wir, wo du dich von Situationen treiben lässt – und wo du wieder selbst entscheidest.',
    points: [
      'Selbstverantwortung statt Schuldfrage',
      'Annehmen, was ist – dann handeln',
      'Ärger als Signal, nicht als Chef',
    ],
    source: 'Geprägt von seinen Büchern und Vorträgen',
    Motif: MotifInsight,
  },
  {
    key: 'sinn',
    overline: 'Lebensschule · Dieter Lange',
    title: 'Sinn',
    claim: 'Erst dich führen, dann andere',
    text: 'Viele Unternehmer haben viel erreicht – und fragen sich trotzdem, wofür. Aus Dieter Langes Lebensschule bringe ich die Frage mit, die vor jedem Ziel steht: Wer willst du sein?',
    points: [
      'Werte und Lebensrichtung klären',
      'Selbstführung vor Mitarbeiterführung',
      'Gelassenheit statt Dauerdruck',
    ],
    source: 'Lebensschule bei Dieter Lange (Greator)',
    Motif: MotifClarity,
  },
  {
    key: 'werkzeug',
    overline: 'Methode · NLP',
    title: 'Werkzeug',
    claim: 'Muster sichtbar machen',
    text: 'NLP ist mein Handwerkszeug. Wir machen sichtbar, wie Denken, Sprache und innere Bilder dein Verhalten steuern – und verändern genau dort, wo es hakt. Pragmatisch und orientiert an dem, was die Forschung stützt.',
    points: [
      'Situationen neu bewerten (Reframing)',
      'Glaubenssätze prüfen und lösen',
      'Ziele, die sich stimmig anfühlen',
    ],
    source: 'DVNLP-zertifiziert',
    Motif: MotifRelation,
  },
  {
    key: 'energie',
    overline: 'Energie · Tony Robbins',
    title: 'Energie',
    claim: 'Vom Wissen ins Handeln',
    text: 'Einsicht allein verändert nichts. Bei „Unleash the Power Within“ 2025 habe ich live erlebt, wie stark Körper, Fokus und Sprache den inneren Zustand bestimmen. Ab Januar 2027 vertiefe ich sein Coaching-System in der Ausbildung im Robbins Greator Coaching Program.',
    points: [
      'Zustand steuern über Körper, Fokus, Sprache',
      'Die Bedürfnisse hinter deinen Mustern erkennen',
      'Aus einem „Sollte“ ein „Muss“ machen',
    ],
    source: 'Unleash the Power Within 2025 · Certification-Ausbildung Robbins Greator Coaching Program ab 01/2027',
    Motif: MotifAction,
  },
];

/** Wie die Säulen ineinandergreifen – ein Satz je Säule. */
const interplay = [
  'Haltung gibt die Richtung.',
  'Sinn gibt den Grund.',
  'NLP gibt das Werkzeug.',
  'Energie bringt es in Bewegung.',
];

export default function ApproachSection() {
  return (
    <section
      id='ansatz'
      className='relative flex min-h-[60dvh] flex-col items-center justify-center border-y border-border py-20'>
      <div className='container mx-auto flex flex-col items-center justify-center px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Mein Coaching-Ansatz
          </p>
          <h2 className='mt-4 text-3xl font-semibold text-(--text) sm:text-4xl'>
            Vier Schulen. Ein Ziel.
          </h2>
          <p className='mt-4 text-base text-(--muted) sm:text-lg'>
            Du führst ein Unternehmen. Hier geht es darum, wie du dich selbst führst. Dafür verbinde
            ich vier Ansätze, die sich ergänzen – damit Veränderung nicht im Kopf stecken bleibt.
          </p>
        </div>

        <div className='mt-12 grid w-full max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {pillars.map(({ key, overline, title, claim, text, points, source, Motif }) => (
            <GlassCard
              key={key}
              className='relative flex h-full flex-col overflow-hidden p-6'>
              <Motif className='pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-[0.07]' />
              <p className='relative text-[11px] uppercase tracking-[0.2em] text-accent-soft'>
                {overline}
              </p>
              <h3 className='relative mt-3 text-lg font-semibold text-(--text)'>
                {title}
                <span className='block text-base font-normal text-(--muted)'>{claim}</span>
              </h3>
              <p className='relative mt-4 text-sm leading-relaxed text-(--muted)'>{text}</p>
              <ul className='relative mt-5 space-y-2'>
                {points.map((point) => (
                  <li
                    key={point}
                    className='flex gap-2 text-sm text-(--text)'>
                    <span
                      aria-hidden='true'
                      className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <div className='relative mt-auto pt-5'>
                <p className='border-t border-border pt-4 text-xs text-(--muted)'>{source}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <p className='mx-auto mt-10 max-w-3xl text-center text-base text-(--text) sm:text-lg'>
          {interplay.join(' ')}
        </p>

        {/* Die Säulen in Aktion – echtes Foto (KI-verbessert), §12: WebP < 500 KB. */}
        <figure className='mx-auto mt-14 w-full max-w-6xl'>
          <div className='relative aspect-3/2 overflow-hidden rounded-3xl border border-border sm:aspect-21/9'>
            <Image
              src='/images-nlp/coaching-workshop.webp'
              alt='Stefan Heinemann erklärt in einem Workshop vor einer kleinen Gruppe am Flipchart'
              fill
              sizes='(min-width: 1152px) 1152px, 100vw'
              className='object-cover object-[50%_30%]'
            />
          </div>
          <figcaption className='mt-3 text-center text-xs text-(--muted)'>
            Im Workshop: Haltung, Sinn, Werkzeug und Energie – nicht als Theorie, sondern im
            Gespräch.
          </figcaption>
        </figure>

        {/*
          Persönliche Haltung und Evidenz nebeneinander: Die linke Karte
          beantwortet „Warum ich?", die rechte „Warum wirkt das?".
        */}
        <div className='mx-auto mt-16 grid w-full max-w-6xl gap-6 lg:grid-cols-2'>
          <GlassCard className='relative flex h-full flex-col overflow-hidden p-7 sm:p-9'>
            <span
              aria-hidden='true'
              className='absolute inset-y-0 left-0 w-1 bg-linear-to-b from-accent to-accent-2'
            />
            <MotifClarity className='pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.13]' />
            <p className='relative text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Persönlich
            </p>
            <h3 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
              Was Coaching für mich bedeutet
            </h3>
            <div className='mt-6 space-y-5 text-(--muted)'>
              <p className='text-base leading-relaxed sm:text-lg'>
                Coaching ist für mich weit mehr als eine Sammlung von Techniken – es ist eine
                positive Haltung zum Leben.
              </p>
              <p className='text-sm leading-relaxed sm:text-base'>
                Es bedeutet, bewusst wahrzunehmen, statt vorschnell zu urteilen; zu wählen, statt
                nur zu reagieren, und Verantwortung für das eigene Leben zu übernehmen. Für mich
                heißt das, den Angst- und Überlebensmodus zu verlassen und mein Leben aus Freiheit,
                Akzeptanz und Liebe heraus zu gestalten – mit dem Wissen, dass mein Glück und meine
                Erfüllung nicht im Außen entstehen, sondern in mir selbst.
              </p>
              <p className='text-sm leading-relaxed sm:text-base'>
                Dazu gehört auch anzuerkennen, dass Veränderung und Unsicherheit keine Ausnahme
                sind, sondern zum Wesen des Lebens gehören. Es geht nicht darum, durch Kontrolle
                eine trügerische Sicherheit zu erschaffen, sondern Vertrauen in mich selbst und in
                meine Fähigkeit zu entwickeln, mit dem Unbekannten umzugehen.
              </p>
              <p className='text-sm leading-relaxed sm:text-base'>
                So wird Veränderung nicht länger zu etwas, das ich fürchten oder vermeiden muss,
                sondern zu einer Einladung, zu wachsen, neue Möglichkeiten zu entdecken und mein
                Leben selbstbestimmt zu gestalten.
              </p>
            </div>
          </GlassCard>

          <GlassCard className='relative flex h-full flex-col overflow-hidden p-7 sm:p-9'>
            <span
              aria-hidden='true'
              className='absolute inset-y-0 left-0 w-1 bg-linear-to-b from-accent-2 to-accent'
            />
            <MotifEvidence className='pointer-events-none absolute -right-14 -top-14 h-64 w-64 opacity-[0.15]' />
            <p className='relative text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Wissenschaft
            </p>
            <h3 className='mt-4 text-2xl font-semibold text-(--text) sm:text-3xl'>
              Warum NLP wirkt
            </h3>
            <div className='mt-6 space-y-5 text-(--muted)'>
              <p className='text-base leading-relaxed sm:text-lg'>
                NLP als geschlossenes Theoriegebäude ist wissenschaftlich nicht bestätigt. Die
                psychologischen Mechanismen dahinter sind es weitgehend schon.
              </p>
              <p className='text-sm leading-relaxed sm:text-base'>
                Der DVNLP hat 2026 den Forschungsstand von 2016 bis 2026 ausgewertet. Das Ergebnis:
                Was im NLP Reframing heißt, erforscht die Psychologie als kognitive Neubewertung —
                einer der am besten replizierten Befunde der affektiven Neurowissenschaft.
                Perspektivwechsel, Zielarbeit und Ressourcenaktivierung stehen ähnlich solide da.
              </p>
              <p className='text-sm leading-relaxed sm:text-base'>
                Ebenso klar ist, was die Forschung <em>nicht</em> stützt: Augenbewegungen als
                Hinweis auf Sinneskanäle, feste „Wahrnehmungstypen“, Rapport durch bewusstes
                Spiegeln. Diese Annahmen gehören überarbeitet, nicht verteidigt.
              </p>
              <p className='text-sm leading-relaxed sm:text-base'>
                Genau deshalb arbeite ich mit dem, was trägt — und sage offen, wo die Belege enden.
              </p>
            </div>

            {/* Evidenzleiste als kompakter Beleg statt bloßer Behauptung */}
            <ul className='relative mt-7 space-y-2 border-t border-border pt-5'>
              {topMechanisms.map((item) => (
                <li
                  key={item.nlp}
                  className='flex items-baseline justify-between gap-3 text-xs'>
                  <span className='text-(--text)'>{item.nlp}</span>
                  <span
                    className='shrink-0 tracking-[0.2em] text-accent'
                    aria-label={`Evidenz ${item.rating} von 5`}>
                    <span aria-hidden='true'>
                      {'★'.repeat(item.rating)}
                      {'☆'.repeat(5 - item.rating)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className='relative mt-auto flex flex-wrap gap-3 pt-7'>
              <PrimaryButton href='/coaching/wissenschaft'>Forschungsstand ansehen</PrimaryButton>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
