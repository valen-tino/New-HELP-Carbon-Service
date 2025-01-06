import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import validator from "validator";
import { protect } from '../middleware/auth.js';

const router = express.Router();
//Register
router.post('/register', async (req, res) => {
  try {
    if(!req.body.name ||
      !req.body.email ||
      !req.body.username ||
      !req.body.password){
      return res.status(400).json({ message: 'Please fill all the field!' });
    }

    if(!validator.isEmail(req.body.email)){
      return res.status(400).json({ message: 'Email is not valid!' });
    }

    const checkEmailExists = await User.findOne({ email: req.body.email });
    if(checkEmailExists){
      return res.status(400).json({ message: 'Email is already registered!' });
    }
    
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    console.log(verificationToken);

    const user = new User({
      ...req.body,
      password: req.body.password,
      verificationToken,
    });
    await user.save();
    res.status(200).json("User has been created!");
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Check user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('Login successful:', email);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        reminderFrequency: user.reminderFrequency
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update', protect, async (req, res) => {
  const { name, email, username } = req.body;
  try {
    const user = await User.findById(req.user._id).select('-password');
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    if(name && name !== user.name){
      user.name = name;
    }

    if(email && email !== user.email){
      const checkEmail = await User.findOne({ email: email.toLowerCase() });
      if(checkEmail){
        return res.status(400).json({ message: 'Sorry, email has already been used.' });
      }
      user.email = email.toLowerCase();
    }

    if(username && username !== user.username){
      const checkUsername = await User.findOne({ username: username.trim() });
      if(checkUsername){
        return res.status(400).json({ message: 'Username has already been used.' });
      }
      user.username = username.trim();
    }

    await user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      reminderFrequency: user.reminderFrequency
    });
  } catch (error) {
    console.error('Update error: ', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;