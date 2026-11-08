import DailyPostsGallery from '@/app/coaching/components/DailyPostsGallery';
import DownloadAllPosts from '@/app/coaching/components/DownloadAllPosts';
import { dailyPosts } from '@/app/coaching/daily-posts';

/**
 * Tägliche NLP-Impulse aus dem WhatsApp-Status (seit 2026-11) – dunkle Insel
 * zwischen „Impulse“ (hell, Akzent) und „Leitfaden“ (hell). Die Posts sind
 * schwarz-gold und brauchen den dunklen Grund als Bühne.
 */
const facts = [
  'Jeden Tag neu',
  `${dailyPosts.length} Impulse zum Durchblättern`,
  'Teilen ausdrücklich erwünscht',
];

export default function DailyPostsSection() {
  return (
    <section
      id='impulse-taeglich'
      aria-labelledby='impulse-taeglich-titel'
      className='tone-dark relative overflow-hidden border-y border-border py-20 sm:py-28'>
      <span
        aria-hidden='true'
        className='dp-glow pointer-events-none absolute left-1/2 top-[58%] h-[560px] w-[min(1100px,160vw)] -translate-x-1/2 -translate-y-1/2'
      />

      <div className='container relative mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Mein WhatsApp-Status
          </p>
          <h2
            id='impulse-taeglich-titel'
            className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
            Jeden Tag ein Gedanke,
            <br />
            <span className='text-accent'>der hängen bleibt.</span>
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
            Jeden Tag teile ich in meinem WhatsApp-Status einen neuen NLP-Impuls. Viele warten
            inzwischen darauf – und schicken ihn weiter. Genau dafür sind sie da: Teile sie, kopiere
            sie, speichere sie. Für deinen Status, für Freunde, für dich.
          </p>
          <ul className='mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-(--subtle)'>
            {facts.map((fact) => (
              <li
                key={fact}
                className='flex items-center gap-2'>
                <span
                  aria-hidden='true'
                  className='h-1 w-1 rounded-full bg-accent'
                />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='relative mt-14'>
        <DailyPostsGallery />
      </div>

      <div className='container relative mx-auto mt-10 px-4'>
        <DownloadAllPosts />
      </div>

    </section>
  );
}
