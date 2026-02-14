import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Webdevelopment – Klare Websites & saubere Systeme',
  description:
    'Webentwicklung für Unternehmer, Coaches und Teams: klare Websites, saubere Systeme, Performance und Struktur. Von Landingpages bis Web Apps und Schnittstellen.',
  alternates: {
    canonical: '/webdevelopment',
  },
  openGraph: {
    title: 'Webdevelopment – Klare Websites & saubere Systeme',
    description:
      'Webentwicklung für Unternehmer, Coaches und Teams: klare Websites, saubere Systeme, Performance und Struktur. Von Landingpages bis Web Apps und Schnittstellen.',
    url: '/webdevelopment',
    type: 'website',
    images: [
      {
        url: '/Global-Logo-SH-1.webp',
        width: 1200,
        height: 630,
        alt: 'Webdevelopment von Stefan Heinemann',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webdevelopment – Klare Websites & saubere Systeme',
    description:
      'Webentwicklung für Unternehmer, Coaches und Teams: klare Websites, saubere Systeme, Performance und Struktur. Von Landingpages bis Web Apps und Schnittstellen.',
    images: ['/Global-Logo-SH-1.webp'],
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
      <div className=''>{children}</div>
    </div>
  );
}
