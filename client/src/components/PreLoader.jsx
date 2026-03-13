// import { AnimatePresence, motion } from "framer-motion";
// import { Lock, Wifi } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";

// // --- ⚙️ CONFIGURATION ---
// const PRELOADER_CONFIG = {
//   DURATION: 3500, // ms
//   EXIT_DELAY: 500,
//   LOGS: [
//     "kernel_loader.sys loaded",
//     "verifying_integrity...",
//     "connecting_db::atlas_shard_01",
//     "optimizing_assets::vector_graphics",
//     "injecting_styles::tailwind_v3",
//     "security_protocol::tls_1.3",
//     "rendering_engine::react_fiber",
//     "finalizing_handshake...",
//   ],
// };

// // --- 🎨 STYLES (Injected) ---
// const GlitchStyles = () => (
//   <style>{`
//     @keyframes glitch-anim-1 {
//       0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
//       20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
//       40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
//       60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
//       80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
//       100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
//     }
//     .glitch-text { position: relative; display: inline-block; }
//     .glitch-text::before, .glitch-text::after {
//       content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
//       background: #020617;
//     }
//     .glitch-text::before {
//       left: 2px; text-shadow: -1px 0 #ff00c1; clip-path: inset(0 0 0 0);
//       animation: glitch-anim-1 2s infinite linear alternate-reverse;
//     }
//     .glitch-text::after {
//       left: -2px; text-shadow: -1px 0 #00fff9; clip-path: inset(0 0 0 0);
//       animation: glitch-anim-1 3s infinite linear alternate-reverse;
//     }
//   `}</style>
// );

// // --- 🧩 SUB-COMPONENT: Decrypting Text ---
// const DecryptText = ({ text, speed = 50 }) => {
//   const [display, setDisplay] = useState("");
//   const CHARS =
//     "!@#$%^&*()_+-=[]{}|;:,.<>/?1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//   useEffect(() => {
//     let iteration = 0;
//     const interval = setInterval(() => {
//       setDisplay(
//         text
//           .split("")
//           .map((letter, index) => {
//             if (index < iteration) return text[index];
//             return CHARS[Math.floor(Math.random() * CHARS.length)];
//           })
//           .join(""),
//       );
//       if (iteration >= text.length) clearInterval(interval);
//       iteration += 1 / 2;
//     }, speed);
//     return () => clearInterval(interval);
//   }, [text, speed]);

//   return <span className="font-mono">{display}</span>;
// };

// // --- 🚀 MAIN COMPONENT ---
// const Preloader = ({ onAnimationComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [bootStep, setBootStep] = useState(0);
//   const sessionID = useMemo(
//     () => Math.random().toString(36).substr(2, 12).toUpperCase(),
//     [],
//   );

//   useEffect(() => {
//     let animationFrame;
//     const startTime = Date.now();

//     // 1. Progress Logic (Accelerating Curve)
//     const update = () => {
//       const elapsed = Date.now() - startTime;
//       const raw = Math.min((elapsed / PRELOADER_CONFIG.DURATION) * 100, 100);
//       // Ease-out Quad
//       const eased =
//         raw < 50
//           ? (2 * raw * raw) / 100
//           : -1 + ((4 - (2 * raw) / 100) * raw) / 100;

//       setProgress(Math.floor(raw));

//       if (elapsed < PRELOADER_CONFIG.DURATION) {
//         animationFrame = requestAnimationFrame(update);
//       } else {
//         setTimeout(onAnimationComplete, PRELOADER_CONFIG.EXIT_DELAY);
//       }
//     };

//     animationFrame = requestAnimationFrame(update);

//     // 2. Boot Sequence Logic
//     const stepInterval = setInterval(() => {
//       setBootStep((prev) => prev + 1);
//     }, PRELOADER_CONFIG.DURATION / PRELOADER_CONFIG.LOGS.length);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       clearInterval(stepInterval);
//     };
//   }, [onAnimationComplete]);

