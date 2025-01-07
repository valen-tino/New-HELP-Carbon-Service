import express from 'express';
import Achievement from '../models/Achievement.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user's achievements
router.get('/', protect, async (req, res) => {
  try {
    const achievements = await Achievement.find({ user_id: req.user._id })
      .sort({ earned_at: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Share achievement
router.post('/:id/share', protect, async (req, res) => {
  try {
    const achievement = await Achievement.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    achievement.shared = true;
    await achievement.save();

    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;