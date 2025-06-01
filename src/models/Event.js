import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});

export default mongoose.model('Event', eventSchema);


