import serverless from 'serverless-http';
import { app, ensureDB } from '../server/app.js';

let handler;

export default async function vercelHandler(req, res) {
  if (!handler) {
    await ensureDB();
    handler = serverless(app);
  }
  return handler(req, res);
}


