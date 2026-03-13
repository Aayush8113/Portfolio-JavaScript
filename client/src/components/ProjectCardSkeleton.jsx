import { Image, Loader2 } from "lucide-react";

const ProjectCardSkeleton = () => {
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-sm transform transition-all">
      {/* --- CINEMATIC SHIMMER EFFECT (GPU Accelerated) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* --- IMAGE AREA --- */}
      <div className="relative flex items-center justify-center w-full h-56 overflow-hidden border-b bg-slate-900/50 border-slate-800/50">
        {/* Pulsing Icon */}
        <div className="flex flex-col items-center gap-2 opacity-20">
          <Image className="w-8 h-8 text-slate-400 animate-pulse" />
        </div>
        {/* Diagonal Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] opacity-20" />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex flex-col flex-grow p-6 space-y-6">
        {/* Title & Desc Group */}
        <div className="space-y-3">
          {/* Title Line */}
          <div className="relative w-3/4 h-6 overflow-hidden rounded-md bg-slate-800/80">
            {/* Inner scan for individual text block */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent animate-[shimmer_2s_infinite]" />
          </div>

          {/* Description Lines */}
          <div className="space-y-2">
            <div
              className="w-full h-3 rounded-full bg-slate-800/50 animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-5/6 h-3 rounded-full bg-slate-800/50 animate-pulse"
              style={{ animationDelay: "100ms" }}
            />
            <div
              className="w-4/6 h-3 rounded-full bg-slate-800/50 animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
          </div>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-16 h-6 rounded-md bg-slate-800/60 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        {/* --- FOOTER --- */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-800/50">
          {/* Left Action */}
          <div className="w-24 h-4 rounded-full bg-slate-800/60 animate-pulse" />

          {/* Right Icons */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800/60 animate-pulse" />
            <div
              className="w-8 h-8 rounded-lg bg-slate-800/60 animate-pulse"
              style={{ animationDelay: "100ms" }}
            />
          </div>
        </div>
      </div>

      {/* Status Badge (Top Right) */}
      <div className="absolute z-10 flex items-center gap-2 px-3 py-1 border rounded-full top-3 right-3 bg-slate-950/80 border-slate-800/50 backdrop-blur-md">
        <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          Loading
        </span>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
