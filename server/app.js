import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import projectsRoute from './routes/projects.js';
import messagesRoute from './routes/messages.js';
import authRoute from './routes/auth.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: false
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

app.use('/api/projects', projectsRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/auth', authRoute);

async function ensureDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  await connectDB(uri);
}

export { app, ensureDB };


