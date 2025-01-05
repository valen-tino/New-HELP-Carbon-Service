import api from './api';
import { LoginCredentials, RegisterData, User } from '../types/auth';

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  const response = await api.post('/auth/login', credentials);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return user;
}

export async function registerUser(data: RegisterData): Promise<User> {
  const response = await api.post('/auth/register', data);
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
}

export async function updateUser(data: Partial<User>): Promise<User> {
  const response = await api.put('/auth/update', data);
  return response.data;
}

export async function logout(): Promise<void> {
  localStorage.removeItem('token');
}