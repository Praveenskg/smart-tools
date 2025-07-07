'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function PWAAutoUpdate() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg?.waiting) {
          showUpdateToast();
        }

        reg?.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                showUpdateToast();
              }
            });
          }
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        showUpdateToast();
      });
    }
  }, []);

  const showUpdateToast = () => {
    toast('🔄 New version available. Refreshing in 5 seconds...', {
      action: {
        label: 'Refresh Now',
        onClick: () => window.location.reload(),
      },
      duration: 5000,
    });

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  return null;
}
