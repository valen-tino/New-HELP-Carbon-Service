import React from 'react';
import EmissionSummary from '../components/dashboard/EmissionSummary';
import ProgressChart from '../components/dashboard/ProgressChart';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import { generateRecommendations } from '../utils/recommendations';

const Dashboard = () => {
  // Example data - in production, this would come from your API
  const emissions = {
    transportation: 85,
    energy: 120,
    diet: 95
  };

  const previousEmissions = {
    transportation: 100,
    energy: 150,
    diet: 90
  };

  const recommendations = generateRecommendations(emissions);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Carbon Footprint Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(emissions).map(([category, value]) => (
          <EmissionSummary
            key={category}
            category={category}
            currentEmissions={value}
            previousEmissions={previousEmissions[category]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Monthly Goals</h2>
          <ProgressChart
            current={300}
            target={400}
            label="Total Emissions"
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