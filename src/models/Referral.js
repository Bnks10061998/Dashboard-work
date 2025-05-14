// import mongoose from 'mongoose';

// const referralSchema = new mongoose.Schema({
//   referralName: { type: String, required: true },
//   referralCode: { type: String, required: true },
//   date: { type: String, required: true },
//   status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
//   imageUrl: { type: String }
// });

// export default mongoose.model('Referral', referralSchema);


import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referralName: { type: String, required: true },
  referralCode: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  imageUrl: { type: String }  // optional
});

const Referral = mongoose.model('Referral', referralSchema);

export default Referral;
