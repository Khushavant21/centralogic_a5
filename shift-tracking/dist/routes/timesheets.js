"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timesheetController_1 = require("../controllers/timesheetController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/add', authMiddleware_1.authMiddleware, timesheetController_1.addTimesheetEntry);
exports.default = router;
//# sourceMappingURL=timesheets.js.map