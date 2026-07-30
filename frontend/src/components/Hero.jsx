import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaDownload,
  FaLinkedin,
  FaDocker,
  FaAws,
  FaLinux,
  FaGithub,
} from "react-icons/fa";
import {
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiJenkins,
  SiPrometheus,
  SiGrafana,
} from "react-icons/si";

function Hero() {
  const [index, setIndex] = useState(0);

  // Text array for dynamic typewriter effect
  const items = [
    {
      text: "DevOps Engineer",
      color: "text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.2)]",
    },
    {
      text: "AWS Architect",
      color: "text-violet-600 dark:text-violet-400 drop-shadow-[0_0_12px_rgba(167,139,250,0.2)]",
    },
    {
      text: "Kubernetes Engineer",
      color: "text-cyan-600 dark:text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]",
    },
    {
      text: "Cloud Engineer",
      color: "text-pink-600 dark:text-pink-400 drop-shadow-[0_0_12px_rgba(244,114,182,0.2)]",
    },
  ];

  // Auto change text interval logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Tech stack icons array for orbiting animation wheel
  const devOpsIcons = [
    { component: <FaAws />, color: "text-orange-400" },
    { component: <FaLinux />, color: "text-yellow-500 dark:text-yellow-400" },
    { component: <FaGithub />, color: "text-zinc-800 dark:text-white" },
    { component: <SiJenkins />, color: "text-red-500" },
    { component: <SiGrafana />, color: "text-orange-500" },
    { component: <SiKubernetes />, color: "text-sky-500" },
    { component: <SiPrometheus />, color: "text-orange-600" },
    { component: <SiTerraform />, color: "text-purple-500 dark:text-purple-400" },
    { component: <FaDocker />, color: "text-blue-500" },
    { component: <SiAnsible />, color: "text-red-600 dark:text-red-500" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-[#0d0e12] dark:via-[#0f111a] dark:to-[#090a0f]"
    >
      {/* Background soft glowing lights */}
      <div className="absolute top-[-50px] left-[-50px] md:top-[-100px] md:left-[-100px] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-blue-500/10 dark:bg-blue-600/5 blur-[80px] sm:blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-60px] right-[-60px] md:bottom-[-120px] md:right-[-120px] w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] bg-purple-500/10 dark:bg-purple-600/5 blur-[90px] sm:blur-[130px] pointer-events-none rounded-full" />

      {/* Main layout content wrapper */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Two-column layout grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center text-center lg:text-left">
            
            {/* Right side element: Orbiting graphics and avatar image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center lg:justify-end order-first lg:order-last mt-4 lg:mt-0"
            >
              <div
                className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] flex items-center justify-center
                [--orbit-radius:125px] sm:[--orbit-radius:165px] md:[--orbit-radius:185px]"
              >
                {/* Visual accent circles behind image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl sm:blur-3xl opacity-15 dark:opacity-20"></div>
                <div className="absolute w-[210px] h-[210px] sm:w-[280px] sm:h-[280px] md:w-[330px] md:h-[330px] rounded-full border border-dashed border-slate-300 dark:border-zinc-800 pointer-events-none opacity-60"></div>

                {/* Rotating ring container holding the tech icons */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 45,
                    ease: "linear",
                  }}
                  className="absolute w-full h-full flex items-center justify-center"
                >
                  {devOpsIcons.map((icon, idx) => {
                    const angle = idx * 36;
                    return (
                      <div
                        key={idx}
                        className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center"
                        style={{
                          transform: `rotate(${angle}deg) translate(var(--orbit-radius)) rotate(${-angle}deg)`,
                        }}
                      >    
                        {/* Counter-rotation to keep individual icons upright */}
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 45,
                            ease: "linear",
                          }}
                          whileHover={{ scale: 1.2 }}
                          className={`text-2xl sm:text-3xl md:text-4xl cursor-pointer ${icon.color}`}
                        >
                          {icon.component}
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Main center profile photo holder - Background color classes removed for transparency */}
                <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl bg-transparent">
                  <img
                    src="/ahmad.png"
                    alt="Irshad Ahmad AWS DevOps Engineer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Left side element: Introduction text blocks and call to actions */}
            <div className="flex flex-col justify-center">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-600 dark:text-blue-400 font-bold text-base sm:text-lg tracking-wider"
              >
                👋 Hello, I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent leading-tight tracking-tight"
              >
                Irshad Ahmad
              </motion.h1>

              {/* Dynamic rolling role title container */}
              <div className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold min-h-[46px] flex items-center justify-center lg:justify-start overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`inline-block tracking-wide ${items[index].color}`}
                  >
                    {items[index].text}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Summary paragraph section */}
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Building scalable, secure, and automated cloud infrastructure
                using <span className="text-blue-600 dark:text-blue-400 font-semibold">AWS</span>,{" "}
                <span className="text-purple-600 dark:text-purple-400 font-semibold">Kubernetes</span>,{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Terraform</span> and modern DevOps pipelines.
              </p>

              {/* Interactive primary action trigger buttons */}
              <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="w-36 h-11 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Projects</span>
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    🚀
                  </motion.span>
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="/Irshad_Ahmad_Resume.pdf"
                  download="Irshad_Ahmad_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-36 h-11 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 border border-slate-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 text-slate-700 dark:text-zinc-300 hover:border-purple-500 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 backdrop-blur-sm"
                >
                  <FaDownload className="text-slate-400 dark:text-zinc-500 transition-colors duration-300" />
                  <span>Resume</span>
                </motion.a>
              </div>

              {/* Quick secondary social connection links */}
              <div className="flex gap-5 lg:pl-30 mt-6 text-xl justify-center lg:justify-start items-center">
                <motion.a
                  animate={{
                    scale: [1, 1.2, 1],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.35, y: 0 }}
                  href="https://github.com/IrshadAliAhmad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <FaGithub />
                </motion.a>

                <motion.a
                  animate={{
                    scale: [1, 1.2, 1],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  whileHover={{ scale: 1.35, y: 0 }}
                  href="https://www.linkedin.com/in/irshadahmad444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin />
                </motion.a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;





