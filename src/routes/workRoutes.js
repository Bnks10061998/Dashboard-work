// import express from 'express';
// import multer from 'multer';
// import Work from '../models/Work.js'; 
// import path from 'path';
// import { fileURLToPath } from 'url';

// const router = express.Router();

// // Required for __dirname in ES Module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Multer storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads')); // Ensure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // POST route to handle work submission
// router.post(
//   '/',
//   upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'video', maxCount: 1 },
//     { name: 'docOrExcel', maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const { workName, startDate, endDate, description, remarks } = req.body;

//       const newWork = new Work({
//         workName,
//         startDate,
//         endDate,
//         description,
//         remarks,
//         image: req.files.image?.[0].filename || '',
//         video: req.files.video?.[0].filename || '',
//         docOrExcel: req.files.docOrExcel?.[0].filename || '',
//       });

//       await newWork.save();
//       res.status(201).json(newWork);
//     } catch (err) {
//       res.status(500).json({ message: 'Server Error', error: err.message });
//     }
//   }
// );

// // GET route to fetch all work entries
// router.get('/', async (req, res) => {
//   try {
//     const works = await Work.find().sort({ createdAt: -1 });
//     res.json(works);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching data' });
//   }
// });

// export default router;



import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Work from '../models/Work.js';

const router = express.Router();

// Required for __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// POST /api/work - Create new work entry with optional file uploads
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'docOrExcel', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log('Form fields:', req.body);
      console.log('Uploaded files:', req.files);

      const { workName, startDate, endDate, description, remarks } = req.body;

      const newWork = new Work({
        workName,
        startDate,
        endDate,
        description,
        remarks,
        image: req.files?.image?.[0]?.filename || '',
        video: req.files?.video?.[0]?.filename || '',
        docOrExcel: req.files?.docOrExcel?.[0]?.filename || '',
      });

      await newWork.save();
      res.status(201).json(newWork);
    } catch (err) {
      console.error('Error saving work:', err);
      res.status(500).json({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
);

// GET /api/work - Retrieve all work entries
router.get('/', async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

export default router;
