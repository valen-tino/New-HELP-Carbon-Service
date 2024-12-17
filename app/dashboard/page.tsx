'use client';

import { useEffect, useState } from 'react';
import { Activity, ActivityFormData, CarbonFootprint } from '../../types/others';
import ActivityForm from '../components/dashboard/ActivityForm';
import CarbonFootprintChart from '../components/dashboard/CarbonFootprintChart';
import Recommendations from '../components/dashboard/Recommendations';
import { Calculator } from 'lucide-react';
import { calculateEmissions } from '../../lib/calculations';

export default function DashboardPage() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [footprint, setFootprint] = useState<CarbonFootprint>({
    transportationEmission: 0,
    energyEmission: 0,
    dietaryEmission: 0,
    totalEmission: 0,
  });

  const handleActivitySubmit = (data: ActivityFormData) => {
    const emissionValue = calculateEmissions(data.type, data.category, data.value);
    const newActivity: Activity = {
      ...data,
      emissionValue,
      date: new Date().toISOString(),
    };

    setActivities([...activities, newActivity]);

    const newFootprint = { ...footprint };
    if (data.type === 'transportation') {
      newFootprint.transportationEmission += emissionValue;
    } else if (data.type === 'energy') {
      newFootprint.energyEmission += emissionValue;
    } else {
      newFootprint.dietaryEmission += emissionValue;
    }
    newFootprint.totalEmission = newFootprint.transportationEmission + 
                                newFootprint.energyEmission + 
                                newFootprint.dietaryEmission;
    setFootprint(newFootprint);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Carbon Footprint Calculator</h1>
          <p className="mt-2 text-gray-600">Track and analyze your environmental impact</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <ActivityForm onSubmit={handleActivitySubmit} />
          </div>
          <div>
            <CarbonFootprintChart data={footprint} />
          </div>
        </div>

        <div>
          <Recommendations footprint={footprint} />
        </div>

        {activities.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emissions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.emissionValue.toFixed(2)} kg CO2e
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}