"use client";

import { ArrowLeft, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
import ImageTools from "@/components/tools/image-tools";

export default function ImageToolsPage() {
  useDynamicTitle({
    currentTool: {
      id: "image-tools",
      name: "Image Tools",
      category: "Image Processing",
      description:
        "Professional image editing and processing tools including resizer, converter, compressor, and more.",
    },
    selectedCategory: "Image Processing",
    baseTitle: "Smart Tools",
  });
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Image Tools" icon={Image} />
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="w-full mx-auto">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {" "}
                Image Processing Tools
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mt-2">
                Professional image editing and processing tools in one place
              </p>
            </div>
            <div className="w-full flex justify-center sm:justify-start my-4 sm:my-6">
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <Card className="shadow-md border border-border">
              <CardContent className="p-4 sm:p-6">
                <ImageTools />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
