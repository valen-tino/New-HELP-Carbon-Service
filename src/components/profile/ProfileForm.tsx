import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Bell, Car, Zap, Utensils } from 'lucide-react';
import { ProfileFormData } from '../../types/profile';
import { getUserProfile, updateUserProfile, updateReminderSettings } from '../../services/profileService';
import { useAuth } from '../../contexts/AuthContext';

const ProfileForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProfileFormData>({
    transportationPreferences: {
      primaryMode: 'car',
      averageDistance: 0
    },
    energyPreferences: {
      type: 'electricity',
      averageConsumption: 0
    },
    dietaryPreferences: {
      type: 'meat',
      frequency: 'weekly'
    },
    reminderSettings: {
      frequency: user?.reminderFrequency || 'weekly',
      enabled: true
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await getUserProfile();
      setFormData({
        transportationPreferences: profile.transportationPreferences,
        energyPreferences: profile.energyPreferences,
        dietaryPreferences: profile.dietaryPreferences,
        reminderSettings: {
          frequency: profile.reminderSettings.frequency,
          enabled: profile.reminderSettings.enabled
        }
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile(formData);
      await updateReminderSettings(
        formData.reminderSettings.frequency,
        formData.reminderSettings.enabled
      );
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 border-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Transportation Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Transportation Preferences</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Mode</label>
            <select
              value={formData.transportationPreferences.primaryMode}
              onChange={(e) => setFormData({
                ...formData,
                transportationPreferences: {
                  ...formData.transportationPreferences,
                  primaryMode: e.target.value as any
                }
              })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="plane">Plane</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Average Daily Distance (km)</label>
            <input
              type="number"
              value={formData.transportationPreferences.averageDistance}
              onChange={(e) => setFormData({
                ...formData,
                transportationPreferences: {
                  ...formData.transportationPreferences,
                  averageDistance: Number(e.target.value)
                }
              })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Energy Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Energy Preferences</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Energy Type</label>
            <select
              value={formData.energyPreferences.type}
              onChange={(e) => setFormData({
                ...formData,
                energyPreferences: {
                  ...formData.energyPreferences,
                  type: e.target.value as any
                }
              })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="electricity">Electricity</option>
              <option value="gas">Gas</option>
              <option value="oil">Oil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Average Monthly Consumption (kWh)</label>
            <input
              type="number"
              value={formData.energyPreferences.averageConsumption}
              onChange={(e) => setFormData({
                ...formData,
                energyPreferences: {
                  ...formData.energyPreferences,
                  averageConsumption: Number(e.target.value)
                }
              })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Dietary Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Dietary Preferences</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Diet Type</label>
            <select
              value={formData.dietaryPreferences.type}
              onChange={(e) => setFormData({
                ...formData,
                dietaryPreferences: {
                  ...formData.dietaryPreferences,
                  type: e.target.value as any
                }
              })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="meat">Meat</option>
              <option value="dairy">Dairy</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Consumption Frequency</label>
            <select
              value={formData.dietaryPreferences.frequency}
              onChange={(e) => setFormData({
                ...formData,
                dietaryPreferences: {
                  ...formData.dietaryPreferences,
                  frequency: e.target.value as any
                }
              })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reminder Settings */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Reminder Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <select
                value={formData.reminderSettings.frequency}
                onChange={(e) => setFormData({
                  ...formData,
                  reminderSettings: {
                    ...formData.reminderSettings,
                    frequency: e.target.value as any
                  }
                })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex items-center h-full pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.reminderSettings.enabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    reminderSettings: {
                      ...formData.reminderSettings,
                      enabled: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">Enable Reminders</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;