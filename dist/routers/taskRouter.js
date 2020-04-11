"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_controller_1 = require("./../lib/controllers/task.controller");
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../lib/middleware/authMiddleware"));
const router = express_1.Router();
router.post("/", authMiddleware_1.default, task_controller_1.addTask);
router.patch("/:id", authMiddleware_1.default, task_controller_1.updateTask);
router.get("/", authMiddleware_1.default, task_controller_1.getTasks);
router.get("/:id", authMiddleware_1.default, task_controller_1.getTask);
router.delete("/:id", authMiddleware_1.default, task_controller_1.deleteTask);
exports.default = router;
