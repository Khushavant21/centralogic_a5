import { AppDataSource } from '../data-source';
import { Timesheet } from '../entities/Timesheet';

const timesheetRepository = AppDataSource.getRepository(Timesheet);

export const createTimesheetEntry = async (employeeId: string, projectName: string, taskName: string, fromDate: Date, toDate: Date) => {
    const timesheet = timesheetRepository.create({ employeeId, projectName, taskName, fromDate, toDate });
    await timesheetRepository.save(timesheet);
    return timesheet;
};
