
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
  createProjectService,
  getAllProjectsService,
  getProjectBySlugService,
  updateProjectService,
  archiveProjectService,
} from "../services/project.service.js";

import { getIO } from "../config/socket.js";

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await archiveProjectService(req.params.id);

  // Real-time event
 const io = getIO();
  io.emit("project:created", project);

  res
    .status(200)
    .json(new ApiResponse(200, "Project archived successfully", project));
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const project = await getProjectBySlugService(slug);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Project fetched successfully", project));
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await getAllProjectsService();

  res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully", projects));
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await createProjectService(req.validatedData);

  // Real-time event
  const io = getIO();
  io.emit("project:created", project);

  res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", project));
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await updateProjectService(
    req.params.id,
    req.validatedData
  );

  // Real-time event
  const io = getIO();
  io.emit("project:updated", project);

  res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", project));
});