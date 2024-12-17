export type ActivityType = 'transportation' | 'energy' | 'diet';

export interface Activity {
  type: ActivityType;
  category: string;
  emissionValue: number;
  date: string;
}

export interface CarbonFootprint {
  transportationEmission: number;
  energyEmission: number;
  dietaryEmission: number;
  totalEmission: number;
}

export interface ActivityFormData {
  type: ActivityType;
  category: string;
  value: number;
}

export interface Recommendation {
  category: string;
  tips: string[];
}