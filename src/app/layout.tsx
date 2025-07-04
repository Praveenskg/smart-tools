import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "@/components/error-boundary";
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from "@vercel/analytics/next";
import { PWAUpdateNotification } from "@/components/pwa-update-notification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Tools - Professional Calculator Suite",
  description:
    "Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.",
  metadataBase: new URL("https://tools.praveensingh.online"),
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "calculator",
    "tools",
    "financial calculator",
    "EMI calculator",
    "GST calculator",
    "unit converter",
    "percentage calculator",
    "BMI calculator",
    "age calculator",
    "goal tracker",
    "tip calculator",
    "area calculator",
    "online calculator",
    "free calculator",
    "professional tools",
  ],
  authors: [{ name: "Praveen Singh" }],
  creator: "Praveen Singh",
  publisher: "Smart Tools",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tools.praveensingh.online",
    title: "Smart Tools - Professional Calculator Suite",
    description:
      "Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.",
    siteName: "Smart Tools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smart Tools - Professional Calculator Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Tools - Professional Calculator Suite",
    description:
      "Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.",
    creator: "@its_praveen_s",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tools.praveensingh.online",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Smart Tools" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Smart Tools" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#7c3aed" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <PWAUpdateNotification />
            <Toaster position="top-right" expand={true} richColors closeButton />
            <Analytics />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
