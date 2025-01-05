import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// Get user's emission summary
router.get('/summary', async (req, res) => {
  try {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const [currentEmissions, previousEmissions] = await Promise.all([
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

    res.json({ currentEmissions, previousEmissions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;