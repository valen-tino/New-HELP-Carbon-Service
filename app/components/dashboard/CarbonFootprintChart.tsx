'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Activity } from '@/types/user';
import { useMemo } from 'react';

interface CarbonFootprintChartProps {
  activities: Activity[];
}

export function CarbonFootprintChart({ activities }: CarbonFootprintChartProps) {
  const chartConfig = useMemo(() => ({
    xAxis: {
      dataKey: "date",
      padding: { left: 20, right: 20 },
      axisLine: false,
      tickLine: false,
      tick: { fill: 'hsl(var(--muted-foreground))' },
    },
    yAxis: {
      width: 80,
      axisLine: false,
      tickLine: false,
      tick: { fill: 'hsl(var(--muted-foreground))' },
    },
    tooltip: {
      contentStyle: {
        backgroundColor: 'hsl(var(--background))',
        borderColor: 'hsl(var(--border))',
      },
      labelStyle: { color: 'hsl(var(--foreground))' },
    },
    cartesianGrid: {
      strokeDasharray: '3 3',
      stroke: 'hsl(var(--border))',
    },
  }), []);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart
          data={activities}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid {...chartConfig.cartesianGrid} />
          <XAxis {...chartConfig.xAxis} />
          <YAxis {...chartConfig.yAxis} />
          <Tooltip {...chartConfig.tooltip} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>
            )}
          />
          <Line
            name="Transportation"
            type="monotone"
            dataKey="transportation"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            name="Energy"
            type="monotone"
            dataKey="energy"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            name="Diet"
            type="monotone"
            dataKey="diet"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}