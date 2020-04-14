"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../db/models/user/user.model"));
exports.addUser = async (req, res) => {
    const user = new user_model_1.default(req.body);
    try {
        await user.save();
        const token = await user.generateToken();
        res.status(201).send({ user, token });
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.loginUser = async (req, res) => {
    try {
        const user = await user_model_1.default.findByCredentials(req.body.password, req.body.username || undefined, req.body.email || undefined);
        if (!user) {
            return res.status(400).send("Node Incorrect username/password.");
        }
        const token = await user.generateToken();
        res.status(201).send({ user, token });
    }
    catch (error) {
        res
            .status(400)
            .send({ error, errorMessage: "Incorrect username/password." });
    }
};
exports.logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send("User has been logged out.");
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("All user sessions have been logged out.");
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getUser = async (req, res) => {
    try {
        res.status(200).send(req.user);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.send({ userRemove: req.user });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["username", "email", "password"];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res
            .status(400)
            .send("Field you are trying to update does not exist.");
    }
    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.status(201).send(req.user);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
