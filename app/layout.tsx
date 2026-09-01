import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import './globals.css';
import { KEYWORDS_ROOT, OWNER, SITE_URL } from '@/lib/site';

const bodyFont = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const displayFont = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NLP Coaching & Webentwicklung in Potsdam und Berlin',
    template: '%s | Stefan Heinemann',
  },
  description:
    'Stefan Heinemann aus Potsdam: NLP Coaching für Klarheit und Entscheidungen sowie Webentwicklung für Websites, Web Apps und Kundenportale. Für Potsdam, Berlin, Brandenburg und remote.',
  keywords: [...KEYWORDS_ROOT],
  authors: [{ name: OWNER.name, url: SITE_URL }],
  creator: OWNER.name,
  publisher: OWNER.name,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'NLP Coaching & Webentwicklung in Potsdam und Berlin',
    description:
      'Zwei Geschäftsbereiche, eine Person: NLP Coaching für innere Klarheit und Webentwicklung für digitale Systeme. Potsdam, Berlin, Brandenburg und remote.',
    siteName: OWNER.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NLP Coaching & Webentwicklung in Potsdam und Berlin',
    description:
      'Zwei Geschäftsbereiche, eine Person: NLP Coaching für innere Klarheit und Webentwicklung für digitale Systeme. Potsdam, Berlin, Brandenburg und remote.',
  },
  icons: {
    // SVG für moderne Browser, .ico als Rückfall für ältere.
    // Apple-Touch-Icon muss PNG sein – Safari rendert dort kein SVG.
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/logos/logo-sh.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/logos/logo-sh-180.png', type: 'image/png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport = {
  themeColor: '#0b1118',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de'>
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
