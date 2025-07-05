"use client";
import { useState } from "react";
import {
  Calculator,
  Calendar,
  DollarSign,
  Heart,
  Clock,
  Percent,
  Scale,
  Ruler,
  Target,
  TrendingUp,
  QrCode,
  Globe,
  Image,
  ListTodo,
  TimerReset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";
const tools = [
  {
    id: "image-tools",
    name: "Image Tools",
    description: "Professional image processing tools - resize, convert, compress, and more",
    icon: Image,
    category: "Utility",
    popular: true,
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Create custom QR codes for URLs, text, emails, and more",
    icon: QrCode,
    category: "Utility",
    popular: true,
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    description: "Quickly estimate monthly EMIs for any loan with interest and tenure",
    icon: Calculator,
    category: "Financial",
    popular: true,
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, and days",
    icon: Calendar,
    category: "Date & Time",
    popular: false,
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    description: "Easily compute GST amounts, reverse GST, and inclusive/exclusive tax totals",
    icon: Percent,
    category: "Financial",
    popular: false,
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and health status",
    icon: Heart,
    category: "Health",
    popular: false,
  },
  {
    id: "dob-calculator",
    name: "DOB Calculator",
    description: "Find date of birth from current age",
    icon: Clock,
    category: "Date & Time",
    popular: false,
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increase, and decrease",
    icon: TrendingUp,
    category: "Math",
    popular: false,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: Scale,
    category: "Conversion",
    popular: false,
  },
  {
    id: "area-calculator",
    name: "Area Calculator",
    description: "Calculate area of various geometric shapes",
    icon: Ruler,
    category: "Math",
    popular: false,
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate restaurant tips and split bills effortlessly with friends",
    icon: DollarSign,
    category: "Financial",
    popular: false,
  },
  {
    id: "goal-tracker",
    name: "Goal Tracker",
    description: "Plan and monitor your savings journey toward financial goals",
    icon: Target,
    category: "Planning",
    popular: true,
  },
  {
    id: "todo-list",
    name: "ToDo List",
    description: "Stay organized and productive with a simple todo list",
    icon: ListTodo,
    category: "Planning",
    popular: true,
  },
  {
    id: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies with real-time exchange rates",
    icon: DollarSign,
    category: "Financial",
    popular: true,
  },
  {
    id: "timezone-converter",
    name: "Timezone Converter",
    description: "Convert time between different timezones and track world clocks",
    icon: Globe,
    category: "Date & Time",
    popular: false,
  },
  {
    id: "timers-tools",
    name: "Timers",
    description: "Track time with countdown and stopwatch features",
    icon: TimerReset,
    category: "Time",
    popular: false,
  },
];
const categories = [
  { name: "All Tools", count: tools.length },
  {
    name: "Financial",
    count: tools.filter(t => t.category === "Financial").length,
  },
  {
    name: "Health",
    count: tools.filter(t => t.category === "Health").length,
  },
  {
    name: "Date & Time",
    count: tools.filter(t => t.category === "Date & Time").length,
  },
  { name: "Math", count: tools.filter(t => t.category === "Math").length },
  {
    name: "Conversion",
    count: tools.filter(t => t.category === "Conversion").length,
  },
  {
    name: "Planning",
    count: tools.filter(t => t.category === "Planning").length,
  },
  {
    name: "Utility",
    count: tools.filter(t => t.category === "Utility").length,
  },
];
export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All Tools");
  useDynamicTitle({
    currentTool: undefined,
    selectedCategory,
    baseTitle: "Smart Tools",
  });
  const filteredTools = tools.filter(
    tool => selectedCategory === "All Tools" || tool.category === selectedCategory,
  );
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isHome={true} />
      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              Professional Calculator Suite
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Access a comprehensive collection of calculators and utilities designed for
              professionals, students, and everyday use.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-6 sm:mb-8 justify-center">
            {categories.map(category => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="text-xs sm:text-sm"
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredTools
              .sort((a, b) => {
                if (a.popular && !b.popular) return -1;
                if (!a.popular && b.popular) return 1;
                return 0;
              })
              .map(tool => {
                const IconComponent = tool.icon;
                return (
                  <Link key={tool.id} href={`/${tool.id}`}>
                    <Card className="h-full hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer group hover:scale-105">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                          <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                            {tool.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-xs sm:text-sm mb-3 group-hover:text-foreground/80 transition-colors duration-300">
                          {tool.description}
                        </CardDescription>
                        <div className="flex gap-1 sm:gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className="text-xs group-hover:bg-primary/10 group-hover:border-primary transition-all duration-300"
                          >
                            {tool.category}
                          </Badge>
                          {tool.popular && (
                            <Badge
                              variant="secondary"
                              className="text-xs group-hover:bg-secondary/80 transition-all duration-300"
                            >
                              Popular
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
