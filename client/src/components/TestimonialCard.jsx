import { motion } from "framer-motion";
import { Activity, BadgeCheck, Briefcase, Quote, Star } from "lucide-react";
import { useMemo } from "react";
import { useScifiSound } from "../context/SoundContext";

// --- HELPER: Extract Initials ---
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const TestimonialCard = ({ testimonial }) => {
  const sound = useScifiSound();

  // Memoize heavy calculations (Best Practice)
  const { name, role, company, quote, rating, initials } = useMemo(() => {
    const safeData = testimonial || {};
    return {
      name: safeData.name || "Anonymous User",
      role: safeData.role || "Client",
      company: safeData.company || null,
      quote: safeData.quote || "No feedback provided.",
      rating: Math.min(5, Math.max(1, safeData.rating || 5)),
      initials: getInitials(safeData.name),
    };
  }, [testimonial]);

  if (!testimonial) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5 }}
      onMouseEnter={sound.playHover}
      className="group relative flex flex-col h-full w-full min-h-[280px] rounded-2xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-xl transition-all duration-500 hover:border-slate-600 hover:shadow-[0_20px_50px_rgba(8,112,184,0.15)] overflow-hidden"
    >
      {/* --- BACKGROUND LAYERS --- */}
      {/* Gradient Mesh */}
      <div className="absolute transition duration-700 opacity-0 -inset-px bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 group-hover:opacity-100 blur-xl" />
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative p-3 transition-colors border rounded-xl bg-slate-900/50 border-slate-800 group-hover:border-blue-500/30">
            <Quote className="w-6 h-6 transition-colors text-slate-500 group-hover:text-blue-400" />
          </div>

          {/* Rating Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/30 border border-emerald-900/50"
            role="img"
            aria-label={`Rating: ${rating} out of 5 stars`}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < rating ? "text-emerald-400 fill-emerald-400" : "text-slate-700"}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-500">
              {rating}.0
            </span>
          </div>
        </div>

        {/* BODY */}
        <blockquote className="relative flex-grow mb-8">
          <p className="text-sm italic leading-relaxed transition-colors sm:text-base text-slate-300 line-clamp-4 group-hover:text-slate-200">
            "{quote}"
          </p>
        </blockquote>

        {/* FOOTER: IDENTITY */}
        <div className="flex items-center gap-4 pt-6 mt-auto border-t border-slate-800/60">
          {/* Avatar Area */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 transition duration-500 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 blur opacity-20 group-hover:opacity-60" />
            <div className="relative flex items-center justify-center w-10 h-10 text-sm font-bold transition-colors border rounded-full sm:w-12 sm:h-12 bg-slate-950 border-slate-800 text-slate-300 group-hover:border-blue-500/50 group-hover:text-white">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#0f172a] rounded-full p-[2px]">
              <BadgeCheck className="w-3.5 h-3.5 text-blue-400 fill-blue-900" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col min-w-0 mr-auto">
            <h4 className="text-sm font-bold tracking-wide text-white truncate transition-colors group-hover:text-blue-300">
              {name}
            </h4>
            <div className="flex items-center gap-2 text-xs truncate text-slate-500">
              <span className="font-medium text-slate-400">{role}</span>
              {company && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                  <span className="flex items-center gap-1 truncate">
                    <Briefcase className="w-3 h-3" /> {company}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Dynamic Audio Visualizer */}
          <div
            className="hidden sm:flex items-end gap-0.5 h-4"
            title="Verified Audio Feedback"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500 mr-1 mb-0.5" />
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-emerald-500/50 rounded-full"
                animate={{
                  height: [4, Math.random() * 12 + 4, 4],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hover Border Gradient */}
      <div className="absolute inset-0 transition-colors duration-500 border-2 border-transparent pointer-events-none rounded-2xl group-hover:border-blue-500/20" />
    </motion.div>
  );
};

export default TestimonialCard;
