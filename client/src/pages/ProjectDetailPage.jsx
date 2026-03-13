import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Layers, // ✅ FIX: Added missing import here
  Share2,
  Terminal,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { useScifiSound } from "../context/SoundContext";

// --- 🧩 REUSABLE COMPONENTS ---

const SpotlightSection = ({ children, className = "" }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  // Hook extracted safely at the top of this sub-component
  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute z-10 transition duration-500 opacity-0 pointer-events-none -inset-px rounded-3xl group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />
      {children}
    </div>
  );
};

const StatBadge = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center gap-3 p-5 border rounded-2xl bg-slate-900/40 backdrop-blur-md border-white/5 shadow-inner">
    <div className="p-3 text-blue-400 rounded-xl bg-[#020617] border border-slate-800 shadow-inner">
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-center">
      <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mb-1">
        {label}
      </p>
      <p className="text-lg font-black text-white drop-shadow-md">{value}</p>
    </div>
  </div>
);

const ProjectHeader = () => {
  const sound = useScifiSound();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12"
    >
      <Link
        to="/work"
        onClick={sound.playClick}
        onMouseEnter={sound.playHover}
        className="flex items-center gap-3 font-mono text-xs transition-colors group text-slate-400 hover:text-blue-400 tracking-widest"
      >
        <div className="p-1.5 transition-colors border rounded-full border-slate-700 bg-slate-900 group-hover:border-blue-500 group-hover:bg-blue-500/10">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>../work_archives</span>
      </Link>

      <div className="flex items-center gap-2 px-4 py-1.5 border rounded-full bg-emerald-950/20 border-emerald-900/40 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)] w-fit">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="text-[10px] font-black text-emerald-500 tracking-[0.2em] uppercase">
          System Online
        </span>
      </div>
    </motion.div>
  );
}

