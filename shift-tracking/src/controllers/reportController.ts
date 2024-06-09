import { Request, Response } from 'express';
import { generateReport } from '../services/reportService';

export const getReport = async (req: Request, res: Response) => {
    const report = await generateReport();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
    res.send(report);
};
