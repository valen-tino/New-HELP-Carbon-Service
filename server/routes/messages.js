import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user's messages (including community messages)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: req.user._id },
        { receiver_id: req.user._id },
        { is_community: true }
      ]
    })
    .populate({
      path: 'sender_id',
      select: 'name username'
    })
    .populate({
      path: 'receiver_id',
      select: 'name username'
    })
    .sort({ sent_at: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a message
router.post('/', protect, async (req, res) => {
  try {
    const { receiver_id, content } = req.body;
    
    const message = new Message({
      sender_id: req.user._id,
      content,
      is_community: receiver_id === 'community',
      ...(receiver_id !== 'community' && { receiver_id })
    });

    await message.save();
    
    // Populate sender info with both name and username
    const populatedMessage = await Message.findById(message._id)
      .populate({
        path: 'sender_id',
        select: 'name username'
      })
      .populate({
        path: 'receiver_id',
        select: 'name username'
      });

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error('Message creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Mark message as read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.id,
      $or: [
        { receiver_id: req.user._id },
        { is_community: true }
      ]
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.status = 'read';
    message.read_at = new Date();
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;