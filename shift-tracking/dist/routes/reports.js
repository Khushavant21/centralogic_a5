"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
router.get('/', reportController_1.getReport);
exports.default = router;
//# sourceMappingURL=reports.js.map