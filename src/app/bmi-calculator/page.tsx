import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BMICalculator from '@/components/tools/bmi-calculator';
import Link from 'next/link';
import { Metadata } from 'next';

export default function BMICalculatorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                BMI Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate Body Mass Index and health status
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
                <BMICalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'BMI Calculator',
  description:
    'Check your Body Mass Index (BMI) using our fast and accurate calculator. Ideal for health tracking and fitness planning.',
  keywords: [
    'bmi calculator',
    'body mass index calculator',
    'fitness calculator',
    'health tracker',
    'calculate bmi online',
    'bmi tool',
    'smart tools',
  ],
  alternates: {
    canonical: 'https://tools.praveensingh.online/bmi-calculator',
  },
  metadataBase: new URL('https://tools.praveensingh.online'),
  applicationName: 'Smart Tools',
  category: 'health',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'BMI Calculator | Smart Tools',
    description:
      'Easily calculate your BMI (Body Mass Index) and understand your health status. Quick, free, and reliable online BMI calculator.',
    url: 'https://tools.praveensingh.online/bmi-calculator',
    type: 'website',
    siteName: 'Smart Tools',
    locale: 'en_US',
    images: [
      {
        url: 'https://tools.praveensingh.online/og/bmi-calculator.png',
        width: 1200,
        height: 630,
        alt: 'BMI Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator | Smart Tools',
    description:
      'Instantly calculate your BMI and understand if you’re underweight, normal, or overweight. A free and accurate tool by Smart Tools.',
    creator: '@its_praveen_s',
    images: ['https://tools.praveensingh.online/og/bmi-calculator.png'],
  },
};
