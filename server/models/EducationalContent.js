import mongoose from 'mongoose';

const educationalContentSchema = new mongoose.Schema({
  educational_content_id: {
    type: Number,
    required: true,
    unique: true,
    default: () => Math.floor(Math.random() * 1000000)
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content_type: {
    type: String,
    enum: ['article', 'video', 'infographic'],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxLength: 255
  },
  description: {
    type: String,
    required: true
  },
  content_url: {
    type: String,
    required: true
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('EducationalContent', educationalContentSchema);