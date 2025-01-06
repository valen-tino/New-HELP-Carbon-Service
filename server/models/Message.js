import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
    maxLength: 1000
  },
  is_community: {
    type: Boolean,
    default: false
  },
  sent_at: {
    type: Date,
    default: Date.now
  },
  read_at: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  }
});

export default mongoose.model('Message', messageSchema);