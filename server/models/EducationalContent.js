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
  content: {
    article: {
      body: String,
      readingTime: Number
    },
    video: {
      url: String,
      duration: Number
    },
    infographic: {
      imageUrl: String,
      altText: String
    }
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  published_at: {
    type: Date,
    default: Date.now,
    get: (v) => v?.toISOString(),
    set: (v) => new Date(v)
  }
}, {
  timestamps: true,
  toJSON: { getters: true }
});

export default mongoose.model('EducationalContent', educationalContentSchema);