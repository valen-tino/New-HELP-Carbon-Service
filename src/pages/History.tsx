import React, { useState, useEffect } from 'react';
import { getHistoricalData, getHistoryAnalytics } from '../services/historyService';
import HistoryChart from '../components/history/HistoryChart';
import HistoryAnalytics from '../components/history/HistoryAnalytics';
import TimelineFilter from '../components/history/TimelineFilter';
import type { HistoricalData } from '../types/history';

const History = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [analytics, setAnalytics] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistoricalData();
  }, [period]);

  const loadHistoricalData = async () => {
    try {
      setIsLoading(true);
      const [data, analyticsData] = await Promise.all([
        getHistoricalData(period),
        getHistoryAnalytics()
      ]);
      setHistoricalData(data);
      setAnalytics(analyticsData);
    } catch (err) {
      setError('Failed to load historical data');
      console.error('Error loading history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-b-2 border-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  // Calculate total reduction
  const totalReduction = historicalData.length >= 2 
    ? ((historicalData[0].total_emission_data - historicalData[historicalData.length - 1].total_emission_data) 
      / historicalData[historicalData.length - 1].total_emission_data) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Emission History</h1>
        <TimelineFilter period={period} onChange={setPeriod} />
      </div>

      <HistoryChart data={historicalData} />
      <HistoryAnalytics analytics={analytics} totalReduction={totalReduction} />
    </div>
  );
};

export default History;