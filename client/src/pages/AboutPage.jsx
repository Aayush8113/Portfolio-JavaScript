import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  Database,
  FileText,
  Monitor,
  Rocket,
  Terminal,
} from "lucide-react";
import { useRef } from "react";
import {
  SiDocker,
  SiExpress,
  SiPython,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { Link } from "react-router-dom";
import { useScifiSound } from "../context/SoundContext";

// --- COLOR CONFIGURATION ---
const COLOR_CONFIG = {
  sky: {
    border: "group-hover:border-sky-500/50 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]",
    ringOuter: "border-sky-400",
    ringInner: "border-sky-500",
  },
  slate: {
    border: "group-hover:border-slate-500/50 group-hover:shadow-[0_0_15px_rgba(100,116,139,0.2)]",
    ringOuter: "border-slate-400",
    ringInner: "border-slate-500",
  },
  cyan: {
    border: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    ringOuter: "border-cyan-400",
    ringInner: "border-cyan-500",
  },
  pink: {
    border: "group-hover:border-pink-500/50 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]",
    ringOuter: "border-pink-400",
    ringInner: "border-pink-500",
  },
  green: {
    border: "group-hover:border-green-500/50 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    ringOuter: "border-green-400",
    ringInner: "border-green-500",
  },
  gray: {
    border: "group-hover:border-gray-500/50 group-hover:shadow-[0_0_15px_rgba(107,114,128,0.2)]",
    ringOuter: "border-gray-400",
    ringInner: "border-gray-500",
  },
  emerald: {
    border: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    ringOuter: "border-emerald-400",
    ringInner: "border-emerald-500",
  },
  blue: {
    border: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    ringOuter: "border-blue-400",
    ringInner: "border-blue-500",
  },
  orange: {
    border: "group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]",
    ringOuter: "border-orange-400",
    ringInner: "border-orange-500",
  },
  yellow: {
    border: "group-hover:border-yellow-500/50 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]",
    ringOuter: "border-yellow-400",
    ringInner: "border-yellow-500",
  },
  white: {
    border: "group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
    ringOuter: "border-slate-200",
    ringInner: "border-white",
  },
};

// --- 3D TILT CARD (Premium Glassmorphism) ---
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ clientX, clientY }) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX: useMotionTemplate`${mouseY.get() / 20}deg`,
        rotateY: useMotionTemplate`${mouseX.get() / -20}deg`,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl border border-slate-800/80 bg-[#0f172a]/40 backdrop-blur-2xl transition-colors hover:border-slate-700/80 will-change-transform shadow-[0_0_50px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none rounded-3xl" />
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">{children}</div>
    </motion.div>
  );
};

