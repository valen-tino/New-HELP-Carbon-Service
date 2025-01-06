import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface Props {
  currentEmissions: number;
  previousEmissions: number;
  category: string;
}

const EmissionSummary: React.FC<Props> = ({ currentEmissions, previousEmissions, category }) => {
  const change = previousEmissions > 0 
    ? ((currentEmissions - previousEmissions) / previousEmissions) * 100 
    : 0;
  const isDecrease = change < 0;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="mb-2 text-lg font-semibold text-gray-700 capitalize">{category}</h3>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {currentEmissions.toFixed(1)} kg CO2e
          </p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className={`flex items-center gap-1 ${isDecrease ? 'text-green-600' : 'text-red-600'}`}>
          {isDecrease ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default EmissionSummary;