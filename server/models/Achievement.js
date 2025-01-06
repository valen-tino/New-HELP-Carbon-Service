import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['transportation', 'energy', 'diet'],
    required: true
  },
  reduction_amount: {
    type: Number,
    required: true
  },
  earned_at: {
    type: Date,
    default: Date.now
  },
  shared: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Achievement', achievementSchema);