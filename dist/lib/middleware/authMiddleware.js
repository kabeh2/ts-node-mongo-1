"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../db/models/user/user.model"));
const authMiddleware = async (req, res, next) => {
    const secret = config_1.default.get("token-secret");
    try {
        const tokenTemplate = req.header("Authorization");
        const token = tokenTemplate.replace("Bearer ", "");
        const decoded = jsonwebtoken_1.default.verify(token, `${secret}`);
        const user = await user_model_1.default.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });
        if (!user) {
            throw new Error("Unable to login.");
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).send();
    }
};
exports.default = authMiddleware;
