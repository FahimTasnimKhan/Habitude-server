import express from 'express';
import {
  CreateProgressByUseridandHabitid,
  DeleteProgressByID,
  GetProgressByUseridandHabitid,
} from '../controllers/ProgressController.js';

const router = express.Router();

router.get('/:UserId/:HabitId', GetProgressByUseridandHabitid);

router.post('/', CreateProgressByUseridandHabitid);

router.delete('/:id', DeleteProgressByID);

export default router;
