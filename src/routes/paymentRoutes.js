// import express from 'express';
// import Payment from '../models/Payment.js';

// const router = express.Router();

// // ✅ Get all payments
// router.get('/', async (req, res) => {
//   try {
//     const payments = await Payment.find();
//     res.json(payments);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Get single payment by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const payment = await Payment.findById(req.params.id);
//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }
//     res.json(payment);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Create new payment
// router.post('/', async (req, res) => {
//   try {
//     const newPayment = new Payment(req.body);
//     await newPayment.save();
//     res.status(201).json(newPayment);
//   } catch (err) {
//     res.status(500).json({ message: 'Error saving payment', error: err.message });
//   }
// });

// // ✅ Update payment by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedPayment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }
//     res.json(updatedPayment);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating payment', error: err.message });
//   }
// });

// // ✅ Delete payment by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
//     if (!deletedPayment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }
//     res.json({ message: 'Payment deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting payment', error: err.message });
//   }
// });

// export default router;


// import express from 'express';
// import verifyToken from '../middleware/verifyToken.js';
// import upload from '../middleware/upload.js';
// import {
//   createPayment,
//   getPayments,
//   getPaymentById,
//   updatePayment,
//   deletePayment
// } from '../controllers/paymentController.js';

// const router = express.Router();

// router.post('/', verifyToken, upload.single('image'), createPayment);
// router.get('/', verifyToken, getPayments);
// router.get('/:id', verifyToken, getPaymentById);
// router.put('/:id', verifyToken, upload.single('image'), updatePayment);
// router.delete('/:id', verifyToken, deletePayment);

// export default router;




// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middlewares/verifyToken');
// const upload = require('../middlewares/upload');

// const {
//   createPayment,
//   getPayments,
//   getPaymentById,
//   updatePayment,
//   deletePayment
// } = require('../controllers/paymentController');

// // Create a new payment (with image upload)
// router.post('/', verifyToken, upload.single('image'), createPayment);

// // Get all payments (with optional filters)
// router.get('/', verifyToken, getPayments);

// // Get a single payment by ID
// router.get('/:id', verifyToken, getPaymentById);

// // Update a payment by ID (with optional image upload)
// router.put('/:id', verifyToken, upload.single('image'), updatePayment);

// // Delete a payment by ID
// router.delete('/:id', verifyToken, deletePayment);

// module.exports = router;



import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';

import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), createPayment);
router.get('/', verifyToken, getPayments);
router.get('/:id', verifyToken, getPaymentById);
router.put('/:id', verifyToken, upload.single('image'), updatePayment);
router.delete('/:id', verifyToken, deletePayment);

export default router;
