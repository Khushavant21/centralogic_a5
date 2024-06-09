import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Employee } from '../entities/Employee';
import { AppDataSource } from '../data-source';
import 'dotenv/config';

const employeeRepository = AppDataSource.getRepository(Employee);

export const generateToken = (employee: Employee) => {
    return jwt.sign({ id: employee.id, email: employee.email, role: employee.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};
