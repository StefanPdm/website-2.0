import { SecondaryButton } from '@/app/nlp/components/Buttons';
import {
  FORMULA_LEAD,
  FORMULA_PATH,
  FORMULA_TITLE,
  steps,
} from '@/app/nlp/formel-zum-glueck/data';
import { RippleArt } from '@/app/nlp/formel-zum-glueck/FormulaArt';
import FormulaMark from '@/app/nlp/formel-zum-glueck/FormulaMark';

/**
 * Teaser für /nlp/formel-zum-glueck.
 *
 * Steht direkt nach der Erfüllungs-Sektion: Die stellt die Frage nach dem
 * Glück, die Formel liefert ein Werkzeug für den Moment. Ohne Hintergrund-
 * akzent, weil die Preis-Sektion danach akzentuiert ist (Rhythmus §5).
 * Der Link ist sekundär – die Primäraktion der Seite bleibt der Kontakt.
 */
export default function FormulaSection() {
  return (
    <section
      id='formel'
      className='relative flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden py-20'>
      <RippleArt className='pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-40' />
      <div className='container relative mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.3em] text-accent-soft'>
            Eine Technik für den Moment
          </p>
          <h2 className='mt-5 text-3xl font-semibold text-(--text) sm:text-4xl'>
            {FORMULA_TITLE}
          </h2>
          <FormulaMark className='mt-6 text-5xl sm:text-7xl' />
          <p className='mt-6 text-base leading-relaxed text-(--muted) sm:text-lg'>{FORMULA_LEAD}</p>
        </div>

        <ol className='mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step) => (
            <li
              key={step.key}
              className='rounded-2xl border border-border bg-surface p-5 backdrop-blur-md'>
              <p
                aria-hidden='true'
                className='bg-linear-to-br from-accent to-accent-2 bg-clip-text text-3xl font-bold text-transparent'>
                {step.symbol}
                {step.power && <sup className='text-[0.5em]'>{step.power}</sup>}
              </p>
              <h3 className='mt-3 text-sm font-semibold text-(--text)'>{step.title}</h3>
              <p className='mt-1 text-xs leading-relaxed text-(--muted)'>{step.short}</p>
            </li>
          ))}
        </ol>

        <div className='mt-10 flex justify-center'>
          <SecondaryButton href={FORMULA_PATH}>Die Formel Schritt für Schritt →</SecondaryButton>
        </div>
      </div>
    </section>
  );
}
