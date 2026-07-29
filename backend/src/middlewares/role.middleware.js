const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user.role);
    console.log("Allowed Roles:", roles);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole = (req.user.role || "").toLowerCase();
    const allowedRoles = roles.map((role) => role.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You don't have permission.",
      });
    }

    next();
  };
};

export default authorize;