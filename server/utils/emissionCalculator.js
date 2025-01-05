// Emission factors (CO2e kg per unit)
const EMISSION_FACTORS = {
  transportation: {
    car: 0.2, // per km
    bus: 0.08, // per km
    train: 0.04, // per km
    plane: 0.25 // per km
  },
  energy: {
    electricity: 0.5, // per kWh
    gas: 0.2, // per kWh
    oil: 0.3 // per liter
  },
  diet: {
    meat: 6.0, // per kg
    dairy: 2.0, // per kg
    vegetables: 0.5 // per kg
  }
};

export const calculateEmission = (type, category, value) => {
  return EMISSION_FACTORS[type][category] * value;
};