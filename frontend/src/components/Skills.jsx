import { useEffect, useState, useRef } from "react";
import {
  FaDocker,
  FaAws,
  FaLinux,
  FaPython,
} from "react-icons/fa";
import {
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiJenkins,
  SiGithubactions,
} from "react-icons/si";

function Skills() {
  // Master array for all technical skills with custom styles and neon glows
  const allSkills = [
    { name: "Docker", icon: <FaDocker size={32} />, color: "from-sky-500 to-blue-600", glow: "rgba(14, 165, 233, 0.2)" },
    { name: "Kubernetes", icon: <SiKubernetes size={32} />, color: "from-blue-500 to-indigo-600", glow: "rgba(59, 130, 246, 0.2)" },
    { name: "AWS", icon: <FaAws size={32} />, color: "from-orange-400 to-yellow-500", glow: "rgba(251, 146, 60, 0.2)" },
    { 
      name: "GCP", 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/></svg>, 
      color: "from-blue-400 to-green-500",
      glow: "rgba(74, 222, 128, 0.2)"
    },
    { 
      name: "Azure", 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M0 18.25h8.5L13.25 7 6.5 14H0v4.25zM13.25 7l-3.5 6.75L15.5 18.25H24L13.25 7z"/></svg>, 
      color: "from-blue-500 to-sky-600",
      glow: "rgba(14, 165, 233, 0.2)"
    },
    { name: "Terraform", icon: <SiTerraform size={32} />, color: "from-purple-500 to-violet-700", glow: "rgba(168, 85, 247, 0.2)" },
    { name: "Ansible", icon: <SiAnsible size={32} />, color: "from-red-600 to-zinc-800", glow: "rgba(220, 38, 38, 0.2)" },
    { name: "Jenkins", icon: <SiJenkins size={32} />, color: "from-red-500 to-orange-500", glow: "rgba(239, 68, 68, 0.2)" },
    { name: "GitHub A.", icon: <SiGithubactions size={32} />, color: "from-blue-600 to-cyan-500", glow: "rgba(37, 99, 235, 0.2)" },
    {
      name: "ArgoCD",
      icon: <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor"><path d="M50 5L15 25v50l35 20 35-20V25L50 5zm25 64.3L50 83.6 25 69.3V30.7L50 16.4l25 14.3v38.6z"/><path d="M50 28.5L32.5 38.6v20.2L50 68.9l17.5-10.1V38.6L50 28.5zm10 24.3L50 58.6l-10-5.8V42.9l10-5.8 10 5.8v9.9z"/></svg>,
      color: "from-orange-400 to-red-500",
      glow: "rgba(249, 115, 22, 0.2)"
    },
    { name: "Linux", icon: <FaLinux size={32} />, color: "from-yellow-400 to-amber-600", glow: "rgba(234, 179, 8, 0.2)" },
    {
      name: "Bash / Shell",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>,
      color: "from-emerald-500 to-teal-600",
      glow: "rgba(16, 185, 129, 0.2)"
    },
    { name: "Python", icon: <FaPython size={32} />, color: "from-blue-500 to-yellow-500", glow: "rgba(59, 130, 246, 0.2)" }
  ];

  const [skills, setSkills] = useState(allSkills);
  const [radius, setRadius] = useState(200);
  const [isMobile, setIsMobile] = useState(false);

  // References for tracking rotation states and speed coefficients
  const circleRef = useRef(null);
  const currentRotation = useRef(0);
  
  const defaultSpeed = useRef(0.15);                    
  const speedMultiplier = useRef(1.0); 
  
  const targetSpeed = useRef(defaultSpeed.current);      
  const currentSpeed = useRef(defaultSpeed.current);
  const lastTouchX = useRef(0);

  // Responsive display logic listener with Dynamic Radius Calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        const dynamicRadius = Math.min(430, Math.max(350, width * 0.3));
        setRadius(dynamicRadius); 
        setSkills(allSkills); 
        setIsMobile(false);
        speedMultiplier.current = 1.0; 
        defaultSpeed.current = 0.15;
      } else if (width >= 768) {
        const dynamicRadius = Math.min(340, Math.max(260, width * 0.35));
        setRadius(dynamicRadius); 
        setSkills(allSkills); 
        setIsMobile(false);
        speedMultiplier.current = 2.2; 
        defaultSpeed.current = 0.35;   
      } else {
        const dynamicRadius = Math.min(190, Math.max(135, width * 0.42));
        setRadius(dynamicRadius); 
        setIsMobile(true);
        const filtered = allSkills.filter(
          (s) => s.name !== "GCP" && s.name !== "Azure" && s.name !== "GitHub A."
        );
        setSkills(filtered);
        speedMultiplier.current = 2.8; 
        defaultSpeed.current = 0.45;   
      }

      if (targetSpeed.current === 0.15 || targetSpeed.current === 0.35 || targetSpeed.current === 0.45) {
        targetSpeed.current = defaultSpeed.current;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Frame processing rendering cycle loop optimized with requestAnimationFrame and hardware acceleration
  useEffect(() => {
    let animationId;
    const updateFrame = () => {
      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.08;
      currentRotation.current += currentSpeed.current;

      if (circleRef.current) {
        // Using 3D transform matrix/translate3d to eliminate mobile jankiness and vibration
        circleRef.current.style.transform = `rotateX(-5deg) rotateY(${currentRotation.current}deg)`;
        
        const cards = circleRef.current.querySelectorAll('.inner-content');
        cards.forEach((card, index) => {
          const rotateY = (360 / skills.length) * index;
          card.style.transform = `rotateY(${- (currentRotation.current + rotateY)}deg)`;
        });
      }
      animationId = requestAnimationFrame(updateFrame);
    };
    animationId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animationId);
  }, [skills.length]);

  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const offsetRatio = (e.clientX - centerX) / (rect.width / 2);
    targetSpeed.current = offsetRatio * 1.5 * speedMultiplier.current;
  };

  const handleMouseLeave = () => {
    targetSpeed.current = defaultSpeed.current; 
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) { lastTouchX.current = e.touches[0].clientX; }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 0) return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const currentTouchX = e.touches[0].clientX;
    const deltaX = currentTouchX - lastTouchX.current;
    lastTouchX.current = currentTouchX;
    const touchOffsetRatio = deltaX / (rect.width / 2);
    targetSpeed.current = touchOffsetRatio * 4.0 * speedMultiplier.current;
  };

  const handleTouchEnd = () => {
    targetSpeed.current = defaultSpeed.current;
  };

  return (
    <section 
      id="skills" 
      className="relative py-16 lg:py-16 bg-gradient-to-b from-slate-50 via-white to-white dark:from-[#0d0e12] dark:via-[#0f111a] dark:to-[#090a0f] overflow-hidden select-none"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[250px] bg-blue-500/5 dark:bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] bg-purple-500/5 dark:bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        <div className="text-center mb-10 md:mb-14">
          <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs md:text-sm bg-blue-50 dark:bg-blue-950/30 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/30">
            Technical Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-zinc-900 dark:text-white tracking-tight">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full opacity-80" />
        </div>

        <div 
          className="relative h-[220px] sm:h-[300px] md:h-[320px] flex items-center justify-center touch-none" 
          style={{ perspective: "1100px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div ref={circleRef} className="absolute grid-3d-circle flex items-center justify-center">
            {skills.map((skill, index) => {
              const rotateY = (360 / skills.length) * index;
              const displayName = (skill.name === "Kubernetes" && isMobile) ? "K8s" : skill.name;

              return (
                <div
                  key={index}
                  style={{
                    transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "visible",
                    "--hover-glow": skill.glow,
                  }}
                  className="absolute skill-3d-card group bg-white/60 dark:bg-zinc-900/20 backdrop-blur-md border border-slate-200/60 dark:border-zinc-800/40 rounded-2xl p-3 md:p-4 w-[105px] sm:w-[130px] md:w-[145px] cursor-pointer transition-all duration-300"
                >
                  <div className="inner-content flex flex-col items-center w-full will-change-transform">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-white shadow-sm transform group-hover:scale-105 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <h3 className="mt-2 md:mt-3 text-[10px] sm:text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200 text-center tracking-wide truncate w-full">
                      {displayName}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Skills;