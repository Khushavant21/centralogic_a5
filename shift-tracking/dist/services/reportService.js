"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = void 0;
const data_source_1 = require("../data-source");
const Employee_1 = require("../entities/Employee");
const Shift_1 = require("../entities/Shift");
const exceljs_1 = __importDefault(require("exceljs"));
const generateReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
    const shiftRepository = data_source_1.AppDataSource.getRepository(Shift_1.Shift);
    const employees = yield employeeRepository.find();
    const shifts = yield shiftRepository.find();
    const workbook = new exceljs_1.default.Workbook();
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
    const buffer = yield workbook.xlsx.writeBuffer();
    return buffer;
});
exports.generateReport = generateReport;
//# sourceMappingURL=reportService.js.map