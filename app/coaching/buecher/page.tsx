import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, ExternalLink } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import HeroPicture from '@/app/coaching/components/HeroPicture';
import {
  allBooks,
  authorLine,
  bookGroups,
  coverPath,
  type Book,
} from '@/app/coaching/buecher/data';

const PATH = '/coaching/buecher';

/** Cover nur zeigen, wenn die Datei zur Bauzeit vorhanden ist – sonst Icon. */
function hasCover(book: Book) {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', coverPath(book)));
  } catch {
    return false;
  }
}

const title = 'Buchempfehlungen – Haltung, Sinn und Beziehung für Unternehmer';
const description = `${allBooks.length} Bücher, die Life Coach Stefan Heinemann aus Potsdam selbst geprägt haben – von Jens Corssen, Dieter Lange, Tony Robbins, Viktor Frankl, Hermann Hesse und anderen. Jeweils mit ein, zwei Sätzen, warum es sich lohnt.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Buchempfehlungen Persönlichkeitsentwicklung',
    'Bücher für Unternehmer',
    'Jens Corssen Buch',
    'Dieter Lange Buch',
    'Tony Robbins Buch',
    'John Strelecky',
    'Bücher Sinn des Lebens',
    'Life Coaching Potsdam',
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

export default function BuecherPage() {
  return (
    <>
      <ContentPageStructuredData
        page={{
          path: PATH,
          headline: title,
          description,
          shortTitle: 'Bücher',
          about: 'Persönlichkeitsentwicklung',
          books: allBooks,
        }}
      />
      <article className='relative z-10'>
        {/* Kopfbereich: Foto als Bühne */}
        <section className='relative overflow-hidden border-b border-border lg:flex lg:min-h-[86dvh] lg:items-center'>
          <div className='relative h-[62vh] min-h-[360px] lg:absolute lg:inset-0 lg:h-auto'>
            <HeroPicture
              wide={{ src: '/images-nlp/buecher-lesen.webp', width: 1672, height: 941 }}
              tall={{ src: '/images-nlp/buecher-lesen-hoch.webp', width: 900, height: 1125 }}
              alt='Ein Mann sitzt im Sessel und liest vertieft in einem Buch'
              className='object-cover object-[60%_25%] lg:object-[80%_center]'
              priority
            />
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-linear-to-b from-transparent from-55% to-(--bg) lg:bg-linear-to-r lg:from-(--bg) lg:from-25% lg:via-(--bg)/75 lg:via-45% lg:to-transparent lg:to-70%'
            />
          </div>
          <div className='container relative mx-auto -mt-20 max-w-6xl px-4 pb-16 lg:mt-0 lg:pt-40 lg:pb-24'>
            <div className='max-w-xl'>
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
                <span className='text-(--text)'>Bücher</span>
              </nav>

              <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>Lesenswert</p>
              <h1 className='mt-5 text-3xl font-semibold leading-tight text-(--text) sm:text-4xl lg:text-5xl'>
                Bücher, die mich geprägt haben
              </h1>
              <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>
                Kein Ersatz für Veränderung – aber oft der Anstoß dazu. {allBooks.length} Bücher,
                sortiert nach Themen meines Coachings, jeweils mit ein, zwei Sätzen, warum ich sie
                empfehle.
              </p>
              <ContentDate path={PATH} />
            </div>
          </div>
        </section>

        {bookGroups.map((group, index) => (
          <section
            key={group.key}
            className={`px-4 py-14 sm:py-16 ${index % 2 === 1 ? 'border-y border-border bg-(--section-bg-accent)' : ''}`}>
            <div className='container mx-auto max-w-4xl'>
              <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>{group.label}</h2>
              <p className='mt-2 text-sm text-(--muted) sm:text-base'>{group.intro}</p>
              <ul className='mt-8 grid gap-6 md:grid-cols-2'>
                {group.books.map((book) => (
                  <li key={book.title}>
                    <GlassCard className='flex h-full gap-5 p-6'>
                      {hasCover(book) ? (
                        <div className='relative aspect-2/3 w-20 shrink-0 overflow-hidden rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:w-24'>
                          <Image
                            src={coverPath(book)}
                            alt={`Buchcover „${book.title}“ von ${authorLine(book)}`}
                            fill
                            sizes='96px'
                            className='object-cover'
                          />
                        </div>
                      ) : (
                        <BookOpen
                          aria-hidden='true'
                          className='mt-1 h-5 w-5 shrink-0 text-accent'
                        />
                      )}
                      <div>
                        <h3 className='text-lg font-semibold leading-snug text-(--text)'>
                          {book.title}
                          {book.subtitle && (
                            <span className='block text-sm font-normal text-(--muted)'>
                              {book.subtitle}
                            </span>
                          )}
                        </h3>
                        <p className='mt-1 text-xs uppercase tracking-[0.2em] text-accent-soft'>
                          {authorLine(book)}
                        </p>
                        <p className='mt-1 text-xs text-(--muted)'>
                          {book.publisherUrl ? (
                            <a
                              href={book.publisherUrl}
                              target='_blank'
                              rel='noopener'
                              className='inline-flex items-center gap-1 rounded underline-offset-4 hover:text-(--text) hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                              Verlag: {book.publisher}
                              <ExternalLink
                                aria-hidden='true'
                                className='h-3 w-3'
                              />
                              <span className='sr-only'>
                                (öffnet die Verlagsseite in neuem Tab)
                              </span>
                            </a>
                          ) : (
                            <>Verlag: {book.publisher}</>
                          )}
                        </p>
                        <p className='mt-3 text-sm leading-relaxed text-(--muted)'>{book.why}</p>
                        {book.related && (
                          <Link
                            href={book.related.href}
                            className='mt-3 inline-block rounded text-sm text-accent underline underline-offset-4 hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'>
                            {book.related.label} →
                          </Link>
                        )}
                      </div>
                    </GlassCard>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className='border-t border-border px-4 py-16 sm:py-24'>
          <div className='container mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16'>
            <div className='relative aspect-16/9 overflow-hidden rounded-3xl border border-card-border shadow-[0_30px_70px_var(--card-shade)]'>
              <Image
                src='/images-nlp/buecher-nachdenken.webp'
                alt='Eine Frau hält ein aufgeschlagenes Buch und schaut nachdenklich auf'
                fill
                sizes='(min-width: 1024px) 560px, 100vw'
                className='object-cover object-[70%_center]'
              />
            </div>
            <div className='text-center lg:text-left'>
              <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
                Lesen ist der Anfang. Umsetzen der Unterschied.
              </h2>
              <p className='mt-4 text-sm text-(--muted) sm:text-base'>
                Wenn du beim Lesen merkst, dass ein Thema dich nicht loslässt: Lass uns darüber
                sprechen.
              </p>
              <div className='mt-8 flex justify-center lg:justify-start'>
                <PrimaryButton
                  href='/coaching#kontakt'
                  className='w-full sm:w-auto'>
                  Kostenloses Erstgespräch
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
