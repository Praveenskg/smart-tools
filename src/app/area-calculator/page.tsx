import { Card, CardContent } from '@/components/ui/card';
import AreaCalculator from '@/components/tools/area-calculator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export default function AreaCalculatorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                Area Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate area of various geometric shapes
              </p>
            </div>

            <div className="w-full flex justify-center sm:justify-start my-4">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  aria-label="Go back to home"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <Card className="shadow-md border border-border">
              <CardContent className="p-6">
                <AreaCalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Area Calculator',
  description:
    'Calculate the area of different geometric shapes like square, circle, triangle and more — instantly and for free.',
  keywords: [
    'area calculator',
    'geometry calculator',
    'shape area calculator',
    'online calculator',
    'smart tools',
  ],
  alternates: {
    canonical: 'https://tools.praveensingh.online/area-calculator',
  },
  metadataBase: new URL('https://tools.praveensingh.online'),
  applicationName: 'Smart Tools',
  category: 'utilities',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Area Calculator | Smart Tools',
    description:
      'Instantly calculate the area of shapes like circles, triangles, and rectangles online for free.',
    url: 'https://tools.praveensingh.online/area-calculator',
    type: 'website',
    siteName: 'Smart Tools',
    locale: 'en_US',
    images: [
      {
        url: 'https://tools.praveensingh.online/og/area-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Area Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Area Calculator | Smart Tools',
    description:
      'Calculate the area of different geometric shapes online with ease and accuracy.',
    creator: '@its_praveen_s',
    images: ['https://tools.praveensingh.online/og/area-calculator.png'],
  },
};
