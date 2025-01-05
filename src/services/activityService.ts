import api from './api';
import { Activity, ActivityInput, ActivityStats } from '../types/activity';

export async function logActivity(data: ActivityInput): Promise<Activity> {
  const response = await api.post('/activities', data);
  
  // After logging activity, update historical data
  await api.post('/history', {
    transportation: data.type === 'transportation' ? data.value : 0,
    energy: data.type === 'energy' ? data.value : 0,
    diet: data.type === 'diet' ? data.value : 0
  });
  
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