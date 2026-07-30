import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  FolderKanban,
  FileText,
  Mail,
  Plus,
  Search,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import StatCard from "../components/admin/StatCard";
import ProjectTable from "../components/admin/ProjectTable";
import MessageTable from "../components/admin/MessageTable";
import AddProjectModal from "../components/admin/AddProjectModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch Projects
      const projectRes = await api.get("/projects");
      setProjects(projectRes.data.data || []);

      // Fetch Messages (Optional)
      try {
        const messageRes = await api.get("/admin/messages");
        setMessages(messageRes.data.data || []);
      } catch (err) {
        console.error("Messages Error:", err.response?.data || err.message);
        setMessages([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 relative overflow-hidden select-none">
      {/* Background Glow Accents Matching Portfolio */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 pb-6 border-b border-zinc-800/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                DevOps Admin Dashboard
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Manage your infrastructure projects, messages, and portfolio data seamlessly.
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="self-start sm:self-auto flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-4.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <StatCard
            title="Total Projects"
            value={projects.length}
            icon={FolderKanban}
          />
          <StatCard
            title="Draft Projects"
            value={projects.filter((p) => p.status === "DRAFT").length}
            icon={FileText}
          />
          <StatCard 
            title="Total Messages" 
            value={messages.length} 
            icon={Mail} 
          />
        </div>

        {/* Project Management Section */}
        <div className="bg-[#12141c]/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-5 sm:p-7 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Project Management
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                Add, edit and monitor your deployed portfolio projects.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>

          {/* Search Box */}
          <div className="relative mb-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search projects by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d0e12] border border-zinc-800/90 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-blue-500 transition-colors shadow-inner"
            />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800/50 bg-[#090a0f]/40">
            <ProjectTable
              loading={loading}
              projects={filteredProjects}
              refreshProjects={fetchData}
            />
          </div>
        </div>

        {/* Recent Messages Section */}
        <div className="bg-[#12141c]/80 backdrop-blur-md rounded-2xl border border-zinc-800/80 p-5 sm:p-7 shadow-xl">
          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Recent Messages
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
              Client inquiries and contact form submissions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-800/50 bg-[#090a0f]/40">
            <MessageTable messages={messages} />
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <AddProjectModal
          closeModal={() => setShowAddModal(false)}
          refreshProjects={fetchData}
        />
      )}
    </div>
  );
};

export default AdminDashboard;