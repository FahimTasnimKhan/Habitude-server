import express from 'express';
import {
  CreateUser,
  DeleteUser,
  GetUserByID,
  GetUsers,
  UpdateUser,
} from '../controllers/UserController.js';

const router = express.Router();

router.get('/', GetUsers);
router.get('/:id', GetUserByID);

router.post('/', CreateUser);

router.put('/:id', UpdateUser);

router.delete('/:id', DeleteUser);

export default router;
