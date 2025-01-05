import React from 'react';
import CommunityFeed from '../components/social/CommunityFeed';
import AchievementCard from '../components/social/AchievementCard';

// Example data - would come from API in production
const achievements = [
  {
    id: '1',
    title: 'Transportation Pioneer',
    description: 'Reduced transportation emissions by 20% this month',
    date: '2024-02-15',
    reduction: 45
  },
  {
    id: '2',
    title: 'Energy Saver',
    description: 'Achieved 30% reduction in energy consumption',
    date: '2024-02-10',
    reduction: 60
  }
];

const feedItems = [
  {
    id: '1',
    userId: 'user1',
    username: 'John D.',
    action: 'reduced their transportation emissions',
    reduction: 15,
    timestamp: '2024-02-15T10:30:00'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'Sarah M.',
    action: 'switched to renewable energy',
    reduction: 25,
    timestamp: '2024-02-15T09:15:00'
  }
];

const Community = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Your Achievements</h2>
          {achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
        
        <div>
          <CommunityFeed items={feedItems} />
        </div>
      </div>
    </div>
  );
};

export default Community;