import React from 'react';
import { Award, Share2 } from 'lucide-react';
import { Achievement } from '../../../types/achievement';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  achievement: Achievement;
  onShare: (achievement: Achievement) => void;
}

const AchievementCard: React.FC<Props> = ({ achievement, onShare }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <Award className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </div>
        <button
          onClick={() => onShare(achievement)}
          disabled={achievement.shared}
          className="text-green-600 hover:text-green-700 disabled:opacity-50"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>
          {formatDistanceToNow(new Date(achievement.earned_at), { addSuffix: true })}
        </span>
        <span className="font-medium text-green-600">
          -{achievement.reduction_amount} kg CO2e
        </span>
      </div>
    </div>
  );
};

export default AchievementCard;