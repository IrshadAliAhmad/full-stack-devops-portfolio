import axiosInstance from "./axiosInstance";

/**
 * ==========================================================
 * Get Published Projects
 * Used by Portfolio Homepage
 * ==========================================================
 */
export const getProjects = async () => {
  const response = await axiosInstance.get("/projects", {
    params: {
      t: Date.now(),
    },
  });

  // ApiResponse -> data property return karo
  return response.data.data;
};