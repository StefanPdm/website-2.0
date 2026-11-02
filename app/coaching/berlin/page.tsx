import LocationPage, {
  locationMetadata,
  SESSION_FACTS,
  type LocationConfig,
} from '@/app/coaching/components/LocationPage';

/**
 * Standortseite „Coaching Berlin“ – Layout in LocationPage.
 * Schwerpunkt: Termine beim Klienten in Berlin und online; Potsdam als
 * bewusster Ortswechsel vor den Toren der Stadt.
 */
const config: LocationConfig = {
  path: '/coaching/berlin',
  city: 'Berlin',
  title: 'Coaching in Berlin – Life Coaching für Unternehmer',
  description: `Coaching für Unternehmer in Berlin: Ich komme zu dir, wir arbeiten online oder bei mir im nahen Potsdam. ${SESSION_FACTS}`,
  keywords: [
    'Coaching Berlin',
    'Coach Berlin',
    'Life Coach Berlin',
    'Life Coaching Berlin',
    'Coaching für Unternehmer Berlin',
    'Business Coaching Berlin',
    'Personal Coaching Berlin',
    'Online Coaching Berlin',
  ],
  h1: 'Life Coaching für Unternehmer in Berlin',
  lead: 'Ich bin Stefan Heinemann, Coach aus Potsdam – direkt vor den Toren Berlins. Ich begleite Berliner Unternehmer, die nach außen funktionieren und innen wieder Klarheit, Ruhe und Richtung suchen: bei dir in Berlin, online oder mit etwas Abstand bei mir in Potsdam.',
  formats: [
    {
      icon: 'visit',
      title: 'Bei dir in Berlin',
      text: 'Ich komme zu dir – nach Hause, ins Büro oder ins Unternehmen, wenn Rahmen und Ziel vorher abgestimmt sind.',
    },
    {
      icon: 'online',
      title: 'Online',
      text: 'Per Video, ohne Anfahrt. Gut für Folgesessions oder wenn der Kalender voll ist.',
    },
    {
      icon: 'home',
      title: 'Bei mir in Potsdam',
      text: 'Raus aus der Stadt, rein in die Ruhe: Manchmal hilft schon der Ortswechsel, um auf ein Thema neu zu schauen.',
    },
    {
      icon: 'walk',
      title: 'Im Gehen',
      text: 'Auf Wunsch bei einem Spaziergang durch einen der Potsdamer Parks. Manche Gedanken sortieren sich in Bewegung leichter.',
    },
  ],
  places: 'Bei dir in Berlin, online, bei mir in Potsdam oder im Gehen.',
  image: {
    src: '/images-nlp/coaching-gespraech.webp',
    alt: 'Stefan Heinemann im Coaching-Gespräch mit einem Klienten',
    position: 'object-[75%_center]',
  },
  motif: 'action',
  ctaTitle: 'Lass uns sprechen – in Berlin, Potsdam oder online',
  sibling: { href: '/coaching/potsdam', label: 'Coaching in Potsdam' },
};

export const metadata = locationMetadata(config);

export default function CoachingBerlinPage() {
  return <LocationPage config={config} />;
}
