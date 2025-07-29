'use client';

import { useEffect, useState } from 'react';
import {
  Download,
  WifiOff,
  Moon,
  Sun,
  Bell,
  Trash,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { usePWA } from '@/hooks/use-pwa';
import { toast } from 'sonner';

export function MobilePWAMenu() {
  const {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    requestNotificationPermission,
    showNotification,
  } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const { theme, setTheme } = useTheme();
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
  const handleToggleNotification = async () => {
    if (notificationsEnabled) {
      localStorage.setItem('notifications', 'disabled');
      setNotificationsEnabled(false);
      toast.info('Notifications disabled');
    } else {
      const granted = await requestNotificationPermission();
      if (granted) {
        localStorage.setItem('notifications', 'enabled');
        setNotificationsEnabled(true);
        toast.success('Notifications enabled');
        showNotification('Notifications Enabled', {
          body: 'You’ll now receive important updates.',
          icon: '/favicon.svg',
        });
      } else {
        toast.error('Permission denied');
      }
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('notifications');
      const isGranted = Notification.permission === 'granted';
      if (stored === 'enabled' && isGranted) {
        setNotificationsEnabled(true);
      } else {
        setNotificationsEnabled(false);
      }
      if (
        typeof window !== 'undefined' &&
        isInstallable &&
        /iPhone|iPad|iPod/.test(navigator.userAgent) &&
        !navigator.standalone
      ) {
        toast.info(
          'To install this app on iOS, tap "Share" and then "Add to Home Screen".',
        );
      }
    } catch {
      setNotificationsEnabled(false);
    }
  }, [isInstallable]);

  const handleClearCache = async () => {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }

    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
    }

    location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="sm:hidden">
          <Settings className="h-4 w-4" />
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

        {isInstalled ? (
          <DropdownMenuItem disabled>
            <Download className="h-4 w-4 mr-2 text-green-600" />
            App Installed
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem onClick={handleToggleNotification}>
          <Bell className="h-4 w-4 mr-2" />
          {notificationsEnabled
            ? 'Disable Notifications'
            : 'Enable Notifications'}
        </DropdownMenuItem>
        {isInstalled && (
          <DropdownMenuItem onClick={handleClearCache}>
            <Trash className="h-4 w-4 mr-2" />
            Clear App Cache
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 mr-2" />
          ) : (
            <Moon className="h-4 w-4 mr-2" />
          )}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
