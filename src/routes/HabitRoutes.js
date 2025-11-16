import express from 'express';
import {
  CreateHabit,
  DeleteHabit,
  GetHabitByID,
  GetPublicHabits,
  GetUserHabits,
  UpdateHabit,
} from '../controllers/HabitControllers.js';

const router = express.Router();

router.get('/', GetPublicHabits);
router.get('/:id', GetHabitByID);
router.get('/get-user-habits/:UserId', GetUserHabits);

router.post('/', CreateHabit);

router.put('/:id', UpdateHabit);

router.delete('/:id', DeleteHabit);

export default router;
