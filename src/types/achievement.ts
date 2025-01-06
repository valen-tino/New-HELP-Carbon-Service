export interface Achievement {
    _id: string;
    user_id: string;
    title: string;
    description: string;
    type: 'transportation' | 'energy' | 'diet';
    reduction_amount: number;
    earned_at: string;
    shared: boolean;
  }