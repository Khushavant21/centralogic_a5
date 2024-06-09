import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Employee } from './Employee';
import { Timesheet } from './Timesheet';

@Entity()
export class Shift {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    employeeId: string;

    @ManyToOne(() => Employee, employee => employee.shifts)
    employee: Employee;

    @Column()
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @Column('float', { default: 0 })
    actualHours: number;

    @OneToMany(() => Timesheet, timesheet => timesheet.shift)
    timesheets: Timesheet[];
}
