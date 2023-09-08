import { Router } from "express";
import { generateReportAct } from "../Services/sendReportAct.js";

const router = Router();

router.get("/", generateReportAct);

export { router as reportsRoutes };
