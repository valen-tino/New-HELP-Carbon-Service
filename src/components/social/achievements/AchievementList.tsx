import React from 'react';
import AchievementCard from './AchievementCard';
import { Achievement } from '../../../types/achievement';

interface Props {
  achievements: Achievement[];
  onShare: (achievement: Achievement) => void;
}

const AchievementList: React.FC<Props> = ({ achievements, onShare }) => {
  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement._id}
          achievement={achievement}
          onShare={onShare}
        />
      ))}
      {achievements.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No achievements yet. Keep reducing your carbon footprint!
        </p>
      )}
    </div>
  );
};

export default AchievementList;