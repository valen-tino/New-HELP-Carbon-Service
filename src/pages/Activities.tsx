import React from 'react';
import ActivityForm from '../components/activities/ActivityForm';
import { CalendarDays } from 'lucide-react';

const Activities = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Log Activities</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <CalendarDays className="h-5 w-5" />
          View History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">New Activity</h2>
          <ActivityForm />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <p className="text-gray-500">Loading recent activities...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;