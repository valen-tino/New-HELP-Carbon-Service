'use client';

import { Card } from '@/components/ui/card';

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload) {
    return null;
  }

  return (
    <Card className="p-3 shadow-lg border border-border bg-background">
      <p className="font-medium text-sm text-muted-foreground mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <span className="text-sm" style={{ color: entry.color }}>
            {entry.name}
          </span>
          <span className="font-medium">
            {entry.value} kg CO2
          </span>
        </div>
      ))}
    </Card>
  );
}