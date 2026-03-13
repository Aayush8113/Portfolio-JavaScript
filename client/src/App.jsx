import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { AlertTriangle, MessageSquare, X, Cpu, Send } from "lucide-react";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { chatWithAI } from "./utils/api";
import { useScifiSound } from "./context/SoundContext";

// Core Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";

// --- LAZY LOADED ROUTES ---
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
// const ResumePage = lazy(() => import("./pages/ResumePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
};

const CustomCursor = memo(() => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      const target = e.target;
      setIsHovering(
        target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button"),
      );
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden lg:flex items-center justify-center mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        animate={{ scale: isHovering ? 2.5 : 1, opacity: isHovering ? 0.8 : 1 }}
        className={`rounded-full border border-white bg-white transition-colors duration-200 ${isHovering ? "bg-opacity-10" : ""}`}
        style={{ width: "8px", height: "8px" }}
      />
    </motion.div>
  );
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("System Failure:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-white">
          <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
          <h2 className="text-xl font-bold tracking-widest uppercase">
            System Critical Error
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 mt-6 text-red-500 transition-colors border border-red-500 hover:bg-red-500/10"
          >
            HARD REBOOT
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const PageLoader = () => (
  <div className="flex min-h-[80vh] items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
  </div>
);

const FloatingAI = () => {
  const sound = useScifiSound();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "System Online. I am the Gemini Assistant. How can I help you?", isBot: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    sound.playClick();
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    sound.playType();
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await chatWithAI(userMsg);
      sound.playSuccess();
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    } catch (error) {
      sound.playError();
      const errorMsg = error.response?.data?.error || "Link Interrupted.";
      setMessages(prev => [...prev, { text: `⚠️ ERROR: ${errorMsg}`, isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed z-[9999] bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            className="w-[calc(100vw-2rem)] md:w-96 max-w-[500px] h-[500px] md:h-[600px] bg-slate-950/90 border border-blue-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden mb-4 flex flex-col backdrop-blur-2xl"
          >
            {/* HUD Header */}
            <div className="bg-blue-600/10 p-4 flex justify-between items-center border-b border-blue-500/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Cpu size={18} className="text-blue-400 animate-pulse" />
                  <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full" />
                </div>
                <div>
                  <span className="block font-black text-[10px] uppercase tracking-[0.2em] text-blue-400 leading-none">Gemini AI</span>
                  <span className="block font-mono text-[8px] uppercase tracking-widest text-slate-500">Secure Protocol</span>
                </div>
              </div>
              <button onClick={toggleChat} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X size={20} className="text-slate-400 hover:text-white"/>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.isBot ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex flex-col ${m.isBot ? 'items-start' : 'items-end'}`}
                >
                  <div className={`p-3 rounded-2xl max-w-[85%] font-medium text-sm leading-relaxed shadow-sm ${
                    m.isBot 
                    ? 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-tr-none'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[8px] font-mono mt-1 text-slate-600 uppercase tracking-tighter">
                    {m.isBot ? 'Architect_AI' : 'Visitor'} // {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-blue-500 p-2">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                </div>
              )}
            </div>

            {/* Command Line */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800">
              <div className="relative flex items-center bg-slate-950 border border-slate-700 rounded-xl focus-within:border-blue-500/50 transition-all p-1">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Execute command..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-slate-200 placeholder:text-slate-600"
                />
                <button 
                  onClick={handleSend} 
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition-all active:scale-95"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="relative group bg-blue-600 p-4 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="text-white relative z-10" size={24} />
        {!isOpen && (
          <span className="absolute top-3 right-3 w-2 h-2 bg-emerald-400 rounded-full border-2 border-blue-600" />
        )}
      </motion.button>
    </div>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans antialiased text-slate-200 selection:bg-blue-500/30 selection:text-white">
      <div className="fixed inset-0 z-[-1] bg-[#020617]">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <CustomCursor />
      <Navbar />
      <main className="relative flex-grow">{children}</main>
      <Footer />
      <FloatingAI />
    </div>
  );
};

function App() {
  const location = useLocation();
  useScrollToTop();

  const [isSystemReady, setSystemReady] = useState(false);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {!isSystemReady ? (
          <Preloader
            key="preloader"
            onAnimationComplete={() => setSystemReady(true)}
          />
        ) : (
          <MainLayout key="main-interface">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/work/:id" element={<ProjectDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  {/* <Route path="/resume" element={<ResumePage />} /> */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </MainLayout>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;