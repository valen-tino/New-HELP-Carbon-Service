export type ActivityType = 'transportation' | 'energy' | 'diet';
export type ActivityCategory = 'car' | 'bus' | 'train' | 'plane' | 'electricity' | 'gas' | 'oil' | 'meat' | 'dairy' | 'vegetables';

export interface ActivityInput {
  type: ActivityType;
  category: ActivityCategory;
  value: number;
}

export interface Activity extends ActivityInput {
  id: string;
  userId: string;
  emissionValue: number;
  date: string;
}

export interface ActivityStats {
  currentMonth: {
    [key in ActivityType]: number;
  };
  previousMonth: {
    [key in ActivityType]: number;
  };
  totalReduction: number;
  monthlyGoal: number;
  progress: number;
}

export interface EmissionHistory {
  date: string;
  transportation: number;
  energy: number;
  diet: number;
  total: number;
}