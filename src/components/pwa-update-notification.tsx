"use client";

import { useState, useEffect } from "react";
import { RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PWAUpdateNotification() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    // Listen for service worker updates
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setShowUpdateNotification(true);
      });
    }
  }, []);

  const handleUpdate = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowUpdateNotification(false);
  };

  if (!showUpdateNotification) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-72 sm:w-80 shadow-lg border-primary/20 bg-background">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Update Available</h3>
            <p className="text-xs text-muted-foreground mb-3">
              A new version of Smart Tools - Professional Calculator Suite is available. Refresh to
              get the latest features.
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleUpdate} className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Update Now
              </Button>
              <Button size="sm" variant="outline" onClick={handleDismiss} className="text-xs">
                Later
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
