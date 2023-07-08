import { Router } from "express";
import { getUser, createUser } from "../handlers/handlerUsers.js";

const router = Router();

router.get("/", getUser).post("/", createUser);

export { router as userRoutes };
