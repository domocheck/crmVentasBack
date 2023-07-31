import { Router } from "express";
import {
  createNotifications,
  getNotifications,
  deteleNotification,
  chanceStatusNotification,
} from "../handlers/handlerNotifications.js";

const router = Router();

router
  .post("/", createNotifications)
  .get("/:idUser", getNotifications)
  .put("/", chanceStatusNotification)
  .delete("/", deteleNotification);

export { router as notiRoutes };
