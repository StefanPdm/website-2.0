import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton, SecondaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import { MotifInsight } from '@/app/coaching/components/Motifs';
import PostActions from '@/app/coaching/components/PostActions';
import { dailyPosts, postSrc } from '@/app/coaching/daily-posts';

/**
 * Alle täglichen NLP-Impulse als Text (seit 2026-11) – die Galerie auf
 * /coaching zeigt sie als Bilder, hier stehen die Sätze lesbar für Menschen,
 * Suchmaschinen und Sprachmodelle. Quelle: daily-posts.ts (Alt-Text = Satz).
 */
const PATH = '/coaching/impulse';

const title = `${dailyPosts.length} NLP-Impulse – tägliche Gedanken aus meinem WhatsApp-Status`;
const description = `Jeden Tag ein Gedanke, der hängen bleibt: ${dailyPosts.length} Impulse von Life Coach Stefan Heinemann aus Potsdam – über Veränderung, Glaubenssätze, Kontrolle, Beziehung und Glück. Zum Lesen, Teilen und Speichern.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'NLP Impulse',
    'Gedanken für jeden Tag',
    'Zitate Veränderung',
    'Impulse Persönlichkeitsentwicklung',
    'WhatsApp Status Sprüche',
    'Life Coaching Potsdam',
    'Coaching Berlin',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title,
    description,
    url: PATH,
    type: 'article',
    locale: 'de_DE',
    siteName: 'Stefan Heinemann Coaching',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function ImpulsePage() {
  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Impulse',
          about: 'Persönlichkeitsentwicklung',
          texts: dailyPosts.map((post) => post.alt),
        }}
      />
      <article className='relative z-10'>
        {/* Kopfbereich */}
        <section className='relative overflow-hidden border-b border-border px-4 pt-40 pb-16 md:pt-48'>
          <MotifInsight className='pointer-events-none absolute -right-20 top-24 h-96 w-96 opacity-[0.07]' />
          <div className='container mx-auto max-w-4xl'>
            <nav
              aria-label='Brotkrumen'
              className='mb-8 flex flex-wrap items-center gap-2 text-xs text-(--muted)'>
              <Link
                href='/'
                className='transition hover:text-(--text)'>
                Start
              </Link>
              <span aria-hidden='true'>/</span>
              <Link
                href='/coaching'
                className='transition hover:text-(--text)'>
                Coaching
              </Link>
              <span aria-hidden='true'>/</span>
              <span className='text-(--text)'>Impulse</span>
            </nav>

            <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
              Mein WhatsApp-Status
            </p>
            <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
              {dailyPosts.length} Gedanken, die hängen bleiben
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              Jeden Tag teile ich in meinem WhatsApp-Status einen neuen NLP-Impuls – über
              Veränderung, Glaubenssätze, Kontrolle, Beziehung und Glück. Hier stehen alle zum
              Nachlesen. Teile sie, kopiere sie, speichere sie: Genau dafür sind sie da.
            </p>
            <ContentDate path={PATH} />
            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <SecondaryButton href='/coaching#impulse-taeglich'>Als Galerie ansehen</SecondaryButton>
            </div>
          </div>
        </section>

        {/* Alle Impulse */}
        <section className='px-4 py-16 sm:py-20'>
          <ol className='container mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {dailyPosts.map((post, index) => (
              <li
                key={post.slug}
                id={post.slug}
                className='flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-strong shadow-[0_10px_40px_var(--card-shade)]'>
                <figure className='flex flex-1 flex-col'>
                  <div className='relative aspect-4/5 overflow-hidden bg-[#0d0805]'>
                    <Image
                      src={postSrc(post.slug)}
                      alt=''
                      fill
                      sizes='(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw'
                      className='object-cover object-top'
                    />
                  </div>
                  <figcaption className='flex flex-1 flex-col p-5'>
                    <p className='text-xs font-semibold tracking-[0.2em] text-accent-soft'>
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <blockquote className='mt-2 flex-1 text-base font-semibold leading-snug text-(--text)'>
                      {post.alt}
                    </blockquote>
                    <div className='mt-5'>
                      <PostActions
                        post={post}
                        compact
                      />
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </section>

        {/* Abschluss */}
        <section className='border-t border-border px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-3xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Ein Satz kann etwas anstoßen. Ein Gespräch kann es verändern.
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-(--muted)'>
              Wenn dich ein Impuls nicht mehr loslässt, lass uns darüber sprechen – in Potsdam, in
              Berlin oder online. Das Erstgespräch ist kostenlos.
            </p>
            <div className='mt-8 flex justify-center'>
              <PrimaryButton
                href='/coaching#kontakt'
                className='w-full sm:w-auto'>
                Erstgespräch vereinbaren
              </PrimaryButton>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
