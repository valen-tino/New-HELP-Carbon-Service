import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import activitiesRouter from './routes/activities.js';
import blogsRouter from './routes/blogs.js';
import historyRouter from './routes/history.js';
import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';
import achievementsRouter from './routes/achievements.js';
import profileRouter from './routes/profile.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Mongo only once
let dbPromise;
async function ensureDatabase() {
  if (!dbPromise) {
    dbPromise = connectDB();
  }
  await dbPromise;
}

// Routes - Remove /api prefix from here since we'll handle it in the frontend
app.use('/auth', authRouter);
app.use('/activities', activitiesRouter);
app.use('/blogs', blogsRouter);
app.use('/history', historyRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/achievements', achievementsRouter);
app.use('/profile', profileRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'HCS API is running' });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  ensureDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Failed to start server:', error);
      process.exit(1);
    });
} else {
  // Pre-connect to MongoDB in serverless environment
  ensureDatabase().catch((err) => {
    console.error('MongoDB connection error:', err);
  });
}

export default app;
