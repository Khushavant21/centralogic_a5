"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shiftController_1 = require("../controllers/shiftController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/logout', authMiddleware_1.authMiddleware, shiftController_1.logout);
exports.default = router;
//# sourceMappingURL=shifts.js.map