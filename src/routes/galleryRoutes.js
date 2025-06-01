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
// router.get('/', async (req, res) => {
//   try {
//     const images = await Gallery.find();
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch images' });
//   }
// });
// GET all images with pagination: /api/gallery?page=1&limit=10
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Gallery.countDocuments();
    const images = await Gallery.find()
      .skip(skip)
      .limit(limit)
      .sort({ uploadDate: -1 });

    res.json({ images, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

// PATCH update image metadata
router.patch('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    // Sanitize tags: comma-separated string to array
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);
    }

    const updatedImage = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!updatedImage) return res.status(404).json({ message: 'Image not found' });

    res.json(updatedImage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update image' });
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
