import { Router } from "express";

import validate from "../middlewares/validate.middleware.js";

import { createMessageSchema } from "../validators/message.validator.js";

import { createMessage } from "../controllers/message.controller.js";

/*
=========================================================
Public Contact Routes
=========================================================
*/

const router = Router();

/**
 * POST /api/contact
 * Public Route
 */
router.post(
  "/",
  validate(createMessageSchema),
  createMessage
);

export default router;