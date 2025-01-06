import React from 'react';
import { Activity } from '../../types/activity';
import { Calendar, TrendingDown } from 'lucide-react';

interface Props {
  activities: Activity[];
}

const ActivityList: React.FC<Props> = ({ activities = [] }) => {
  const getEmissionColor = (value: number) => {
    if (value < 10) return 'text-green-600';
    if (value < 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!activities?.length) {
    return <p className="py-4 text-center text-gray-500">No activities logged yet.</p>;
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        // Generate a unique key using id and timestamp if available, or fallback to index
        const uniqueKey = `activity-${activity.id}-${activity.date || Date.now()}`;
        
        return (
          <div 
            key={uniqueKey}
            className="pb-4 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-medium text-gray-900 capitalize">
                  {activity.category}
                </span>
                <div className="mt-1 text-sm text-gray-500">
                  {activity.value} {activity.type === 'transportation' ? 'km' : 
                    activity.type === 'energy' ? 'kWh' : 'kg'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className={`h-4 w-4 ${getEmissionColor(activity.emissionValue)}`} />
                <span className={`text-sm font-medium ${getEmissionColor(activity.emissionValue)}`}>
                  {activity.emissionValue.toFixed(1)} kg CO2e
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>{new Date(activity.date).toLocaleString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityList;