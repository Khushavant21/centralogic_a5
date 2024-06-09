import { Router } from 'express';
import { addTimesheetEntry } from '../controllers/timesheetController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/add', authMiddleware, addTimesheetEntry);

export default router;
