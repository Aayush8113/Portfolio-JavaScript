import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  Code,
  FileText,
  Github,
  Home,
  Linkedin,
  Menu,
  Terminal,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScifiSound } from "../context/SoundContext";

// --- CONFIGURATION ---
const NAV_ITEMS = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Work", path: "/work", icon: Code },
  // { name: "Resume", path: "/resume", icon: FileText },
];

const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/Aayush8113", icon: Github },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aayushtripathi081103",
    icon: Linkedin,
  },
];

const NavLogo = () => (
  <div className="relative flex items-center gap-3 cursor-pointer group">
    <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden transition-transform border shadow-2xl rounded-xl bg-slate-950 border-slate-800 group-hover:scale-105">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(56,189,248,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
      <span className="z-10 text-sm font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">
        AT
      </span>
    </div>
    <div className="hidden sm:block">
      <h1 className="text-sm font-bold leading-none tracking-tight transition-colors text-slate-100 group-hover:text-blue-400">
        Aayush Tripathi
      </h1>
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();
  const sound = useScifiSound();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div className="w-full h-20" />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#020617]/60"
      >
        <div className="container flex items-center justify-between h-full px-4 mx-auto sm:px-6 lg:px-8">
          {/* 1. BRAND */}
          <Link to="/" onClick={sound.playClick} onMouseEnter={sound.playHover}>
            <NavLogo />
          </Link>

          {/* 2. CENTER NAVIGATION - ICON & BRACKET STYLE */}
          <div className="hidden md:flex items-center gap-1 p-1 px-3 rounded-full border border-white/10 bg-slate-950/40 backdrop-blur-md shadow-inner">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const isHovered = hoveredPath === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => {
                    setHoveredPath(item.path);
                    sound.playHover();
                  }}
                  onMouseLeave={() => setHoveredPath(null)}
                  onClick={sound.playClick}
                  className={`relative px-4 py-2 group transition-all duration-300 rounded-full flex items-center gap-2.5 ${
                    isActive ? "text-white" : "text-slate-500 hover:text-slate-100"
                  }`}
                >
                  {/* Active/Hover Background Glow */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        layoutId="nav-bg-glow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-blue-500/5 border border-blue-500/10 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Nav Icon */}
                  <Icon 
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      isActive ? "text-blue-400" : isHovered ? "text-blue-300" : "text-slate-600"
                    }`} 
                  />

                  {/* Nav Text with Brackets */}
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.15em] flex items-center">
                    <span className={`inline-block transition-all duration-300 mr-0.5 font-mono text-blue-500 ${isHovered || isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                      [
                    </span>
                    {item.name}
                    <span className={`inline-block transition-all duration-300 ml-0.5 font-mono text-blue-500 ${isHovered || isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
                      ]
                    </span>
                  </span>

                  {/* Bottom Indicator for Active Page */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" 
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 3. RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <div className="items-center hidden gap-1 pr-4 border-r lg:flex border-white/10">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={sound.playHover}
                  onClick={sound.playClick}
                  className="p-2 transition-all rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <Link
              to="/contact"
              onClick={sound.playClick}
              onMouseEnter={sound.playHover}
              className="hidden sm:flex group relative items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]" />
              <Terminal className="w-4 h-4" />
              <span className="relative z-10 text-xs font-bold tracking-wider uppercase">
                Initialize
              </span>
            </Link>

            <button
              onClick={() => {
                setIsOpen(!isOpen);
                sound.playMenuOpen();
              }}
              className="p-2 transition-colors md:hidden text-slate-300 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Top Scroll Progress */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 origin-left z-50"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-20 z-40 bg-[#020617] border-t border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container relative z-10 flex flex-col gap-6 px-6 py-8 mx-auto">
              <div className="space-y-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        sound.playClick();
                      }}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        location.pathname === item.path
                          ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"
                          : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-lg font-bold uppercase tracking-widest">{item.name}</span>
                      {location.pathname === item.path && (
                         <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 p-3 transition-all border rounded-lg bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-600"
                    >
                      <social.icon className="w-4 h-4" /> {social.name}
                    </a>
                  ))}
                </div>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full gap-2 p-4 mt-4 font-bold text-white transition-all bg-blue-600 shadow-lg rounded-xl hover:bg-blue-500"
                >
                  <Zap className="w-5 h-5" /> START PROJECT
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;