import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, findUserById } from "../repositories/auth.repository.js";
import ApiError from "../utils/ApiError.js";

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const getCurrentUserService = async (id) => {
  return await findUserById(id);
};