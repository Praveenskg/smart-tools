import { Card, CardContent } from '@/components/ui/card';
import TipCalculator from '@/components/tools/tip-calculator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TipCalculatorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                Tip Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate restaurant tips and split bills effortlessly with
                friends
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
                <TipCalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Tip Calculator - Calculate Tips Instantly',
  description:
    'Quickly calculate tip amounts and split bills with ease using our free Tip Calculator on tools.praveensingh.online. Perfect for restaurants, cafes, and group outings.',
  keywords: [
    'tip calculator',
    'tip splitter',
    'restaurant tip calculator',
    'calculate tips',
    'bill splitter',
    'gratuity calculator',
    'group tip calculation',
    'dining tip tool',
    'tip amount calculator',
    'tools.praveensingh.online',
  ],
  openGraph: {
    title: 'Tip Calculator - Calculate Tips Instantly',
    description:
      'Use our easy Tip Calculator to quickly calculate the tip amount and split the bill among friends or group members.',
    url: 'https://tools.praveensingh.online/tip-calculator',
    siteName: 'Tools by Praveen Singh',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://tools.praveensingh.online/og-tip-calculator.png',
        width: 1200,
        height: 630,
        alt: 'Tip Calculator - tools.praveensingh.online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tip Calculator - Calculate Tips Instantly',
    description:
      'Easily calculate restaurant tips and split bills using the free Tip Calculator at tools.praveensingh.online.',
    images: ['https://tools.praveensingh.online/og-tip-calculator.png'],
  },
};
