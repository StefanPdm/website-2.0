'use client';

import { useState } from 'react';

import {
  VAT_NOTE,
  contentSurcharges,
  estimatePrice,
  formatEuro,
  languageSurcharges,
  webServices,
  websiteScopes,
  type ContentState,
  type LanguageCount,
  type WebServiceId,
  type WebsiteScope,
} from '@/app/webdevelopment/pricing';

/**
 * Preis-Kompass: wenige Fragen → Richtwert „ab …“ aus pricing.ts.
 * Alle Staffeln und Aufschläge stehen dort (einzige Preisquelle).
 * Die Antworten verlassen den Browser nicht.
 */

type Option<T extends string> = { value: T; label: string };

const needs: Option<WebServiceId>[] = [
  { value: 'website', label: 'Website oder Landingpage' },
  { value: 'webapp', label: 'Web App oder Kundenportal' },
  { value: 'headless', label: 'Schnittstelle oder Automatisierung' },
  { value: 'ux', label: 'Erst Konzept und Struktur' },
];

const scopeOptions = websiteScopes.map((entry) => ({ value: entry.id, label: entry.label }));
const contentOptions = contentSurcharges.map((entry) => ({ value: entry.id, label: entry.label }));
const languageOptions = languageSurcharges.map((entry) => ({ value: entry.id, label: entry.label }));

const percent = (rate: number) => `+${Math.round(rate * 100)} %`;

function Choice<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-300'>
        {legend}
      </legend>
      <div className='mt-3 flex flex-wrap gap-2'>
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type='button'
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-web ${
                active
                  ? 'border-accent-web/70 bg-accent-web/15 text-white'
                  : 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
              }`}>
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function PriceCompass() {
  const [need, setNeed] = useState<WebServiceId | null>(null);
  const [scope, setScope] = useState<WebsiteScope | null>(null);
  const [content, setContent] = useState<ContentState | null>(null);
  const [languages, setLanguages] = useState<LanguageCount | null>(null);

  const isWebsite = need === 'website';
  const service = webServices.find((entry) => entry.id === need);
  const complete = Boolean(service && content && languages && (!isWebsite || scope));
  const estimate =
    complete && need && content && languages
      ? estimatePrice({ service: need, scope: scope ?? undefined, content, languages })
      : null;

  const contentRate = contentSurcharges.find((entry) => entry.id === content)?.rate ?? 0;
  const languageRate = languageSurcharges.find((entry) => entry.id === languages)?.rate ?? 0;
  const scopeEntry = websiteScopes.find((entry) => entry.id === scope);
  const n = (i: number) => (isWebsite ? i + 1 : i);

  return (
    <div className='rounded-2xl border border-white/15 bg-[#030a13]/70 p-6 md:p-8'>
      <h3 className='text-lg font-semibold text-white'>Preis-Kompass</h3>
      <p className='mt-1 text-sm text-slate-300'>
        Ein paar Fragen, ein ehrlicher Richtwert. Deine Antworten bleiben in deinem Browser.
      </p>

      <div className='mt-6 grid gap-6'>
        <Choice
          legend='1 · Was brauchst du?'
          options={needs}
          value={need}
          onChange={setNeed}
        />
        {isWebsite && (
          <Choice
            legend='2 · Wie umfangreich wird die Website?'
            options={scopeOptions}
            value={scope}
            onChange={setScope}
          />
        )}
        <Choice
          legend={`${n(2)} · Gibt es schon Inhalte?`}
          options={contentOptions}
          value={content}
          onChange={setContent}
        />
        <Choice
          legend={`${n(3)} · Wie viele Sprachen?`}
          options={languageOptions}
          value={languages}
          onChange={setLanguages}
        />
      </div>

      <div
        aria-live='polite'
        className='mt-8 rounded-xl border border-white/10 bg-white/5 p-5'>
        {complete && service ? (
          <>
            <p className='text-xs uppercase tracking-[0.2em] text-slate-300'>
              {service.title}
              {isWebsite && scopeEntry ? ` · ${scopeEntry.label}` : ''}
            </p>
            {estimate == null ? (
              <p className='mt-2 text-2xl font-bold text-white'>Individuelles Angebot</p>
            ) : (
              <p className='mt-2 text-2xl font-bold text-white'>
                ab {formatEuro(estimate)}{' '}
                <span className='text-sm font-normal text-slate-300'>{VAT_NOTE}</span>
              </p>
            )}
            <ul className='mt-4 space-y-2 text-sm text-slate-300'>
              <li className='flex gap-2'>
                <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#86C243]' />
                Grundpreis{' '}
                {isWebsite && scopeEntry?.amount != null
                  ? formatEuro(scopeEntry.amount)
                  : isWebsite
                    ? 'nach Umfang'
                    : service.price}
              </li>
              <li className='flex gap-2'>
                <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#86C243]' />
                Inhalte: {contentRate ? `${percent(contentRate)} – Texte und Bilder plane ich mit ein` : 'kein Aufschlag'}
              </li>
              <li className='flex gap-2'>
                <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#86C243]' />
                Sprachen: {languageRate ? `${percent(languageRate)} – technischer Aufbau, Übersetzungen nicht enthalten` : 'kein Aufschlag'}
              </li>
            </ul>
            <p className='mt-4 text-sm text-slate-300'>
              Richtwert. Den genauen Rahmen bekommst du nach dem Erstgespräch – als
              Aufwandsschätzung oder Festpreis, kostenlos und unverbindlich.
            </p>
            <a
              href='#kontakt'
              className='web-cta mt-5 w-full px-5 py-3 text-sm font-semibold sm:w-auto'>
              Projekt anfragen
            </a>
          </>
        ) : (
          <p className='text-sm text-slate-300'>
            Beantworte die Fragen – dann siehst du hier deinen Richtwert.
          </p>
        )}
      </div>
    </div>
  );
}
