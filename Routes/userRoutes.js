import { Router } from "express";
import {
  getUser,
  createUser,
  getUsers,
  edituser,
  deleteUser,
} from "../handlers/handlerUsers.js";

const router = Router();

router
  .post("/login", getUser)
  .post("/", createUser)
  .get("/", getUsers)
  .post("/:id", edituser)
  .delete("/:id", deleteUser);

export { router as userRoutes };
