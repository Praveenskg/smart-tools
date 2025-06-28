import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Tools - Professional Calculator Suite",
  description:
    "Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.",
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
  ],
  authors: [{ name: "Smart Tools" }],
  creator: "Smart Tools",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tools.praveensingh.online",
    title: "Smart Tools - Professional Calculator Suite",
    description:
      "Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.",
    siteName: "Smart Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Tools - Professional Calculator Suite",
    description:
      "Access a comprehensive collection of calculators and utilities designed for professionals, students, and everyday use.",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Smart Tools" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
