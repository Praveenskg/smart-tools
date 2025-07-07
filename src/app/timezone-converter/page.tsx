'use client';

import { Globe, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TimeZoneConverter from '@/components/tools/timezone-converter';
import { useDynamicTitle } from '@/hooks/use-dynamic-title';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Link from 'next/link';

export default function TimeZoneConverterPage() {
  useDynamicTitle({
    currentTool: {
      id: 'timezone-converter',
      name: 'Timezone Converter',
      category: 'Date & Time',
      description:
        'Convert time between different timezones and track world clocks',
    },
    selectedCategory: 'Date & Time',
    baseTitle: 'Smart Tools',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Timezone Converter" icon={Globe} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Timezone Converter
              </h1>
              <p className="text-lg text-muted-foreground">
                Convert time between different timezones and track world clocks
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
                <TimeZoneConverter />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
