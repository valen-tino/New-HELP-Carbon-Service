import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Recommendation {
  category: string;
  tips: string[];
}

interface Props {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<Props> = ({ recommendation }) => {
  return (
    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-green-800 capitalize">
          {recommendation.category} Recommendations
        </h3>
      </div>
      <ul className="space-y-2">
        {recommendation.tips.map((tip, index) => (
          <li key={index} className="text-green-700 text-sm flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationCard;