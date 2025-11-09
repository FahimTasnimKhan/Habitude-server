import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import UserRoutes from './src/routes/UserRoutes.js';
import HabitRoutes from './src/routes/HabitRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Habitude App API');
});

///////////////// Routes //////////////////////
app.use('/api/users', UserRoutes);
app.use('/api/habits', HabitRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
