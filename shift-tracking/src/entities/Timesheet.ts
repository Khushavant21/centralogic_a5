import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './Employee';
import { Shift } from './Shift';

@Entity()
export class Timesheet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    employeeId: string;

    @ManyToOne(() => Employee, employee => employee.timesheets)
    employee: Employee;

    @Column()
    shiftId: string;

    @ManyToOne(() => Shift, shift => shift.timesheets)
    shift: Shift;

    @Column()
    projectName: string;

    @Column()
    taskName: string;

    @Column()
    fromDate: Date;

    @Column()
    toDate: Date;
}
