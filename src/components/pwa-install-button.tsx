"use client";

import { useState } from "react";
import { Download, Check,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/use-pwa";

export function PWAInstallButton() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        console.log('App installed successfully!');
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  if (isInstalled) {
    return (
      <Button variant="outline" size="sm" disabled className="text-green-600">
        <Check className="h-4 w-4 mr-2" />
        Installed
      </Button>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstall}
      disabled={isInstalling}
      className="text-primary hover:text-primary"
    >
      {isInstalling ? (
        <>
          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Installing...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Install App
        </>
      )}
    </Button>
  );
} 