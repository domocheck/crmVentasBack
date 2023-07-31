import { Router } from "express";
import {
  createNotifications,
  getNotifications,
} from "../handlers/handlerNotifications.js";

const router = Router();

router.post("/", createNotifications).get("/:idUser", getNotifications);

export { router as notiRoutes };
