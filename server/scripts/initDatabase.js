import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Activity from '../models/Activity.js';

dotenv.config();

const initDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize collections
    await Promise.all([
      initializeCollection(User),
      initializeCollection(Activity)
    ]);
    
    console.log('Collections initialized successfully');
    
    // Initialize users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@hcs.com',
        username: 'admin',
        password: 'admin2024',
        role: 'admin',
        reminderFrequency: 'weekly'
      },
      {
        name: 'John Doe',
        email: 'john@hcs.com',
        username: 'johndoe',
        password: 'user2024',
        role: 'user',
        reminderFrequency: 'weekly'
      }
    ];

    for (const userData of users) {
      try {
        const userExists = await User.findOne({ email: userData.email });
        if (!userExists) {
          const salt = await bcrypt.genSalt(10);
          userData.password = await bcrypt.hash(userData.password, salt);
          
          await User.create(userData);
          console.log(`Created user: ${userData.email}`);
        } else {
          console.log(`User ${userData.email} already exists`);
        }
      } catch (error) {
        console.error(`Error creating user ${userData.email}:`, error.message);
      }
    }

    console.log('\nDatabase initialization completed!');
    console.log('\nSample Users:');
    console.log('1. Admin - admin@hcs.com / admin2024');
    console.log('2. User  - john@hcs.com / user2024');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

async function initializeCollection(Model) {
  try {
    await Model.createCollection();
    console.log(`Collection ${Model.collection.name} initialized`);
  } catch (error) {
    console.error(`Error initializing ${Model.collection.name}:`, error.message);
  }
}

initDatabase();