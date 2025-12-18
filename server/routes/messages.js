import { Router } from 'express';
import Message from '../models/Message.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await Message.create({ name, email, message });
    return res.status(201).json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error saving message', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;


