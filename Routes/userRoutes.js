import { Router } from "express";
import { getUser, createUser, getUsers } from "../handlers/handlerUsers.js";

const router = Router();

router.post("/login", getUser).post("/", createUser).get("/", getUsers);

export { router as userRoutes };
