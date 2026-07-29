import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaChevronUp,
} from "react-icons/fa";

function Footer() {
  // Smooth scroll click handler to take the user back to page top position
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      // Reduced top/bottom padding to make layout tight and close to the Contact box
      className="relative bg-[#090a0f] text-zinc-400 py-8 border-t border-slate-200/10 dark:border-zinc-800/40 overflow-hidden transition-colors duration-500"
    >
      {/* 🚀 Top Dynamic Gradient Accent Border Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70" />

      {/* Ambient background blur circle layout */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-purple-500/5 dark:bg-purple-600/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-between gap-6 sm:flex-row relative z-10">
        
        {/* Left Area: Developer brand name credentials info */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 tracking-wide transition-colors duration-300">
            Irshad Ahmad
          </p>
          <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 transition-colors duration-300">
            Cloud & DevOps Engineering Specialist Portfolio
          </p>
        </div>

        {/* Center Area: Social network anchor hyperlinks buttons group */}
        <div className="flex items-center gap-4">
          
          {/* GitHub Profile URL Badge Link */}
          <motion.a
            href="https://github.com/IrshadAliAhmad"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/60 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm transition-colors duration-200"
          >
            <FaGithub className="text-base" />
          </motion.a>

          {/* LinkedIn Profile URL Badge Link */}
          <motion.a
            href="https://www.linkedin.com/in/irshadahmad444"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/60 text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/30 shadow-sm transition-colors duration-200"
          >
            <FaLinkedinIn className="text-sm" />
          </motion.a>

          {/* Direct Gmail Compose Window Link Badge */}
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=irshadaliahmad587@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/60 text-zinc-500 dark:text-zinc-400 hover:text-pink-500 dark:hover:text-pink-400 hover:border-pink-200 dark:hover:border-pink-500/30 shadow-sm transition-colors duration-200"
          >
            <FaEnvelope className="text-sm" />
          </motion.a>
        </div>

        {/* Right Area: Copyright documentation tag + Back to Top interactive trigger */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <p className="text-xs text-slate-500 dark:text-zinc-500 font-medium tracking-wide transition-colors duration-300">
            © 2026 Irshad Ahmad. All Rights Reserved.
          </p>

          {/* Interactive UI Action Button element scrolling view frame up */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 bg-slate-100/50 dark:bg-zinc-900/30 hover:bg-slate-200/60 dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 px-2.5 py-1 rounded-lg mt-1 transition-colors duration-200"
          >
            <span>Top</span>
            <FaChevronUp className="text-[8px]" />
          </motion.button>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;