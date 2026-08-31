import { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaExpand } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "../api/projectApi";
import socket from "../api/socket";
// ==========================================================
// Timeline Project Card Component
// ==========================================================
function TimelineProjectCard({ project, index, onImageClick }) {
  const isLeft = index % 2 === 0;

  // Helper mapping to extract primary border/accent color dynamically based on project gradient
  const getHoverBorderColor = (gradientStr) => {
    if (gradientStr.includes("pink"))
      return "hover:border-pink-500 hover:shadow-pink-500/20";
    if (gradientStr.includes("blue") || gradientStr.includes("cyan"))
      return "hover:border-blue-500 hover:shadow-blue-500/20";
    if (
      gradientStr.includes("emerald") ||
      gradientStr.includes("green") ||
      gradientStr.includes("teal")
    )
      return "hover:border-emerald-500 hover:shadow-emerald-500/20";
    if (
      gradientStr.includes("orange") ||
      gradientStr.includes("amber") ||
      gradientStr.includes("yellow")
    )
      return "hover:border-orange-500 hover:shadow-orange-500/20";
    return "hover:border-purple-500 hover:shadow-purple-500/20";
  };

  const dynamicHoverClass = getHoverBorderColor(project.gradient);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center w-full my-8 md:my-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* --- Horizontal Connector Line for Card Side (Hidden on Mobile) --- */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 hidden md:block h-[2px] bg-gradient-to-r ${project.gradient} z-0 pointer-events-none ${isLeft ? "left-[46%] right-[52%]" : "left-[52%] right-[46%]"}`}
      />

      {/* --- Project Card Container --- */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-[48%] px-3 sm:px-4 relative z-10"
      >
        <div className="group relative w-full flex flex-col shrink-0 transition-transform duration-300">
          {/* Stronger Glow Effect on Hover */}
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 blur-xl group-hover:opacity-40 transition-all duration-500 pointer-events-none`}
          />

          {/* Card Box */}
          <div className="relative flex flex-col h-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-zinc-900/50 group-hover:-translate-y-2.5 group-hover:shadow-2xl transition-all duration-300">
            {/* Top Gradient Bar */}
            <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

            <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between text-center md:text-left">
              {/* Top Content Area */}
              <div>
                {/* Project Badge - Updated to only show "Featured Project" and aligned to left on mobile/all screens */}
                <div className="mb-4 flex justify-start">
                  <span
                    className={`bg-gradient-to-r ${project.gradient} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    Featured Project
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white mb-3 tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 font-medium text-center">
                  {project.description}
                </p>

                {/* Tech Stack / Skills */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {(project.tech ?? []).map((tech, techIndex) => (
                    <span
                      key={`${tech}-${techIndex}`}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 shadow-2xs transition-all duration-200 cursor-default ${dynamicHoverClass}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto">
                {/* GitHub Source Code Button */}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-white text-xs px-4 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] shadow-sm flex-1"
                  >
                    <FaGithub className="text-sm" />
                    Source Code
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 bg-zinc-300 dark:bg-zinc-800 text-zinc-500 text-xs px-4 py-3 rounded-xl font-bold cursor-not-allowed flex-1"
                  >
                    <FaGithub className="text-sm" />
                    Private
                  </button>
                )}

                {/* Live Demo Button */}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 text-white text-xs px-4 py-3 rounded-xl font-bold bg-gradient-to-r ${project.gradient} hover:brightness-125 transition-all duration-200 hover:scale-[1.02] shadow-md flex-1`}
                  >
                    <FaExternalLinkAlt className="text-[10px]" />
                    Live Demo
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 bg-slate-200 dark:bg-zinc-800 text-zinc-400 text-xs px-4 py-3 rounded-xl font-bold cursor-not-allowed flex-1"
                  >
                    <FaExternalLinkAlt className="text-[10px]" />
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- Central Timeline Dot (Hidden on Mobile) --- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-25">
        <div className="w-7 h-7 rounded-full border-[6px] border-purple-300 dark:border-purple-900 bg-white dark:bg-[#0c0e17] relative shadow-md">
          <div className="absolute inset-1 bg-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* --- Horizontal Connector Line for Image Side (Hidden on Mobile) --- */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 hidden md:block h-[2px] bg-gradient-to-r ${project.gradient} z-0 pointer-events-none ${isLeft ? "left-[52%] right-[46%]" : "left-[46%] right-[52%]"}`}
      />

      {/* --- Project Image Preview with High Zoom & Hover Effect --- */}
      <div className="hidden md:flex w-[48%] px-6 justify-center mt-0 relative z-10">
        <div
          className="group/img w-full max-w-[420px] relative cursor-pointer"
          onClick={() => onImageClick(project)}
        >
          {/* Outer Border Glow on Hover */}
          <div
            className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover/img:opacity-100 blur-md transition-opacity duration-500 pointer-events-none`}
          />

          <div
            className={`relative p-1 rounded-2xl bg-gradient-to-r ${project.gradient} shadow-2xl w-full transition-transform duration-500 group-hover/img:scale-[1.03]`}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden aspect-[16/10] relative">
              {/* Zoom Image on Hover */}
              <img
                src={project.image}
                alt={`${project.title} Screenshot`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-115"
                onError={(e) => (e.target.style.display = "none")}
              />

              {/* Overlay Prompt */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white gap-2">
                <div className="p-3 rounded-full bg-purple-600/80 backdrop-blur-md shadow-lg transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
                  <FaExpand className="text-xl text-white" />
                </div>
                <span className="font-bold text-sm tracking-wider transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300 delay-75">
                  Click to View Full Size
                </span>
              </div>

              {!project.image && (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 text-sm">
                  No Screenshot
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================================
// Main Projects Section Component
// ==========================================================

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch projects data from API on component mount

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjects();

        const formattedProjects = (data || []).map((project, index) => ({
          ...project,
          tech: project.techStack ?? [],
          github: project.githubUrl ?? "",
          live: project.liveUrl ?? "",
          image: project.imageUrl ?? "",
          gradient: [
            "from-pink-500 via-purple-500 to-indigo-600",
            "from-blue-500 via-cyan-500 to-indigo-600",
            "from-emerald-500 via-green-500 to-teal-600",
            "from-orange-400 via-amber-500 to-yellow-500",
          ][index % 4],
        }));

        setProjects(formattedProjects);
      } catch (err) {
        console.log("Failed to fetch projects:", err);
        setError("Unable to load projects.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    // Initial API fetch
    fetchProjects();

    // ==========================================
    // REAL-TIME PROJECT EVENTS
    // ==========================================

    const handleProjectCreated = () => {
      console.log("⚡ Project created - refreshing projects");
      fetchProjects();
    };

    const handleProjectUpdated = () => {
      console.log("⚡ Project updated - refreshing projects");
      fetchProjects();
    };

    const handleProjectDeleted = () => {
      console.log("⚡ Project archived - refreshing projects");
      fetchProjects();
    };

    socket.on("project:created", handleProjectCreated);
    socket.on("project:updated", handleProjectUpdated);
    socket.on("project:deleted", handleProjectDeleted);

    // Cleanup
    return () => {
      socket.off("project:created", handleProjectCreated);
      socket.off("project:updated", handleProjectUpdated);
      socket.off("project:deleted", handleProjectDeleted);
    };
  }, []);

  if (loading)
    return (
      <section id="projects" className="py-20 flex justify-center items-center">
        <h2 className="text-xl font-bold">Loading Projects...</h2>
      </section>
    );
  if (error)
    return (
      <section id="projects" className="py-20 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">{error}</h2>
        </div>
      </section>
    );
  if (!projects.length)
    return (
      <section id="projects" className="py-20 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No Projects Found</h2>
        </div>
      </section>
    );

  return (
    <section
      id="projects"
      className="relative py-14 lg:py-16 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 dark:from-[#090a0f] dark:via-[#0c0e17] dark:to-[#0d0e12] text-zinc-900 dark:text-zinc-50 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Blur Glows */}
      <div className="absolute top-1/3 right-1/4 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-purple-500/5 dark:bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-blue-500/5 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-6 md:mb-10">
          <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/30 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
            Portfolio Showcase
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mt-3 tracking-tight text-zinc-950 dark:text-white px-2">
            Cloud &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
              DevOps
            </span>{" "}
            Projects
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-3 rounded-full opacity-80" />
        </div>

        {/* Scrollable Container */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Central Timeline Vertical Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 z-0 hidden md:block rounded-full opacity-80 shadow-sm pointer-events-none"></div>

          <div
            className="max-h-[750px] overflow-y-auto relative rounded-3xl px-2 transition-all z-10"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Project Cards Mapping */}
            <div className="relative z-10 space-y-8 md:space-y-4 pb-6">
              {projects.map((project, index) => (
                <TimelineProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                  onImageClick={(proj) => setSelectedImage(proj)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Fullscreen Image Modal Overlay --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-700/60 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedImage.title} - Preview
                </h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Modal Image Container */}
              <div className="w-full max-h-[75vh] overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
