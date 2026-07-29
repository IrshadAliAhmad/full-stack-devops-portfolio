import prisma from "../config/database.js";

/**
 * ==========================================================
 * Create New Project
 * ==========================================================
 */
export const createProject = async (data) => {
  // Check duplicate slug
  const existingProject = await prisma.project.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (existingProject) {
    const error = new Error("Project slug already exists.");
    error.statusCode = 409;
    throw error;
  }

  return await prisma.project.create({
    data,
  });
};

/**
 * ==========================================================
 * Get All Published Projects
 * Used on Portfolio Homepage
 * ==========================================================
 */
export const getAllProjects = async () => {
  return await prisma.project.findMany({
    where: {
      status: "PUBLISHED",
    },

    orderBy: [
      {
        featured: "desc", // Featured project first
      },
      {
        displayOrder: "asc", // Then custom order
      },
      {
        createdAt: "desc", // Latest if order same
      },
    ],
  });
};

/**
 * ==========================================================
 * Get Single Project By Slug
 * ==========================================================
 */
export const getProjectBySlug = async (slug) => {
  return await prisma.project.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });
};

/**
 * ==========================================================
 * Update Existing Project
 * ==========================================================
 */
export const updateProject = async (id, data) => {
  // Check if project exists
  const existingProject = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existingProject) {
    const error = new Error("Project not found.");
    error.statusCode = 404;
    throw error;
  }

  // Check duplicate slug (excluding current project)
  if (data.slug) {
    const duplicateSlug = await prisma.project.findFirst({
      where: {
        slug: data.slug,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (duplicateSlug) {
      const error = new Error("Project slug already exists.");
      error.statusCode = 409;
      throw error;
    }
  }

  return await prisma.project.update({
    where: {
      id: Number(id),
    },
    data,
  });
}

/**
 * ==========================================================
 * Soft Delete Project
 * (Archive Instead of Permanent Delete)
 * ==========================================================
 */
export const archiveProject = async (id) => {
  return await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "ARCHIVED",
    },
  });
};