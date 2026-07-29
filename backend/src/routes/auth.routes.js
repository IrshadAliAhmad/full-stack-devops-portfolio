import { Router } from "express";
import { login, getCurrentUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

router.post("/login", login);

router.get("/me", authenticate, getCurrentUser);

export default router;
