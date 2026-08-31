'use client';

import GlassCard from '@/components/GlassCard';
import { PrimaryButton, SecondaryButton } from '@/app/nlp/components/Buttons';
import { entryOffer, mentoringOffers, sessionOffers, type CoachingOffer } from '@/app/nlp/pricing';

/**
 * Preisübersicht in zwei Ebenen.
 *
 * Zuvor standen alle Angebote gleichrangig in einer Vierer-Reihe. Damit las
 * sich das Mentoring wie ein weiteres Sessionpaket – und lud dazu ein,
 * Sessionpreise über Kategoriegrenzen hinweg zu vergleichen.
 *
 * Sessions und Pakete sind Kontingente: Der Preis je Session ist die
 * relevante Größe und wird deshalb ausgewiesen. Mentoring ist eine
 * Begleitung mit Sessions, Support und Roadmap – dort wäre ein Sessionpreis
 * eine irreführende Kennzahl.
 */

function OfferCard({ offer }: { offer: CoachingOffer }) {
  const isMentoring = offer.group === 'mentoring';

  return (
    <GlassCard
      className={`relative flex h-full flex-col p-6 text-left ${
        offer.highlight
          ? 'border-2 ring-1 ring-(--accent)/45 shadow-[0_0_60px_var(--glow-strong)]'
          : 'border'
      }`}>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <span
            className={`inline-flex items-center rounded-full border border-(--accent)/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] ${
              isMentoring ? 'bg-(--accent)/10 font-semibold text-accent' : 'bg-white/5 text-white/70'
            }`}>
            {isMentoring ? 'Mentoring' : 'Session'}
          </span>
          <p className='mt-3 text-xs uppercase tracking-[0.3em] text-white/60'>{offer.duration}</p>
          <h4 className='mt-2 text-lg font-semibold text-white'>{offer.title}</h4>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <span className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg'>
            <span aria-hidden='true'>{offer.icon}</span>
          </span>
          {offer.highlight && (
            <span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-(--border-strong) bg-(--accent) px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-black/90'>
              Beliebt
            </span>
          )}
        </div>
      </div>

      <div className='mt-6 text-3xl font-semibold text-white'>{offer.price}</div>
      <p className='mt-2 text-xs text-white/60'>
        inkl. MwSt.
        {offer.perSession && <span className='text-accent'> · {offer.perSession}</span>}
      </p>

      <ul className='mt-5 flex-1 space-y-3 text-sm text-white/75'>
        {offer.bullets.map((bullet) => (
          <li
            key={bullet}
            className='flex gap-2'>
            <span
              aria-hidden='true'
              className='text-accent'>
              •
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <p className='mt-6 text-xs text-white/60'>{offer.note}</p>

      {offer.highlight ? (
        <PrimaryButton
          href='#kontakt'
          className='mt-6 w-full'>
          Jetzt anfragen
        </PrimaryButton>
      ) : (
        <SecondaryButton
          href='#kontakt'
          className='mt-6 w-full'>
          Beratung sichern
        </SecondaryButton>
      )}
    </GlassCard>
  );
}

export default function PriceTableSection() {
  return (
    <section
      id='preise'
      className='relative flex min-h-[80dvh] flex-col items-center justify-center bg-(--section-bg-accent) py-20 backdrop-blur-2xl'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-semibold text-white sm:text-4xl'>Preisübersicht</h2>
          <p className='mt-4 text-base text-white/70 sm:text-lg'>
            Klar, transparent, ohne versteckte Kosten. Alle Preise inklusive Mehrwertsteuer.
          </p>
        </div>

        {/*
          Ebene 0: Einstieg.
          Bewusst als breite Zeile über den Paketen statt als fünfte Karte im
          Raster – das Angebot soll die Hürde senken, nicht in der Reihe
          untergehen. Remote-only ist keine Einschränkung, sondern der Grund
          für den niedrigeren Preis, und wird deshalb sichtbar benannt.
        */}
        <div className='mx-auto mt-14 max-w-5xl'>
          <GlassCard className='relative overflow-hidden p-6 sm:p-8'>
            <span
              aria-hidden='true'
              className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent to-accent-2'
            />
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
              <div className='max-w-2xl'>
                <span className='inline-flex items-center rounded-full border border-(--accent)/40 bg-(--accent)/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-accent'>
                  Einstieg
                </span>
                <h3 className='mt-4 text-xl font-semibold text-white sm:text-2xl'>
                  {entryOffer.title}
                </h3>
                <p className='mt-2 text-xs uppercase tracking-[0.2em] text-white/60'>
                  {entryOffer.duration}
                </p>
                <ul className='mt-5 space-y-2 text-sm text-white/75'>
                  {entryOffer.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className='flex gap-2'>
                      <span
                        aria-hidden='true'
                        className='text-accent'>
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='shrink-0 md:text-right'>
                <div className='text-4xl font-semibold text-white'>{entryOffer.price}</div>
                <p className='mt-2 text-xs text-white/60'>inkl. MwSt.</p>
                <PrimaryButton
                  href='#kontakt'
                  className='mt-5 w-full md:w-auto'>
                  Termin anfragen
                </PrimaryButton>
              </div>
            </div>
            <p className='mt-6 border-t border-border pt-4 text-xs text-white/60'>
              {entryOffer.note} Das kostenlose Erstgespräch (ca. 15 Min.) bleibt davon unberührt —
              dort klären wir nur, ob wir zusammenpassen.
            </p>
          </GlassCard>
        </div>

        {/* Ebene 1: Sessions und Kontingente */}
        <div className='mt-14'>
          <div className='mx-auto max-w-3xl text-center'>
            <h3 className='text-xl font-semibold text-white'>Einzelsessions & Pakete</h3>
            <p className='mt-3 text-sm text-white/70'>
              Du bestimmst das Tempo. Je größer das Kontingent, desto günstiger die einzelne
              Session.
            </p>
          </div>
          <div className='mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
            {sessionOffers.map((offer) => (
              <OfferCard
                key={offer.title}
                offer={offer}
              />
            ))}
          </div>
        </div>

        {/* Ebene 2: Begleitung */}
        <div className='mt-16'>
          <div className='mx-auto max-w-3xl text-center'>
            <h3 className='text-xl font-semibold text-white'>Mentoring</h3>
            <p className='mt-3 text-sm text-white/70'>
              Kein Sessionpaket, sondern durchgehende Begleitung: feste Sessions, dazu Support
              zwischen den Terminen und eine Roadmap, an der wir gemeinsam entlangarbeiten.
            </p>
          </div>
          <div className='mt-8 grid gap-6 md:grid-cols-2'>
            {mentoringOffers.map((offer) => (
              <OfferCard
                key={offer.title}
                offer={offer}
              />
            ))}
          </div>
        </div>

        <p className='mx-auto mt-12 max-w-3xl text-center text-xs text-white/50'>
          Welche Variante zu dir passt, klären wir im kostenlosen Erstgespräch — auch, ob Coaching
          überhaupt das richtige Mittel für dein Anliegen ist.
        </p>
      </div>
    </section>
  );
}
