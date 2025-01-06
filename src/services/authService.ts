import api from './api';
import { LoginCredentials, RegisterData, User, UpdateData } from '../types/auth';

export async function loginUser(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error: any) {
    // Convert error to string message instead of passing the error object
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

export async function registerUser(data: RegisterData): Promise<User> {
  try {
    const response = await api.post('/auth/register', data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
}

export async function updateUser(data: UpdateData): Promise<User> {
  try {
    const response = await api.put('/auth/update', data);
    const { user } = response.data;
    return user;
  } catch(error: any){
    throw new Error(error.response?.data?.message || 'Failed to update the data');
  }
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

export async function logout(): Promise<void> {
  localStorage.removeItem('token');
}