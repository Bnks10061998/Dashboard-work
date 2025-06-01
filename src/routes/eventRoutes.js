
import express from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';

const router = express.Router();

// GET /api/events - Get all events
router.get('/', getEvents);

// POST /api/events - Create a new event
router.post('/', createEvent);

// PUT /api/events/:id - Update an existing event by ID
router.put('/:id', updateEvent);

// DELETE /api/events/:id - Delete an event by ID
router.delete('/:id', deleteEvent);

export default router;
