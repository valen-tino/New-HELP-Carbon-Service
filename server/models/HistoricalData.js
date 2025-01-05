import mongoose from 'mongoose';

const historicalDataSchema = new mongoose.Schema({
  history_id: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(Math.random() * 1000000)
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  history_analytics: {
    type: String,
    required: true
  },
  transportation_emission_data: {
    type: Number,
    required: true,
    default: 0
  },
  energy_emission_data: {
    type: Number,
    required: true,
    default: 0
  },
  diet_emission_data: {
    type: Number,
    required: true,
    default: 0
  },
  total_emission_data: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('HistoricalData', historicalDataSchema);