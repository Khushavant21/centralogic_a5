import { AppDataSource } from '../data-source';
import { Employee } from '../entities/Employee';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

const employeeRepository = AppDataSource.getRepository(Employee);

export const registerEmployee = async (name: string, email: string, password: string, assignedShiftHours: number, role: string) => {
    const hashedPassword = await hashPassword(password);
    const employee = employeeRepository.create({ name, email, password: hashedPassword, assignedShiftHours, role });
    await employeeRepository.save(employee);
    return employee;
};

export const loginEmployee = async (email: string, password: string) => {
    const employee = await employeeRepository.findOneBy({ email });
    if (!employee) {
        throw new Error('Employee not found');
    }
    const isPasswordValid = await comparePassword(password, employee.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = generateToken(employee);
    return token;
};
