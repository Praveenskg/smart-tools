import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ErrorBoundary from '@/components/error-boundary';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';
import { PWAAutoUpdate } from '@/components/pwa-auto-update';
import BackToTopButton from '@/components/BackToTopButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `Smart Tools - Professional Calculator Suite`,
    template: `%s - Smart Tools`,
  },
  description:
    'Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.',
  metadataBase: new URL('https://tools.praveensingh.online'),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Smart Tools',
  },
  keywords: [
    'calculator',
    'tools',
    'financial calculator',
    'EMI calculator',
    'GST calculator',
    'unit converter',
    'percentage calculator',
    'BMI calculator',
    'age calculator',
    'goal tracker',
    'tip calculator',
    'area calculator',
    'online calculator',
    'free calculator',
    'professional tools',
    'timer tools',
  ],
  authors: [{ name: 'Praveen Singh' }],
  creator: 'Praveen Singh',
  publisher: 'Smart Tools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tools.praveensingh.online',
    title: 'Smart Tools - Professional Calculator Suite',
    description:
      'Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.',
    siteName: 'Smart Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smart Tools - Professional Calculator Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Tools - Professional Calculator Suite',
    description:
      'Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.',
    creator: '@its_praveen_s',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tools.praveensingh.online',
  },
};

export const viewport: Viewport = {
  themeColor: '#7c3aed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <BackToTopButton />
            <PWAAutoUpdate />
            <Toaster
              position="top-right"
              expand={true}
              richColors
              closeButton
            />
            <Analytics />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
