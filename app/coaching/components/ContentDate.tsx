import { pageDates } from '@/app/sitemap';
import { OWNER } from '@/lib/site';

/**
 * Sichtbare Datumszeile für Inhaltsseiten von Welt A.
 *
 * Suchmaschinen und Sprachmodelle bevorzugen datierte Inhalte – ein Artikel
 * ohne Datum ist für sie unbestimmt alt. Das Datum steht deshalb sichtbar im
 * Kopfbereich *und* als `datePublished`/`dateModified` im JSON-LD; beides liest
 * aus `app/sitemap.ts`, damit die Angaben nie auseinanderlaufen.
 *
 * Zeigt nur „Stand", solange nichts geändert wurde, sonst beide Daten.
 */

const monthYear = new Intl.DateTimeFormat('de-DE', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function format(iso: string) {
  return monthYear.format(new Date(`${iso}T00:00:00Z`));
}

export default function ContentDate({ path }: { path: string }) {
  const { published, modified } = pageDates(path);
  const updated = modified !== published;

  return (
    <p className='mt-6 text-xs text-(--muted)'>
      {updated ? 'Aktualisiert: ' : 'Stand: '}
      <time dateTime={modified}>{format(modified)}</time>
      {updated ? (
        <>
          {' · Erstveröffentlichung: '}
          <time dateTime={published}>{format(published)}</time>
        </>
      ) : null}
      {` · von ${OWNER.name}`}
    </p>
  );
}
