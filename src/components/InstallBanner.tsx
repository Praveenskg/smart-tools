'use client';

import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/use-pwa';
import { StickyBanner } from './ui/sticky-banner';
import { useState } from 'react';

export function InstallBanner() {
  const { showBanner, isInstalled, installApp } = usePWA();
  const [visible, setVisible] = useState(true);

  if (!showBanner || isInstalled || !visible) return null;

  const handleInstall = async () => {
    const success = await installApp();
    if (success) setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <StickyBanner
      hideOnScroll={true}
      onDismiss={handleDismiss}
      className="bg-linear-to-r from-indigo-600 to-purple-600 text-white relative"
    >
      <div className="container pr-8 flex flex-row flex-wrap items-center justify-between w-full gap-3">
        <div className="flex flex-col">
          <p className="text-md font-medium">Install Smart Tools?</p>
          <p className="text-sm opacity-80">Use it like a native app!</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleInstall}>
            Install App
          </Button>
        </div>
      </div>
    </StickyBanner>
  );
}
