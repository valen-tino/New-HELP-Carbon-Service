import React from 'react';
import { Award } from 'lucide-react';
import ShareButton from './ShareButton';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  reduction: number;
}

interface Props {
  achievement: Achievement;
}

const AchievementCard: React.FC<Props> = ({ achievement }) => {
  const shareData = {
    title: `I achieved ${achievement.title} on HCS! 🌱`,
    text: `I reduced my carbon footprint by ${achievement.reduction}kg CO2e. Join me in making a difference!`,
    url: window.location.href
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </div>
        <ShareButton data={shareData} />
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Achieved on {new Date(achievement.date).toLocaleDateString()}
      </div>
    </div>
  );
};

export default AchievementCard;