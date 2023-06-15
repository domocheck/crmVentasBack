import { Router } from "express";
import { createClient, getClients } from "../handlers/handlersClients.js";

const router = Router();

router.post("/", createClient).get("/", getClients);

export { router as clientesRoutes };
