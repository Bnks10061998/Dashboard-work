import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';

import User from './src/models/User.js';
import Client from './src/models/Client.js';
import Project from './src/models/Project.js';

import workRoutes from './src/routes/workRoutes.js';
import referralRoutes from './src/routes/referralRoutes.js';
import galleryRoutes from './src/routes/galleryRoutes.js';
import templateRoutes from './src/routes/templateRoutes.js';
import invoiceRoutes from './src/routes/invoiceRoutes.js';
import emailRoutes from './src/routes/email.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import quotationRoutes from './src/routes/quotationRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Replace with your frontend URL in production
    methods: ["GET", "POST"]
  }
});

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('⚡️ User connected:', socket.id);

  // Example socket event handler: broadcast chat message to all clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // TODO: Add more socket events like private messaging, typing indicators, etc.
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads
app.use('/uploads/templates', express.static(path.join(__dirname, 'uploads/templates')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// JWT Authentication Middleware
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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.dbName })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --------- AUTH ROUTES ---------
// Signup
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
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

// --------- CLIENT ROUTES ---------
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    console.log('Fetched clients:', clients); // 👈 log result
    res.json(clients);
  } catch (err) {
    console.error('Error fetching clients:', err); // 👈 improved log
    res.status(500).json({ message: 'Server error' });
  }
});

// app.get('/api/clients', async (req, res) => {
//   try {
//     const clients = await Client.find();
//     res.json(clients);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.post('/api/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------- PROJECT ROUTES (Protected) ---------
app.get('/api/projects', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status } = req.query;

    const query = {
      name: { $regex: search, $options: 'i' },
      ...(status ? { status } : {}),
    };

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ projects, total });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------- ROUTES IMPORTED FROM SEPARATE FILES ---------
app.use('/api/invoices', invoiceRoutes);
app.use('/api/send-email', emailRoutes);
app.use('/api/work', workRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/messages', messageRoutes);  // You can use this for messages REST APIs

// 404 Handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});



// Start server with Socket.IO attached
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
