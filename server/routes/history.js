import express from 'express';
import HistoricalData from '../models/HistoricalData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get historical data with period filter
router.get('/', protect, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    const historicalData = await HistoricalData.find({
      user_id: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics
router.get('/analytics', protect, async (req, res) => {
  try {
    const latestData = await HistoricalData.findOne({
      user_id: req.user._id
    }).sort({ date: -1 });

    if (!latestData) {
      return res.json({ analytics: 'No historical data available yet.' });
    }

    res.json({ analytics: latestData.history_analytics });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update historical data after activity logging
router.post('/', protect, async (req, res) => {
  try {
    const { transportation, energy, diet } = req.body;
    const total = transportation + energy + diet;

    // Generate analytics text
    const analytics = generateAnalytics({ transportation, energy, diet, total });

    const historicalData = new HistoricalData({
      user_id: req.user._id,
      history_analytics: analytics,
      transportation_emission_data: transportation,
      energy_emission_data: energy,
      diet_emission_data: diet,
      total_emission_data: total
    });

    await historicalData.save();
    res.status(201).json(historicalData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

function generateAnalytics(data) {
  const { transportation, energy, diet, total } = data;
  
  let analysis = 'Based on your recent activities, ';
  
  // Add specific insights based on the data
  const highestEmission = Math.max(transportation, energy, diet);
  if (highestEmission === transportation) {
    analysis += 'transportation is your largest source of emissions. Consider using public transport or carpooling more often. ';
  } else if (highestEmission === energy) {
    analysis += 'energy consumption is your main environmental impact. Try implementing energy-saving measures at home. ';
  } else {
    analysis += 'dietary choices are significantly impacting your carbon footprint. Consider incorporating more plant-based meals. ';
  }

  return analysis;
}

export default router;