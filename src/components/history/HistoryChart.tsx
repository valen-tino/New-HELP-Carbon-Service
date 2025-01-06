import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoricalData } from '../../types/history';

interface Props {
  data: HistoricalData[];
}

const HistoryChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    transportation: item.transportation_emission_data,
    energy: item.energy_emission_data,
    diet: item.diet_emission_data,
    total: item.total_emission_data
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-700">Emission History</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit=" kg" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="transportation" stroke="#3B82F6" name="Transportation" />
            <Line type="monotone" dataKey="energy" stroke="#10B981" name="Energy" />
            <Line type="monotone" dataKey="diet" stroke="#F59E0B" name="Diet" />
            <Line type="monotone" dataKey="total" stroke="#6366F1" name="Total" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;