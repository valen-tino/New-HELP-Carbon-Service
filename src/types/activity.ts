export interface ActivityInput {
  type: 'transportation' | 'energy' | 'diet';
  category: string;
  value: number;
}

export interface Activity extends ActivityInput {
  id: string;
  userId: string;
  emissionValue: number;
  date: string;
}