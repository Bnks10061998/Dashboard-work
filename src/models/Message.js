import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  userId: Number,
  message: {
    from: String,
    text: String,
    image: String,
    timestamp: Date,
  },
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
