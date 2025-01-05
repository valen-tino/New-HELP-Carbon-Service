export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
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