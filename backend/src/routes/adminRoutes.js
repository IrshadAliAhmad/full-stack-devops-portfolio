import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Temporary Admin
// Later replace with Prisma Database
const ADMIN = {
  email: "irshadaliahmad587@gmail.com",
  password: "Irshad$Ahmad$386",
};

// =======================
// ADMIN LOGIN
// =======================

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN.email || password !== ADMIN.password) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      email,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.json({
    success: true,

    message: "Login successful",

    token,
  });
});

// =======================
// ADMIN DASHBOARD
// =======================

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    success: true,

    message: "Welcome to DevOps Cloud Admin Dashboard 🚀",

    admin: req.user,
  });
});

// =======================
// PROJECT MANAGEMENT
// =======================

router.get("/projects", verifyToken, (req, res) => {
  res.json([
    {
      _id: 1,
      title: "DevOps Portfolio",
      techStack: ["React", "Node", "AWS", "Kubernetes"],
      status: "Published",
    },
  ]);
});

// =======================
// CONTACT MESSAGES
// =======================

router.get("/contact", verifyToken, (req, res) => {
  res.json([
    {
      _id: 1,
      name: "Irshad Ahmad",
      email: "irshadaliahmad587@gmail.com",
      message: "Hello Admin!",
      createdAt: new Date(),
    },
  ]);
});

export default router;
