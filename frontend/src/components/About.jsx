import { motion } from "framer-motion";
import { FaAws, FaGitAlt } from "react-icons/fa";
import { SiTerraform, SiKubernetes } from "react-icons/si";

function About() {
  // Animation configuration constants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  // Core visual skill cards data layout
  const coreSkills = [
    { 
      name: "AWS", 
      desc: "Cloud Infrastructure", 
      icon: <FaAws className="text-amber-500" />,
      cardHover: "hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-500/40",
      iconHover: "group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:border-amber-500/30"
    },
    { 
      name: "K8s", 
      desc: "Orchestration & Scale", 
      icon: <SiKubernetes className="text-blue-500" />,
      cardHover: "hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:border-blue-500/40",
      iconHover: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-500/30"
    },
    { 
      name: "CI/CD", 
      desc: "Automation Pipelines", 
      icon: <FaGitAlt className="text-orange-500" />,
      cardHover: "hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] hover:border-orange-500/40",
      iconHover: "group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] group-hover:border-orange-500/30"
    },
    { 
      name: "IaC", 
      desc: "Terraform & Provisioning", 
      icon: <SiTerraform className="text-purple-500" />,
      cardHover: "hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:border-purple-500/40",
      iconHover: "group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:border-purple-500/30"
    },
  ];

  return (
    <section
      id="about"
      className="relative py-10 lg:py-15 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 dark:from-[#090a0f] dark:via-[#0c0e17] dark:to-[#0d0e12] text-zinc-900 dark:text-zinc-50 transition-colors duration-500 overflow-hidden scroll-mt-20"
    >
      {/* Background radial soft light blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-50px] left-[-50px] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none blur-[100px]" 
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
        }}
      />

      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-50px] right-[-50px] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none blur-[100px]" 
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Content wrapper container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-10">
        
        {/* Section Header Title Area */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariant}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/30 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
            About Me
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-4 tracking-tight text-zinc-950 dark:text-white">
            Cloud & <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">DevOps</span> Engineer
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-5 rounded-full opacity-80" />
        </motion.div>

        {/* Section Columns Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center justify-items-center">
          
          {/* Left Block: Narrative Bio paragraph description */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariant}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-zinc-900/20 backdrop-blur-md border border-slate-200/60 dark:border-zinc-800/40 shadow-xl shadow-slate-100/40 dark:shadow-none space-y-6 text-slate-600 dark:text-zinc-400 text-base leading-relaxed font-medium text-center lg:text-left max-w-2xl lg:max-w-none"
          >
            <p className="text-lg">
              I am a <span className="text-zinc-950 dark:text-zinc-100 font-bold underline decoration-blue-500 decoration-2 underline-offset-4">BCA graduate</span> and 
              an aspiring <span className="text-blue-600 dark:text-blue-400 font-bold">Cloud & DevOps Engineer</span> with a deep passion for designing, automating, and managing resilient, cloud-native infrastructure. I specialize in building system architectures that eliminate manual bottlenecks.
            </p>

            <p className="text-sm sm:text-base">
              My expertise spans across <span className="text-zinc-950 dark:text-zinc-100 font-semibold bg-slate-100/80 dark:bg-zinc-900/50 px-2 py-1 rounded border border-slate-200/60 dark:border-zinc-800/60">Docker, Kubernetes, AWS, Terraform, GitHub Actions, Jenkins, Prometheus, and Grafana</span>. I am comfortable with complex Linux environments and highly passionate about writing declarative infrastructure code.
            </p>
          </motion.div>

          {/* Right Block: Dynamic core skill badges layout grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariant}
            className="lg:col-span-5 grid grid-cols-2 gap-4 w-full max-w-md lg:max-w-none mx-auto"
          >
            {coreSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{ y: -5 }}
                className={`p-5 rounded-2xl bg-white/60 dark:bg-zinc-900/20 backdrop-blur-md border border-slate-200/60 dark:border-zinc-800/40 shadow-md shadow-slate-100/30 dark:shadow-none flex flex-col items-center text-center justify-center group transition-all duration-300 ${skill.cardHover}`}
              >
                {/* Individual floating skill icon slot */}
                <div className={`text-2xl sm:text-3xl p-3 bg-white dark:bg-zinc-800/80 rounded-xl border border-slate-100 dark:border-zinc-700/50 shadow-sm transition-all duration-300 flex items-center justify-center ${skill.iconHover}`}>
                  {skill.icon}
                </div>
                
                {/* Label text fields block */}
                <div className="mt-4">
                  <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-semibold leading-snug">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;