"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./utils/errorHandler");
const swagger_1 = require("./utils/swagger");
const auth_1 = __importDefault(require("./routes/auth"));
const shifts_1 = __importDefault(require("./routes/shifts"));
const timesheets_1 = __importDefault(require("./routes/timesheets"));
const reports_1 = __importDefault(require("./routes/reports"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.use('/api/auth', auth_1.default);
app.use('/api/shifts', shifts_1.default);
app.use('/api/timesheets', timesheets_1.default);
app.use('/api/reports', reports_1.default);
app.use(errorHandler_1.errorHandler);
app.use((req, res) => {
    res.status(404).send('Not Found');
});
exports.default = app;
//# sourceMappingURL=app.js.map