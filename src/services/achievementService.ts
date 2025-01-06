import api from './api';
import { Achievement } from '../types/achievement';

export async function getAchievements(): Promise<Achievement[]> {
  const response = await api.get('/achievements');
  return response.data;
}

export async function shareAchievement(id: string): Promise<Achievement> {
  const response = await api.post(`/achievements/${id}/share`);
  return response.data;
}