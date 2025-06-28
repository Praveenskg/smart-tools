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
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import EMICalculator from "../components/tools/emi-calculator";
import AgeCalculator from "../components/tools/age-calculator";
import GSTCalculator from "../components/tools/gst-calculator";
import BMICalculator from "../components/tools/bmi-calculator";
import DOBCalculator from "../components/tools/dob-calculator";
import PercentageCalculator from "../components/tools/percentage-calculator";
import UnitConverter from "../components/tools/unit-converter";
import AreaCalculator from "../components/tools/area-calculator";
import TipCalculator from "../components/tools/tip-calculator";
import GoalTracker from "../components/tools/goal-tracker";
import CreditCardEMICalculator from "@/components/tools/credit-card-emi-calculator";
import { ThemeToggle } from "@/components/theme-toggle";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";

const tools = [
  {
    id: "credit-card-emi",
    name: "Credit Card EMI Calculator",
    description:
      "Break down your credit card EMI with interest, GST, and fees included",
    icon: Calculator,
    category: "Financial",
    popular: true,
    component: CreditCardEMICalculator,
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    description:
      "Quickly estimate monthly EMIs for any loan with interest and tenure",
    icon: Calculator,
    category: "Financial",
    popular: true,
    component: EMICalculator,
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, and days",
    icon: Calendar,
    category: "Date & Time",
    popular: true,
    component: AgeCalculator,
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    description:
      "Easily compute GST amounts, reverse GST, and inclusive/exclusive tax totals",
    icon: Percent,
    category: "Financial",
    popular: false,
    component: GSTCalculator,
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and health status",
    icon: Heart,
    category: "Health",
    popular: true,
    component: BMICalculator,
  },
  {
    id: "dob-calculator",
    name: "DOB Calculator",
    description: "Find date of birth from current age",
    icon: Clock,
    category: "Date & Time",
    popular: false,
    component: DOBCalculator,
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increase, and decrease",
    icon: TrendingUp,
    category: "Math",
    popular: false,
    component: PercentageCalculator,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: Scale,
    category: "Conversion",
    popular: false,
    component: UnitConverter,
  },
  {
    id: "area-calculator",
    name: "Area Calculator",
    description: "Calculate area of various geometric shapes",
    icon: Ruler,
    category: "Math",
    popular: false,
    component: AreaCalculator,
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    description:
      "Calculate restaurant tips and split bills effortlessly with friends",
    icon: DollarSign,
    category: "Financial",
    popular: false,
    component: TipCalculator,
  },
  {
    id: "goal-tracker",
    name: "Goal Tracker",
    description:
      "Plan and monitor your savings journey toward financial goals.s",
    icon: Target,
    category: "Planning",
    popular: false,
    component: GoalTracker,
  },
];

const categories = [
  { name: "All Tools", count: tools.length },
  {
    name: "Financial",
    count: tools.filter((t) => t.category === "Financial").length,
  },
  {
    name: "Health",
    count: tools.filter((t) => t.category === "Health").length,
  },
  {
    name: "Date & Time",
    count: tools.filter((t) => t.category === "Date & Time").length,
  },
  { name: "Math", count: tools.filter((t) => t.category === "Math").length },
  {
    name: "Conversion",
    count: tools.filter((t) => t.category === "Conversion").length,
  },
  {
    name: "Planning",
    count: tools.filter((t) => t.category === "Planning").length,
  },
];

function AppSidebar({
  selectedCategory,
  onCategorySelect,
}: {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}) {
  return (
    <Sidebar className="bg-background">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Calculator className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Smart Tools</span>
            <span className="text-xs text-muted-foreground">
              Calculator Suite
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton
                    isActive={selectedCategory === category.name}
                    onClick={() => onCategorySelect(category.name)}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {category.count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All Tools");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const year = format(new Date(), "yyyy");

  const currentTool = tools.find((tool) => tool.id === selectedTool);

  useDynamicTitle({
    currentTool,
    selectedCategory,
    baseTitle: "Smart Tools",
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedTool(null);
  };

  const handleToolLaunch = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleCloseTool = () => {
    setSelectedTool(null);
  };

  const filteredTools =
    selectedCategory === "All Tools"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  const popularTools = tools.filter((tool) => tool.popular);

  const currentToolName = currentTool ? currentTool.name : "Smart Tools";

  const ToolComponent = currentTool?.component;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <SidebarInset>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold gradient-text">
                    {currentToolName}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedTool && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCloseTool}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close tool</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Back to dashboard</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ThemeToggle />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle dark mode</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </header>

          {}
          <main className="flex-1 p-6">
            {selectedTool && ToolComponent ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-linear-to-br from-primary/10 to-primary/5">
                      <currentTool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {currentTool.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {currentTool.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleCloseTool} size="sm">
                    <X />
                    Close Tool
                  </Button>
                </div>

                <Card className="modern-card">
                  <CardContent className="p-6">
                    <ToolComponent />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-8">
                {}
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
                    Professional Calculator Suite
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Access a comprehensive collection of calculators and
                    utilities designed for professionals, students, and everyday
                    use.
                  </p>
                </div>

                {}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Popular Tools</h3>
                    <Badge variant="outline">Most Used</Badge>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {popularTools.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <Card
                          key={tool.id}
                          className="modern-card group cursor-pointer"
                          onClick={() => handleToolLaunch(tool.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                                <IconComponent className="h-6 w-6 text-primary" />
                              </div>
                              <Badge
                                variant="secondary"
                                className="text-xs bg-linear-to-r from-secondary to-secondary/80"
                              >
                                {tool.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {tool.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="text-sm mb-4">
                              {tool.description}
                            </CardDescription>
                            <Button className="w-full modern-button">
                              Launch Tool
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>

                {}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">All Tools</h3>
                    <div className="text-sm text-muted-foreground">
                      {filteredTools.length} tools available
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTools.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <Card
                          key={tool.id}
                          className="modern-card group cursor-pointer"
                          onClick={() => handleToolLaunch(tool.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-muted to-muted/50 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300">
                                <IconComponent className="h-5 w-5 group-hover:text-primary transition-colors" />
                              </div>
                              {tool.popular && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-linear-to-r from-primary/10 to-primary/5 text-primary border-primary/20"
                                >
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {tool.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="text-sm mb-3 line-clamp-2">
                              {tool.description}
                            </CardDescription>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {tool.category}
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all"
                              >
                                Launch
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>

                {}
                <footer className="border-t pt-8 mt-12 bg-background text-muted-foreground">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm space-y-1">
                      <p>
                        © {year} Smart Tools. Built with modern web
                        technologies.
                      </p>
                      <p>
                        Powerful & user-friendly calculators for everyday needs.
                      </p>
                    </div>
                    <div className="mt-4 flex justify-center space-x-4 text-xs text-muted-foreground/70">
                      <a href="/privacy" className="hover:underline">
                        Privacy Policy
                      </a>
                      <span>·</span>
                      <a href="/terms" className="hover:underline">
                        Terms of Service
                      </a>
                      <span>·</span>
                      <a
                        href="mailto:support@smarttools.com"
                        className="hover:underline"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </footer>
              </div>
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
