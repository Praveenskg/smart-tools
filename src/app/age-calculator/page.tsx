'use client';

import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AgeCalculator from '@/components/tools/age-calculator';
import Link from 'next/link';

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                Age Calculator
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mt-2">
                Calculate exact age in years, months, and days
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
              <CardContent className="p-4 sm:p-6">
                <AgeCalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