//   const getStatus = () => {
//     if (progress < 25) return "INITIALIZING BIOS...";
//     if (progress < 50) return "MOUNTING FILE SYSTEM...";
//     if (progress < 75) return "DECRYPTING USER DATA...";
//     if (progress < 99) return "ESTABLISHING SECURE LINK...";
//     return "ACCESS GRANTED";
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center overflow-hidden cursor-none select-none">
//       <GlitchStyles />

//       {/* --- BACKGROUND: Warp Speed Starfield --- */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617]" />
//         <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.1)_100%)] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
//         <div className="absolute inset-0 opacity-20 bg-[size:40px_40px] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)]" />
//       </div>

//       {/* --- FOREGROUND CONTENT --- */}
//       <motion.div
//         className="relative z-20 flex flex-col items-center w-full max-w-2xl px-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* 1. CENTRAL HUD RING */}
//         <div className="relative mb-10">
//           <motion.div
//             className="absolute inset-[-40px] border border-slate-700/50 rounded-full border-t-blue-500 border-r-transparent"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 4, ease: "linear", repeat: Infinity }}
//           />
//           <motion.div
//             className="absolute inset-[-20px] border border-slate-700/50 rounded-full border-b-emerald-500 border-l-transparent"
//             animate={{ rotate: -360 }}
//             transition={{ duration: 3, ease: "linear", repeat: Infinity }}
//           />

//           <div className="relative w-32 h-32 bg-[#020617] rounded-full flex items-center justify-center border-2 border-slate-800 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
//             <h1
//               className="text-5xl font-black tracking-tighter text-white glitch-text"
//               data-text="AT"
//             >
//               AT
//             </h1>
//           </div>

//           <motion.div
//             className="absolute -right-16 top-0 bg-slate-900/80 border border-slate-700 px-2 py-1 rounded text-[10px] text-emerald-400 font-mono flex items-center gap-1"
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.5 }}
//           >
//             <Wifi className="w-3 h-3" /> ONLINE
//           </motion.div>

//           <motion.div
//             className="absolute -left-16 bottom-0 bg-slate-900/80 border border-slate-700 px-2 py-1 rounded text-[10px] text-blue-400 font-mono flex items-center gap-1"
//             initial={{ opacity: 0, x: 10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.8 }}
//           >
//             <Lock className="w-3 h-3" /> SECURE
//           </motion.div>
//         </div>

//         {/* 2. TYPOGRAPHY & PROGRESS */}
//         <div className="w-full space-y-4">
//           <div className="flex items-end justify-between pb-2 border-b border-slate-800">
//             <div className="text-left">
//               <p className="mb-1 font-mono text-xs text-slate-500">
//                 SYSTEM STATUS
//               </p>
//               <p className="font-mono text-sm font-bold text-blue-400 uppercase">
//                 <DecryptText text={getStatus()} speed={30} />
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-5xl font-black tracking-tighter text-white tabular-nums">
//                 {progress}
//                 <span className="text-lg text-slate-600">%</span>
//               </p>
//             </div>
//           </div>

//           {/* 3. PROGRESS BAR (Segmented) */}
//           <div className="flex w-full h-2 gap-1">
//             {Array.from({ length: 20 }).map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="flex-1 rounded-sm"
//                 initial={{ backgroundColor: "#1e293b" }}
//                 animate={{
//                   backgroundColor: progress / 5 > i ? "#3b82f6" : "#1e293b",
//                   boxShadow:
//                     progress / 5 > i ? "0 0 10px rgba(59,130,246,0.5)" : "none",
//                 }}
//                 transition={{ duration: 0.1 }}
//               />
//             ))}
//           </div>

//           {/* 4. TERMINAL LOGS (Scrolling) */}
//           <div className="relative h-20 space-y-1 overflow-hidden font-mono text-xs mask-image-b">
//             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
//             <AnimatePresence>
//               {PRELOADER_CONFIG.LOGS.slice(
//                 Math.max(0, bootStep - 4),
//                 bootStep,
//               ).map((log, i) => (
//                 <motion.p
//                   key={bootStep + i}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="flex items-center gap-2 text-slate-500"
//                 >
//                   <span className="text-emerald-500">➜</span> {log}
//                 </motion.p>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* 5. FOOTER ID */}
//         <div className="absolute bottom-10 text-[10px] text-slate-700 font-mono tracking-[0.5em] opacity-50">
//           ID: {sessionID}
//         </div>
//       </motion.div>

