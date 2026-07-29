import React, { useState } from "react";
import api from "../../services/api";
import { X, Edit3 } from "lucide-react";

const EditProjectModal = ({ project, closeModal, refreshProjects }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: project.title || "",
    slug: project.slug || "",
    description: project.description || "",
    githubUrl: project.githubUrl || "",
    liveUrl: project.liveUrl || "",
    imageUrl: project.imageUrl || "",
    techStack: (project.techStack || []).join(", "),
    featured: project.featured || false,
    status: project.status || "PUBLISHED",
  });

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        techStack: formData.techStack
          ? formData.techStack.split(",").map((item) => item.trim()).filter(Boolean)
          : [],
      };

      await api.put(`/projects/${project.id}`, payload);
      
      refreshProjects();
      closeModal();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data) ||
          "Unable to update project."
      );
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 z-50">
      {/* Modal Box */}
      <div className="bg-[#12141c] border border-zinc-800/80 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Modal Header (Fixed) */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800/80 bg-[#0d0e12] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Edit3 size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Edit Project</h2>
          </div>

          <button 
            type="button"
            onClick={closeModal}
            className="w-9 h-9 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
          <form onSubmit={handleSubmit} id="edit-project-form" className="space-y-3">
            
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Project Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Generated Slug</label>
              <input
                name="slug"
                value={formData.slug}
                readOnly
                className="w-full bg-[#090a0f]/50 border border-zinc-800/60 rounded-xl px-4 py-2.5 text-sm text-zinc-500 outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Description</label>
              <textarea
                rows="2"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Tech Stack (Comma Separated)</label>
              <input
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">GitHub URL</label>
                <input
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Live URL</label>
                <input
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Image URL</label>
              <input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 items-center">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-[#090a0f] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 outline-none focus:border-blue-500 transition-colors cursor-pointer"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div className="flex items-center h-full pt-4">
                <label className="flex items-center gap-3 text-sm font-medium text-zinc-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded bg-[#090a0f] border-zinc-700 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                  />
                  Featured Project
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Modal Footer (Fixed at bottom) */}
        <div className="px-6 py-3.5 bg-[#0d0e12] border-t border-zinc-800/80 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 transition-colors"
          >
            Cancel
          </button>
          
          <button
            form="edit-project-form"
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center min-w-[130px]"
          >
            {loading ? "Updating..." : "Update Project"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProjectModal;