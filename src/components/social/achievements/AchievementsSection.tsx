import React from 'react';
import { Trophy } from 'lucide-react';
import AchievementList from './AchievementList';
import { useAchievements } from '../../../hooks/useAchievements';

const AchievementsSection = () => {
  const { achievements, isLoading, shareAchievement } = useAchievements();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Your Achievements</h2>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading achievements...</p>
        </div>
      ) : (
        <AchievementList
          achievements={achievements}
          onShare={shareAchievement}
        />
      )}
    </div>
  );
};

export default AchievementsSection;