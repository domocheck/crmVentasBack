import { Router } from "express";
import {
  createProspect,
  getProspects,
  updateProspect,
} from "../handlers/handlerProspect.js";

const router = Router();

router
  .post("/", createProspect)
  .put("/", updateProspect)
  .get("/", getProspects);

export { router as prospectsRoutes };
