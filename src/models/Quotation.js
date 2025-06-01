

import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  number: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
  validity: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  description: { type: String },
  detailedDescription: { type: String },
  notes: { type: String },
  addressLine: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  team: { type: String },
  condition: { type: String },
}, { timestamps: true });

export default mongoose.model('Quotation', quotationSchema);
