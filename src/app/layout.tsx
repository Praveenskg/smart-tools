import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';
import BackToTopButton from '@/components/BackToTopButton';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { InstallBanner } from '@/components/InstallBanner';
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

const APP_NAME = 'Smart Tools';
const APP_DEFAULT_TITLE = 'Smart Tools - Professional Calculator Suite';
const APP_TITLE_TEMPLATE = '%s - Smart Tools';
const APP_DESCRIPTION =
  'Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL('https://tools.praveensingh.online'),
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: 'https://tools.praveensingh.online',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smart Tools – All-in-one Calculator Suite',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    creator: '@its_praveen_s',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
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
    <html
      lang="en"
      className={geistSans.variable + ' ' + geistMono.variable}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <InstallBanner />
          <Header />
          {children}
          <Footer />
          <BackToTopButton />
          <Toaster position="top-right" expand={true} richColors closeButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
