import { Request, Response } from 'express';
import { createTimesheetEntry } from '../services/timesheetService';
import { verifyToken } from '../utils/auth';

export const addTimesheetEntry = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    const decoded = verifyToken(token);
    const { projectName, taskName, fromDate, toDate } = req.body;
    const timesheet = await createTimesheetEntry(decoded.id, projectName, taskName, fromDate, toDate);
    res.status(201).send(timesheet);
};
