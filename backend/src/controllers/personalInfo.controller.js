import { getPersonalInfoService } from "../services/personalInfo.service.js";

export const getPersonalInfo = async (req, res) => {
  try {
    const data = await getPersonalInfoService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};