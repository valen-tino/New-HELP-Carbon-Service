import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Get educational resources
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    const resources = await mongoose.model('EducationalContent').find(filter)
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resource = await mongoose.model('EducationalContent').findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;