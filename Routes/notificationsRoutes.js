import { Router } from "express";
import { createNotifications } from "../handlers/handlerNotifications.js";

const router = Router();

router.post("/", createNotifications);

export { router as notiRoutes };
