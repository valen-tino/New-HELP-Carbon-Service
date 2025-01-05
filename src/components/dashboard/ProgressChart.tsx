import React from 'react';
import { Target } from 'lucide-react';

interface Props {
  current: number;
  target: number;
  label: string;
}

const ProgressChart: React.FC<Props> = ({ current, target, label }) => {
  const percentage = Math.min((current / target) * 100, 100);
  const formattedPercentage = Math.round(percentage);
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
        <Target className="w-5 h-5 text-green-600" />
      </div>
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="inline-block text-xs font-semibold text-green-600">
              {formattedPercentage}%
            </span>
          </div>
          <div className="text-right">
            <span className="inline-block text-xs font-semibold text-gray-600">
              Target: {target}%
            </span>
          </div>
        </div>
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-green-100 rounded">
          <div
            style={{ width: `${percentage}%` }}
            className="flex flex-col justify-center text-center text-white transition-all duration-500 bg-green-500 shadow-none whitespace-nowrap"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;