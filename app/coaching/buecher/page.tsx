import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import { ContentPageStructuredData } from '@/components/StructuredData';
import { PrimaryButton } from '@/app/coaching/components/Buttons';
import ContentDate from '@/app/coaching/components/ContentDate';
import { MotifClarity } from '@/app/coaching/components/Motifs';
import { allBooks, bookGroups, coverPath, type Book } from '@/app/coaching/buecher/data';

const PATH = '/coaching/buecher';

/** Cover nur zeigen, wenn die Datei zur Bauzeit vorhanden ist – sonst Icon. */
function hasCover(book: Book) {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', coverPath(book)));
  } catch {
    return false;
  }
}

const title = 'Buchempfehlungen für Unternehmer – Haltung, Sinn, Entscheidungen';
const description = `${allBooks.length} Bücher, die Life Coach Stefan Heinemann aus Potsdam selbst geprägt haben – von Jens Corssen, Dieter Lange, Tony Robbins, Viktor Frankl und anderen. Jeweils mit einem Satz, warum es sich lohnt.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Buchempfehlungen Persönlichkeitsentwicklung',
    'Bücher für Unternehmer',
    'Jens Corssen Buch',
    'Dieter Lange Buch',
    'Tony Robbins Buch',
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
        <section className='relative overflow-hidden border-b border-border px-4 pt-40 pb-16 md:pt-48'>
          <MotifClarity className='pointer-events-none absolute -right-20 top-24 h-96 w-96 opacity-[0.07]' />
          <div className='container mx-auto max-w-4xl'>
            <nav
              aria-label='Brotkrumen'
              className='mb-8 flex flex-wrap items-center gap-2 text-xs text-(--muted)'>
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
            <p className='mt-6 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg'>
              Kein Ersatz für Veränderung – aber oft der Anstoß dazu. {allBooks.length} Bücher,
              sortiert nach den Säulen meines Coachings, jeweils mit einem Satz, warum ich sie
              empfehle.
            </p>
            <ContentDate path={PATH} />
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
                            alt={`Buchcover „${book.title}“ von ${book.author}`}
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
                        </h3>
                        <p className='mt-1 text-xs uppercase tracking-[0.2em] text-accent-soft'>
                          {book.author}
                        </p>
                        <p className='mt-3 text-sm leading-relaxed text-(--muted)'>{book.why}</p>
                      </div>
                    </GlassCard>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className='border-t border-border px-4 py-16 sm:py-20'>
          <div className='container mx-auto max-w-4xl text-center'>
            <h2 className='text-2xl font-semibold text-(--text) sm:text-3xl'>
              Lesen ist der Anfang. Umsetzen der Unterschied.
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-sm text-(--muted) sm:text-base'>
              Wenn du beim Lesen merkst, dass ein Thema dich nicht loslässt: Lass uns darüber
              sprechen.
            </p>
            <div className='mt-8 flex justify-center'>
              <PrimaryButton
                href='/coaching#kontakt'
                className='w-full sm:w-auto'>
                Kostenloses Erstgespräch
              </PrimaryButton>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
