    import express from 'express';
    import {
    CreateHabit,
    DeleteHabit,
    GetHabitByID,
    GetPublicHabits,
    UpdateHabit,
    } from '../controllers/HabitControllers.js';

    const router = express.Router();

    router.get('/', GetPublicHabits);
    router.get('/:id', GetHabitByID);

    router.post('/', CreateHabit);

    router.put('/:id', UpdateHabit);

    router.delete('/:id', DeleteHabit);

    export default router;
