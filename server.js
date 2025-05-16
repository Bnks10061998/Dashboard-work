
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

import User from './src/models/User.js';
import Client from './src/models/Client.js';
import Project from './src/models/Project.js';

import workRoutes from './src/routes/workRoutes.js';
import referralRoutes from './src/routes/referralRoutes.js';
import galleryRoutes from './src/routes/galleryRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve uploaded files statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api/work', workRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/gallery', galleryRoutes);

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.dbName })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ==================== AUTH ROUTES ====================
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '80h' });
    res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ==================== CLIENT ROUTES ====================
app.get('/api/clients', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

app.post('/api/clients', async (req, res) => {
  const newClient = new Client(req.body);
  await newClient.save();
  res.status(201).json(newClient);
});

app.put('/api/clients/:id', async (req, res) => {
  const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/clients/:id', async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: 'Client deleted' });
});

// ==================== PROJECT ROUTES ====================
app.get('/api/projects', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status } = req.query;
    const query = {
      name: { $regex: search, $options: 'i' },
      ...(status ? { status } : {}),
    };

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ projects, total });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(newProject);
});

app.get('/api/projects/:id', authenticateToken, async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
