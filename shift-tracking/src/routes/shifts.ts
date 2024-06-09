import { Router } from 'express';
import { logout } from '../controllers/shiftController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/logout', authMiddleware, logout);

export default router;
