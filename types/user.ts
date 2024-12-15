export interface Activity {
  type: string;
  value: number;
  date: Date;
  category: 'transportation' | 'energy' | 'diet';
}

export interface CarbonFootprint {
  transportation: number;
  energy: number;
  diet: number;
  total: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  contactNumber: string;
  commutingMethods: string;
  preferences: {
    reminderFrequency: 'daily' | 'weekly' | 'monthly';
    transportationPreferences: string[];
    dietaryPreferences: string[];
  };
  activities: Activity[];
  carbonFootprint: CarbonFootprint;
  createdAt: Date;
  updatedAt: Date;
}