import { useState, useEffect } from 'react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(
    null,
  );
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIfInstalled = () => {
      if (
        window.matchMedia &&
        window.matchMedia('(display-mode: standalone)').matches
      ) {
        setIsInstalled(true);
      }
    };

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      setShowBanner(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js');
          setRegistration(reg);
          console.log('SW registered: ', reg);

          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (
                  installingWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  setUpdateAvailable(true);
                }
              };
            }
          };
        } catch (error) {
          console.log('SW registration failed: ', error);
        }
      }
    };

    checkIfInstalled();
    registerServiceWorker();

    window.addEventListener('beforeinstallprompt', e => {
      const event = e as BeforeInstallPromptEvent;
      handleBeforeInstallPrompt(event);
    });
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('beforeinstallprompt', e => {
        const event = e as BeforeInstallPromptEvent;
        handleBeforeInstallPrompt(event);
      });
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        setShowBanner(false);
        return true;
      }
    } catch (error) {
      console.error('Error installing app:', error);
    }

    return false;
  };

  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window))
      return false;

    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (
      typeof window !== 'undefined' &&
      Notification.permission === 'granted'
    ) {
      new Notification(title, options);
    }
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    requestNotificationPermission,
    showNotification,
    showBanner,
    updateAvailable,
    registration,
  };
}
