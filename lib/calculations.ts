import { emissionFactors } from './emissionFactors';
import { ActivityType } from '../types/others';

export const calculateEmissions = (type: ActivityType, category: string, value: number): number => {
  const factors = emissionFactors[type] as { [key: string]: number };
  if (!factors || !factors[category]) {
    return 0;
  }
  return value * factors[category];
};