import { z } from "zod";

/**
 * ==========================================================
 * Create Project Validation Schema
 * ==========================================================
 */
export const createProjectSchema = z.object({
  // --------------------------------------------------------
  // Basic Information
  // --------------------------------------------------------

  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  slug: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers and hyphens."
    ),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters."),

  // --------------------------------------------------------
  // Links
  // --------------------------------------------------------

  githubUrl: z
    .string()
    .trim()
    .url("Invalid GitHub URL.")
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .string()
    .trim()
    .url("Invalid Live URL.")
    .optional()
    .or(z.literal("")),

  imageUrl: z
    .string()
    .trim()
    .url("Invalid Image URL.")
    .optional()
    .or(z.literal("")),

  // --------------------------------------------------------
  // Technology Stack
  // --------------------------------------------------------

  techStack: z
    .array(z.string().trim())
    .min(1, "Select at least one technology."),

  // --------------------------------------------------------
  // Homepage Controls
  // --------------------------------------------------------

  featured: z.boolean().default(false),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .default(0),
});

/**
 * ==========================================================
 * Update Project Validation
 * ==========================================================
 */
export const updateProjectSchema =
  createProjectSchema.partial();