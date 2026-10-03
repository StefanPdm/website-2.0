import type { Metadata } from 'next';
import Header from '@/components/Header';
import WorldSwitchWeb from '@/components/WorldSwitchWeb';
import { KEYWORDS_WEB, OWNER } from '@/lib/site';

const title = 'Webentwicklung Potsdam & Berlin – Websites, Web Apps, Kundenportale';
const description =
  'Freelance Webentwicklung aus Potsdam für Berlin und Brandenburg: Websites und Landingpages, Web Apps und Kundenportale, Headless CMS und Schnittstellen. Umgesetzt mit Next.js, React, Angular und TypeScript – sauber, wartbar, dokumentiert.';

export const metadata: Metadata = {
  // Eigenes Template: Ein String-Titel im Layout würde das Template aus dem
  // Root-Layout für alle Unterseiten unterbrechen – sie liefen dann ohne Namen.
  // `default` bleibt ohne Namen: Den hängt dort schon das Root-Template an.
  title: { default: title, template: `%s | ${OWNER.name}` },
  description,
  keywords: [...KEYWORDS_WEB],
  alternates: {
    canonical: '/webdevelopment',
  },
  openGraph: {
    title,
    description,
    url: '/webdevelopment',
    type: 'website',
    locale: 'de_DE',
    siteName: OWNER.name,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function WebdevelopmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-[#0B1B2B] text-slate-100'>
      <Header />
      <WorldSwitchWeb />
      <div className=''>{children}</div>
    </div>
  );
}
