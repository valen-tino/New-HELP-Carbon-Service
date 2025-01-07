export type UserRole = 'user' | 'admin';

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  reminderFrequency: 'daily' | 'weekly' | 'monthly';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateData {
  name: string;
  email: string;
  username: string;
}