import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  Power,
  ShieldAlert,
  Terminal,
  WifiOff,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useScifiSound } from "../context/SoundContext";

// --- 🎨 STYLES (Scoped Glitch Effect) ---
const GlitchStyles = () => (
  <style>{`
    @keyframes glitch-anim-1 {
      0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
      20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
      40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
      60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
      80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
      100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
    }
    .glitch-text { position: relative; display: inline-block; }
    .glitch-text::before, .glitch-text::after {
      content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: transparent;
    }
    .glitch-text::before {
      left: 3px; text-shadow: -2px 0 #ef4444; clip-path: inset(0 0 0 0);
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }
    .glitch-text::after {
      left: -3px; text-shadow: -2px 0 #f59e0b; clip-path: inset(0 0 0 0);
      animation: glitch-anim-1 3s infinite linear alternate-reverse;
    }
  `}</style>
);

// --- 🧩 SUB-COMPONENTS ---

const TerminalOutput = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="relative w-full max-w-lg p-5 mb-12 overflow-hidden font-mono text-[11px] sm:text-xs text-left border rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.15)] bg-slate-900/50 backdrop-blur-md border-red-500/20 group"
  >
    {/* Scanline Overlay */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/30 animate-[scan_2s_linear_infinite] shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

    {/* Mac-Style Header */}
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-red-500/20">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
      </div>
      <div className="flex items-center gap-2 mr-6 text-red-400 tracking-[0.2em] uppercase font-bold text-[9px]">
        <Terminal className="w-3 h-3" />
        diagnostic_log.sys
      </div>
    </div>

    <div className="space-y-2 font-mono tracking-wider">
      <p className="text-slate-400">
        <span className="text-emerald-500">➜</span> Initiating protocol...
      </p>
      <p className="text-slate-400">
        <span className="text-emerald-500">➜</span> Targeting:{" "}
        <span className="text-red-400">/undefined_sector</span>
      </p>
      <p className="text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
        <span className="text-red-500">✖</span> ERROR: Null pointer exception.
      </p>
      <p className="text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
        <span className="text-red-500">✖</span> FATAL: Route map corrupted.
      </p>
      <p className="mt-3 text-amber-400 animate-pulse drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
        _ Waiting for manual override...
      </p>
    </div>
  </motion.div>
);

const ActionButtons = ({ sound, navigate }) => (
  <div className="flex flex-col justify-center w-full gap-4 sm:flex-row">
    <button
      onClick={() => {
        sound.playClick();
        navigate(-1);
      }}
      onMouseEnter={sound.playHover}
      className="relative w-full px-8 py-4 overflow-hidden transition-all border rounded-xl group bg-slate-900/40 backdrop-blur-md border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-slate-300 sm:w-auto hover:text-white shadow-inner"
    >
      <div className="relative z-10 flex items-center justify-center gap-3">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-xs font-black tracking-[0.2em] uppercase">
          Trace Back
        </span>
      </div>
    </button>

    <Link
      to="/"
      onClick={sound.playClick}
      onMouseEnter={sound.playHover}
      className="group relative w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl overflow-hidden transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-105 active:scale-95"
    >
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

      <div className="relative z-10 flex items-center justify-center gap-3">
        <Power className="w-4 h-4" />
        <span className="text-xs font-black tracking-[0.2em] uppercase">
          System Reboot
        </span>
      </div>
    </Link>
  </div>
);

// --- 🚀 MAIN PAGE ---
const NotFoundPage = () => {
  const navigate = useNavigate();
  const sound = useScifiSound();
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY }) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    const timer = setTimeout(() => sound.playError(), 500);
    return () => clearTimeout(timer);
  }, [sound]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020617] overflow-hidden text-slate-200 cursor-crosshair group select-none selection:bg-red-500/30"
      onMouseMove={handleMouseMove}
    >
      <GlitchStyles />

      {/* --- DEEP AMBIENT LIGHTING --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Red Spotlight */}
      <motion.div
        className="absolute transition duration-500 opacity-0 pointer-events-none -inset-px group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(239, 68, 68, 0.12), transparent 80%)`,
        }}
      />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 text-center">
        {/* 1. TOP WARNING */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 px-5 py-2 rounded-full bg-red-950/30 backdrop-blur-md border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.2)]"
        >
          <WifiOff className="w-4 h-4 animate-pulse" />
          <span>Connection Lost: 404</span>
        </motion.div>

        {/* 2. GLITCH TITLE */}
        <div className="relative mb-10">
          <h1
            className="text-[120px] sm:text-[200px] font-black leading-none text-white glitch-text tracking-tighter drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
            data-text="404"
            aria-label="404 Error"
          >
            404
          </h1>
          {/* Static Red Strike-through */}
          <div className="absolute w-[110%] h-[3px] bg-red-500/80 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 blur-[2px] shadow-[0_0_15px_rgba(239,68,68,1)]" />
        </div>

        {/* 3. TERMINAL */}
        <TerminalOutput />

        {/* 4. CONTROLS */}
        <ActionButtons sound={sound} navigate={navigate} />
      </div>

      {/* 5. FOOTER STATUS */}
      <div className="absolute left-0 right-0 flex justify-center opacity-60 bottom-10">
        <div className="flex items-center gap-8 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500/50" /> Sector Unmapped
          </span>
          <span className="flex items-center hidden gap-2 sm:flex">
            <Cpu className="w-3.5 h-3.5 text-amber-500/50" /> Mem_Leak_Detected
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;