import api from './api';
import { HistoricalData } from '../types/history';

export async function getHistoricalData(period: 'week' | 'month' | 'year'): Promise<HistoricalData[]> {
  const response = await api.get(`/history?period=${period}`);
  return response.data;
}

export async function getHistoryAnalytics(): Promise<string> {
  const response = await api.get('/history/analytics');
  return response.data.analytics;
}