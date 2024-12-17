'use client';

import { CarbonFootprint } from '@/types/others';
import { Lightbulb } from 'lucide-react';

interface Props {
  footprint: CarbonFootprint;
}

export default function Recommendations({ footprint }: Props) {
  const getRecommendations = () => {
    const recommendations = [];
    
    if (footprint.transportationEmission > 100) {
      recommendations.push({
        category: 'Transportation',
        tips: [
          'Consider using public transportation more frequently',
          'Try carpooling with colleagues',
          'Switch to an electric or hybrid vehicle',
        ],
      });
    }
    
    if (footprint.energyEmission > 50) {
      recommendations.push({
        category: 'Energy',
        tips: [
          'Install LED light bulbs',
          'Use a programmable thermostat',
          'Consider solar panel installation',
        ],
      });
    }
    
    if (footprint.dietaryEmission > 30) {
      recommendations.push({
        category: 'Diet',
        tips: [
          'Try meat-free Mondays',
          'Choose local and seasonal produce',
          'Reduce food waste through meal planning',
        ],
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
        <h2 className="text-xl font-semibold">Personalized Recommendations</h2>
      </div>
      
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-lg font-medium text-gray-800">{rec.category}</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {rec.tips.map((tip, tipIndex) => (
                <li key={tipIndex}>{tip}</li>
              ))}
            </ul>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <p className="text-gray-600">
            Great job! Your carbon footprint is relatively low. Keep up the good work!
          </p>
        )}
      </div>
    </div>
  );
}