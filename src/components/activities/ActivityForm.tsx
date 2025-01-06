import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { logActivity } from '../../services/activityService';
import { ActivityInput } from '../../types/activity';

const ACTIVITY_TYPES = {
  transportation: ['car', 'bus', 'train', 'plane'],
  energy: ['electricity', 'gas', 'oil'],
  diet: ['meat', 'dairy', 'vegetables']
};

interface Props {
  onActivityLogged: (newActivity: any) => void;
}

const ActivityForm: React.FC<Props> = ({ onActivityLogged }) => {
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
      const newActivity = await logActivity(formData);
      setSuccess(true);
      setFormData({ ...formData, value: 0 });
      onActivityLogged(newActivity); // Call the callback with the new activity
    } catch (err: any) {
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
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
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
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
          disabled={loading}
        >
          {ACTIVITY_TYPES[formData.type].map(category => (
            <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Value</label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            value={formData.value || ''}
            onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
            className="block w-full border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
            placeholder="0"
            min="0"
            step="0.1"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              {formData.type === 'transportation' ? 'km' : formData.type === 'energy' ? 'kWh' : 'kg'}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600">Activity logged successfully!</div>
      )}

      <button
        type="submit"
        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Logging...' : 'Log Activity'}
      </button>
    </form>
  );
};

export default ActivityForm;