import prisma from "../config/database.js";

export const getPersonalInfo = async () => {
  return prisma.personalInfo.findFirst();
};