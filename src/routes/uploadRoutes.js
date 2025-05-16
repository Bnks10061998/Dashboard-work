// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const Image = require('../models/Image'); // Mongoose model

router.get('/', async (req, res) => {
  const images = await Image.find().sort({ title: 1 });
  res.json(images);
});

router.post('/', async (req, res) => {
  const newImage = new Image(req.body);
  await newImage.save();
  res.status(201).json(newImage);
});

module.exports = router;
