import DOBCalculator from '@/components/tools/dob-calculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export default function DOBCalculatorPage() {
  return (
    <div className='bg-background flex min-h-screen flex-col'>
      <main className='flex-1'>
        <div className='container mx-auto px-4 py-8'>
          <div className='mx-auto w-full'>
            <div className='group text-center'>
              <h1 className='bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent transition duration-300 group-hover:brightness-110 group-hover:saturate-150'>
                DOB Calculator
              </h1>
              <p className='text-muted-foreground text-lg'>Find date of birth from current age</p>
            </div>
            <div className='my-4 flex w-full justify-center sm:justify-start'>
              <Link href='/' className='w-full sm:w-auto'>
                <Button variant='outline' size='sm' className='w-full'>
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Home
                </Button>
              </Link>
            </div>
            <Card className='border-border border shadow-md'>
              <CardContent className='p-6'>
                <DOBCalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'DOB Calculator',
  description:
    'Calculate your date of birth from your age instantly with our free and accurate DOB Calculator.',
  keywords: [
    'dob calculator',
    'date of birth calculator',
    'age to dob',
    'calculate birthdate',
    'birthday finder',
    'smart tools',
  ],
  alternates: {
    canonical: 'https://tools.praveensingh.online/dob-calculator',
  },
  metadataBase: new URL('https://tools.praveensingh.online'),
  applicationName: 'Smart Tools',
  category: 'utilities',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'DOB Calculator | Smart Tools',
    description:
      'Find your exact date of birth from your current age using this easy-to-use and free DOB calculator.',
    url: 'https://tools.praveensingh.online/dob-calculator',
    type: 'website',
    siteName: 'Smart Tools',
    locale: 'en_US',
    images: [
      {
        url: 'https://tools.praveensingh.online/og/dob-calculator.png',
        width: 1200,
        height: 630,
        alt: 'DOB Calculator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOB Calculator | Smart Tools',
    description:
      'Calculate your birthdate from age instantly using our free and precise DOB calculator.',
    creator: '@its_praveen_s',
    images: ['https://tools.praveensingh.online/og/dob-calculator.png'],
  },
};
