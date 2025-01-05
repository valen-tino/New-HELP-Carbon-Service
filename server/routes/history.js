import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// Get historical data
router.get('/:userId', async (req, res) => {
  try {
    const { period } = req.query;
    const userId = req.params.userId;

    let dateFilter = {};
    const now = new Date();

    switch (period) {
      case 'week':
        dateFilter = {
          date: {
            $gte: new Date(now.setDate(now.getDate() - 7))
          }
        };
        break;
      case 'month':
        dateFilter = {
          date: {
            $gte: new Date(now.setMonth(now.getMonth() - 1))
          }
        };
        break;
      case 'year':
        dateFilter = {
          date: {
            $gte: new Date(now.setFullYear(now.getFullYear() - 1))
          }
        };
        break;
    }

    const activities = await Activity.find({
      userId,
      ...dateFilter
    }).sort({ date: 1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;