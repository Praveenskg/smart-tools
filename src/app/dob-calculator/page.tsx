"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DOBCalculator from "@/components/tools/dob-calculator";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";

export default function DOBCalculatorPage() {
  useDynamicTitle({
    currentTool: {
      id: "dob-calculator",
      name: "DOB Calculator",
      category: "Date & Time",
      description: "Find date of birth from current age",
    },
    selectedCategory: "Date & Time",
    baseTitle: "Smart Tools",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="DOB Calculator" icon={Calendar} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">DOB Calculator</h1>
              <p className="text-lg text-muted-foreground">Find date of birth from current age</p>
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
                <DOBCalculator />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
