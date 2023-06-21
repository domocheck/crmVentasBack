import { Router } from "express";
import {
  createClient,
  getClient,
  getClients,
  updateClient,
} from "../handlers/handlersClients.js";

const router = Router();

router
  .post("/", createClient)
  .get("/", getClients)
  .get("/:id", getClient)
  .put("/", updateClient);

export { router as clientesRoutes };
