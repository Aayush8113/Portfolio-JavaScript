import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  AlertCircle,
  Cpu,
  Database,
  Filter,
  FolderOpen,
  Layers,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import { useScifiSound } from "../context/SoundContext";

// Components
import ProjectCard from "../components/ProjectCard";

// --- ⚙️ CONFIGURATION ---
const FILTER_TABS = [
  { id: "ALL", label: "All Systems" },
  { id: "MERN", label: "MERN Stack" },
  { id: "NEXT.JS", label: "Next.js" },
  { id: "REACT", label: "React Native" },
  { id: "NODE", label: "Backend API" },
];

// --- 🪝 CUSTOM HOOK ---
const useProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await api.get("/projects", {
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Data Fetch Error:", err);
          setError("CONNECTION_REFUSED: Database Unreachable");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
};

// --- 🦴 COMPONENT: Skeleton Loader ---
const SkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="h-[420px] rounded-3xl bg-slate-900/30 border border-white/5 backdrop-blur-md animate-pulse flex flex-col overflow-hidden shadow-inner"
      >
        <div className="h-48 bg-[#020617]/50" />
        <div className="p-8 space-y-5">
          <div className="w-3/4 h-6 rounded bg-slate-800/60" />
          <div className="space-y-3">
            <div className="w-full h-3 rounded bg-slate-800/40" />
            <div className="w-5/6 h-3 rounded bg-slate-800/40" />
          </div>
          <div className="flex gap-3 pt-6">
            <div className="w-16 h-6 rounded bg-slate-800/40" />
            <div className="w-16 h-6 rounded bg-slate-800/40" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --- 🚀 MAIN COMPONENT ---
const WorkPage = () => {
  const { data: projects, loading, error } = useProjects();
  const sound = useScifiSound();

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // --- MEMOIZED FILTERING LOGIC ---
  const filteredProjects = useMemo(() => {
    if (!projects) return [];

    return projects.filter((project) => {
      const q = debouncedSearch.toLowerCase().trim();
      
      const matchesFilter = activeFilter === "ALL" || project.tags?.some((tag) => tag.toUpperCase() === activeFilter);

      if (!q) return matchesFilter;

      const matchesSearch =
        (project.title && project.title.toLowerCase().includes(q)) ||
        (project.description && project.description.toLowerCase().includes(q)) ||
        (project.tags && project.tags.some((tag) => tag.toLowerCase().includes(q)));

      return matchesSearch && matchesFilter;
    });
  }, [projects, activeFilter, debouncedSearch]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      deployed: projects.filter((p) => p.liveLink).length,
    };
  }, [projects]);

  if (error)
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-center px-4">
        <div className="p-4 mb-4 border rounded-full bg-red-500/10 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="mb-2 text-2xl font-black text-white tracking-tighter">SYSTEM FAILURE</h2>
        <p className="mb-6 font-mono text-sm text-red-400">{error}</p>
        <button
          onClick={() => {
            sound.playClick();
            window.location.reload();
          }}
          onMouseEnter={sound.playHover}
          className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-colors border rounded-xl bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800 shadow-inner"
        >
          REBOOT SYSTEM
        </button>
      </div>
    );

  return (
    <motion.div 
      className="min-h-[calc(100vh-80px)] bg-[#020617] text-slate-200 pb-24 relative overflow-x-hidden selection:bg-blue-500/30"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Deep Ambient Lighting */}
      <div className="absolute top-0 right-[-10%] w-[700px] h-[700px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Interactive Spotlight */}
      <motion.div
        className="absolute transition duration-300 opacity-0 pointer-events-none bg-blue-500/10 -inset-px group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
        }}
      />

      <main className="container relative z-10 px-6 pt-24 mx-auto max-w-7xl">
        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col justify-between gap-10 pb-12 mb-12 border-b md:flex-row md:items-end border-slate-800/80">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border rounded-full bg-blue-900/10 border-blue-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">
                ~/work_archives
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-black tracking-tighter text-white md:text-7xl drop-shadow-2xl">
              Project{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                Database
              </span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base font-light">
              Accessing deployment logs. A curated collection of
              high-performance modules engineered for scalability, security, and
              user experience.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-wrap gap-4">
            <div className="p-5 bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl flex flex-col items-center min-w-[110px] shadow-inner">
              <Database className="w-5 h-5 mb-2.5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-3xl font-black text-white drop-shadow-md">
                {loading ? "-" : stats.total}
              </span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">
                Modules
              </span>
            </div>
            <div className="p-5 bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-2xl flex flex-col items-center min-w-[110px] shadow-inner">
              <Cpu className="w-5 h-5 mb-2.5 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
              <span className="text-3xl font-black text-white drop-shadow-md">100%</span>
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">
                Uptime
              </span>
            </div>
          </motion.div>
        </div>

        {/* --- 2. CONTROL PANEL --- */}
        <div className="flex flex-col gap-8 mb-16 lg:flex-row lg:items-center">
          
          {/* Glowing Search Bar */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-2xl opacity-20 group-focus-within:opacity-50 transition duration-500 blur-md" />
            <div className="relative flex items-center bg-[#020617] rounded-xl border border-slate-800 shadow-inner group-focus-within:border-blue-500/50 transition-colors overflow-hidden">
              <div className="pl-5 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search protocols..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  sound.playType();
                }}
                className="w-full h-14 pl-4 pr-4 font-mono text-sm bg-transparent border-none focus:ring-0 text-slate-200 placeholder:text-slate-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    sound.playClick();
                  }}
                  className="pr-5 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Premium Filter Tabs */}
          <div className="flex flex-wrap gap-3 lg:ml-auto">
            <div className="items-center hidden gap-2 mr-3 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 sm:flex">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </div>
            {FILTER_TABS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  sound.playClick();
                }}
                onMouseEnter={sound.playHover}
                className={`
                  relative px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 shadow-inner
                  ${
                    activeFilter === filter.id
                      ? "text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400"
                      : "text-slate-400 bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. PROJECT GRID (Fixed Render) --- */}
        {loading ? (
          <SkeletonGrid />
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    layout 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center border border-dashed col-span-full border-slate-800 rounded-3xl bg-slate-900/20 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center w-20 h-20 mb-6 border rounded-full bg-[#020617] border-slate-800 shadow-inner">
                    <Layers className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="mb-3 text-3xl font-black tracking-tighter text-white">Data Void</h3>
                  <p className="max-w-md mx-auto mb-8 font-mono text-sm leading-relaxed text-slate-500">
                    No modules found matching query "<span className="text-white">{debouncedSearch}</span>". <br />
                    Try adjusting search parameters or clearing filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("ALL");
                      sound.playClick();
                    }}
                    onMouseEnter={sound.playHover}
                    className="px-8 py-3.5 text-xs font-bold tracking-[0.15em] text-white uppercase transition-all bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-105 active:scale-95"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default WorkPage;