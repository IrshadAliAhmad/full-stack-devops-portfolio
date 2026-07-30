import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message || "Login Failed");
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-96 shadow-2xl border border-white/20"
      >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          🚀 DevOps Admin Login
        </h2>

        <input
          className="w-full p-3 mb-3 rounded bg-black/30 text-white outline-none hover:scale-105 transition"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-5 rounded bg-black/30 text-white outline-none hover:scale-105 transition"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded text-white font-semibold transition transform hover:scale-105">
          Login
        </button>
      </motion.form>
    </div>
  );
}
