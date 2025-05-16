import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Multer config for storing uploads in /uploads/gallery
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/gallery';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// GET all images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

// GET image by ID (optional)
router.get('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch image' });
  }
});

// POST upload new images
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files;
    const { title, description = '', category = '', uploadDate = new Date().toISOString().split('T')[0], tags = '' } = req.body;

    if (!title || !files || files.length === 0) {
      return res.status(400).json({ message: 'Title and at least one image are required' });
    }

    const tagList = tags ? tags.split(',').map((tag) => tag.trim()).filter((tag) => tag) : [];

    const imageDocs = files.map((file) => ({
      title,
      description,
      category,
      uploadDate,
      tags: tagList,
      url: `/uploads/gallery/${file.filename}`,
    }));

    const savedImages = await Gallery.insertMany(imageDocs);
    res.status(201).json(savedImages);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

// DELETE an image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (image) {
      const filePath = path.join('./uploads/gallery', path.basename(image.url));
      fs.unlink(filePath, (err) => {
        if (err) console.error('File delete error:', err);
      });
      return res.json({ message: 'Image deleted' });
    } else {
      return res.status(404).json({ message: 'Image not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

export default router;
