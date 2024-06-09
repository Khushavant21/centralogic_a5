import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './Employee';

@Entity()
export class Claim {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    key: string;

    @Column()
    value: string;

    @Column()
    employeeId: string;

    @ManyToOne(() => Employee, employee => employee.claims)
    employee: Employee;
}
