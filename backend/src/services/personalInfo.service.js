import { getPersonalInfo } from "../repositories/personalInfo.repository.js";

export const getPersonalInfoService = async () => {
  return await getPersonalInfo();
};