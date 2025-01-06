import api from './api';
import { User, UserUpdateData, UserStats } from '../types/user';

export async function getUsers(): Promise<User[]> {
  const response = await api.get('/users');
  return response.data;
}

export async function getUserStats(): Promise<UserStats> {
  const response = await api.get('/users/stats');
  return response.data;
}

export async function updateUser(id: string, data: UserUpdateData): Promise<User> {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  if (!id) throw new Error('User ID is required');
  await api.delete(`/users/${id}`);
}

export async function getUser(id: string): Promise<User> {
const response = await api.get(`/users/${id}`);
return response.data;
}