//       {/* --- FLASH BANG EXIT EFFECT --- */}
//       <motion.div
//         className="absolute inset-0 bg-white z-[100] pointer-events-none"
//         initial={{ opacity: 0 }}
//         animate={
//           progress === 100
//             ? {
//                 opacity: [0, 1, 0],
//                 transition: { duration: 0.8, times: [0, 0.1, 1] },
//               }
//             : { opacity: 0 }
//         }
//       />
//     </div>
//   );
// };

// export default Preloader;












import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, Server, Globe, Cpu, Terminal, 
  ShieldCheck, Activity, Layers, Lock
} from "lucide-react";

// --- ⚙️ CONFIGURATION ---
const LOAD_DURATION = 3800;

const BOOT_LOGS = [
  { msg: "BIOS_INIT :: Verifying Hardware Integrity...", color: "text-slate-500" },
  { msg: "KERNEL :: Loading Virtual Environment...", color: "text-blue-400" },
  { msg: "NET_OP :: Resolving DNS Proxies...", color: "text-slate-400" },
  { msg: "AUTH :: Handshake established (TLS 1.3)", color: "text-emerald-400" },
  { msg: "MONGO_DB :: Connection Pool: Active (Shard-01)", color: "text-emerald-400" },
  { msg: "RUNTIME :: Hydrating React Fiber Tree...", color: "text-blue-300" },
  { msg: "ASSETS :: Optimizing Vector Graphics...", color: "text-purple-400" },
  { msg: "SECURITY :: WAF Enabled. Firewall Active.", color: "text-yellow-400" },
  { msg: "SYSTEM :: ALL SERVICES OPERATIONAL.", color: "text-white font-bold" }
];

const HEX_CHARS = "0123456789ABCDEF";

// --- 🧩 SUB-COMPONENTS ---

// 1. Hex Dump (Hidden on Mobile/Tablet, Visible on Laptop+)
const HexColumn = () => {
  const [hex, setHex] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lines = Array.from({ length: 14 }, () => 
        `0x${Math.random().toString(16).substr(2, 4).toUpperCase()}  ` +
        Array.from({ length: 2 }, () => 
          HEX_CHARS[Math.floor(Math.random() * 16)] + HEX_CHARS[Math.floor(Math.random() * 16)]
        ).join(" ")
      );
      setHex(lines);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    // 2xl:text-xs -> Scales up font for Projectors
    <div className="hidden lg:block font-mono text-[9px] 2xl:text-xs text-slate-600 opacity-40 select-none leading-relaxed overflow-hidden h-full">
      {hex.map((line, i) => (
        <div key={i} className="whitespace-nowrap">{line}</div>
      ))}
    </div>
  );
};

// 2. Status Node (Architecture Visualization)
const SystemNode = ({ icon: Icon, label, status, delay }) => {
  const isActive = status === 'active';
  const isReady = status === 'ready';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      // Responsive Padding & Text Sizes
      className={`relative flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-r-xl border-l-2 backdrop-blur-sm transition-all duration-500 overflow-hidden ${
        isActive 
          ? "bg-blue-500/10 border-blue-500 text-blue-100" 
          : isReady
          ? "bg-emerald-500/5 border-emerald-500/50 text-emerald-100 opacity-60"
          : "bg-slate-900/30 border-slate-800 text-slate-600"
      }`}
    >
      {isActive && (
        <motion.div 
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      )}

      <div className="relative z-10 p-1.5 md:p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
        <Icon className={`w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 ${isActive ? "text-blue-400 animate-pulse" : isReady ? "text-emerald-400" : "text-slate-600"}`} />
        {isReady && (
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" 
          />
        )}
      </div>
      
      <div className="z-10 flex flex-col min-w-0">
        <span className="text-[9px] md:text-[10px] 2xl:text-xs font-bold tracking-widest uppercase truncate">{label}</span>
        <span className="text-[8px] md:text-[9px] 2xl:text-[10px] font-mono opacity-80 truncate">
          {status === 'pending' ? "WAITING..." : isActive ? "INITIALIZING..." : "ONLINE"}
        </span>
      </div>
    </motion.div>
  );
};

