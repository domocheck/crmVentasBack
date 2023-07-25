import { Router } from "express";
import {
  createClient,
  getClient,
  getClients,
  updateClient,
  updateContacto,
  updateUsersApi,
  updateUsersDatos,
  updateDatosDespachados,
  updateNameClient,
  updateVentas,
} from "../handlers/handlersClients.js";

const router = Router();

router
  .post("/", createClient)
  .put("/usersAPI", updateUsersApi)
  .put("/usersDatos", updateUsersDatos)
  .put("/datos", updateDatosDespachados)
  .put("/:id", updateContacto)
  .put("/changeName/:id", updateNameClient)
  .put("/ventas", updateVentas)
  .get("/", getClients)
  .get("/:id", getClient)
  .put("/", updateClient);

export { router as clientesRoutes };
