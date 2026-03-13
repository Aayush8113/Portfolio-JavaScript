import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Clock,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import ContactForm from "../components/ContactForm";
import { useScifiSound } from "../context/SoundContext";

// --- ⚙️ CONFIGURATION ---
const CONFIG = {
  LOCATION: {
    city: "Ahmedabad, IN",
    timezone: "Asia/Kolkata",
    label: "HQ_COORDINATES",
  },
  TERMINAL_LOGS: [
    { text: "Initializing secure handshake...", color: "text-slate-400" },
    { text: "Resolving host: aayush.dev...", color: "text-blue-400" },
    { text: "Encryption: AES-256-GCM enabled", color: "text-emerald-400" },
    { text: "Channel OPEN. Awaiting transmission...", color: "text-white" },
  ],
  SOCIALS: [
    {
      id: "email",
      label: "aayushtripathi.tech",
      sub: "SMTP Protocol",
      icon: Mail,
      href: "mailto:aayushtripathi.tech@gmail.com",
      color: "text-blue-400",
      hoverBorder: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      sub: "Professional Net",
      icon: Linkedin,
      href: "https://linkedin.com/in/aayushtripathi081103",
      color: "text-indigo-400",
      hoverBorder: "group-hover:border-indigo-500/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]",
    },
    {
      id: "github",
      label: "GitHub",
      sub: "Source Code",
      icon: Github,
      href: "https://github.com/Aayush8113",
      color: "text-slate-200",
      hoverBorder: "group-hover:border-slate-400/50 group-hover:shadow-[0_0_15px_rgba(148,163,184,0.15)]",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      sub: "VoIP Encrypted",
      icon: FaWhatsapp,
      href: "https://wa.me/+919737759381",
      color: "text-emerald-400",
      hoverBorder: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    },
  ],
};

// --- 🧩 SUB-COMPONENTS ---

const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: CONFIG.LOCATION.timezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono tabular-nums text-slate-300">{time}</span>;
};

const TerminalWindow = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let timeouts = [];
    CONFIG.TERMINAL_LOGS.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, log]);
      }, index * 800); 
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#050a14]/90 overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Mac-style Terminal Header */}
      <div className="flex items-center px-4 py-3 border-b bg-slate-900/80 border-slate-800">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
        </div>
        <div className="flex items-center gap-2 mx-auto -ml-8">
          <Terminal className="w-3 h-3 text-slate-500" />
          <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">
            root@architect:~
          </span>
        </div>
      </div>
      {/* Terminal Body */}
      <div className="p-5 h-36 flex flex-col justify-end font-mono text-[11px] sm:text-xs space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3"
          >
            <span className="text-emerald-500 mt-0.5">➜</span>
            <span className={line.color}>{line.text}</span>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-2 h-3.5 bg-blue-400 block mt-2 ml-6 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
        />
      </div>
    </div>
  );
};

const LocationCard = () => (
  <div className="relative overflow-hidden flex items-center gap-5 p-5 border rounded-2xl border-white/5 bg-slate-900/30 backdrop-blur-xl group hover:bg-slate-900/50 transition-colors">
    {/* Map Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none opacity-50" />
    
    <div className="relative flex items-center justify-center w-14 h-14 border rounded-full bg-[#020617] border-slate-800 shadow-inner z-10">
      {/* Radar Ping */}
      <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-50" style={{ animationDuration: '3s' }} />
      <Globe className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
    </div>
    
    <div className="relative z-10">
      <p className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em] mb-1.5">
        {CONFIG.LOCATION.label}
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {CONFIG.LOCATION.city}
        </h3>
        <div className="hidden sm:block w-px h-4 bg-slate-700" />
        <p className="text-slate-400 text-xs flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-emerald-400" /> <LiveClock />
        </p>
      </div>
    </div>
  </div>
);

const ConnectionCard = ({ data }) => {
  const sound = useScifiSound();
  const Icon = data.icon;
  
  return (
    <a
      href={data.href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={sound.playHover}
      onClick={sound.playClick}
      className={`group flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/5 transition-all duration-500 ${data.hoverBorder}`}
    >
      <div className="w-12 h-12 rounded-lg bg-[#020617] flex items-center justify-center border border-slate-800 group-hover:border-slate-600 transition-colors shadow-inner">
        <Icon className={`w-5 h-5 ${data.color} transition-transform duration-300 group-hover:scale-110`} />
      </div>
      <div className="flex-1">
        <p className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.15em] mb-0.5 group-hover:text-slate-400 transition-colors">
          {data.sub}
        </p>
        <p className="text-sm font-bold tracking-wide transition-colors text-slate-300 group-hover:text-white">
          {data.label}
        </p>
      </div>
      <div className="p-2 rounded-full bg-white/[0.02] group-hover:bg-white/[0.08] transition-colors">
        <ExternalLink className="w-4 h-4 transition-transform text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
};

// --- 🚀 MAIN PAGE ---
const ContactPage = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.main
      className="relative min-h-[calc(100vh-80px)] bg-[#020617] text-slate-200 py-16 md:py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Deep Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Interactive Spotlight */}
      <motion.div
        className="absolute transition duration-300 opacity-0 pointer-events-none bg-blue-500/10 -inset-px group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
        }}
      />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border rounded-full bg-emerald-900/10 border-emerald-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
            <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-emerald-400">
              Uplink Established
            </span>
          </motion.div>

          <h1 className="mb-6 text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl drop-shadow-2xl">
            INITIATE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              PROTOCOL
            </span>
          </h1>
          <p className="max-w-2xl mx-auto font-mono text-sm leading-relaxed text-slate-400 md:text-base">
            SECURE CHANNEL OPEN. TRANSMIT PROJECT DATA DIRECTLY TO THE SERVER OR ESTABLISH A PEER-TO-PEER CONNECTION.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN: COMMAND CENTER */}
          <div className="space-y-8 lg:col-span-5">
            <TerminalWindow />
            <LocationCard />

            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-slate-800" />
                <h3 className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
                  <Cpu className="w-4 h-4 text-purple-400" /> Direct Links
                </h3>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              {/* Primary Contact */}
              <ConnectionCard data={CONFIG.SOCIALS[0]} />

              {/* Grid Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONFIG.SOCIALS.slice(1).map((social) => (
                  <ConnectionCard key={social.id} data={social} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM VAULT */}
          <div className="lg:col-span-7 relative">
            {/* Form Glow Underlay */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-2xl" />
            
            <div className="relative rounded-3xl border border-slate-800/80 bg-[#0f172a]/40 backdrop-blur-2xl p-1.5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Form HUD Header */}
              <div className="bg-[#020617]/90 px-6 py-4 flex items-center justify-between border-b border-slate-800 rounded-t-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <div className="h-4 w-px bg-slate-800" />
                  <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
                    Transmission_Payload
                  </span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 border rounded bg-emerald-950/30 border-emerald-900/50 shadow-inner">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                    AES-256 Secured
                  </span>
                </div>
              </div>

              {/* Form Container */}
              <div className="relative p-6 md:p-10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

                <div className="relative z-10">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default ContactPage;