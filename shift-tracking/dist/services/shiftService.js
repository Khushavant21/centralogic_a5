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
exports.endShift = exports.startShift = void 0;
const data_source_1 = require("../data-source");
const Shift_1 = require("../entities/Shift");
const shiftRepository = data_source_1.AppDataSource.getRepository(Shift_1.Shift);
const startShift = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = shiftRepository.create({ employeeId, startTime: new Date() });
    yield shiftRepository.save(shift);
});
exports.startShift = startShift;
const endShift = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const shift = yield shiftRepository.findOne({
        where: { employeeId, endTime: null },
        order: { startTime: 'DESC' }
    });
    if (shift) {
        shift.endTime = new Date();
        shift.actualHours = (shift.endTime.getTime() - shift.startTime.getTime()) / 3600000; // Convert ms to hours
        yield shiftRepository.save(shift);
    }
});
exports.endShift = endShift;
//# sourceMappingURL=shiftService.js.map