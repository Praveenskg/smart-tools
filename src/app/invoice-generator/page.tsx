import InvoiceGenerator from '@/components/tools/invoice-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Free Invoice Generator Tool',
  description:
    'Create professional invoices quickly and easily using our free online invoice generator. Customize, preview, and download PDF invoices in seconds.',
  keywords: [
    'invoice generator',
    'create invoice',
    'free invoice template',
    'online billing tool',
    'PDF invoice generator',
    'invoice maker',
    'tools.praveensingh.online',
    'GST invoice',
    'freelancer invoice',
    'business invoice tool',
  ],
  openGraph: {
    title: 'Free Invoice Generator Tool',
    description:
      'Generate professional invoices instantly. Free, customizable, and ready to download as PDF. No signup required.',
    url: 'https://tools.praveensingh.online/invoice-generator',
    siteName: 'Tools by Praveen Singh',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://tools.praveensingh.online/og-invoice.png',
        width: 1200,
        height: 630,
        alt: 'Invoice Generator - tools.praveensingh.online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Invoice Generator Tool',
    description:
      'Create and download invoices online in just a few clicks. Ideal for freelancers, startups, and small businesses.',
    images: ['https://tools.praveensingh.online/og-invoice.png'],
  },
};

export default function InvoiceGeneratorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                Invoice Generator
              </h1>
              <p className="text-lg text-muted-foreground">
                Create, preview, and download professional invoices online in
                seconds.
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
                <InvoiceGenerator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
