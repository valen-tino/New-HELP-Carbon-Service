import express from 'express';
import Activity from '../models/Activity.js';
import User from '../models/User.js';

const router = express.Router();

// Get community feed
router.get('/feed', async (req, res) => {
  try {
    const activities = await Activity.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          userId: 1,
          username: '$user.username',
          type: 1,
          emissionValue: 1,
          date: 1
        }
      },
      {
        $sort: { date: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user achievements
router.get('/achievements/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .limit(5);
    
    // Calculate achievements based on activity patterns
    const achievements = activities.map(activity => ({
      id: activity._id,
      title: `Reduced ${activity.type} emissions`,
      description: `Saved ${activity.emissionValue.toFixed(1)} kg CO2e`,
      date: activity.date,
      reduction: activity.emissionValue
    }));

    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;