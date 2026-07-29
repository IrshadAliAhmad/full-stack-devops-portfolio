import { z } from "zod";

/*
=========================================================
Message Validation Schema
=========================================================
*/

export const createMessageSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50),

  email: z
    .string()
    .email("Invalid email address"),

  subject: z
    .string()
    .min(5)
    .max(100),

  message: z
    .string()
    .min(20)
    .max(5000),
});