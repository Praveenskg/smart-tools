'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function PWAAutoUpdate() {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg?.waiting && !hasShownToast.current) {
          showUpdateToast();
        }

        reg?.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller &&
                !hasShownToast.current
              ) {
                showUpdateToast();
              }
            });
          }
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hasShownToast.current) {
          showUpdateToast();
        }
      });
    }
  }, []);

  const showUpdateToast = () => {
    hasShownToast.current = true;
    toast('A new version is available!', {
      description: 'Click below to  update.',
      action: {
        label: 'Update Now',
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
