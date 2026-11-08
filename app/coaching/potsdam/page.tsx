import LocationPage, {
  locationMetadata,
  SESSION_FACTS,
  type LocationConfig,
} from '@/app/coaching/components/LocationPage';

/** Standortseite „Coaching Potsdam“ – Layout in LocationPage. */
const config: LocationConfig = {
  path: '/coaching/potsdam',
  city: 'Potsdam',
  title: 'Coaching in Potsdam – Life Coaching für Unternehmer',
  description: `Coaching in Potsdam für Unternehmer mit persönlichen Themen: bei mir in Potsdam, bei dir vor Ort oder online. ${SESSION_FACTS}`,
  keywords: [
    'Coaching Potsdam',
    'Coach Potsdam',
    'Life Coach Potsdam',
    'Life Coaching Potsdam',
    'Coaching für Unternehmer Potsdam',
    'Business Coaching Potsdam',
    'Personal Coaching Potsdam',
    'NLP Coaching Potsdam',
  ],
  h1: 'Life Coaching für Unternehmer in Potsdam',
  lead: 'Ich bin Stefan Heinemann, Coach in Potsdam. Ich begleite Unternehmer, die nach außen funktionieren und innen wieder Klarheit, Ruhe und Richtung suchen – bei mir in Potsdam, bei dir vor Ort in Potsdam und Berlin oder online.',
  formats: [
    {
      icon: 'home',
      title: 'Bei mir in Potsdam',
      text: 'In ruhiger Atmosphäre, abseits von Büro und Alltag. Den genauen Ort bekommst du mit der Terminbestätigung.',
    },
    {
      icon: 'walk',
      title: 'Im Gehen',
      text: 'Auf Wunsch arbeiten wir draußen – bei einem Spaziergang durch einen der Potsdamer Parks. Manche Gedanken sortieren sich in Bewegung leichter.',
    },
    {
      icon: 'visit',
      title: 'Bei dir vor Ort',
      text: 'Ich komme zu dir – in Potsdam, Berlin oder Brandenburg. Auch ins Unternehmen, wenn Rahmen und Ziel vorher abgestimmt sind.',
    },
    {
      icon: 'online',
      title: 'Online',
      text: 'Per Video, ortsunabhängig. Gut für Folgesessions oder wenn der Kalender keine Anfahrt zulässt.',
    },
  ],
  places: 'Bei mir in Potsdam, im Gehen, bei dir in Potsdam, Berlin oder Brandenburg, oder online.',
  image: {
    src: '/images-nlp/coaching-spaziergang-potsdam.webp',
    alt: 'Stefan Heinemann im Coaching-Gespräch bei einem Spaziergang durch einen Potsdamer Schlosspark',
    position: 'object-[65%_center]',
  },
  hero: {
    src: '/images-nlp/coaching-potsdam-panorama.webp',
    alt: 'Schloss Sanssouci in Potsdam mit den Weinbergterrassen im Abendlicht',
    position: 'object-[68%_60%]',
  },
  motif: 'relation',
  ctaTitle: 'Lass uns in Potsdam sprechen',
  sibling: { href: '/coaching/berlin', label: 'Coaching in Berlin' },
};

export const metadata = locationMetadata(config);

export default function CoachingPotsdamPage() {
  return <LocationPage config={config} />;
}
