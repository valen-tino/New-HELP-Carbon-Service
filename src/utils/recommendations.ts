// Recommendation categories and their corresponding thresholds
const THRESHOLDS = {
  transportation: 100, // kg CO2e per month
  energy: 200,
  diet: 150
};

export const generateRecommendations = (emissions: { [key: string]: number }) => {
  const recommendations = [];
  
  if (emissions.transportation > THRESHOLDS.transportation) {
    recommendations.push({
      category: 'transportation',
      tips: [
        'Consider carpooling or using public transport',
        'Try cycling for short distances',
        'Combine multiple errands into one trip'
      ]
    });
  }

  if (emissions.energy > THRESHOLDS.energy) {
    recommendations.push({
      category: 'energy',
      tips: [
        'Switch to LED light bulbs',
        'Use natural lighting when possible',
        'Optimize thermostat settings'
      ]
    });
  }

  if (emissions.diet > THRESHOLDS.diet) {
    recommendations.push({
      category: 'diet',
      tips: [
        'Consider meat-free days',
        'Buy local, seasonal produce',
        'Reduce food waste'
      ]
    });
  }

  return recommendations;
};