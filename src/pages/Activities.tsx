import React, { useState, useEffect } from 'react';
import ActivityForm from '../components/activities/ActivityForm';
import ActivityList from '../components/activities/ActivityList';
import { Activity } from '../types/activity';
import { getActivities } from '../services/activityService';
import { CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data || []); // Ensure we always set an array
    } catch (error) {
      console.error('Error loading activities:', error);
      setActivities([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivityLogged = (newActivity: Activity) => {
    setActivities(prevActivities => [newActivity, ...prevActivities]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Log Activities</h1>
        <button 
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          <CalendarDays className="w-5 h-5" />
          View History
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">New Activity</h2>
          <ActivityForm onActivityLogged={handleActivityLogged} />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Recent Activities</h2>
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="w-8 h-8 mx-auto border-b-2 border-green-600 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-500">Loading activities...</p>
            </div>
          ) : (
            <ActivityList activities={activities} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;