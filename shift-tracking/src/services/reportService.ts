import { AppDataSource } from '../data-source';
import { Employee } from '../entities/Employee';
import { Shift } from '../entities/Shift';
import ExcelJS from 'exceljs';

export const generateReport = async () => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const shiftRepository = AppDataSource.getRepository(Shift);

    const employees = await employeeRepository.find();
    const shifts = await shiftRepository.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    worksheet.columns = [
        { header: 'Employee Name', key: 'name', width: 20 },
        { header: 'Assigned Shift Hours', key: 'assignedShiftHours', width: 20 },
        { header: 'Actual Hours Worked', key: 'actualHours', width: 20 },
        { header: 'Date', key: 'date', width: 20 },
    ];

    shifts.forEach(shift => {
        const employee = employees.find(e => e.id === shift.employeeId);
        if (employee) {
            worksheet.addRow({
                name: employee.name,
                assignedShiftHours: employee.assignedShiftHours,
                actualHours: shift.actualHours,
                date: shift.startTime.toISOString().split('T')[0],
            });
        }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};
