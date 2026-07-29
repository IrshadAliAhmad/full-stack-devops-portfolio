import { Router } from "express";
import { getPersonalInfo } from "../controllers/personalInfo.controller.js";

const router = Router();

router.get("/", getPersonalInfo);

export default router;