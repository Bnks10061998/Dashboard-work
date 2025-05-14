
import express from 'express';
import multer from 'multer';
import {
  getReferrals,
  createReferral,
  updateReferral,
  deleteReferral
} from '../controllers/referralController.js';

const router = express.Router();

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes
router.get('/', getReferrals);
router.post('/', upload.single('image'), createReferral);
router.put('/:id', upload.single('image'), updateReferral);
router.delete('/:id', deleteReferral);

export default router;
