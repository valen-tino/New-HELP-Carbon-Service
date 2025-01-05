import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import activitiesRouter from './routes/activities.js';
import blogsRouter from './routes/blogs.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Remove /api prefix from here since we'll handle it in the frontend
app.use('/auth', authRouter);
app.use('/activities', activitiesRouter);
app.use('/blogs', blogsRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'HCS API is running' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();