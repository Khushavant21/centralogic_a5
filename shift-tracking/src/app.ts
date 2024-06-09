import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler';
import logger from './utils/logger';
import { setupSwagger } from './utils/swagger';
import authRoutes from './routes/auth';
import shiftRoutes from './routes/shifts';
import timesheetRoutes from './routes/timesheets';
import reportRoutes from './routes/reports';

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/reports', reportRoutes);

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

export default app;
