import React from 'react';
import { BarChart as Chart } from 'lucide-react';

interface EmissionData {
  label: string;
  value: number;
  color: string;
}

interface EmissionChartProps {
  data: EmissionData[];
  title: string;
}

const EmissionChart: React.FC<EmissionChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Chart className="h-5 w-5 text-green-600" />
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{item.label}</span>
              <span>{item.value.toFixed(1)} kg CO2e</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmissionChart;