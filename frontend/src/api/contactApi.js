import axiosInstance from "./axiosInstance";

// Send Contact Message

export const sendMessage = async (formData) => {
  const response = await axiosInstance.post("/contact", formData);

  return response.data;
};