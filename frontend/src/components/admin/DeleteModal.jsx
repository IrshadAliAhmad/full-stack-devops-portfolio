import React, { useState } from "react";
import api from "../../services/api";
import { Trash2 } from "lucide-react";

const DeleteModal = ({ project, closeModal, refreshProjects }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/projects/${project.id}`);

      refreshProjects();

      closeModal();
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Unable to delete project");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <Trash2 className="text-red-500" size={30} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center">Delete Project</h2>

        <p className="text-zinc-400 text-center mt-3">
          Are you sure you want to delete
          <br />
          <span className="font-semibold text-white">{project.title}</span>?
        </p>

        <div className="grid grid-cols-2 gap-3 mt-8">
          <button
            onClick={closeModal}
            className="bg-zinc-800 hover:bg-zinc-700 rounded-xl py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 rounded-xl py-3"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
