import { Router } from "express";
import { updateActividad, createAct } from "../handlers/handlersAct.js";

const router = Router();

router.put("/:id", updateActividad).put("/", createAct);

export { router as actividadesRoutes };
