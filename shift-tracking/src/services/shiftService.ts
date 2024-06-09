import { AppDataSource } from '../data-source';
import { Shift } from '../entities/Shift';

const shiftRepository = AppDataSource.getRepository(Shift);

export const startShift = async (employeeId: string) => {
    const shift = shiftRepository.create({ employeeId, startTime: new Date() });
    await shiftRepository.save(shift);
};

export const endShift = async (employeeId: string) => {
    const shift = await shiftRepository.findOne({
        where: { employeeId, endTime: null },
        order: { startTime: 'DESC' }
    });
    if (shift) {
        shift.endTime = new Date();
        shift.actualHours = (shift.endTime.getTime() - shift.startTime.getTime()) / 3600000; // Convert ms to hours
        await shiftRepository.save(shift);
    }
};
