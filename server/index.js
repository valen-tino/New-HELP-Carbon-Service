import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import activitiesRouter from './routes/activities.js';
import dashboardRouter from './routes/dashboard.js';
import educationRouter from './routes/education.js';
import historyRouter from './routes/history.js';
import socialRouter from './routes/social.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/education', educationRouter);
app.use('/api/social', socialRouter);
app.use('/api/history', historyRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});