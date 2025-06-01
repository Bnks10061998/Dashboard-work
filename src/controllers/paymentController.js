// const Payment = require('../models/Payment');

// exports.createPayment = async (req, res) => {
//   try {
//     const { client, amount, paymentDate, status, description } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     const payment = new Payment({
//       client, amount, paymentDate, status, description,
//       imageUrl,
//       createdBy: req.user.id,
//     });

//     await payment.save();
//     res.status(201).json(payment);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating payment', error: err });
//   }
// };

// exports.getPayments = async (req, res) => {
//   try {
//     const { client, status, search } = req.query;

//     const filter = {};
//     if (client) filter.client = client;
//     if (status) filter.status = status;
//     if (search) filter.description = { $regex: search, $options: 'i' };

//     const payments = await Payment.find(filter).sort({ createdAt: -1 });
//     res.json(payments);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching payments', error: err });
//   }
// };

// exports.getPaymentById = async (req, res) => {
//   try {
//     const payment = await Payment.findById(req.params.id);
//     if (!payment) return res.status(404).json({ message: 'Payment not found' });
//     res.json(payment);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching payment', error: err });
//   }
// };

// exports.updatePayment = async (req, res) => {
//   try {
//     const { client, amount, paymentDate, status, description } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const updateData = {
//       client, amount, paymentDate, status, description,
//     };
//     if (imageUrl) updateData.imageUrl = imageUrl;

//     const updated = await Payment.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: 'Payment not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating payment', error: err });
//   }
// };

// exports.deletePayment = async (req, res) => {
//   try {
//     const deleted = await Payment.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Payment not found' });
//     res.json({ message: 'Payment deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting payment', error: err });
//   }
// };



import Payment from '../models/Payment.js';

export const createPayment = async (req, res) => {
  try {
    const { client, amount, paymentDate, status, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const payment = new Payment({
      client,
      amount,
      paymentDate,
      status,
      description,
      imageUrl,
      createdBy: req.user.id,
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment', error: err });
  }
};

export const getPayments = async (req, res) => {
  try {
    const { client, status, search } = req.query;

    const filter = {};
    if (client) filter.client = client;
    if (status) filter.status = status;
    if (search) filter.description = { $regex: search, $options: 'i' };

    const payments = await Payment.find(filter).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments', error: err });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payment', error: err });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { client, amount, paymentDate, status, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { client, amount, paymentDate, status, description };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updated = await Payment.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Payment not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating payment', error: err });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting payment', error: err });
  }
};
