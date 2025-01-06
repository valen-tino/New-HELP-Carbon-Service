import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all users
router.get('/', protect, async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get single user
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user
router.put('/:id', protect, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Delete user
router.delete('/:id', protect, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// Get user statistics
router.get('/stats', protect, async (req, res) => {
    try {
      console.log('Fetching user statistics...'); // Debug log
  
      // Get the first day of current month
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      // Get total users count
      const totalUsers = await User.countDocuments();
      console.log('Total users:', totalUsers); // Debug log
      
      // Get new users this month
      const newUsers = await User.countDocuments({
        createdAt: { $gte: firstDayOfMonth }
      });
      console.log('New users this month:', newUsers); // Debug log
      
      // Get active users (users who have logged in within the last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const activeUsers = await User.countDocuments({
        lastLoginAt: { $gte: thirtyDaysAgo }
      });
      console.log('Active users:', activeUsers); // Debug log
  
      const stats = {
        totalUsers,
        newUsers,
        activeUsers
      };
      
      console.log('Returning stats:', stats); // Debug log
      res.json(stats);
    } catch (error) {
      console.error('Error getting user stats:', error);
      res.status(500).json({ 
        message: 'Failed to get user statistics',
        error: error.message 
      });
    }
  });

export default router;