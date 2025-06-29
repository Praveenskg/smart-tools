"use client";

import { Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import UnitConverter from "@/components/tools/unit-converter";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";

import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";

export default function UnitConverterPage() {
  useDynamicTitle({
    currentTool: {
      id: "unit-converter",
      name: "Unit Converter",
      category: "Conversion",
      description: "Convert between different units of measurement",
    },
    selectedCategory: "Conversion",
    baseTitle: "Smart Tools",
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Unit Converter" icon={Scale} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Unit Converter
              </h1>
              <p className="text-lg text-muted-foreground">
                Convert between different units of measurement
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
                <UnitConverter />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