// --- 🚀 MAIN PRELOADER ---
const Preloader = ({ onAnimationComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  
  const [latency, setLatency] = useState(24);
  const [memory, setMemory] = useState(128);

  useEffect(() => {
    const startTime = Date.now();
    let frameId;
    let logIndex = 0;

    const update = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / LOAD_DURATION) * 100, 100);
      
      const easedProgress = rawProgress < 50 
        ? 2 * rawProgress * rawProgress / 100 
        : -1 + (4 - 2 * rawProgress / 100) * rawProgress / 100;

      setProgress(Math.floor(rawProgress));

      if (rawProgress % 5 < 1) {
        setLatency(20 + Math.floor(Math.random() * 30));
        setMemory(128 + Math.floor(rawProgress * 4));
      }

      const totalLogs = BOOT_LOGS.length;
      const targetLogIndex = Math.floor((rawProgress / 100) * totalLogs);
      
      if (targetLogIndex > logIndex && logIndex < totalLogs) {
        const nextLog = BOOT_LOGS[logIndex];
        if (nextLog) {
          setLogs(prev => [...prev, nextLog]);
          logIndex++;
        }
      }

      if (elapsed < LOAD_DURATION) {
        frameId = requestAnimationFrame(update);
      } else {
        setTimeout(onAnimationComplete, 600);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [onAnimationComplete]);

  const getNodeStatus = (start, end) => {
    if (progress < start) return "pending";
    if (progress < end) return "active";
    return "ready";
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] text-slate-200 cursor-wait overflow-hidden font-sans antialiased selection:bg-blue-500/30">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.5),#020617_90%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
      
      {/* --- MAIN LAYOUT WRAPPER ---
        Mobile: w-full px-4
        Tablet: max-w-2xl
        Laptop: max-w-5xl
        Projector (2xl): max-w-7xl
      */}
      <div className="relative z-10 flex flex-col justify-center w-full h-full px-4 mx-auto transition-all duration-300 sm:px-6 md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl">
        
        {/* 1. TOP BAR */}
        <div className="flex flex-col justify-between pb-4 mb-6 border-b sm:flex-row sm:items-end border-slate-800 md:pb-6 md:mb-10">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center gap-2 mb-1 md:mb-2 text-emerald-400">
              <Terminal className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest">SYSTEM_BOOT_SEQUENCE_V2.5</span>
            </div>
            {/* Typography Scales Up for 4K */}
            <h1 className="text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-5xl 2xl:text-7xl">
              AAYUSH<span className="text-slate-700">.DEV</span>
            </h1>
          </div>
          
          <div className="flex gap-4 sm:gap-8 text-right font-mono text-[9px] md:text-[10px] 2xl:text-xs tracking-wider opacity-80 sm:opacity-100">
            <div className="flex flex-col">
              <span className="text-slate-600 mb-0.5">LATENCY</span>
              <span className="font-bold text-emerald-400">{latency}ms</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-600 mb-0.5">MEM_ALLOC</span>
              <span className="font-bold text-blue-400">{memory}MB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-600 mb-0.5">ENCRYPTION</span>
              <span className="flex items-center justify-end gap-1 font-bold text-white">
                <Lock className="w-2.5 h-2.5" /> AES-256
              </span>
            </div>
          </div>
        </div>

        {/* 2. GRID CONTENT */}
        {/* Mobile: Stacked (cols-1) | Laptop: 12 Cols */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Left: Hex Dump (Visible only on Laptop+) */}
          <div className="relative hidden pt-2 pr-4 border-r lg:block lg:col-span-2 border-slate-800">
            <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-blue-500/50 to-transparent" />
            <div className="flex items-center gap-2 mb-4 text-[10px] 2xl:text-xs font-bold text-slate-500 tracking-widest">
              <Cpu className="w-3 h-3" /> MEMORY
            </div>
            <HexColumn />
          </div>

          {/* Center: Architecture Nodes */}
          {/* Mobile: Full Width | Laptop: Col Span 6 */}
          <div className="flex flex-col justify-center space-y-2 lg:col-span-6 md:space-y-3">
            <SystemNode icon={Server} label="Backend Services" status={getNodeStatus(0, 35)} delay={0} />
            
            {/* Dashed Line Logic */}
            <div className="h-3 ml-6 border-l-2 border-dashed md:h-4 md:ml-8 border-slate-800" />
            
            <SystemNode icon={Database} label="Database Cluster" status={getNodeStatus(35, 65)} delay={0.1} />
            
            <div className="h-3 ml-6 border-l-2 border-dashed md:h-4 md:ml-8 border-slate-800" />
            
            <SystemNode icon={Layers} label="Client Hydration" status={getNodeStatus(65, 90)} delay={0.2} />
          </div>

          {/* Right: Live Terminal */}
          {/* Mobile: Full Width, shorter height | Laptop: Col Span 4, taller */}
          <div className="relative h-48 p-4 overflow-hidden border shadow-2xl lg:col-span-4 bg-black/40 rounded-xl border-slate-800 md:p-5 md:h-64 lg:h-72 2xl:h-96">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/10 shadow-[0_0_20px_#3b82f6] animate-[scan_3s_linear_infinite] z-20 pointer-events-none" />
            
            <div className="flex items-center justify-between pb-2 mb-3 border-b md:mb-4 border-slate-800/50">
              <span className="text-[9px] md:text-[10px] 2xl:text-xs font-bold text-slate-500 flex items-center gap-2 tracking-widest">
                <Activity className="w-3 h-3" /> LIVE_LOGS
              </span>
              <span className="text-[9px] md:text-[10px] 2xl:text-xs text-blue-500 font-mono font-bold">{Math.floor(progress)}%</span>
            </div>
            
            <div className="flex flex-col justify-end h-[calc(100%-30px)] space-y-1.5 md:space-y-2 font-mono text-[9px] md:text-[10px] 2xl:text-xs">
              <AnimatePresence initial={false}>
                {logs.slice(-7).map((log, i) => {
                  if (!log) return null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 md:gap-3"
                    >
                      <span className="hidden text-slate-700 whitespace-nowrap sm:inline">
                        [{new Date().toLocaleTimeString('en-US', {hour12: false, hour: "2-digit", minute:"2-digit", second:"2-digit"})}]
                      </span>
                      <span className={`${log.color} break-words leading-tight`}>{log.msg}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {progress < 100 && (
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }} 
                  className="flex items-center gap-2 mt-1 text-blue-500"
                >
                  <span className="text-slate-700">➜</span>
                  <div className="w-1.5 h-3 md:w-2 md:h-4 bg-blue-500" />
                </motion.div>
              )}
            </div>
          </div>

        </div>

        {/* 3. BOTTOM: PROGRESS BAR */}
        <div className="relative mt-8 md:mt-16">
          <div className="flex justify-between text-[9px] md:text-[10px] 2xl:text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
            <span>System Integrity Check</span>
            <span>{progress === 100 ? "Complete" : "Processing..."}</span>
          </div>
          
          <div className="w-full h-1 md:h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div 
              className="relative h-full bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-400"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-20 md:w-32 bg-white/40 blur-[10px]" />
            </motion.div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="absolute flex items-center justify-center w-full gap-2 -translate-x-1/2 bottom-4 md:bottom-8 left-1/2 opacity-30">
          <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
          <span className="text-[8px] md:text-[9px] 2xl:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.4em] uppercase text-slate-400 whitespace-nowrap">
            Secure_Connection_TLS_1.3
          </span>
        </div>

      </div>

      {/* FLASH EXIT */}
      <motion.div
        className="absolute inset-0 z-[100] bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={progress === 100 ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.8, times: [0, 0.1, 1], ease: "easeInOut" }}
      />
    </div>
  );
};

export default Preloader;