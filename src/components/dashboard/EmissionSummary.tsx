import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface Props {
  currentEmissions: number;
  previousEmissions: number;
  category: string;
}

const EmissionSummary: React.FC<Props> = ({ currentEmissions, previousEmissions, category }) => {
  const change = ((currentEmissions - previousEmissions) / previousEmissions) * 100;
  const isDecrease = change < 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 capitalize mb-2">{category}</h3>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {currentEmissions.toFixed(1)} kg CO2e
          </p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className={`flex items-center gap-1 ${isDecrease ? 'text-green-600' : 'text-red-600'}`}>
          {isDecrease ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
          <span className="text-sm font-medium">{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default EmissionSummary;