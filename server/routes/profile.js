import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/', protect, async (req, res) => {
    try {
      let profile = await Profile.findOne({ userId: req.user._id });
      
      if (!profile) {
        profile = await Profile.create({
          userId: req.user._id,
          reminderSettings: {
            frequency: req.user.reminderFrequency,
            enabled: true
          }
        });
      }
  
      res.json(profile);
    } catch (error) {
      console.error('Error getting profile:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update user profile
  router.put('/', protect, async (req, res) => {
    try {
      const { transportationPreferences, energyPreferences, dietaryPreferences, reminderSettings } = req.body;
  
      let profile = await Profile.findOneAndUpdate(
        { userId: req.user._id },
        {
          transportationPreferences,
          energyPreferences,
          dietaryPreferences,
          reminderSettings
        },
        { new: true, upsert: true }
      );
  
      // Update user reminder frequency
      await User.findByIdAndUpdate(req.user._id, {
        reminderFrequency: reminderSettings.frequency
      });
  
      res.json(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update reminder settings
  router.patch('/reminders', protect, async (req, res) => {
    try {
      const { frequency, enabled } = req.body;
  
      const profile = await Profile.findOneAndUpdate(
        { userId: req.user._id },
        {
          'reminderSettings.frequency': frequency,
          'reminderSettings.enabled': enabled
        },
        { new: true }
      );
  
      // Update user reminder frequency
      await User.findByIdAndUpdate(req.user._id, {
        reminderFrequency: frequency
      });
  
      res.json(profile);
    } catch (error) {
      console.error('Error updating reminder settings:', error);
      res.status(500).json({ message: error.message });
    }
  });
export default router;