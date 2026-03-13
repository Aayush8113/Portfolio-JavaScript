import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  MessageSquareQuote,
  Zap,
  Terminal as TerminalIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useScifiSound } from "../context/SoundContext";

// Core Components
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import TestimonialCard from "../components/TestimonialCard";

// --- 🪝 CUSTOM HOOK: Data Layer ---
const useHomeData = () => {
  const [data, setData] = useState({ projects: [], testimonials: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [projectsRes, testimonialsRes] = await Promise.allSettled([
          api.get("/projects", { signal: controller.signal }),
          api.get("/testimonials", { signal: controller.signal }),
        ]);

        setData({
          projects:
            projectsRes.status === "fulfilled"
              ? projectsRes.value.data.slice(0, 3)
              : [],
          testimonials:
            testimonialsRes.status === "fulfilled"
              ? testimonialsRes.value.data
              : [],
        });
      } catch (err) {
        console.error("System Failure:", err);
        setError("DATA_FETCH_FAILURE");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return { ...data, loading, error };
};

// --- 🧩 SUB-COMPONENTS ---

// 1. Premium Tech Ticker
const TechTicker = () => {
  const TECH_STACK = [
    "REACT", "NEXT.JS", "NODE.JS", "MONGODB", "TYPESCRIPT",
    "TAILWIND", "FRAMER MOTION", "AWS", "DOCKER", "REDIS", "GRAPHQL", "POSTGRES",
  ];

  return (
    <div className="w-full bg-[#020617]/50 backdrop-blur-md border-y border-white/5 overflow-hidden py-5 relative z-20 shadow-inner">
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

      <div className="flex select-none">
        <motion.div
          className="flex gap-8 sm:gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 transition-all duration-500 rounded-full bg-slate-800 group-hover:bg-blue-500 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <span className="text-sm font-black tracking-widest uppercase transition-colors duration-500 sm:text-lg text-slate-700 group-hover:text-slate-300">
                  {item}
                </span>
              </div>
            ),
          )}
        </motion.div>
      </div>
    </div>
  );
};

// 2. Upgraded Glassmorphism Stats Dashboard
const StatsSection = () => {
  const stats = [
    { icon: Code2, label: "Commits Pushed", value: "1,200+", color: "text-blue-400", glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]", border: "group-hover:border-blue-500/30" },
    { icon: Database, label: "System Uptime", value: "99.9%", color: "text-emerald-400", glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]", border: "group-hover:border-emerald-500/30" },
    { icon: Cpu, label: "Projects Shipped", value: "25+", color: "text-purple-400", glow: "group-hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]", border: "group-hover:border-purple-500/30" },
    { icon: Globe, label: "Happy Clients", value: "100%", color: "text-amber-400", glow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]", border: "group-hover:border-amber-500/30" },
  ];

  return (
    <section className="relative z-10 py-20 border-b sm:py-32 border-white/5 overflow-hidden">
      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/5 overflow-hidden group transition-all duration-500 hover:bg-white/[0.02] shadow-inner ${stat.glow} ${stat.border}`}
            >
              <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${stat.color} bg-current opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-20 pointer-events-none`} />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`p-3.5 mb-5 rounded-2xl bg-[#020617] border border-slate-800 ${stat.color} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="block mb-2 text-4xl font-black tracking-tighter text-white drop-shadow-lg">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Premium Featured Projects
const FeaturedWork = ({ projects, loading }) => {
  const sound = useScifiSound();
  
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container relative px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 mb-16 md:items-end md:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border rounded-full bg-blue-900/10 border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-md">
              <Layers className="w-3.5 h-3.5" /> RECENT_DEPLOYMENTS
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl drop-shadow-xl">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                Modules
              </span>
            </h2>
          </div>

          <Link
            to="/work"
            onClick={sound.playClick}
            onMouseEnter={sound.playHover}
            className="flex items-center gap-2 px-6 py-3 text-xs font-bold transition-all border rounded-xl group text-slate-300 border-white/10 bg-slate-900/40 backdrop-blur-md hover:bg-white/5 hover:text-white uppercase tracking-[0.15em] shadow-inner"
          >
            VIEW ARCHIVES
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array(3).fill(0).map((_, i) => <ProjectCardSkeleton key={i} />)
            : projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

// 4. Infinite Scroll Testimonials
const Testimonials = ({ data }) => {
  if (!data || data.length === 0) return null;

  const infiniteData = [...data, ...data, ...data, ...data, ...data, ...data];

  return (
    <section className="relative py-24 overflow-hidden sm:py-32 bg-slate-900/20 border-y border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      
      <div className="container relative z-10 px-6 mx-auto max-w-7xl mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border rounded-full bg-emerald-900/10 border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(16,185,129,0.1)] backdrop-blur-md">
            <MessageSquareQuote className="w-3.5 h-3.5" /> VERIFIED_FEEDBACK
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl drop-shadow-xl">
            Client Transmissions
          </h2>
        </div>
      </div>

      <div className="relative flex w-full overflow-hidden group">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-64 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-64 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex w-max gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          whileHover={{ animationPlayState: "paused" }} 
        >
          {infiniteData.map((t, i) => (
            <div key={i} className="w-[340px] sm:w-[420px] shrink-0">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// 5. Cinematic CTA
const CTASection = () => {
  const sound = useScifiSound();

  return (
    <section className="relative flex items-center justify-center py-32 overflow-hidden min-h-[65vh]">
      <div className="absolute inset-0 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
        {/* Concentric Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-500/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-blue-500/5 rounded-full" />
        {/* Scanning Line */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[450px] h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-blue-400 origin-left"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <h2 className="mb-8 text-5xl font-black tracking-tighter text-white sm:text-6xl md:text-8xl drop-shadow-2xl">
          System Ready for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Deployment.
          </span>
        </h2>
        <p className="max-w-2xl mx-auto mb-12 font-mono text-sm leading-relaxed sm:text-base text-slate-400">
          AWAITING NEW DIRECTIVES. LET'S ARCHITECT SCALABLE, HIGH-PERFORMANCE SOFTWARE THAT LEAVES A LASTING DIGITAL FOOTPRINT.
        </p>

        <Link
          to="/contact"
          onClick={sound.playClick}
          onMouseEnter={sound.playHover}
          className="relative inline-flex items-center justify-center px-10 py-5 overflow-hidden text-sm font-bold text-white transition-all bg-blue-600 border border-blue-400 rounded-xl group hover:scale-105 hover:bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)] tracking-[0.2em] uppercase"
        >
          <div className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 group-hover:opacity-20 animate-[shimmer_2s_infinite]" />
          <span className="relative z-10 flex items-center gap-3">
            <TerminalIcon className="w-5 h-5" /> Initialize Project
          </span>
        </Link>
      </div>
    </section>
  );
};

// --- 🚀 MAIN PAGE COMPONENT ---
const HomePage = () => {
  const { projects, testimonials, loading } = useHomeData();
  
  // Global Interactive Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden selection:bg-blue-500/30 relative">
      
      {/* Global Cinematic Lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Global Interactive Cursor Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 transition duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.05), transparent 80%)`,
        }}
      />

      <Hero />
      <TechTicker />
      <StatsSection />
      <FeaturedWork projects={projects} loading={loading} />
      <Testimonials data={testimonials} />
      <CTASection />
    </div>
  );
};

export default HomePage;