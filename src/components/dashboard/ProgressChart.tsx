import React from 'react';
import { Target } from 'lucide-react';

interface Props {
  current: number;
  target: number;
  label: string;
}

const ProgressChart: React.FC<Props> = ({ current, target, label }) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
        <Target className="h-5 w-5 text-green-600" />
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-green-600">
              {percentage.toFixed(0)}%
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-gray-600">
              Target: {target} kg CO2e
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;