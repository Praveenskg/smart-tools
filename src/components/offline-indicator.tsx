'use client';

import { WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePWA } from '@/hooks/use-pwa';

export function OfflineIndicator() {
  const { isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <Badge
      variant="secondary"
      className="bg-yellow-100 text-yellow-800 border-yellow-200"
    >
      <WifiOff className="h-3 w-3 mr-1" />
      Offline Mode
    </Badge>
  );
}
