import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import './globals.css';

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

const siteUrl = 'https://heinemann.berlin';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Digitale Services | Webentwicklung & NLP Coaching',
    template: '%s | Stefan Heinemann',
  },
  description:
    'Moderne Webentwicklung und NLP Coaching – wähle den Service, der dich weiterbringt.',
  keywords: [
    'Webentwicklung',
    'Webdesign',
    'NLP Coaching',
    'Digitale Systeme',
    'Potsdam',
    'Stefan Heinemann',
  ],
  alternates: {
    canonical: siteUrl,
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
    url: siteUrl,
    title: 'Digitale Services | Webentwicklung & NLP Coaching',
    description:
      'Moderne Webentwicklung und NLP Coaching – wähle den Service, der dich weiterbringt.',
    siteName: 'Stefan Heinemann',
    images: [
      {
        url: '/Global-Logo-SH-1.webp',
        width: 1200,
        height: 630,
        alt: 'Stefan Heinemann',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digitale Services | Webentwicklung & NLP Coaching',
    description:
      'Moderne Webentwicklung und NLP Coaching – wähle den Service, der dich weiterbringt.',
    images: ['/Global-Logo-SH-1.webp'],
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/Global-Logo-SH-1.webp', type: 'image/webp' }],
    apple: [{ url: '/Global-Logo-SH-1.webp', type: 'image/webp' }],
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
