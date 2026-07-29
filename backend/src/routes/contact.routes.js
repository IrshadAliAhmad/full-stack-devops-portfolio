import { Router } from "express";

import {
  createMessage
} from "../controllers/message.controller.js";


const router = Router();


// POST /api/contact
router.post("/", createMessage);


export default router;