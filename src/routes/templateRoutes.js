import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Template from '../models/Template.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/templates/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload new template
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, category, rating } = req.body;
    const imageUrl = `/uploads/templates/${req.file.filename}`;

    const template = new Template({ title, category, rating, imageUrl });
    await template.save();

    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload template' });
  }
});

// Get all templates (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, minRating } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minRating) filter.rating = { $gte: Number(minRating) };

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// Update a template
router.put('/:id', async (req, res) => {
  try {
    const { title, category, rating } = req.body;
    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { title, category, rating },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update template' });
  }
});

// Delete a template
router.delete('/:id', async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

export default router;
