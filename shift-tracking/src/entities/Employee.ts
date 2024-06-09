import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shift } from './Shift';
import { Timesheet } from './Timesheet';
import { Claim } from './Claim';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column('int')
    assignedShiftHours: number;

    @Column()
    role: 'SuperAdmin' | 'Manager' | 'Employee';

    @OneToMany(() => Shift, shift => shift.employee)
    shifts: Shift[];

    @OneToMany(() => Timesheet, timesheet => timesheet.employee)
    timesheets: Timesheet[];

    @OneToMany(() => Claim, claim => claim.employee)
    claims: Claim[];
}
