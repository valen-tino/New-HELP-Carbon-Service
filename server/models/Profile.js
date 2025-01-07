import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  transportationPreferences: {
    primaryMode: {
      type: String,
      enum: ['car', 'bus', 'train', 'plane'],
      default: 'car'
    },
    averageDistance: {
      type: Number,
      default: 0
    }
  },
  energyPreferences: {
    type: {
      type: String,
      enum: ['electricity', 'gas', 'oil'],
      default: 'electricity'
    },
    averageConsumption: {
      type: Number,
      default: 0
    }
  },
  dietaryPreferences: {
    type: {
      type: String,
      enum: ['meat', 'dairy', 'vegetables'],
      default: 'meat'
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    }
  },
  reminderSettings: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    enabled: {
      type: Boolean,
      default: true
    },
    lastReminder: {
      type: Date,
      default: null
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Profile', profileSchema);