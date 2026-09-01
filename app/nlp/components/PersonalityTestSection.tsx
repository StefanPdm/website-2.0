import GlassCard from '@/components/GlassCard';
import { PrimaryButton } from '@/app/nlp/components/Buttons';
import { MotifAction, MotifInsight, MotifRelation } from '@/app/nlp/components/Motifs';
import { dimensions, questions } from '@/app/nlp/persoenlichkeitstest/data';

/**
 * Anteaser für den Persönlichkeitstest.
 *
 * Bewusst **Server Component**: reiner Lesestoff mit einem Link. Der Test
 * selbst liegt auf eigener Route und lädt sein JavaScript erst dort — die
 * Startseite von Welt A bleibt dadurch unverändert leicht.
 *
 * Die drei Motive stehen hier anders als sonst **vorn** in den Karten statt
 * als Wasserzeichen dahinter: Die Sektion soll auffallen, und die Bereiche
 * sind der eigentliche Inhalt, nicht Dekoration um Text herum.
 */

const areas = [
  { key: 'beziehung', Motif: MotifRelation, teaser: 'Du spürst schnell, wie es anderen geht.' },
  { key: 'erkennen', Motif: MotifInsight, teaser: 'Du willst verstehen, bevor du entscheidest.' },
  { key: 'handeln', Motif: MotifAction, teaser: 'Du kommst schnell ins Tun und gestaltest.' },
] as const;

export default function PersonalityTestSection() {
  return (
    <section
      id='persoenlichkeitstest'
      className='relative flex min-h-[70dvh] flex-col items-center justify-center border-y border-(--border) bg-(--section-bg-accent) py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Psychografie nach Dietmar Friedmann
          </p>
          <h2 className='mt-5 text-3xl font-semibold text-(--text) sm:text-4xl'>
            Persönlichkeitstest
          </h2>
          <p className='mt-4 text-base leading-relaxed text-(--muted) sm:text-lg'>
            Beziehung, Erkennen, Handeln — jeder nutzt alle drei. Aber einer davon fällt dir
            leichter als die anderen, und der prägt still, wie du entscheidest, streitest und dich
            entwickelst. {questions.length} Fragen genügen, um ihn sichtbar zu machen.
          </p>
        </div>

        <div className='mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3'>
          {areas.map(({ key, Motif, teaser }) => (
            <GlassCard
              key={key}
              className='flex h-full flex-col items-center p-7 text-center'>
              <Motif className='h-20 w-20' />
              <h3 className='mt-5 text-lg font-semibold text-(--text)'>{dimensions[key].area}</h3>
              <p className='mt-1 text-xs uppercase tracking-[0.2em] text-(--muted)'>
                {dimensions[key].type}
              </p>
              <p className='mt-4 text-sm leading-relaxed text-(--muted)'>{teaser}</p>
            </GlassCard>
          ))}
        </div>

        <div className='mt-12 flex flex-col items-center gap-4'>
          <PrimaryButton href='/nlp/persoenlichkeitstest'>Test starten</PrimaryButton>
          <p className='text-xs text-(--muted)'>
            {questions.length} Fragen · ca. 5 Minuten · kostenlos, ohne Anmeldung
          </p>
        </div>
      </div>
    </section>
  );
}
