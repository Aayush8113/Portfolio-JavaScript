import {
  ArrowUpRight,
  Code,
  Cpu,
  FolderOpen,
  Github,
  Globe,
  Heart,
  Linkedin,
  Mail,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScifiSound } from "../context/SoundContext";

// --- CONSTANTS ---
const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/Aayush8113",
    icon: Github,
    color: "group-hover:text-white",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aayushtripathi081103",
    icon: Linkedin,
    color: "group-hover:text-blue-400",
  },
  {
    name: "Email",
    url: "mailto:aayushtripathi.tech@gmail.com",
    icon: Mail,
    color: "group-hover:text-emerald-400",
  },
];

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

// --- COMPONENTS ---

const FooterLogo = () => (
  <div className="relative flex items-center gap-3 cursor-pointer group">
    {/* Slightly smaller logo box for footer proportions */}
    <div className="relative flex items-center justify-center w-9 h-9 overflow-hidden transition-transform border shadow-2xl rounded-xl bg-slate-950 border-slate-800 group-hover:scale-105">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(56,189,248,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
      <span className="z-10 text-xs font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">
        AT
      </span>
    </div>
    <div>
      <h3 className="text-sm font-bold leading-none tracking-tight transition-colors text-slate-100 group-hover:text-blue-400">
        Aayush Tripathi
      </h3>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-emerald-400 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span className="text-[9px] font-mono font-medium text-emerald-500/80 uppercase tracking-widest">
          System Online
        </span>
      </div>
    </div>
  </div>
);

const ServerClock = () => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setTimeStr(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Sleeker padding (px-2.5 py-1)
    <div className="font-mono text-[9px] text-slate-400 flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-inner">
      <Globe className="w-2.5 h-2.5 text-blue-500" />
      <span>IST: {timeStr}</span>
    </div>
  );
};

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
  </div>
);

const Footer = () => {
  const sound = useScifiSound();

  return (
    // Reduced padding: pt-12 pb-6 (was pt-16 pb-8)
    <footer className="relative w-full bg-[#020617] border-t border-slate-800/60 pt-12 pb-6 overflow-hidden">
      <GridBackground />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* Reduced gap: gap-8 lg:gap-10 mb-10 (was gap-12 mb-16) */}
        <div className="grid grid-cols-1 gap-8 mb-10 md:grid-cols-12 lg:gap-10">
          
          <div className="space-y-4 md:col-span-5">
            <Link 
              to="/" 
              className="inline-block"
              onMouseEnter={sound.playHover}
              onClick={sound.playClick}
            >
              <FooterLogo />
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              Architecting scalable MERN ecosystems and immersive digital
              experiences. Focused on performance, security, and pixel-perfect
              UI.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <ServerClock />
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-inner">
                <Terminal className="w-2.5 h-2.5 text-blue-400" />
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                  Ready to Build
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {/* Reduced mb-6 to mb-4 */}
            <h4 className="flex items-center gap-2 mb-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              <FolderOpen className="w-3 h-3 text-blue-500" /> Directory
            </h4>
            {/* Reduced space-y-2 to space-y-1 */}
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onMouseEnter={sound.playHover}
                    onClick={sound.playClick}
                    className="inline-flex items-center group relative py-1"
                  >
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-slate-100 transition-colors flex items-center">
                      <span className="inline-block transition-all duration-300 mr-1 font-mono text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                        [
                      </span>
                      {link.name}
                      <span className="inline-block transition-all duration-300 ml-1 font-mono text-blue-500 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                        ]
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            {/* Reduced mb-6 to mb-4 */}
            <h4 className="flex items-center gap-2 mb-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              <Cpu className="w-3 h-3 text-purple-500" /> Neural Link
            </h4>
            <div className="grid gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={sound.playHover}
                    onClick={sound.playClick}
                    // Sleeker padding: py-2 px-3 (was p-3)
                    className="flex items-center justify-between py-2 px-3 transition-all duration-300 rounded-lg group bg-slate-950/40 backdrop-blur-md border border-white/5 hover:border-white/10 hover:bg-white/5 shadow-inner"
                  >
                    <div className="flex items-center gap-3">
                      {/* Smaller icon wrapper: p-1.5 */}
                      <div className={`p-1.5 rounded bg-[#020617] border border-slate-800 text-slate-500 ${social.color} transition-colors`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] transition-colors text-slate-400 group-hover:text-slate-100">
                        {social.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reduced pt-8 to pt-6 */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 border-t border-slate-800/60 md:flex-row">
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-slate-500">
            <Code className="w-3 h-3 text-blue-500" />
            <span>
              Built with <span className="text-slate-300">React</span> +{" "}
              <span className="text-slate-300">Tailwind</span> +{" "}
              <span className="text-slate-300">Framer Motion</span>
            </span>
          </div>

          <p className="text-[9px] sm:text-[10px] font-mono text-slate-600">
            © {new Date().getFullYear()} Aayush Tripathi.{" "}
            <span className="text-slate-500">All Systems Operational.</span>
          </p>

          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500/20 animate-pulse" />
            <span>in Ahmedabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;