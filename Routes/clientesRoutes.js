import { Router } from "express";
import {
  createClient,
  getClient,
  getClients,
  updateClient,
  updateAct,
} from "../handlers/handlersClients.js";

const router = Router();

router
  .post("/", createClient)
  .get("/", getClients)
  .get("/:id", getClient)
  .put("/actividades", updateAct)
  .put("/", updateClient);

export { router as clientesRoutes };