// --- SKILL ORB ---
const SkillOrb = ({ skill, icon, color }) => {
  const styles = COLOR_CONFIG[color] || COLOR_CONFIG.blue;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 group">
      <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
        {/* Outer Glow Ring */}
        <div
          className={`absolute inset-0 rounded-full border border-white/5 bg-[#020617]/50 shadow-inner ${styles.border} transition-all duration-500`}
        />

        {/* Rotating Plasma Rings */}
        <motion.div
          className={`absolute inset-0 rounded-full border-t border-l ${styles.ringOuter} opacity-20`}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute inset-2 rounded-full border-b border-r ${styles.ringInner} opacity-30`}
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Icon */}
        <div className="relative z-10 text-3xl transition-transform duration-500 group-hover:scale-110 drop-shadow-lg">
          {icon}
        </div>
      </div>

      <div className="mt-4 text-center">
        <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-white transition-colors duration-300">
          {skill}
        </h4>
      </div>
    </div>
  );
};

// --- STAT BADGE ---
const StatBadge = ({ value, label }) => (
  <div className="flex flex-col items-center p-4 border rounded-2xl bg-slate-900/40 border-white/5 backdrop-blur-md shadow-inner hover:bg-white/5 transition-colors">
    <span className="text-2xl font-black text-white drop-shadow-md">{value}</span>
    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1">
      {label}
    </span>
  </div>
);

const AboutPage = () => {
  const sound = useScifiSound();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.main 
      className="relative min-h-[calc(100vh-80px)] bg-[#020617] text-slate-200 overflow-x-hidden pb-24"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Deep Ambient Lighting */}
      <div className="absolute top-0 left-[-20%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Interactive Spotlight */}
      <motion.div
        className="absolute transition duration-300 opacity-0 pointer-events-none bg-blue-500/10 -inset-px group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
        }}
      />

      {/* --- HERO PROFILE SECTION --- */}
      <section className="relative z-10 px-6 pt-20 pb-16">
        <div className="container max-w-7xl mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* LEFT: AVATAR HUD */}
            <div className="flex flex-col items-center lg:col-span-5">
              <TiltCard className="p-2 rounded-full border-2 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                <div className="relative w-64 h-64 overflow-hidden rounded-full sm:w-80 sm:h-80 bg-[#020617] shadow-inner">
                  {/* Avatar */}
                  <img
                    src="https://placehold.co/400x400/0f172a/ffffff?text=AT"
                    alt="Profile"
                    className="object-cover w-full h-full filter contrast-125 opacity-90"
                  />
                  {/* Grid Overlay on Image */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
                  
                  {/* Scanning Laser */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent h-[15%]"
                    animate={{ top: ["-15%", "115%"] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </TiltCard>

              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <StatBadge value="1+" label="Years Exp" />
                <StatBadge value="7+" label="Projects" />
                <StatBadge value="100%" label="Commitment" />
              </div>
            </div>

            {/* RIGHT: BIO DATA */}
            <div className="space-y-8 lg:col-span-7">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border rounded-full bg-blue-900/10 border-blue-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                >
                  <Terminal className="w-3.5 h-3.5 text-blue-400" /> 
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">
                    System_Identity: Full_Stack
                  </span>
                </motion.div>
                
                <h1 className="mb-6 text-5xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
                  Architecting the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                    Digital Future.
                  </span>
                </h1>
                
                <p className="text-base leading-relaxed text-slate-400 md:text-lg max-w-2xl font-light">
                  I am a Full-Stack MERN Architect obsessed with performance and
                  scalability. I don't just write code; I engineer robust
                  systems that solve real-world problems. My mission is to
                  bridge the gap between complex backend logic and intuitive
                  frontend experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-4 p-5 transition-all duration-300 border bg-slate-900/40 backdrop-blur-md rounded-2xl border-white/5 hover:bg-white/5 hover:border-white/10 shadow-inner">
                  <div className="p-2.5 rounded-xl bg-[#020617] border border-slate-800">
                    <BrainCircuit className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      Problem Solver
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                      Breaking down complex challenges into simple, modular, and shippable code.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 transition-all duration-300 border bg-slate-900/40 backdrop-blur-md rounded-2xl border-white/5 hover:bg-white/5 hover:border-white/10 shadow-inner">
                  <div className="p-2.5 rounded-xl bg-[#020617] border border-slate-800">
                    <Rocket className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      Performance First
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                      Optimizing every byte for speed, efficiency, and zero-latency UI.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/resume"
                  onMouseEnter={sound.playHover}
                  onClick={sound.playClick}
                  className="flex items-center gap-2 px-8 py-3.5 font-bold text-white transition-all bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-105 active:scale-95 text-sm uppercase tracking-wider"
                >
                  <FileText className="w-4 h-4" /> Download CV
                </Link>
                <Link
                  to="/work"
                  onMouseEnter={sound.playHover}
                  onClick={sound.playClick}
                  className="flex items-center gap-2 px-8 py-3.5 font-bold text-white transition-all border rounded-xl bg-slate-900/50 backdrop-blur-md border-white/10 hover:bg-white/10 hover:scale-105 active:scale-95 text-sm uppercase tracking-wider shadow-inner"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILL ARSENAL --- */}
      <section className="container relative z-10 max-w-7xl px-6 py-16 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-black text-white md:text-5xl tracking-tighter drop-shadow-lg">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">ARSENAL</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-400 font-mono uppercase tracking-widest">
            Production-Grade Tooling & Infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* FRONTEND PANEL */}
          <TiltCard className="p-8">
            <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-800/80">
              <div className="p-2 rounded-lg bg-[#020617] border border-slate-800 shadow-inner">
                <Monitor className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white">Frontend Core</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SkillOrb skill="React" color="sky" icon={<SiReact className="text-sky-400" />} />
              <SkillOrb skill="Next.js" color="slate" icon={<SiNextdotjs className="text-white" />} />
              <SkillOrb skill="Tailwind" color="cyan" icon={<SiTailwindcss className="text-cyan-400" />} />
              <SkillOrb skill="python" color="pink" icon={<SiPython className="text-yellow-400" />} />
            </div>
          </TiltCard>

          {/* BACKEND PANEL */}
          <TiltCard className="p-8">
            <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-800/80">
              <div className="p-2 rounded-lg bg-[#020617] border border-slate-800 shadow-inner">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white">Backend Systems</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SkillOrb skill="Node.js" color="green" icon={<SiNodedotjs className="text-green-500" />} />
              <SkillOrb skill="Express" color="gray" icon={<SiExpress className="text-white" />} />
              <SkillOrb skill="MongoDB" color="emerald" icon={<SiMongodb className="text-emerald-500" />} />
              <SkillOrb skill="Docker" color="blue" icon={<SiDocker className="text-blue-500" />} />
            </div>
          </TiltCard>

          {/* TOOLS PANEL */}
          <TiltCard className="p-8">
            <div className="flex items-center gap-3 pb-5 mb-6 border-b border-slate-800/80">
              <div className="p-2 rounded-lg bg-[#020617] border border-slate-800 shadow-inner">
                <Cpu className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white">DevOps & Tools</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SkillOrb skill="Git" color="orange" icon={<SiGit className="text-orange-500" />} />
              <SkillOrb skill="Postman" color="orange" icon={<SiPostman className="text-orange-400" />} />
              <SkillOrb skill="Vercel" color="white" icon={<SiVercel className="text-white" />} />
              <SkillOrb skill="JS (ES6+)" color="yellow" icon={<SiJavascript className="text-yellow-400" />} />
            </div>
          </TiltCard>
        </div>
      </section>
    </motion.main>
  );
};

export default AboutPage;