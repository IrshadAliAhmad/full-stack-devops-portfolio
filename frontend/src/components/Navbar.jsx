import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Array of sections for navigation loops
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // Effect to handle window scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar background state based on scroll position
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track the active visible section on screen
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediately on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  return (
    <>
      {/* Main Navbar Container */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 dark:bg-[#090a0f]/70 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-zinc-800/40 h-16"
            : "bg-transparent h-20"
        } flex items-center`}
      >
        {/* Responsive Content Wrapper */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
          <div className="flex items-center justify-between w-full">
            
            {/* Logo Section */}
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer tracking-wider shrink-0"
            >
              I A
            </motion.h1>

            {/* Desktop Menu and Action Controls */}
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8">

              {/* Navigation links visible only on desktop monitors */}
              <ul className="hidden md:flex items-center gap-5 lg:gap-8 font-semibold tracking-wide">
                {navLinks.map((link) => (
                  <li key={link.id} className="relative py-2">
                    <a
                      href={`#${link.id}`}
                      className={`relative pb-1 transition-colors duration-300 block text-sm lg:text-base ${
                        activeSection === link.id
                          ? "text-blue-600 dark:text-blue-400 font-bold"
                          : "text-slate-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400"
                      }`}
                    >
                      {link.name}

                      {/* Animated bottom indicator for active state */}
                      {activeSection === link.id && (
                        <motion.span
                          layoutId="activeUnderline"
                          className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Utility buttons container */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                
                {/* Dark Mode Theme Switcher */}
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-lg sm:text-xl p-2 rounded-xl bg-slate-50 dark:bg-zinc-900 text-yellow-500 dark:text-zinc-400 shadow-sm border border-slate-200 dark:border-zinc-800/60 cursor-pointer flex items-center justify-center backdrop-blur-sm"
                >
                  {darkMode ? <FaSun className="text-amber-400" /> : <FaMoon className="text-blue-600" />}
                </motion.button>

                {/* Hamburger icon trigger for small screen devices */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden text-2xl text-slate-700 dark:text-zinc-400 cursor-pointer flex items-center justify-center ml-1"
                  onClick={() => setMenuOpen(true)}
                >
                  <FaBars />
                </motion.button>

              </div>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Portal */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark background modal overlay behind the drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Sliding navigation tray container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-screen w-full max-w-[280px] bg-white dark:bg-[#0c0e17] border-l border-slate-200 dark:border-zinc-800/60 shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Drawer layout upper block */}
              <div className="flex items-center justify-between px-6 h-16 sm:h-20 border-b border-slate-100 dark:border-zinc-800/60 shrink-0">
                <h2 className="text-xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Navigation
                </h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-slate-500 dark:text-zinc-400 p-1 cursor-pointer"
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Vertical link stack layout for mobile viewports */}
              <ul className="flex flex-col gap-2 p-6 overflow-y-auto grow">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`text-lg p-3 rounded-xl transition-all duration-200 block w-full font-medium ${
                        activeSection === link.id
                          ? "bg-blue-50 text-blue-600 font-bold dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/20"
                          : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900/50 hover:text-blue-500 dark:hover:text-blue-400"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;