// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken'; 
// import User from './src/models/User.js';
// import workRoutes from './src/routes/workRoutes.js';
// import Client from './src/models/Client.js';

// import referralRoutes from './src/routes/referralRoutes.js';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;


// // Middleware,routes
// app.use(cors());
// // app.use(bodyParser.json());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use('/uploads', express.static('uploads'));
// app.use('/api/work', workRoutes);

// // app.use('/uploads', express.static('uploads')); 
// app.use('/api/referrals', referralRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URL, {
//   dbName: process.env.dbName,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { fullName, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
//     const user = new User({ fullName, email, password: hashedPassword });
//     await user.save();
//     res.status(200).json({ message: 'Signup successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// //Client List
// app.get('/api/clients', async (req, res) => {
//   const clients = await Client.find();
//   res.json(clients);
// });

// app.post('/api/clients', async (req, res) => {
//   const newClient = new Client(req.body);
//   await newClient.save();
//   res.status(201).json(newClient);
// });

// app.put('/api/clients/:id', async (req, res) => {
//   const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// app.delete('/api/clients/:id', async (req, res) => {
//   await Client.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Client deleted' });
// });

// // Login Route with JWT
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '10h' }
//     );

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// import User from './src/models/User.js';
// import Client from './src/models/Client.js';

// import workRoutes from './src/routes/workRoutes.js';
// import referralRoutes from './src/routes/referralRoutes.js';
// import projectRoutes from './src/routes/projectRoutes.js'; // ✅ NEW

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use('/uploads', express.static('uploads'));

// // API Routes
// app.use('/api/work', workRoutes);
// app.use('/api/referrals', referralRoutes);
// app.use('/api/projects', projectRoutes); // ✅ NEW
// app.use('/api/clients', async (req, res, next) => {
//   if (req.method === 'GET') {
//     const clients = await Client.find();
//     return res.json(clients);
//   }
//   next();
// });

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URL, {
//   dbName: process.env.dbName,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { fullName, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
//     const user = new User({ fullName, email, password: hashedPassword });
//     await user.save();
//     res.status(200).json({ message: 'Signup successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '10h' }
//     );

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Client CRUD routes
// app.post('/api/clients', async (req, res) => {
//   try {
//     const newClient = new Client(req.body);
//     await newClient.save();
//     res.status(201).json(newClient);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.put('/api/clients/:id', async (req, res) => {
//   try {
//     const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.delete('/api/clients/:id', async (req, res) => {
//   try {
//     await Client.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Client deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// import User from './src/models/User.js';
// import Client from './src/models/Client.js';
// import Project from './src/models/Project.js';
// import workRoutes from './src/routes/workRoutes.js';
// import referralRoutes from './src/routes/referralRoutes.js';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use('/uploads', express.static('uploads'));

// // JWT Authentication Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access token required' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.user = user;
//     next();
//   });
// };

// // Routes
// app.use('/api/work', workRoutes);
// app.use('/api/referrals', referralRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URL, { dbName: process.env.dbName })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Auth Routes
// app.post('/api/signup', async (req, res) => {
//   const { fullName, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
//     const user = new User({ fullName, email, password: hashedPassword });
//     await user.save();
//     res.status(200).json({ message: 'Signup successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: '10h',
//     });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Client CRUD
// app.get('/api/clients', async (req, res) => {
//   const clients = await Client.find();
//   res.json(clients);
// });

// app.post('/api/clients', async (req, res) => {
//   const newClient = new Client(req.body);
//   await newClient.save();
//   res.status(201).json(newClient);
// });

// app.put('/api/clients/:id', async (req, res) => {
//   const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// app.delete('/api/clients/:id', async (req, res) => {
//   await Client.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Client deleted' });
// });

// // ✅ Project CRUD with Auth and Pagination
// app.get('/api/projects', authenticateToken, async (req, res) => {
//   const { page = 1, limit = 10, search = '', status } = req.query;
//   const query = {
//     name: { $regex: search, $options: 'i' },
//     ...(status ? { status } : {}),
//   };

//   const total = await Project.countDocuments(query);
//   const projects = await Project.find(query)
//     .skip((page - 1) * limit)
//     .limit(Number(limit));

//   res.json({ projects, total });
// });

// app.post('/api/projects', authenticateToken, async (req, res) => {
//   const newProject = new Project(req.body);
//   await newProject.save();
//   res.status(201).json(newProject);
// });

// app.get('/api/projects/:id', authenticateToken, async (req, res) => {
//   const project = await Project.findById(req.params.id);
//   res.json(project);
// });

// app.put('/api/projects/:id', authenticateToken, async (req, res) => {
//   const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
//   await Project.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Project deleted' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './src/models/User.js';
import Client from './src/models/Client.js';
import Project from './src/models/Project.js';
import workRoutes from './src/routes/workRoutes.js';
import referralRoutes from './src/routes/referralRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));

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

// Routes
app.use('/api/work', workRoutes);
app.use('/api/referrals', referralRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, { dbName: process.env.dbName })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Auth Routes
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

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    });

    res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Client CRUD
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

// ✅ Project CRUD with Auth and Pagination
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
