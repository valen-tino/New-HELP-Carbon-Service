import React from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

const ActivityStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 bg-opacity-75">
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Total Activities</p>
            <p className="text-2xl font-semibold text-gray-900">1,234</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 bg-opacity-75">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Total CO2 Reduced</p>
            <p className="text-2xl font-semibold text-gray-900">2,450 kg</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 bg-opacity-75">
            <TrendingDown className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">Average Reduction</p>
            <p className="text-2xl font-semibold text-gray-900">15%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;