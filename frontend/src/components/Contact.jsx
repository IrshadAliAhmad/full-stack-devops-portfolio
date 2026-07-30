import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendMessage } from "../api/contactApi";
import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function Contact() {
  /*
=========================================================
Contact Form State
=========================================================
*/

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    text: "",
  });

  // Update component states dynamically as user types into forms
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler talking to backend server APIs
  /*
=========================================================
Submit Contact Form
=========================================================
*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setStatus({
        type: "",
        text: "",
      });

      const res = await sendMessage(formData);

      setStatus({
        type: "success",
        text: res.message || "Message sent successfully 🚀",
      });

      // Reset Form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Automatically hide notifications banner after 4 seconds timeout expires
  useEffect(() => {
    if (status.text) {
      const timer = setTimeout(() => setStatus({ type: "", text: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Framer motion variants for smooth staggered input animations
  const inputVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section
      id="contact"
      className="relative py-8 sm:py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0d0e12] dark:via-[#090a0f] dark:to-[#0c0e17] text-zinc-900 dark:text-zinc-50 transition-colors duration-500 overflow-hidden"
    >
      {/* Visual neon radial backdrop spots */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-blue-500/10 to-purple-500/5 dark:from-blue-600/5 dark:to-transparent blur-[100px] rounded-full pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-br from-pink-500/10 to-purple-500/5 dark:from-purple-600/5 dark:to-transparent blur-[100px] rounded-full pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Animated header section block layout */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 tracking-tight text-zinc-950 dark:text-white">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
              Scalable
            </span>{" "}
            🚀
          </h2>
        </div>

        {/* Dynamic Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative group p-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-200 to-slate-300 dark:from-zinc-800 dark:to-zinc-800/50 shadow-lg hover:shadow-[0_15px_30px_rgba(99,102,241,0.1)] dark:hover:from-blue-500 dark:hover:via-purple-500 dark:hover:to-pink-500 transition-all duration-500"
        >
          {/* Radial layout neon lighting aura */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none" />

          {/* Core interface content inner wrap */}
          <div className="relative bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md rounded-[15px] sm:rounded-[23px] p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Split double grid view for personal bio specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name Input Field */}
                <motion.div
                  variants={inputVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative"
                >
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <div className="relative group/input">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within/input:text-blue-500 transition-colors duration-200">
                      <FaUser className="text-xs" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-200 dark:border-zinc-800/60 outline-none text-xs sm:text-sm font-medium transition-all duration-300 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900/60 focus:ring-4 focus:ring-blue-500/10 shadow-inner text-zinc-900 dark:text-white"
                      required
                    />
                  </div>
                </motion.div>

                {/* Email Input Field */}
                <motion.div
                  variants={inputVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative"
                >
                  <label className="block text-[11px] sm:text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within/input:text-purple-500 transition-colors duration-200">
                      <FaEnvelope className="text-xs" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hello@domain.com"
                      className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-200 dark:border-zinc-800/60 outline-none text-xs sm:text-sm font-medium transition-all duration-300 focus:border-purple-500 dark:focus:border-purple-500 focus:bg-white dark:focus:bg-zinc-900/60 focus:ring-4 focus:ring-purple-500/10 shadow-inner text-zinc-900 dark:text-white"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              {/* Subject Input Field */}
              <motion.div
                variants={inputVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <label className="block text-[11px] sm:text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-200 dark:border-zinc-800/60 outline-none text-xs sm:text-sm font-medium transition-all duration-300 focus:border-purple-500 dark:focus:border-purple-500 focus:bg-white dark:focus:bg-zinc-900/60 focus:ring-4 focus:ring-purple-500/10 shadow-inner text-zinc-900 dark:text-white"
                  required
                />
              </motion.div>

              {/* Message TextArea Field */}
              <motion.div
                variants={inputVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <label className="block text-[11px] sm:text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Message Body
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your goals, system needs, or project timeline..."
                  rows="4"
                  minLength="20"
                  className="w-full p-3.5 rounded-xl bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-200 dark:border-zinc-800/60 outline-none text-xs sm:text-sm font-medium transition-all duration-300 focus:border-pink-500 dark:focus:border-pink-500 focus:bg-white dark:focus:bg-zinc-900/60 focus:ring-4 focus:ring-pink-500/10 shadow-inner resize-none text-zinc-900 dark:text-white"
                  required
                />
              </motion.div>

              {/* Action triggering interactive buttons layout */}
              <div className="flex justify-center pt-1">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0px 8px 25px rgba(139, 92, 246, 0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto sm:px-12 flex items-center justify-center gap-2.5 relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-md transition-all duration-300 text-xs sm:text-sm tracking-wide disabled:opacity-75 disabled:cursor-not-allowed group/btn hover:brightness-110"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-3.5 h-3.5"></span>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-[11px] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Animated Notification Alert Banner Popups */}
              <AnimatePresence>
                {status.text && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className={`flex items-center justify-center gap-2 p-3 mt-3 rounded-xl border text-[11px] sm:text-xs font-bold tracking-wide ${
                      status.type === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.05)]"
                        : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 shadow-[0_4px_12px_rgba(244,63,94,0.05)]"
                    }`}
                  >
                    {status.type === "success" ? (
                      <FaCheckCircle className="text-xs shrink-0" />
                    ) : (
                      <FaExclamationCircle className="text-xs shrink-0" />
                    )}
                    <span className="text-center">{status.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
