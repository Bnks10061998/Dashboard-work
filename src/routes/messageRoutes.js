// const express = require("express");
// const router = express.Router();
// const Message = require("../models/Message");

// // Save a message
// router.post("/", async (req, res) => {
//   try {
//     const newMsg = new Message(req.body);
//     await newMsg.save();
//     res.status(201).json({ message: "Message saved." });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get messages by user ID
// router.get("/:userId", async (req, res) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const messages = await Message.find({ userId });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const { text } = req.body;
//     const message = await Message.findById(req.params.id);

//     if (!message) return res.status(404).json({ error: "Message not found" });

//     message.message.text = text;
//     message.message.timestamp = new Date();
//     await message.save();

//     res.json({ message: "Message updated", data: message });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const message = await Message.findByIdAndDelete(req.params.id);
//     if (!message) return res.status(404).json({ error: "Message not found" });

//     res.json({ message: "Message deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Save a message
router.post('/', async (req, res) => {
  try {
    const newMsg = new Message(req.body);
    await newMsg.save();
    res.status(201).json({ message: 'Message saved.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages by user ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({ userId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update message
router.put('/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    message.message.text = text;
    message.message.timestamp = new Date();
    await message.save();

    res.json({ message: 'Message updated', data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });

    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
