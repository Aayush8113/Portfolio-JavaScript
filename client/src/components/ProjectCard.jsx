import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Github,
  Globe,
  ImageOff,
  Layers,
  Server,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useScifiSound } from "../context/SoundContext"; // ✅ Global Sound Engine

const ProjectCard = ({ project }) => {
  const ref = useRef(null);
  const sound = useScifiSound();
  const [imgError, setImgError] = useState(false);

  // --- 3D TILT PHYSICS ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100, mass: 1 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100, mass: 1 });

  function handleMouseMove({ clientX, clientY }) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const rotateX = useMotionTemplate`${mouseY.get() / 25}deg`; 
  const rotateY = useMotionTemplate`${mouseX.get() / -25}deg`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={sound.playHover} // ✅ Fixed Method Name
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      className="relative w-full h-full min-h-[400px] sm:min-h-[420px] group rounded-2xl perspective-1000 hover:z-50"
    >
      {/* --- BACKGROUND GLOW --- */}
      <div
        className="absolute transition-opacity duration-500 opacity-0 -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 group-hover:opacity-60 blur-xl"
        style={{ transform: "translateZ(-20px)" }}
      />

      {/* --- CARD CONTAINER --- */}
      <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl transition-colors duration-300 group-hover:border-slate-700/80">
        <motion.div
          className="absolute z-30 transition duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
          style={{
            background: useMotionTemplate`radial-gradient(500px circle at ${mouseX.get() + 300}px ${mouseY.get() + 300}px, rgba(56, 189, 248, 0.10), transparent 80%)`,
          }}
        />

        <div className="relative overflow-hidden border-b h-44 sm:h-48 bg-slate-900 shrink-0 border-slate-800/50">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.1)_2px,transparent_2px)] bg-[size:20px_20px] z-10 opacity-30 pointer-events-none" />
          <div className="absolute inset-0 z-10 transition-colors duration-500 bg-slate-900/20 group-hover:bg-transparent" />

          {imgError ? (
            <div className="flex items-center justify-center w-full h-full text-slate-600">
              <ImageOff className="w-12 h-12 opacity-50" />
            </div>
          ) : (
            <img
              src={project.imageUrl}
              alt={project.title}
              onError={() => setImgError(true)}
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              loading="lazy"
            />
          )}

          {project.liveLink && (
            <div className="absolute z-20 top-3 right-3">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-emerald-500/30 backdrop-blur-md shadow-lg">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Online
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-20 flex flex-col flex-grow p-5">
          <div className="mb-3">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3
                className="text-lg font-bold leading-tight text-white truncate transition-colors group-hover:text-blue-400"
                title={project.title}
              >
                {project.title}
              </h3>
              <Layers className="w-4 h-4 transition-colors shrink-0 text-slate-600 group-hover:text-blue-500" />
            </div>

            <p className="text-sm leading-relaxed text-slate-400 line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-[4px] bg-blue-500/5 border border-blue-500/20 text-[9px] font-mono text-blue-300 uppercase tracking-wider flex items-center gap-1"
              >
                <Code2 className="w-3 h-3 opacity-70" /> {tag}
              </span>
            ))}
            {project.tags?.length > 3 && (
              <span className="px-2 py-1 rounded-[4px] bg-slate-800 border border-slate-700 text-[9px] font-mono text-slate-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <div className="pt-3 mt-auto border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono uppercase">
                <Server className="w-3 h-3" />
                <span>V.1.0.4</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-slate-600" />
                <div className="w-1 h-1 rounded-full bg-slate-600" />
                <div className="w-1 h-1 rounded-full bg-slate-600" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <Link
                to={`/work/${project._id}`}
                onClick={sound.playClick} // ✅ Fixed Method Name
                className="flex items-center justify-center flex-1 gap-2 py-2 text-xs font-bold tracking-widest text-white uppercase transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 shadow-blue-900/20 group/btn"
              >
                <span>Analyze</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>

              <div className="flex gap-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick(); // ✅ Fixed Method Name
                    }}
                    className="p-2 transition-all border rounded-lg bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick(); // ✅ Fixed Method Name
                    }}
                    className="p-2 transition-all border rounded-lg bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-3 h-3 transition-all border-t-2 border-l-2 border-blue-500 rounded-tl-sm opacity-0 group-hover:opacity-100" />
        <div className="absolute top-0 right-0 w-3 h-3 transition-all border-t-2 border-r-2 border-blue-500 rounded-tr-sm opacity-0 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-3 h-3 transition-all border-b-2 border-l-2 border-blue-500 rounded-bl-sm opacity-0 group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 w-3 h-3 transition-all border-b-2 border-r-2 border-blue-500 rounded-br-sm opacity-0 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;