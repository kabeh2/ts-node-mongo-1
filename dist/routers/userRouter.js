"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./../lib/controllers/user.controller");
const authMiddleware_1 = __importDefault(require("../lib/middleware/authMiddleware"));
const router = express_1.Router();
router.post("/", user_controller_1.addUser);
router.post("/login", user_controller_1.loginUser);
router.post("/logout", authMiddleware_1.default, user_controller_1.logoutUser);
router.post("/logoutAll", authMiddleware_1.default, user_controller_1.logoutAll);
router.get("/me", authMiddleware_1.default, user_controller_1.getUser);
router.patch("/me", authMiddleware_1.default, user_controller_1.updateUser);
router.delete("/me", authMiddleware_1.default, user_controller_1.deleteUser);
exports.default = router;
