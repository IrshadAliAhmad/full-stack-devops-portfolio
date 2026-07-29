import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // No token → Login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Token exists → Dashboard
  return children;
};

export default ProtectedRoute;