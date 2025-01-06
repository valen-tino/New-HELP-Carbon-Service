import express from 'express';
import EducationalContent from '../models/EducationalContent.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await EducationalContent.find()
      .sort({ published_at: -1 })
      .populate('admin_id', 'name');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog (public)
router.get('/:id', async (req, res) => {
  try {
    const blog = await EducationalContent.findOne({ educational_content_id: req.params.id })
      .populate('admin_id', 'name');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Increment views
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create blog (admin only)
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const blog = new EducationalContent({
      ...req.body,
      admin_id: req.user._id,
      views: 0,
      published_at: new Date() // Ensure we create a proper Date object
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Blog creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update blog (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const blog = await EducationalContent.findOneAndUpdate(
      { educational_content_id: req.params.id },
      { 
        ...req.body,
        // Don't update these fields from request
        admin_id: undefined,
        educational_content_id: undefined,
        views: undefined
      },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const blog = await EducationalContent.findOneAndDelete({ 
      educational_content_id: req.params.id 
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

// Get single blog by category and slug
router.get('/:category/:slug', async (req, res) => {
  try {
    const { category, slug } = req.params;
    const title = slug.split('-').join(' '); // Convert slug back to title

    const blog = await EducationalContent.findOne({
      content_type: category,
      title: new RegExp(title, 'i') // Case insensitive search
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment view count
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});