import api from './api';
import { Activity, ActivityInput, ActivityStats } from '../types/activity';

export async function logActivity(data: ActivityInput): Promise<Activity> {
  const response = await api.post('/activities', data);
  return response.data;
}

export async function getActivities(period: string = 'week'): Promise<Activity[]> {
  const response = await api.get(`/activities?period=${period}`);
  return response.data;
}

export async function getActivityStats(): Promise<ActivityStats> {
  const response = await api.get('/activities/stats');
  return response.data;
}

export async function getEmissionHistory(period: 'week' | 'month' | 'year'): Promise<Activity[]> {
  const response = await api.get(`/activities/history?period=${period}`);
  return response.data;
}