export type UserRole = 'user' | 'admin';
export type ReminderFrequency = 'daily' | 'weekly' | 'monthly';

export interface User {
    _id: string; // Added _id property
    name: string;
    email: string;
    username: string;
    role: UserRole;
    reminderFrequency: ReminderFrequency;
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