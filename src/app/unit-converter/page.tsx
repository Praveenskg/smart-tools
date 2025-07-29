import { Card, CardContent } from '@/components/ui/card';
import UnitConverter from '@/components/tools/unit-converter';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function UnitConverterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                Unit Converter
              </h1>
              <p className="text-lg text-muted-foreground">
                Convert between different units of measurement
              </p>
            </div>
            <div className="w-full flex justify-center sm:justify-start my-4">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <Card className="shadow-md border border-border">
              <CardContent className="p-6">
                <UnitConverter />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Unit Converter - Convert Units Instantly | Tools by Praveen Singh',
  description:
    'Free online unit converter for length, weight, volume, temperature, speed, and more. Accurate and fast conversions with a user-friendly interface.',
  keywords: [
    'unit converter',
    'online unit converter',
    'convert length',
    'convert weight',
    'temperature converter',
    'volume converter',
    'speed converter',
    'measurement tool',
    'unit conversion tool',
    'metric to imperial',
  ],
  openGraph: {
    title: 'Unit Converter - Convert Units Instantly | Tools by Praveen Singh',
    description:
      'Convert between units of measurement with this easy-to-use online unit converter. Supports length, weight, volume, and more.',
    url: 'https://tools.praveensingh.online/tools/unit-converter',
    siteName: 'Tools by Praveen Singh',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://tools.praveensingh.online/og/unit-converter.png',
        width: 1200,
        height: 630,
        alt: 'Unit Converter OpenGraph Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter - Convert Units Instantly | Tools by Praveen Singh',
    description:
      'Free and fast online unit converter for all types of measurements. Convert length, temperature, weight, and more.',
    images: ['https://tools.praveensingh.online/og/unit-converter.png'],
  },
};
