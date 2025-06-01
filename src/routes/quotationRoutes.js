import express from 'express';
import Quotation from '../models/Quotation.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const latest = await Quotation.find().sort({ id: -1 }).limit(1);
    const newId = latest.length > 0 ? latest[0].id + 1 : 1;
    const number = `QTN-${String(newId).padStart(3, '0')}`;

    const newQuotation = new Quotation({
      ...req.body,
      id: newId,
      number,
    });

    const savedQuotation = await newQuotation.save();
    res.status(201).json(savedQuotation);
  } catch (err) {
    console.error('❌ Error creating quotation:', err.message);
    res.status(500).json({ error: 'Failed to create quotation', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Quotation.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Error fetching quotations:', err.message);
    res.status(500).json({ error: 'Failed to fetch quotations', details: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuotation = id.length === 24
      ? await Quotation.findByIdAndUpdate(id, req.body, { new: true })
      : await Quotation.findOneAndUpdate({ id: Number(id) }, req.body, { new: true });

    if (!updatedQuotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    res.status(200).json(updatedQuotation);
  } catch (err) {
    console.error('❌ Error updating quotation:', err.message);
    res.status(500).json({ error: 'Failed to update quotation', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = id.length === 24
      ? await Quotation.findByIdAndDelete(id)
      : await Quotation.findOneAndDelete({ id: Number(id) });

    if (!deleted) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    res.status(200).json({ message: 'Quotation deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting quotation:', err.message);
    res.status(500).json({ error: 'Failed to delete quotation', details: err.message });
  }
});

export default router;
