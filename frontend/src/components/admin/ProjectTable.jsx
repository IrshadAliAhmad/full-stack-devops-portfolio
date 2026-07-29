import React, { useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";
import EditProjectModal from "./EditProjectModal";
import DeleteModal from "./DeleteModal";

const ProjectTable = ({ loading, projects, refreshProjects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (loading) {
    return (
      <div className="py-16 text-center text-zinc-400">Loading projects...</div>
    );
  }

  if (!projects.length) {
    return (
      <div className="py-16 text-center text-zinc-500">No projects found.</div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr className="text-left text-zinc-400 text-sm">
              <th className="p-4">Image</th>
              <th className="p-4">Project</th>
              <th className="p-4">Tech Stack</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t border-zinc-800 hover:bg-zinc-900/60 transition"
              >
                {/* Image */}
                <td className="p-4">
                  <img
                    src={
                      project.imageUrl ||
                      "https://placehold.co/80x60/18181b/ffffff?text=Project"
                    }
                    alt={project.title}
                    className="w-20 h-14 rounded-lg object-cover"
                  />
                </td>

                {/* Title */}
                <td className="p-4">
                  <h3 className="font-semibold">{project.title}</h3>

                  <p className="text-sm text-zinc-400 line-clamp-2 mt-1">
                    {project.description}
                  </p>
                </td>

                {/* Tech */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "PUBLISHED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                {/* Featured */}
                <td className="p-4">
                  {project.featured ? (
                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ) : (
                    <Star size={18} className="text-zinc-600" />
                  )}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowEditModal(true);
                      }}
                      className="w-10 h-10 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white transition flex items-center justify-center"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowDeleteModal(true);
                      }}
                      className="w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedProject && (
        <EditProjectModal
          project={selectedProject}
          closeModal={() => {
            setShowEditModal(false);
            setSelectedProject(null);
          }}
          refreshProjects={refreshProjects}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedProject && (
        <DeleteModal
          project={selectedProject}
          closeModal={() => {
            setShowDeleteModal(false);
            setSelectedProject(null);
          }}
          refreshProjects={refreshProjects}
        />
      )}
    </>
  );
};

export default ProjectTable;
