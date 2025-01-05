import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';

interface TrendData {
  date: string;
  transportation: number;
  energy: number;
  diet: number;
}

interface Props {
  data: TrendData[];
  period: 'week' | 'month' | 'year';
}

const EmissionTrends: React.FC<Props> = ({ data, period }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Emission Trends</h3>
        <LineChart className="h-5 w-5 text-green-600" />
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border-b border-gray-100 pb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {new Date(item.date).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {(item.transportation + item.energy + item.diet).toFixed(1)} kg CO2e
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmissionTrends;