import express from 'express';
import {
  CreateUser,
  DeleteUser,
  GetUserByID,
  GetUserbyuid,
  GetUsers,
  UpdateUser,
} from '../controllers/UserController.js';

const router = express.Router();

router.get('/', GetUsers);
router.get('/:id', GetUserByID);
router.get('/get-by-uid/:uid', GetUserbyuid);

router.post('/', CreateUser);

router.put('/:id', UpdateUser);

router.delete('/:id', DeleteUser);

export default router;
