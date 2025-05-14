// import mongoose from 'mongoose';

// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   client: { type: String, required: true },
//   status: { type: String, enum: ['In Progress', 'Completed', 'Pending'], default: 'Pending' },
//   deadline: { type: String },
//   description: { type: String },
//   priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
//   teamMembers: [{ type: String }]
// }, { timestamps: true });

// export default mongoose.model('Project', projectSchema);


import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  client: String,
  status: String,
  deadline: String,
  description: String,
  priority: String,
  teamMembers: [String],
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
