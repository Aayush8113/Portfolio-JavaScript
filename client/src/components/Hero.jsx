import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Layers,
  Server,
  Terminal,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";

// --- ⚙️ CONFIGURATION (Data Layer) ---
const HERO_CONFIG = {
  STATUS: "System Online • Available",
  HEADLINE_PREFIX: "I ",
  TYPEWRITER_WORDS: [
    "Architect Digital Reality.",
    "Engineer Scalable Systems.",
    "Forge Seamless UIs.",
    "Solve Complex Logic.",
  ],
  DESCRIPTION: (
    <>
      Hi, I'm <strong className="text-white">Aayush Tripathi</strong>. A Full
      Stack MERN Architect obsessed with performance. I turn complex problems
      into elegant, pixel-perfect, and scalable solutions.
    </>
  ),
  TECH_PILLS: [
    { icon: Zap, label: "High Performance", color: "text-yellow-400" },
    { icon: Globe, label: "Global Scalability", color: "text-blue-400" },
    { icon: Layers, label: "Clean Architecture", color: "text-purple-400" },
  ],
};

// --- 🧩 SUB-COMPONENTS ---

const StatusBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-3 py-1 mb-6 border rounded-full bg-slate-900/80 border-blue-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]"
  >
    <span className="relative flex w-2 h-2">
      <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-emerald-400 animate-ping"></span>
      <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
    </span>
    <span className="font-mono text-[10px] sm:text-xs tracking-widest text-blue-200 uppercase">
      {HERO_CONFIG.STATUS}
    </span>
  </motion.div>
);

const TechPills = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="flex flex-wrap gap-3 mb-10 text-xs font-medium sm:gap-4 sm:text-sm text-slate-400"
  >
    {HERO_CONFIG.TECH_PILLS.map((pill, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 px-3 py-1.5 border rounded-full border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-colors"
      >
        <pill.icon className={`w-4 h-4 ${pill.color}`} /> {pill.label}
      </div>
    ))}
  </motion.div>
);

const ActionButtons = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="flex flex-col w-full gap-4 sm:flex-row sm:w-auto"
  >
    <Link
      to="/work"
      className="relative flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white transition-all bg-blue-600 rounded-lg shadow-lg group shadow-blue-500/25 hover:scale-105 active:scale-95"
    >
      <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-white/20 group-hover:translate-y-0" />
      <span className="relative flex items-center gap-2">
        View Deployments <ArrowRight className="w-4 h-4" />
      </span>
    </Link>

    <Link
      to="/contact"
      className="flex items-center justify-center gap-2 px-8 py-4 font-bold transition-all border rounded-lg group bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500 hover:text-white hover:scale-105 active:scale-95"
    >
      <Terminal className="w-4 h-4" />
      Initiate Uplink
    </Link>
  </motion.div>
);

// --- 🎨 VISUAL COMPONENTS ---

