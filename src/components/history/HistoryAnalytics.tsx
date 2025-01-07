import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  analytics: string;
  totalReduction: number;
}

const HistoryAnalytics: React.FC<Props> = ({ analytics, totalReduction }) => {
  const isPositiveReduction = totalReduction > 0;
  const roundedReduction = Math.round(totalReduction * 10) / 10; // Round to 1 decimal place

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Analysis</h3>
        <div className={`flex items-center gap-2 ${isPositiveReduction ? 'text-green-600' : 'text-red-600'}`}>
          {isPositiveReduction ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
          <span className="font-medium">{Math.abs(roundedReduction)}% change</span>
        </div>
      </div>
      <p className="text-gray-600">{analytics}</p>
    </div>
  );
};

export default HistoryAnalytics;