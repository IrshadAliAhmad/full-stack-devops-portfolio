import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import {
  getAllMessages,
  getMessageById,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/message.controller.js";

/*
=========================================================
Admin Message Routes
=========================================================
*/

const router = Router();

/**
 * Protect all admin message routes
 */
router.use(authenticate);
router.use(authorize("admin"));

/**
 * GET /api/admin/messages
 */
router.get("/", getAllMessages);

/**
 * GET /api/admin/messages/:id
 */
router.get("/:id", getMessageById);

/**
 * PATCH /api/admin/messages/:id/read
 */
router.patch("/:id/read", markMessageAsRead);

/**
 * DELETE /api/admin/messages/:id
 */
router.delete("/:id", deleteMessage);

export default router;