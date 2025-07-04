import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-3 w-3 sm:h-4 sm:w-4",
    default: "h-5 w-5 sm:h-6 sm:w-6",
    lg: "h-6 w-6 sm:h-8 sm:w-8",
  };

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  );
}

export function LoadingCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg" />
          <div className="space-y-1 sm:space-y-2 flex-1">
            <Skeleton className="h-3 sm:h-4 w-3/4" />
            <Skeleton className="h-2 sm:h-3 w-1/2" />
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <Skeleton className="h-3 sm:h-4 w-full" />
          <Skeleton className="h-3 sm:h-4 w-5/6" />
          <Skeleton className="h-3 sm:h-4 w-4/6" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 sm:h-10 flex-1" />
          <Skeleton className="h-8 sm:h-10 w-16 sm:w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="group cursor-pointer">
          <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex items-start justify-between">
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg" />
              <Skeleton className="h-4 w-12 sm:h-5 sm:w-16" />
            </div>
            <Skeleton className="h-4 sm:h-5 w-3/4" />
            <div className="space-y-1 sm:space-y-2">
              <Skeleton className="h-2 sm:h-3 w-full" />
              <Skeleton className="h-2 sm:h-3 w-5/6" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 sm:h-6 w-16 sm:w-20" />
              <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
          <h1 className="text-xl sm:text-2xl font-bold text-primary">Smart Tools</h1>
          <Sparkles
            className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
        <LoadingSpinner size="lg" />
        <p className="text-sm sm:text-base text-muted-foreground">Loading your tools...</p>
      </div>
    </div>
  );
}
