import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './src/config/db.js';
import UserRoutes from './src/routes/UserRoutes.js';
import HabitRoutes from './src/routes/HabitRoutes.js';
import ProgressRoutes from './src/routes/ProgressRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Habitude App API');
});

app.use('/api/users', UserRoutes);
app.use('/api/habits', HabitRoutes);
app.use('/api/progress', ProgressRoutes);

// Track DB connection state to avoid reconnecting every request
let isConnected = false;

async function initDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

// EXPORT A SERVERLESS HANDLER FOR VERCEL
export default async function handler(req, res) {
  await initDB();
  return app(req, res);
}
