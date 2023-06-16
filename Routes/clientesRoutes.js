import { Router } from "express";
import {
  createClient,
  getClient,
  getClients,
} from "../handlers/handlersClients.js";

const router = Router();

router.post("/", createClient).get("/", getClients).get("/:id", getClient);

export { router as clientesRoutes };
