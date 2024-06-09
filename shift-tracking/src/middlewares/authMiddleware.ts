import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = verifyToken(token);
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};
