import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  uploadDate: String,
  tags: [String],
  url: { type: String, required: true }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
