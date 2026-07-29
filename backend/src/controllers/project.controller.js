import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {
  createProjectService,
  getAllProjectsService,
  getProjectBySlugService,
  updateProjectService,
} from "../services/project.service.js";
import { archiveProjectService } from "../services/project.service.js";

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await archiveProjectService(req.params.id);

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

  res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", project));
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await updateProjectService(req.params.id, req.validatedData);

  res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully", project));
});
