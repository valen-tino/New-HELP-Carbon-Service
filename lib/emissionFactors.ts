// Emission factors for different activities
export const emissionFactors = {
  transportation: {
    'Car': 0.2, // kg CO2e per km
    'Public Transport': 0.08,
    'Bicycle': 0,
    'Walking': 0,
    'Flight': 0.25,
  },
  energy: {
    'Electricity': 0.5, // kg CO2e per kWh
    'Natural Gas': 0.4,
    'Heating Oil': 0.7,
    'Solar': 0,
  },
  diet: {
    'Meat-based': 3.3, // kg CO2e per meal
    'Vegetarian': 1.7,
    'Vegan': 1.5,
    'Mixed': 2.5,
  },
} as const;