'use client';
import { useEffect } from 'react';

export default function ForceUnregisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => {
          reg.unregister().then(() => {
            console.log('Service worker unregistered');
          });
        });
      });
    }
  }, []);

  return null;
}
