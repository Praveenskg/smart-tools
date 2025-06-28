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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
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
import Footer from "@/components/footer";
import { LiveClock } from "@/components/clock";

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
    description: "Plan and monitor your savings journey toward financial goals",
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
    <Sidebar>
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs sm:text-sm font-semibold text-foreground">
              Smart Tools
            </h2>
            <p className="text-xs text-muted-foreground">Calculator Suite</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 sm:px-4 text-xs font-medium text-muted-foreground">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton
                    onClick={() => onCategorySelect(category.name)}
                    className={`w-full justify-between transition-all duration-200 px-3 sm:px-4 py-2 sm:py-3 ${
                      selectedCategory === category.name
                        ? "bg-primary/10 text-primary border-r-2 border-primary"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      {category.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        selectedCategory === category.name
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
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

  const ToolComponent = currentTool?.component;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <SidebarInset>
          <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <SidebarTrigger className="hover:bg-muted/50 transition-colors" />
                <div className="flex items-center gap-1 sm:gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-primary">
                    Smart Tools
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <LiveClock />
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">
            {selectedTool && ToolComponent ? (
              <div className="space-y-4 sm:space-y-6 slide-in-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 pulse-glow">
                      <currentTool.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-primary">
                        {currentTool.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {currentTool.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCloseTool}
                    size="sm"
                    className="hover:bg-muted/50 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close Tool
                  </Button>
                </div>

                <Card className="modern-card scale-in">
                  <CardContent className="p-4 sm:p-6">
                    <ToolComponent />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center space-y-3 sm:space-y-4 fade-in">
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary floating-animation" />
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary">
                      Professional Calculator Suite
                    </h2>
                    <Sparkles
                      className="h-6 w-6 sm:h-8 sm:w-8 text-primary floating-animation"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                    Access a comprehensive collection of calculators and
                    utilities designed for professionals, students, and everyday
                    use.
                  </p>
                </div>

                <section
                  className="space-y-3 sm:space-y-4 slide-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold">
                      Popular Tools
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20 w-fit"
                    >
                      Most Used
                    </Badge>
                  </div>
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {popularTools.map((tool, index) => {
                      const IconComponent = tool.icon;
                      return (
                        <Card
                          key={tool.id}
                          className="modern-card group cursor-pointer hover-lift"
                          onClick={() => handleToolLaunch(tool.id)}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CardHeader className="pb-2 sm:pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
                                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <Badge
                                variant="secondary"
                                className="text-xs bg-gradient-to-r from-secondary to-secondary/80"
                              >
                                {tool.category}
                              </Badge>
                            </div>
                            <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                              {tool.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                              {tool.description}
                            </CardDescription>
                            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                              Launch Tool
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>

                <section
                  className="space-y-3 sm:space-y-4 slide-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold">
                      All Tools
                    </h3>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {filteredTools.length} tools available
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredTools.map((tool, index) => {
                      const IconComponent = tool.icon;
                      return (
                        <Card
                          key={tool.id}
                          className="modern-card group cursor-pointer hover-lift"
                          onClick={() => handleToolLaunch(tool.id)}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <CardHeader className="pb-2 sm:pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300 group-hover:scale-110">
                                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-primary transition-colors duration-300 group-hover:scale-110" />
                              </div>
                              {tool.popular && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20"
                                >
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                              {tool.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <CardDescription className="text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                              {tool.description}
                            </CardDescription>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {tool.category}
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
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
                <Footer />
              </div>
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
