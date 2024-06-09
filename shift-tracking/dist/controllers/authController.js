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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const Employee_1 = require("../entities/Employee");
const data_source_1 = require("../data-source");
const auth_1 = require("../utils/auth");
const shiftService_1 = require("../services/shiftService");
const employeeRepository = data_source_1.AppDataSource.getRepository(Employee_1.Employee);
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, assignedShiftHours, role } = req.body;
    const hashedPassword = yield (0, auth_1.hashPassword)(password);
    const employee = employeeRepository.create({ name, email, password: hashedPassword, assignedShiftHours, role });
    yield employeeRepository.save(employee);
    res.status(201).send(employee);
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const employee = yield employeeRepository.findOneBy({ email });
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    const isPasswordValid = yield (0, auth_1.comparePassword)(password, employee.password);
    if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials');
    }
    const token = (0, auth_1.generateToken)(employee);
    // Start a new shift upon login
    yield (0, shiftService_1.startShift)(employee.id);
    res.send({ token });
});
exports.login = login;
//# sourceMappingURL=authController.js.map