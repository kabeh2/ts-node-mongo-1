"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("./lib/db/mongoose"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const taskRouter_1 = __importDefault(require("./routers/taskRouter"));
const port = config_1.default.get("port");
// Express setup
const server = express_1.default();
mongoose_1.default();
server.use(express_1.default.json());
server.use(express_1.default.static("public"));
server.use(express_1.default.urlencoded({ extended: true }));
server.use(helmet_1.default());
// Middlewares
// Routers
server.use("/api/users", userRouter_1.default);
server.use("/api/tasks", taskRouter_1.default);
server.listen(port, () => console.log(`Server listening on port ${port}...`));
