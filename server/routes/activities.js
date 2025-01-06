import express from 'express';
import Activity from '../models/Activity.js';
import { protect } from '../middleware/auth.js';
import { calculateEmission } from '../utils/emissionCalculator.js';

const router = express.Router();

// Log new activity
router.post('/', protect, async (req, res) => {
  try {
    const { type, category, value } = req.body;
    const emissionValue = calculateEmission(type, category, value);
    
    const activity = new Activity({
      userId: req.user._id,
      type,
      category,
      value,
      emissionValue
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's activities with period filter
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

    const activities = await Activity.find({
      userId: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get activity statistics
router.get('/stats', protect, async (req, res) => {
  try {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const [currentMonthStats, previousMonthStats] = await Promise.all([
      Activity.aggregate([
        {
          $match: {
            userId: req.user._id,
            date: { $gte: currentMonth }
          }
        },
        {
          $group: {
            _id: '$type',
            total: { $sum: '$emissionValue' }
          }
        }
      ]),
      Activity.aggregate([
        {
          $match: {
            userId: req.user._id,
            date: {
              $gte: previousMonth,
              $lt: currentMonth
            }
          }
        },
        {
          $group: {
            _id: '$type',
            total: { $sum: '$emissionValue' }
          }
        }
      ])
    ]);

    const formatStats = (stats) => {
      const result = { transportation: 0, energy: 0, diet: 0 };
      stats.forEach(stat => {
        result[stat._id] = stat.total;
      });
      return result;
    };

    const currentStats = formatStats(currentMonthStats);
    const previousStats = formatStats(previousMonthStats);

    // Calculate total reduction
    const currentTotal = Object.values(currentStats).reduce((a, b) => a + b, 0);
    const previousTotal = Object.values(previousStats).reduce((a, b) => a + b, 0);
    const totalReduction = previousTotal > 0 
      ? ((previousTotal - currentTotal) / previousTotal) * 100 
      : 0;

    // Monthly goal (example: 20% reduction from previous month)
    const monthlyGoal = previousTotal * 0.8;
    const progress = monthlyGoal > 0 
      ? (currentTotal / monthlyGoal) * 100 
      : 0;

    res.json({
      currentMonth: currentStats,
      previousMonth: previousStats,
      totalReduction,
      monthlyGoal,
      progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get emission history
router.get('/history', protect, async (req, res) => {
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

    const history = await Activity.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            type: '$type'
          },
          total: { $sum: '$emissionValue' }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          emissions: {
            $push: {
              type: '$_id.type',
              value: '$total'
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const formattedHistory = history.map(day => {
      const result = {
        date: day._id,
        transportation: 0,
        energy: 0,
        diet: 0
      };
      
      day.emissions.forEach(emission => {
        result[emission.type] = emission.value;
      });
      
      result.total = Object.values(result)
        .filter(v => typeof v === 'number')
        .reduce((a, b) => a + b, 0);
      
      return result;
    });

    res.json(formattedHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;