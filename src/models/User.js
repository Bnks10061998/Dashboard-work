import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('User', userSchema);

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true }, // existing signup name field
//   email: { type: String, required: true, unique: true }, // existing
//   password: { type: String, required: true }, // existing

//   // Add profile fields
//   phone: { type: String, default: "" },
//   bio: { type: String, default: "" },
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);
