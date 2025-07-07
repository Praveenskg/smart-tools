// components/TimePickerColumn.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TimePickerColumnProps {
  label: string;
  max: number;
  value: number;
  onChange: (value: number) => void;
  id: string;
}

export const TimePickerColumn: React.FC<TimePickerColumnProps> = ({
  label,
  max,
  value,
  onChange,
  id,
}) => {
  const itemHeight = 32;
  const visibleItems = max;
  const repeatedItems = visibleItems * 3;
  const middleIndex = visibleItems;

  const ref = useRef<HTMLDivElement>(null);

  const fullList = Array.from(
    { length: repeatedItems },
    (_, i) => i % visibleItems,
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = middleIndex * itemHeight;
    }
  }, [middleIndex]);

  return (
    <div className="flex flex-col items-center w-full">
      <span className="text-sm font-medium text-muted-foreground mb-1">
        {label}
      </span>

      <div
        ref={ref}
        id={id}
        className="relative w-full h-32 overflow-y-scroll scrollbar-hide snap-y snap-mandatory max-w-[80px]  p-2"
      >
        {fullList.map((val, i) => (
          <div
            key={i}
            className={cn(
              'py-1 text-center snap-center cursor-pointer transition-colors',
              {
                'text-white bg-primary rounded': val === value,
                'text-muted-foreground': val !== value,
              },
            )}
            onClick={() => onChange(val)}
          >
            {String(val).padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
};
