import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  title: String,
  category: String,
  rating: Number,
  imageUrl: String,
}, { timestamps: true });

const Template = mongoose.model('Template', templateSchema);
export default Template; 
