'use client';

import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/use-pwa';
import { toast } from 'sonner';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        toast.success('App installed successfully!');
      } else {
        toast.warning('Installation dismissed');
      }
    } catch (error) {
      toast.error('Installation failed');
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  if (isInstalled) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="text-green-600"
        aria-label="App already installed"
      >
        <Check className="h-4 w-4 mr-2" />
        Installed
      </Button>
    );
  }

  if (!isInstallable) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstall}
      disabled={isInstalling}
      className="text-primary hover:text-primary"
      aria-label="Install Progressive Web App"
    >
      {isInstalling ? (
        <>
          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Installing...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          Install App
        </>
      )}
    </Button>
  );
}
