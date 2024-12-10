import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ['transportation', 'energy', 'diet'],
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: {
    reminderFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly',
    },
    transportationPreferences: [String],
    dietaryPreferences: [String],
  },
  activities: [activitySchema],
  carbonFootprint: {
    transportation: { type: Number, default: 0 },
    energy: { type: Number, default: 0 },
    diet: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', userSchema);