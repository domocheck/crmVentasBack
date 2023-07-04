import { Router } from "express";
import {
  createClient,
  getClient,
  getClients,
  updateClient,
  updateContacto,
} from "../handlers/handlersClients.js";

const router = Router();

router
  .post("/", createClient)
  .put("/:id", updateContacto)
  .get("/", getClients)
  .get("/:id", getClient)
  .put("/", updateClient);

export { router as clientesRoutes };
