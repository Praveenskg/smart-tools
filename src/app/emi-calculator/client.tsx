'use client';

import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EMICalculator from '@/components/tools/emi-calculator';
import CreditCardEMICalculator from '@/components/tools/credit-card-emi-calculator';
import Link from 'next/link';
import { useState } from 'react';

export default function EMICalculatorPageClient() {
  const [activeTab, setActiveTab] = useState('loan-emi');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center group">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:brightness-110 group-hover:saturate-150 transition duration-300">
                EMI Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate EMIs for loans and credit cards with detailed
                breakdown
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
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="loan-emi">Loan EMI</TabsTrigger>
                    <TabsTrigger value="credit-card-emi">
                      Credit Card EMI
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="loan-emi" className="space-y-4">
                    <EMICalculator />
                  </TabsContent>
                  <TabsContent value="credit-card-emi" className="space-y-4">
                    <CreditCardEMICalculator />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
