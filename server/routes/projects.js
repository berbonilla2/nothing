import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    res.json(projects);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching projects', err);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

export default router;


