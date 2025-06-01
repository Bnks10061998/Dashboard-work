import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  client: String,
  amount: Number,
  paymentDate: Date,
  status: String,
  description: String,
  imageUrl: String
}, { timestamps: true });



export default mongoose.model('Payment', PaymentSchema);
