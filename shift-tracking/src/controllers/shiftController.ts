import { Request, Response } from 'express';
import { endShift } from '../services/shiftService';
import { verifyToken } from '../utils/auth';

export const logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    const decoded = verifyToken(token);

    // End the current shift
    await endShift(decoded.id);

    res.status(200).send('Shift ended and logged out successfully');
};
