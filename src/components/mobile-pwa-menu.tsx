'use client';

import { useState } from 'react';
import { Download, WifiOff, Settings, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { usePWA } from '@/hooks/use-pwa';

export function MobilePWAMenu() {
  const { isInstallable, isInstalled, isOnline, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
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
      <DropdownMenuContent
        align="end"
        className="w-56 animate-in fade-in slide-in-from-top-2"
      >
        <p className="px-3 py-1.5 text-xs text-muted-foreground font-semibold uppercase tracking-wide">
          App Settings
        </p>
        <DropdownMenuSeparator />
        {!isOnline && (
          <DropdownMenuItem disabled>
            <WifiOff className="h-4 w-4 mr-2 text-yellow-600" />
            Offline Mode
          </DropdownMenuItem>
        )}

        {isInstallable && !isInstalled && (
          <DropdownMenuItem onClick={handleInstall} disabled={isInstalling}>
            <Download className="h-4 w-4 mr-2" />
            {isInstalling ? 'Installing...' : 'Install App'}
          </DropdownMenuItem>
        )}

        {isInstalled && (
          <DropdownMenuItem disabled>
            <Download className="h-4 w-4 mr-2 text-green-600" />
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
