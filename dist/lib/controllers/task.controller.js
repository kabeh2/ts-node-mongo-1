"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_model_1 = __importDefault(require("../db/models/tasks/tasks.model"));
exports.addTask = async (req, res) => {
    const task = new tasks_model_1.default({ ...req.body, owner: req.user._id });
    try {
        task.save();
        res.status(201).send(task);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description"];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid Update." });
    }
    try {
        const task = await tasks_model_1.default.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!task) {
            return res.status(400).send({ error: "No taks found." });
        }
        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        res.status(201).send(task);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getTasks = async (req, res) => {
    try {
        await req.user.populate("tasks").execPopulate();
        if (req.user.tasks.length <= 0) {
            return res.status(400).send({ error: "There are no tasks." });
        }
        res.status(200).send(req.user.tasks);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getTask = async (req, res) => {
    try {
        const task = await tasks_model_1.default.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!task) {
            return res.status(400).send({ error: "There are no tasks." });
        }
        res.status(200).send(task);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.deleteTask = async (req, res) => {
    try {
        const task = await tasks_model_1.default.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!task) {
            return res.status(400).send({ error: "Task not found." });
        }
        res.status(200).send({ deletedTask: task });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
