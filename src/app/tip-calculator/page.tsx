"use client";

import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TipCalculator from "@/components/tools/tip-calculator";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";

export default function TipCalculatorPage() {
  useDynamicTitle({
    currentTool: {
      id: "tip-calculator",
      name: "Tip Calculator",
      category: "Financial",
      description:
        "Calculate restaurant tips and split bills effortlessly with friends",
    },
    selectedCategory: "Financial",
    baseTitle: "Smart Tools",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Tip Calculator" icon={DollarSign} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">
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
      <Footer />
    </div>
  );
}
