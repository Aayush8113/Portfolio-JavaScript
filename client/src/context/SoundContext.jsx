import { createContext, useContext, useMemo } from "react";

const MASTER_VOLUME = 0.02; 

const SOUND_PRESETS = {
  HOVER: { freq: 150, type: "sine", duration: 0.1, vol: 0.01 }, 
  CLICK: { freq: 300, type: "triangle", duration: 0.05, vol: 0.03 },
  MENU_OPEN: { freq: 100, type: "sine", duration: 0.2, vol: 0.02 },
  TYPE: { freq: 200, type: "sine", duration: 0.02, vol: 0.01, random: 50 }, 
  ERROR: { freq: 80, type: "sawtooth", duration: 0.3, vol: 0.05 },
  SUCCESS: { freq: 400, type: "sine", duration: 0.1, vol: 0.02 },
};

class AudioService {
  constructor() { this.ctx = null; }
  getContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (AudioCtor) this.ctx = new AudioCtor();
    }
    return this.ctx;
  }
  resume() {
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
  }
  play(presetName) {
    const ctx = this.getContext();
    if (!ctx || ctx.state === "suspended") return;
    const preset = SOUND_PRESETS[presetName];
    if (!preset) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const frequency = preset.random ? preset.freq + Math.random() * preset.random : preset.freq;
      osc.type = preset.type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      const volume = preset.vol * (MASTER_VOLUME * 20);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + preset.duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + preset.duration);
    } catch (e) {}
  }
}

const audioService = new AudioService();
const SoundContext = createContext(null);

export const SoundProvider = ({ children }) => {
  const soundApi = useMemo(() => ({
    playHover: () => audioService.play("HOVER"),
    playClick: () => audioService.play("CLICK"),
    playMenuOpen: () => audioService.play("MENU_OPEN"),
    playType: () => audioService.play("TYPE"),
    playError: () => audioService.play("ERROR"),
    playSuccess: () => audioService.play("SUCCESS"),
  }), []);

  return <SoundContext.Provider value={soundApi}>{children}</SoundContext.Provider>;
};

export const useScifiSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useScifiSound must be used within a SoundProvider");
  return context;
};