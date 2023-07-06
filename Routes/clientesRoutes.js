import { Router } from "express";
import {
  createClient,
  getClient,
  getClients,
  updateClient,
  updateContacto,
  updateUsersApi,
  updateUsersDatos,
} from "../handlers/handlersClients.js";

const router = Router();

router
  .post("/", createClient)
  .put("/:id", updateContacto)
  .get("/", getClients)
  .get("/:id", getClient)
  .put("/", updateClient)
  .put("/usersAPI/", updateUsersApi)
  .put("/usersDatos/", updateUsersDatos);

export { router as clientesRoutes };
