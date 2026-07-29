import { loginService, getCurrentUserService } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const data = await loginService(email, password);

  res.status(200).json(
    new ApiResponse(200, "Login successful", data)
  );
});

// GET CURRENT USER
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await getCurrentUserService(req.user.id);

  res.status(200).json(
    new ApiResponse(200, "Current user fetched successfully", user)
  );
});