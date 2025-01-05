import express from 'express';
import Activity from '../models/Activity.js';
import { calculateEmission } from '../utils/emissionCalculator.js';

const router = express.Router();

// Log new activity
router.post('/', async (req, res) => {
  try {
    const { type, category, value } = req.body;
    const emissionValue = calculateEmission(type, category, value);
    
    const activity = new Activity({
      userId: req.user._id, // Will be set by auth middleware
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

// Get user's activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(10);
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;