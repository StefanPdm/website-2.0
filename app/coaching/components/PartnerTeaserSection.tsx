import { PrimaryButton } from '@/app/coaching/components/Buttons';
import HeroPicture from '@/app/coaching/components/HeroPicture';

/**
 * Teaser Partnerschaftstest (seit 2026-11) – führt zu den 5 Fragen unter
 * /coaching/partnerschaftstest. Hell: davor die dunkle Glaubenssatz-Insel,
 * danach der Ablauf (ebenfalls dunkel).
 *
 * Foto als Bühne (seit 2026-11-08, Versuch): das Paar vor der warmen Wand,
 * Text links. Das Foto blendet per Maske in den Grund aus (`.partner-teaser__photo`),
 * so entsteht keine Kante zum strukturierten Seitenhintergrund. Mobil
 * Hochformat oben, Text darunter.
 * Die frühere Fassung mit der „Lebens-partner/lektion“-Scheibe liegt in
 * Commit 77efb83.
 */
const points = [
  'Trägt dich dein Zuhause, wenn es im Business stürmt?',
  'Gibt dir deine Beziehung Kraft – oder kostet sie welche?',
  'Fünf Fragen, ehrlich beantwortet. Die Antwort spürst du dann selbst.',
];

export default function PartnerTeaserSection() {
  return (
    <section
      id='partnerschaft'
      className='relative overflow-hidden border-y border-border lg:flex lg:min-h-[80dvh] lg:items-center'>
      <div className='partner-teaser__photo relative h-[56vh] min-h-[340px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2 xl:w-[66%]'>
        <HeroPicture
          wide={{ src: '/images-nlp/partnerschaft-paar.webp', width: 1672, height: 941 }}
          tall={{ src: '/images-nlp/partnerschaft-paar-hoch.webp', width: 900, height: 1125 }}
          alt='Ein Paar sitzt eng beieinander, sie hält seinen Arm und sieht ihn zugewandt an'
          className='object-cover object-[50%_25%] lg:object-[80%_center]'
        />
      </div>

      <div className='container relative mx-auto -mt-16 max-w-6xl px-4 pb-20 lg:mt-0 lg:py-24'>
        <div className='max-w-xl text-center lg:max-w-md lg:text-left xl:max-w-xl'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Partnerschaftstest</p>
          <h2 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
            Lebenspartner – oder die nächste <span className='text-accent'>Lebenslektion</span>?
          </h2>
          <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
            Gerade im Business brauchst du jemanden zu Hause, der dich unterstützt und dir Kraft
            gibt. Mit fünf Fragen findest du heraus, ob du diesen Menschen an deiner Seite hast.
          </p>
          <ul className='mx-auto mt-8 max-w-md space-y-3 text-left lg:mx-0'>
            {points.map((point) => (
              <li
                key={point}
                className='flex items-start gap-3'>
                <span
                  aria-hidden='true'
                  className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent'
                />
                <span className='text-sm leading-relaxed text-(--muted) sm:text-base'>{point}</span>
              </li>
            ))}
          </ul>
          <div className='mt-10 flex flex-col items-center gap-3 lg:items-start'>
            <PrimaryButton
              href='/coaching/partnerschaftstest'
              className='w-full sm:w-auto'>
              Zu den 5 Fragen
            </PrimaryButton>
            <p className='text-xs text-(--subtle)'>Selbsttest · kostenlos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
