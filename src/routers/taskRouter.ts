import {
  addTask,
  updateTask,
  getTasks,
  getTask,
  deleteTask,
} from "./../lib/controllers/task.controller";
import { Router } from "express";
import authMiddleware from "../lib/middleware/authMiddleware";

const router: Router = Router();

router.post("/", authMiddleware, addTask);

router.patch("/:id", authMiddleware, updateTask);

router.get("/", authMiddleware, getTasks);

router.get("/:id", authMiddleware, getTask);

router.delete("/:id", authMiddleware, deleteTask);

export default router;
