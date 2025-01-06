import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const initAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = {
      name: 'Admin User',
      email: 'admin@hcs.com',
      username: 'admin',
      password: 'admin2024',
      role: 'admin',
      reminderFrequency: 'weekly'
    };

    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    await User.create(adminUser);
    console.log('Admin user created successfully');
    console.log('Email: admin@hcs.com');
    console.log('Password: admin2024');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};