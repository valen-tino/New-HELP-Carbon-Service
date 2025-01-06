import { useState, useEffect } from 'react';
import { Achievement } from '../types/achievement';
import { getAchievements, shareAchievement as shareAchievementApi } from '../services/achievementService';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (err) {
      setError('Failed to load achievements');
      console.error('Error loading achievements:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareAchievement = async (achievement: Achievement) => {
    try {
      await shareAchievementApi(achievement._id);
      
      // Try to share via Web Share API
      if (navigator.share) {
        await navigator.share({
          title: `I achieved ${achievement.title} on EcoTracker! 🌱`,
          text: `I reduced my carbon footprint by ${achievement.reduction_amount}kg CO2e. Join me in making a difference!`,
          url: window.location.origin
        });
      }

      // Update achievement in state
      setAchievements(prev =>
        prev.map(a =>
          a._id === achievement._id ? { ...a, shared: true } : a
        )
      );

      return true;
    } catch (err) {
      setError('Failed to share achievement');
      console.error('Error sharing achievement:', err);
      return false;
    }
  };

  return {
    achievements,
    isLoading,
    error,
    shareAchievement: handleShareAchievement
  };
};