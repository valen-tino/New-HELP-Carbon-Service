import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const PreferencesForm = () => {
  const [reminderFrequency, setReminderFrequency] = useState('weekly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle preferences update
    console.log('Updating preferences:', { reminderFrequency });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Preferences</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <Bell className="h-5 w-5 text-green-600" />
            Reminder Frequency
          </label>
          <select
            value={reminderFrequency}
            onChange={(e) => setReminderFrequency(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default PreferencesForm;