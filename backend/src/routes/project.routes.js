import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator.js";
import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", getAllProjects);

router.get("/:slug", getProjectBySlug);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createProjectSchema),
  createProject
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(updateProjectSchema),
  updateProject
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteProject
);

export default router;