'use client';

import React, { useState } from 'react';
import { ActivityFormData, ActivityType } from '../../../types/others';
import { PlusCircle } from 'lucide-react';
import { activityCategories } from '../../../lib/categories';

interface Props {
  onSubmit: (data: ActivityFormData) => void;
}

export default function ActivityForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<ActivityFormData>({
    type: 'transportation',
    category: '',
    value: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) return;
    onSubmit(formData);
    setFormData({ ...formData, category: '', value: 0 });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setFormData({ ...formData, value: isNaN(value) ? 0 : value });
  };

  const getInputLabel = (type: ActivityType): string => {
    switch (type) {
      case 'transportation': return 'Distance (km)';
      case 'energy': return 'Usage (kWh)';
      case 'diet': return 'Meals per week';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Activity Type</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as ActivityType })}
        >
          <option value="transportation">Transportation</option>
          <option value="energy">Energy</option>
          <option value="diet">Diet</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Select a category</option>
          {activityCategories[formData.type].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {getInputLabel(formData.type)}
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.value || ''}
          onChange={handleValueChange}
        />
      </div>

      <button
        type="submit"
        disabled={!formData.category}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Activity
      </button>
    </form>
  );
}