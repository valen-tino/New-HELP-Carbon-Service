import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityForm from '../components/activities/ActivityForm';
import ActivityList from '../components/activities/ActivityList';
import { Activity } from '../types/activity';
import { getActivities } from '../services/activityService';
import { CalendarDays } from 'lucide-react';

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Log Activities</h1>
        <button 
          onClick={handleViewHistory}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <CalendarDays className="h-5 w-5" />
          View History
        </button>
      </div>

      {/* New Activity Card - Now at the top */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">New Activity</h2>
        <ActivityForm onActivityLogged={loadActivities} />
      </div>

      {/* Recent Activities Card - Now at the bottom */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading activities...</p>
          </div>
        ) : (
          <ActivityList activities={activities} />
        )}
      </div>
    </div>
  );
};

export default Activities;