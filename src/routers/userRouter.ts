import { Router } from 'express';
import authMiddleware from '../lib/middleware/authMiddleware';
import {
  addUser,
  deleteUser,
  getUser,
  loginUser,
  logoutAll,
  logoutUser,
  updateUser,
} from './../lib/controllers/user';

const router: Router = Router();

router.post('/', addUser);

router.post('/login', loginUser);

router.post('/logout', authMiddleware, logoutUser);

router.post('/logoutAll', authMiddleware, logoutAll);

router.get('/me', authMiddleware, getUser);

router.patch('/me', authMiddleware, updateUser);

router.delete('/me', authMiddleware, deleteUser);

export default router;
