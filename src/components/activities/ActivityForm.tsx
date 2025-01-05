import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { logActivity } from '../../services/activityService';
import { ActivityInput } from '../../types/activity';

const ACTIVITY_TYPES = {
  transportation: ['car', 'bus', 'train', 'plane'],
  energy: ['electricity', 'gas', 'oil'],
  diet: ['meat', 'dairy', 'vegetables']
};

const ActivityForm = () => {
  const [formData, setFormData] = useState<ActivityInput>({
    type: 'transportation',
    category: 'car',
    value: 0
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      await logActivity(formData);
      setSuccess(true);
      setFormData({ ...formData, value: 0 });
    } catch (err) {
      setError(err.message || 'Failed to log activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Activity Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ 
            ...formData, 
            type: e.target.value as ActivityInput['type'],
            category: ACTIVITY_TYPES[e.target.value][0]
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          disabled={loading}
        >
          {Object.keys(ACTIVITY_TYPES).map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          disabled={loading}
        >
          {ACTIVITY_TYPES[formData.type].map(category => (
            <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Value</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={formData.value || ''}
            onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
            className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
            placeholder="0"
            min="0"
            step="0.1"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              {formData.type === 'transportation' ? 'km' : formData.type === 'energy' ? 'kWh' : 'kg'}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="text-green-600 text-sm">Activity logged successfully!</div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Logging...' : 'Log Activity'}
      </button>
    </form>
  );
};

export default ActivityForm;