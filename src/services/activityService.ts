import api from './api';
import { Activity, ActivityInput } from '../types/activity';

export async function logActivity(data: ActivityInput): Promise<Activity> {
  const response = await api.post('/activities', data);
  return response.data;
}

export async function getActivities(): Promise<Activity[]> {
  const response = await api.get('/activities');
  return response.data;
}

export async function getActivityStats(): Promise<{
  currentMonth: { [key: string]: number };
  previousMonth: { [key: string]: number };
}> {
  const response = await api.get('/activities/stats');
  return response.data;
}