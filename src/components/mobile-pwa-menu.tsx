"use client";

import { useState } from "react";
import { Download, WifiOff, Settings, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { usePWA } from "@/hooks/use-pwa";

export function MobilePWAMenu() {
  const { isInstallable, isInstalled, isOnline, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installApp();
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="sm:hidden">
          <Smartphone className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium">App Settings</div>
        <DropdownMenuSeparator />
        
        {!isOnline && (
          <DropdownMenuItem disabled className="text-yellow-600">
            <WifiOff className="h-4 w-4 mr-2" />
            Offline Mode
          </DropdownMenuItem>
        )}
        
        {isInstallable && !isInstalled && (
          <DropdownMenuItem onClick={handleInstall} disabled={isInstalling}>
            <Download className="h-4 w-4 mr-2" />
            {isInstalling ? "Installing..." : "Install App"}
          </DropdownMenuItem>
        )}
        
        {isInstalled && (
          <DropdownMenuItem disabled className="text-green-600">
            <Download className="h-4 w-4 mr-2" />
            App Installed
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
          App Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 