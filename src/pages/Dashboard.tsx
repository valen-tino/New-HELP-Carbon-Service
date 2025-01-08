// \src\pages\Dashboard.tsx
import React, { useState, useEffect } from 'react';
import EmissionSummary from '../components/dashboard/EmissionSummary';
import ProgressChart from '../components/dashboard/ProgressChart';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import { getActivityStats } from '../services/activityService';
import { generateRecommendations } from '../utils/recommendations';
import type { ActivityStats } from '../types/activity';

const Dashboard = () => {
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const data = await getActivityStats();
      setStats(data);
    } catch (err) {
      setError('Failed to load dashboard statistics');
      console.error('Error loading stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-b-2 border-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-8 text-center text-gray-600">
        No data available
      </div>
    );
  }

  const recommendations = generateRecommendations({
    transportation: stats.currentMonth.transportation,
    energy: stats.currentMonth.energy,
    diet: stats.currentMonth.diet
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Carbon Footprint Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Object.entries(stats.currentMonth).map(([category, value]) => (
          <EmissionSummary
            key={category}
            category={category as 'transportation' | 'energy' | 'diet'}
            currentEmissions={value}
            previousEmissions={stats.previousMonth[category as keyof typeof stats.previousMonth]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Monthly Progress</h2>
          <ProgressChart
            current={stats.progress}
            target={100}
            label="Emission Reduction Goal"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Recommendations</h2>
          {recommendations.map((rec, index) => (
            <RecommendationCard key={index} recommendation={rec} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;