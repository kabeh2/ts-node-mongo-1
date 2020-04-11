import { Router } from "express";
import {
  addUser,
  loginUser,
  logoutUser,
  logoutAll,
  getUser,
  updateUser,
  deleteUser,
} from "./../lib/controllers/user.controller";
import authMiddleware from "../lib/middleware/authMiddleware";

const router: Router = Router();

router.post("/", addUser);

router.post("/login", loginUser);

router.post("/logout", authMiddleware, logoutUser);

router.post("/logoutAll", authMiddleware, logoutAll);

router.get("/me", authMiddleware, getUser);

router.patch("/me", authMiddleware, updateUser);

router.delete("/me", authMiddleware, deleteUser);

export default router;
