import { Request, Response } from 'express';
import { Employee } from '../entities/Employee';
import { AppDataSource } from '../data-source';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { startShift } from '../services/shiftService';

const employeeRepository = AppDataSource.getRepository(Employee);

export const register = async (req: Request, res: Response) => {
    const { name, email, password, assignedShiftHours, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const employee = employeeRepository.create({ name, email, password: hashedPassword, assignedShiftHours, role });
    await employeeRepository.save(employee);
    res.status(201).send(employee);
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const employee = await employeeRepository.findOneBy({ email });
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    const isPasswordValid = await comparePassword(password, employee.password);
    if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials');
    }
    const token = generateToken(employee);

    // Start a new shift upon login
    await startShift(employee.id);

    res.send({ token });
};
