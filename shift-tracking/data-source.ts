import { DataSource } from 'typeorm';
import { Employee } from './entities/Employee';
import { Shift } from './entities/Shift';
import { Timesheet } from './entities/Timesheet';
import { Claim } from './entities/Claim';
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [Employee, Shift, Timesheet, Claim],
    migrations: [],
    subscribers: [],
});
