'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    const displaySeconds = seconds.toString().padStart(2, '0');

    return {
      hours: displayHours,
      minutes: displayMinutes,
      seconds: displaySeconds,
      ampm,
    };
  };

  const { hours, minutes, seconds, ampm } = formatTime(time);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-background/50 border border-border/50 hover:bg-muted/30 transition-all duration-200 hover:scale-105">
      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
      <div className="flex items-center gap-0.5 sm:gap-1 font-mono">
        <span className="text-xs sm:text-sm font-semibold text-muted-foreground tabular-nums">
          {hours}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground">:</span>
        <span className="text-xs sm:text-sm font-semibold text-muted-foreground tabular-nums">
          {minutes}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground">:</span>
        <span className="text-xs sm:text-sm font-semibold text-muted-foreground tabular-nums">
          {seconds}
        </span>
        <Badge
          variant="secondary"
          className="ml-1 sm:ml-1.5 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 bg-primary/10 text-primary border-primary/20 font-medium"
        >
          {ampm}
        </Badge>
      </div>
    </div>
  );
}
