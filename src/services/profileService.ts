import api from './api';
import { UserProfile, ProfileFormData } from '../types/profile';

export async function getUserProfile(): Promise<UserProfile> {
  const response = await api.get('/profile');
  return response.data;
}

export async function updateUserProfile(data: ProfileFormData): Promise<UserProfile> {
  const response = await api.put('/profile', data);
  return response.data;
}

export async function updateReminderSettings(frequency: string, enabled: boolean): Promise<UserProfile> {
  const response = await api.patch('/profile/reminders', { frequency, enabled });
  return response.data;
}