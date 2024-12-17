'use client';

import { CarbonFootprint } from '../../../types/others';
import { BarChart3 } from 'lucide-react';

interface Props {
  data: CarbonFootprint;
}

export default function CarbonFootprintChart({ data }: Props) {
  const categories = [
    { name: 'Transportation', value: data.transportationEmission, color: 'bg-blue-500' },
    { name: 'Energy', value: data.energyEmission, color: 'bg-green-500' },
    { name: 'Diet', value: data.dietaryEmission, color: 'bg-yellow-500' },
  ];

  const maxValue = Math.max(...categories.map(c => c.value));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-6 h-6 mr-2 text-gray-600" />
        <h2 className="text-xl font-semibold">Carbon Footprint Breakdown</h2>
      </div>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{category.name}</span>
              <span>{category.value.toFixed(2)} kg CO2e</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${category.color}`}
                style={{ width: `${(category.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Emissions</span>
            <span>{data.totalEmission.toFixed(2)} kg CO2e</span>
          </div>
        </div>
      </div>
    </div>
  );
}