// --- 🚀 MAIN PAGE ---
const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sound = useScifiSound();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. ALL HOOKS MUST BE CALLED HERE, BEFORE ANY EARLY RETURNS
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const globalSpotlightBg = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.05), transparent 80%)`;

  const handleGlobalMouseMove = ({ clientX, clientY }) => {
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Project Fetch Error:", err);
        setError("Failed to retrieve project data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // 2. NOW WE CAN SAFELY DO EARLY RETURNS
  if (loading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <div className="absolute border-b-2 rounded-full inset-3 border-emerald-500 animate-spin reverse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-blue-400 animate-pulse uppercase">
            Decrypting Archives...
          </span>
        </div>
      </div>
    );

  if (error || !project)
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-400">
        <AlertTriangle className="w-16 h-16 mb-6 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
        <h2 className="mb-3 text-3xl font-black tracking-tighter text-white">
          DATA CORRUPTION DETECTED
        </h2>
        <p className="mb-10 font-mono text-sm tracking-widest text-slate-500 uppercase">
          Error Code: 404_PROJECT_NOT_FOUND
        </p>
        <button
          onClick={() => {
            sound.playClick();
            navigate("/work");
          }}
          onMouseEnter={sound.playHover}
          className="px-8 py-3.5 text-xs font-bold tracking-[0.15em] text-white uppercase transition-all bg-blue-600 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-105 active:scale-95"
        >
          Return to Safety
        </button>
      </div>
    );

  return (
    <motion.div 
      className="min-h-screen bg-[#020617] text-slate-200 pb-24 overflow-x-hidden selection:bg-blue-500/30 relative"
      onMouseMove={handleGlobalMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Deep Ambient Lighting */}
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Background Mesh */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Global Interactive Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 transition duration-300 opacity-50"
        style={{ background: globalSpotlightBg }}
      />

      <main className="container relative z-10 px-6 pt-24 mx-auto max-w-7xl">
        <ProjectHeader />

        {/* --- 1. HERO SECTION --- */}
        <SpotlightSection className="relative rounded-3xl border border-slate-800/80 bg-[#0f172a]/40 backdrop-blur-md p-2 mb-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Mac-Style Header */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3 border-b bg-slate-900/80 border-slate-800 rounded-t-3xl backdrop-blur-md">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="text-[10px] font-mono text-slate-400 font-semibold tracking-[0.2em] uppercase flex items-center gap-2 mr-6">
              <Terminal className="w-3.5 h-3.5" />
              render_preview.png
            </div>
          </div>

          <div className="relative w-full mt-10 overflow-hidden aspect-video rounded-2xl bg-[#020617] group/img shadow-inner">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="object-cover w-full h-full transition-all duration-700 opacity-80 group-hover/img:opacity-100 group-hover/img:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent opacity-90 transition-opacity duration-700 group-hover/img:opacity-70" />

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {project.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mb-4 text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-base font-light md:text-xl text-slate-300 line-clamp-2 drop-shadow-md">
                {project.description}
              </p>
            </div>
          </div>
        </SpotlightSection>

        {/* --- 2. CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* LEFT: MAIN CONTENT */}
          <div className="space-y-12 lg:col-span-2">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              <StatBadge icon={User} label="Role" value="Full Stack" />
              <StatBadge icon={Calendar} label="Timeline" value="4 Weeks" />
              <StatBadge icon={Layers} label="Stack" value="MERN" />
              <StatBadge icon={Cpu} label="Status" value="Deployed" />
            </div>

            <div className="space-y-10">
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#020617] border border-slate-800 shadow-inner">
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">The Challenge</h3>
                </div>
                <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-md leading-relaxed text-slate-400 shadow-inner">
                  {project.challenge || "The core objective was to engineer a high-performance system capable of handling concurrent user requests while maintaining sub-100ms latency. Scalability and data integrity were paramount."}
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#020617] border border-slate-800 shadow-inner">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">The Solution</h3>
                </div>
                <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-md leading-relaxed text-slate-400 shadow-inner">
                  {project.solution || "Implemented a microservices-ready architecture using Node.js for the backend and optimized React reconciliation on the frontend. Utilized Redis for caching and Docker for containerized deployment."}
                </div>
              </motion.section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#020617] border border-slate-800 shadow-inner">
                    <Code2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Architecture</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {project.tags?.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-3 p-4 font-mono text-[11px] font-bold tracking-widest uppercase transition-colors border rounded-xl bg-slate-900/50 border-white/5 text-slate-300 hover:border-white/20 hover:text-white shadow-inner hover:bg-white/5"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      {tech}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT: SIDEBAR ACTIONS */}
          <div className="space-y-8">
            <SpotlightSection className="rounded-3xl border border-white/5 bg-slate-900/40 p-8 backdrop-blur-2xl sticky top-28 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <h3 className="flex items-center gap-3 mb-8 text-xs font-black tracking-[0.2em] text-white uppercase border-b border-white/5 pb-4">
                <Terminal className="w-4 h-4 text-blue-400" /> Control Panel
              </h3>

              <div className="space-y-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={sound.playHover}
                    onClick={sound.playClick}
                    className="flex items-center justify-between w-full p-5 text-xs font-black tracking-[0.15em] uppercase text-white transition-all bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] group hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                  >
                    <span className="flex items-center gap-3">
                      <Globe className="w-5 h-5" /> Live Demo
                    </span>
                    <ExternalLink className="w-4 h-4 transition-transform opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={sound.playHover}
                    onClick={sound.playClick}
                    className="flex items-center justify-between w-full p-5 text-xs font-black tracking-[0.15em] uppercase text-white transition-all border rounded-xl group bg-slate-950/50 hover:bg-white/5 border-white/10 hover:border-white/20 shadow-inner"
                  >
                    <span className="flex items-center gap-3">
                      <Github className="w-5 h-5" /> Source Code
                    </span>
                    <Code2 className="w-4 h-4 transition-transform opacity-70 group-hover:scale-110" />
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 mt-8 font-mono text-[10px] tracking-widest uppercase border-t border-white/5 text-slate-500">
                <span>Connection</span>
                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Share2 className="w-3.5 h-3.5" /> Secure (TLS 1.3)
                </span>
              </div>
            </SpotlightSection>

            <div className="p-8 border rounded-3xl border-white/5 bg-gradient-to-br from-[#0f172a]/80 to-[#020617] backdrop-blur-xl shadow-inner">
              <h4 className="mb-3 text-lg font-black tracking-tight text-white">
                Need something similar?
              </h4>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                I can architect this exact level of performance for your next product launch.
              </p>
              <Link
                to="/contact"
                onMouseEnter={sound.playHover}
                onClick={sound.playClick}
                className="inline-flex items-center text-[11px] font-black tracking-[0.15em] uppercase text-blue-400 transition-colors hover:text-white group"
              >
                Initialise Request{" "}
                <ArrowLeft className="w-4 h-4 ml-2 transition-transform rotate-180 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ProjectDetailPage;