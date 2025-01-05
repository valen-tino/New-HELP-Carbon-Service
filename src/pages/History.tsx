import React, { useState, useEffect } from 'react';
import EmissionTrends from '../components/history/EmissionTrends';
import TimelineFilter from '../components/history/TimelineFilter';
import { getEmissionHistory } from '../services/activityService';
import type { EmissionHistory } from '../types/activity';

const History = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [history, setHistory] = useState<EmissionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [period]);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const data = await getEmissionHistory(period);
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Emission History</h1>
      
      <TimelineFilter period={period} onChange={setPeriod} />
      
      {isLoading ? (
        <div className="py-12 text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-green-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading history...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <EmissionTrends data={history} period={period} />
        </div>
      )}
    </div>
  );
};

export default History;