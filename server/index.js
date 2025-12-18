import dotenv from 'dotenv';
import { app, ensureDB } from './app.js';

dotenv.config();

const port = process.env.PORT || 4000;

async function start() {
  try {
    await ensureDB();
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API server listening on http://localhost:${port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


