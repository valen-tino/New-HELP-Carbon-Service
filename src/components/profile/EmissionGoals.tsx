import React from 'react';
import { Target } from 'lucide-react';
import { formatNumber } from '../../utils/numberUtils';

interface Goal {
  category: string;
  current: number;
  target: number;
}

const goals: Goal[] = [
  { category: 'Transportation', current: 85, target: 100 },
  { category: 'Energy', current: 120, target: 150 },
  { category: 'Diet', current: 45, target: 50 }
];

const EmissionGoals = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Emission Goals</h2>
        <Target className="h-5 w-5 text-green-600" />
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{goal.category}</span>
              <span className="text-gray-800">
                {formatNumber(goal.current)} / {formatNumber(goal.target)} kg CO2e
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${Math.min((goal.current / goal.target) * 100, 100)}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmissionGoals;