"use client";

import { Heart, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BMICalculator from "@/components/tools/bmi-calculator";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

export default function BMICalculatorPage() {
  useDynamicTitle({
    currentTool: {
      id: "bmi-calculator",
      name: "BMI Calculator",
      category: "Health",
      description: "Calculate Body Mass Index and health status",
    },
    selectedCategory: "Health",
    baseTitle: "Smart Tools",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="BMI Calculator" icon={Heart} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                BMI Calculator
              </h1>
              <p className="text-lg text-muted-foreground">
                Calculate Body Mass Index and health status
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
                <BMICalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
