export type UserRole = 'user' | 'admin';
export type ReminderFrequency = 'daily' | 'weekly' | 'monthly';

export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  reminderFrequency: ReminderFrequency;
  lastLoginAt: string;
  createdAt: string;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
  username?: string;
  role?: UserRole;
  reminderFrequency?: ReminderFrequency;
}

export interface UserStats {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
}