const HeroHighlight = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-[#020617] overflow-hidden group pt-16 pb-12 sm:pt-32 lg:pt-0"
      onMouseMove={handleMouseMove}
    >
      {/* Optimized Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none will-change-transform" />

      {/* GPU Accelerated Spotlight */}
      <motion.div
        className="absolute transition duration-300 opacity-0 pointer-events-none bg-blue-500/10 -inset-px group-hover:opacity-100 will-change-[opacity]"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

const CodeHologram = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="relative hidden lg:block xl:scale-110 perspective-1000"
  >
    {/* Floating Container */}
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-20 bg-[#0f172a]/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl w-[480px] max-w-full"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        </div>
        <div className="flex items-center gap-2">
          <Server className="w-3 h-3 text-slate-500" />
          <span className="font-mono text-xs text-slate-400">
            core_architect.ts
          </span>
        </div>
      </div>

      {/* Code Snippet: Singleton Pattern */}
      <div className="font-mono text-xs leading-relaxed sm:text-sm text-slate-300">
        <p>
          <span className="text-purple-400">class</span>{" "}
          <span className="text-yellow-300">SystemArchitect</span>{" "}
          <span className="text-yellow-300">{`{`}</span>
        </p>
        <div className="pl-4 ml-1 space-y-1 border-l border-slate-800">
          <p>
            <span className="text-purple-400">private static</span> instance:{" "}
            <span className="text-yellow-300">SystemArchitect</span>;
          </p>
          <p className="mt-2">
            <span className="text-purple-400">private</span>{" "}
            <span className="text-blue-400">constructor</span>(){" "}
            <span className="text-yellow-300">{`{`}</span>
          </p>
          <div className="pl-4">
            <p>
              <span className="text-purple-400">this</span>.skills ={" "}
              <span className="text-blue-300">['MERN', 'Scalability']</span>;
            </p>
            <p>
              <span className="text-purple-400">this</span>.latency ={" "}
              <span className="text-orange-400">"&lt; 50ms"</span>;
            </p>
          </div>
          <p>
            <span className="text-yellow-300">{`}`}</span>
          </p>
          <p className="mt-2">
            <span className="text-purple-400">public static</span>{" "}
            <span className="text-blue-400">getInstance</span>(){" "}
            <span className="text-yellow-300">{`{`}</span>
          </p>
          <div className="pl-4">
            <p>
              <span className="text-purple-400">if</span>{" "}
              (!SystemArchitect.instance)
            </p>
            <p className="pl-4">
              SystemArchitect.instance ={" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-yellow-300">SystemArchitect</span>();
            </p>
            <p>
              <span className="text-purple-400">return</span>{" "}
              SystemArchitect.instance;
            </p>
          </div>
          <p>
            <span className="text-yellow-300">{`}`}</span>
          </p>
        </div>
        <p>
          <span className="text-yellow-300">{`}`}</span>
        </p>
      </div>

      {/* Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20 -z-10" />
    </motion.div>

    {/* Floating Elements */}
    <motion.div
      className="absolute p-3 border rounded-lg shadow-xl -top-8 -right-8 bg-slate-900/90 border-slate-700 backdrop-blur-md"
      animate={{ y: [10, -10, 10] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    >
      <Database className="w-6 h-6 text-emerald-400" />
    </motion.div>

    <motion.div
      className="absolute p-3 border rounded-lg shadow-xl -bottom-6 -left-6 bg-slate-900/90 border-slate-700 backdrop-blur-md"
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    >
      <Cpu className="w-6 h-6 text-blue-400" />
    </motion.div>
  </motion.div>
);

// --- 🚀 MAIN HERO SECTION ---
const Hero = () => {
  const [text] = useTypewriter({
    words: HERO_CONFIG.TYPEWRITER_WORDS,
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 30,
    delaySpeed: 2000,
  });

  return (
    <HeroHighlight>
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="z-20 flex flex-col items-start text-left">
            <StatusBadge />

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1] mb-6"
            >
              {HERO_CONFIG.HEADLINE_PREFIX}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                {text}
              </span>
              <Cursor cursorColor="#6366f1" />
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mb-8 text-base leading-relaxed sm:text-lg text-slate-400"
            >
              {HERO_CONFIG.DESCRIPTION}
            </motion.p>

            <TechPills />
            <ActionButtons />
          </div>

          {/* --- RIGHT COLUMN: VISUALS --- */}
          <div className="z-10 flex flex-col items-center justify-center lg:items-end">
            {/* The AT Logo Spinner */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-32 h-32 mb-12 lg:mb-0 lg:absolute lg:top-0 lg:right-10 lg:-translate-y-1/2"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 border rounded-full border-indigo-500/30 border-t-indigo-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute border rounded-full inset-2 border-purple-500/30 border-b-purple-400"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute flex items-center justify-center border rounded-full shadow-inner inset-4 bg-slate-900 border-slate-700">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">
                  AT
                </span>
              </div>
            </motion.div>

            {/* 3D Code Hologram */}
            <CodeHologram />
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default Hero;
