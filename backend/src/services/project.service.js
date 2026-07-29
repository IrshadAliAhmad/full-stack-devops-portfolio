import { updateProject } from "../repositories/project.repository.js";
import {
  createProject,
  getAllProjects,
  getProjectBySlug,
} from "../repositories/project.repository.js";
import { archiveProject } from "../repositories/project.repository.js";

export const archiveProjectService = async (id) => {
  return await archiveProject(id);
};

export const updateProjectService = async (id, data) => {
  return await updateProject(id, data);
};

export const getProjectBySlugService = async (slug) => {
  return await getProjectBySlug(slug);
};

// Create Project
export const createProjectService = async (data) => {
  return await createProject(data);
};

// Get All Projects
export const getAllProjectsService = async () => {
  return await getAllProjects();
};