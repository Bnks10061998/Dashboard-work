// import express from 'express';
// import Project from '../models/Project.js';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // ✅ JWT Authentication Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access token required' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid or expired token' });
//     req.user = user;
//     next();
//   });
// };

// // ✅ GET: List all projects with pagination + filtering
// router.get('/', authenticateToken, async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = '', status } = req.query;
//     const query = {
//       name: { $regex: search, $options: 'i' },
//       ...(status ? { status } : {}),
//     };

//     const total = await Project.countDocuments(query);
//     const projects = await Project.find(query)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     res.json({ projects, total });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching projects', error: err.message });
//   }
// });

// // ✅ GET: Get single project by ID
// router.get('/:id', authenticateToken, async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: 'Project not found' });
//     res.json(project);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching project', error: err.message });
//   }
// });

// // ✅ POST: Create new project
// router.post('/', authenticateToken, async (req, res) => {
//   try {
//     const newProject = new Project(req.body);
//     await newProject.save();
//     res.status(201).json(newProject);
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating project', error: err.message });
//   }
// });

// // ✅ PUT: Update project
// router.put('/:id', authenticateToken, async (req, res) => {
//   try {
//     const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: 'Project not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: 'Error updating project', error: err.message });
//   }
// });

// // ✅ DELETE: Delete project
// router.delete('/:id', authenticateToken, async (req, res) => {
//   try {
//     const deleted = await Project.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Project not found' });
//     res.json({ message: 'Project deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting project', error: err.message });
//   }
// });

// export default router;



import express from 'express';
import Project from '../models/Project.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

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

// GET: List all projects with pagination + filtering
router.get('/', authenticateToken, async (req, res) => {
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
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});

// GET: Get single project by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
});

// POST: Create new project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: 'Error creating project', error: err.message });
  }
});

// PUT: Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
});

// DELETE: Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
});

export default router;
