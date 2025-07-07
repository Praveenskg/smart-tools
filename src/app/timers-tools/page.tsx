'use client';

import { ArrowLeft, TimerReset } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDynamicTitle } from '@/hooks/use-dynamic-title';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Link from 'next/link';
import TimerTools from '@/components/tools/countdown-stopwatch';

export default function TimersToolsPage() {
  useDynamicTitle({
    currentTool: {
      id: 'timers-tools',
      name: 'Timers',
      category: 'Time',
      description: 'Track time with countdown and stopwatch features',
    },
    selectedCategory: 'Time',
    baseTitle: 'Smart Tools',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Timers" icon={TimerReset} />
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Timers
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mt-2">
                Track time with countdown and stopwatch features
              </p>
            </div>
            <div className="w-full flex justify-center sm:justify-start my-4 sm:my-6">
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <Card className="shadow-md border border-border">
              <CardContent className="p-4 sm:p-6">
                <TimerTools />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
