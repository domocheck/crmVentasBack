import { Router } from "express";
import { createNotifications } from "../handlers/handlerNotifications";

const router = Router();

router.post("/", createNotifications);

export { router as notiRoutes };
