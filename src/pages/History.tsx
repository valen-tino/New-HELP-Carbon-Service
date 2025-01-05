import React, { useState } from 'react';
import EmissionTrends from '../components/history/EmissionTrends';
import TimelineFilter from '../components/history/TimelineFilter';

// Example data - would come from API in production
const trendData = [
  {
    date: '2024-02-15',
    transportation: 25,
    energy: 30,
    diet: 15
  },
  {
    date: '2024-02-14',
    transportation: 20,
    energy: 35,
    diet: 18
  }
];

const History = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Historical Data</h1>
      
      <TimelineFilter period={period} onChange={setPeriod} />
      
      <div className="grid grid-cols-1 gap-6">
        <EmissionTrends data={trendData} period={period} />
      </div>
    </div>
  );
};

export default History;