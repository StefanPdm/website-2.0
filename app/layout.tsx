import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { KEYWORDS_ROOT, OWNER, SITE_URL } from '@/lib/site';

const bodyFont = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Life Coaching & Webentwicklung in Potsdam und Berlin',
    template: '%s | Stefan Heinemann',
  },
  description:
    'Stefan Heinemann aus Potsdam: Life Coaching für Unternehmer mit persönlichen Themen sowie Webentwicklung für Websites, Web Apps und Kundenportale. Für Potsdam, Berlin, Brandenburg und remote.',
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
    title: 'Life Coaching & Webentwicklung in Potsdam und Berlin',
    description:
      'Zwei Geschäftsbereiche, eine Person: Life Coaching für Unternehmer und Webentwicklung für digitale Systeme. Potsdam, Berlin, Brandenburg und remote.',
    siteName: OWNER.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Coaching & Webentwicklung in Potsdam und Berlin',
    description:
      'Zwei Geschäftsbereiche, eine Person: Life Coaching für Unternehmer und Webentwicklung für digitale Systeme. Potsdam, Berlin, Brandenburg und remote.',
  },
  icons: {
    // SVG für moderne Browser, .ico als Rückfall für ältere.
    // Apple-Touch-Icon muss PNG sein – Safari rendert dort kein SVG.
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/logos/logo-zeichen.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/logos/logo-zeichen-180.png', type: 'image/png', sizes: '180x180' }],
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
    // data-scroll-behavior: Next.js schaltet das weiche Scrollen aus globals.css beim
    // Seitenwechsel nur mit diesem Attribut ab. Ohne es überlagerten sich auf /coaching
    // ~20 weiche Scroll-Animationen (Fragment mit vielen Sektionen + scroll-padding-top),
    // und die Seite blieb nach dem Wechsel von / bei „Kennst du das?“ stehen (2026-11-15).
    <html
      lang='de'
      data-scroll-behavior='smooth'>
      <body className={`${bodyFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
