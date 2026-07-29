import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check karein ki header hai ya nahi
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 2. 'Bearer ' prefix hatayein
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Debug ke liye
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authenticate = verifyToken;