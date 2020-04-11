import { Request, Response } from "express";
import Task from "../db/models/tasks/tasks.model";

export const addTask: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateTask: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update." });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send({ error: "No taks found." });
    }
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTasks: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    await req.user.populate("tasks").execPopulate();

    if (req.user.tasks.length <= 0) {
      return res.status(400).send({ error: "There are no tasks." });
    }

    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getTask: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send({ error: "There are no tasks." });
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTask: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send({ error: "Task not found." });
    }

    res.status(200).send({ deletedTask: task });
  } catch (error) {
    res.status(500).send(error);
  }
};
