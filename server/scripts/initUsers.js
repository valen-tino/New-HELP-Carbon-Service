import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const initUsers = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('Connected to MongoDB successfully');
    
    // Sample users data
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
        // Check if user already exists
        const userExists = await User.findOne({ email: userData.email });
        if (userExists) {
          console.log(`User ${userData.email} already exists`);
          continue;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        // Create user
        await User.create(userData);
        console.log(`Created ${userData.role}: ${userData.email}`);
      } catch (error) {
        console.error(`Error creating user ${userData.email}:`, error.message);
      }
    }

    console.log('\nSample Users Created:');
    console.log('1. Admin User');
    console.log('   Email: admin@hcs.com');
    console.log('   Password: admin2024');
    console.log('\n2. Regular User');
    console.log('   Email: john@hcs.com');
    console.log('   Password: user2024');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

initUsers();