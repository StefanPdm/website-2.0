'use client';

import CardNav from '@/components/CardNav';

const items = [
  {
    label: 'Leistungen',
    bgColor: '#ffffff0d',
    textColor: '#fff',
    links: [
      { label: 'Überblick', ariaLabel: 'Zum Überblick', href: '/webdevelopment#leistungen' },
      {
        label: 'Technologien',
        ariaLabel: 'Zu Technologien',
        href: '/webdevelopment#technologien',
      },
      { label: 'Arbeitsweise', ariaLabel: 'Zur Arbeitsweise', href: '/webdevelopment#prozess' },
    ],
  },
  {
    label: 'Good to know',
    bgColor: '#ffffff0d',
    textColor: '#fff',
    links: [
      { label: 'Cases', ariaLabel: 'Zu Cases', href: '#cases' },
      { label: 'Kontaktformular', ariaLabel: 'Zum Kontakt', href: '#kontakt' },
      { label: 'Zurück zur Hauptseite', ariaLabel: 'Zurück zur Hauptseite', href: '/' },
    ],
  },
  {
    label: 'Rechtliches',
    bgColor: '#ffffff0d',
    textColor: '#fff',
    links: [
      { label: 'Impressum', ariaLabel: 'Zum Impressum', href: '/webdevelopment/impressum' },
      {
        label: 'Datenschutz',
        ariaLabel: 'Zur Datenschutzerklärung',
        href: '/webdevelopment/datenschutz',
      },
      {
        label: 'Cookies',
        ariaLabel: 'Zu den Cookie-Einstellungen',
        href: '/webdevelopment/cookies',
      },
    ],
  },
];

export default function Header() {
  return (
    <header className='fixed top-0 z-50 w-full bg-transparent'>
      <CardNav
        logo='/Global-logo-W.webp'
        logoAlt='Logo'
        items={items}
        baseColor='transparent'
        menuColor='#fff'
        buttonBgColor='#ffffff1a'
        buttonTextColor='#fff'
        ease='power3.out'
        backgroundImage={undefined}
      />
    </header>
  );
}
