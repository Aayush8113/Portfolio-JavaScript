import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Terminal,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import api from "../utils/api";
import { useScifiSound } from "../context/SoundContext";

// --- ⚙️ CONFIGURATION: Validation Rules ---
const VALIDATION_RULES = {
  name: {
    regex: /^[a-zA-Z\s\u00C0-\u00FF'-]+$/,
    error: "SYNTAX ERROR: INVALID CHARS",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    error: "INVALID PROTOCOL (EMAIL)",
  },
  phone: {
    // Requires a valid phone number structure
    regex: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    error: "INVALID NUMBER REQUIRED",
    // ❌ Removed "optional: true" so it is now STRICTLY REQUIRED
  },
  message: {
    validate: (val) => !/<script/i.test(val) && val.length >= 10,
    error: (val) =>
      /<script/i.test(val)
        ? "SECURITY THREAT DETECTED"
        : `BUFFER UNDERRUN (${val.length}/10)`,
  },
};

// --- 🧩 SUB-COMPONENT: Form Input ---
const FormInput = ({
  name,
  icon: Icon,
  placeholder,
  type = "text",
  isArea = false,
  value,
  error,
  touched,
  onChange,
  onBlur,
  onFocus,
  isFocused,
}) => {
  // Now every field MUST have a value to be valid
  const isValid = touched && !error && value !== ""; 
  const hasError = touched && error;

  return (
    <div
      className={`space-y-1.5 relative group transition-all duration-500 ${isFocused ? "opacity-100 scale-[1.01]" : "opacity-90"}`}
    >
      <div className="flex items-end justify-between px-1">
        <label
          htmlFor={name}
          className={`text-[9px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${hasError ? "text-red-500" : isFocused ? "text-blue-400" : "text-slate-500"}`}
        >
          {name}
        </label>
        <span
          className={`text-[9px] font-mono tracking-wider uppercase ${hasError ? "text-red-500" : "text-slate-600"}`}
        >
          {hasError ? (
            error
          ) : isValid ? (
            <span className="flex items-center gap-1 text-emerald-500">
              <ShieldCheck className="w-3 h-3" /> SECURE
            </span>
          ) : (
            "REQUIRED"
          )}
        </span>
      </div>

      <div className="relative">
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 transition duration-300 ${isFocused ? "opacity-30 blur-md" : ""}`}
        />
        <div className="relative bg-[#0B1120] rounded-lg group-hover:bg-[#0f172a] transition-colors">
          <Icon
            className={`absolute left-4 ${isArea ? "top-4" : "top-1/2 -translate-y-1/2"} w-5 h-5 transition-colors duration-300 ${hasError ? "text-red-500" : isValid ? "text-emerald-500" : isFocused ? "text-blue-400" : "text-slate-600"}`}
          />

          {isArea ? (
            <textarea
              id={name}
              name={name}
              rows="4"
              placeholder={isFocused ? "" : placeholder}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={`w-full bg-transparent border rounded-lg pl-12 pr-10 py-4 text-sm font-mono text-blue-100 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all duration-300 ${hasError ? "border-red-500/50" : "border-slate-800"}`}
              aria-invalid={!!hasError}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              placeholder={isFocused ? "" : placeholder}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={`w-full bg-transparent border rounded-lg pl-12 pr-10 py-3.5 text-sm font-mono text-blue-100 placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all duration-300 ${hasError ? "border-red-500/50" : "border-slate-800"}`}
              aria-invalid={!!hasError}
            />
          )}

          <div
            className={`absolute right-4 ${isArea ? "top-4" : "top-1/2 -translate-y-1/2"}`}
          >
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <XCircle className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                </motion.div>
              )}
              {isValid && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 🚀 MAIN COMPONENT ---
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formState, setFormState] = useState({ touched: {}, errors: {} });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const [focusedField, setFocusedField] = useState(null);
  const [uploadStep, setUploadStep] = useState("");

  const { playHover, playType, playError, playSuccess } = useScifiSound();

  const validate = (name, value) => {
    const rule = VALIDATION_RULES[name];
    if (!rule) return null;
    
    // Now returns "MISSING DATA" if ANY field (including phone) is empty
    if (!value || value.trim() === "") return "MISSING DATA";

    if (rule.validate) return rule.validate(value) ? null : rule.error(value);
    return rule.regex.test(value) ? null : rule.error;
  };

  const handleEvent = (e, type) => {
    const { name, value } = e.target;
    if (type === "change") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (formState.touched[name]) {
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [name]: validate(name, value) },
        }));
      }
      playType();
    } else if (type === "blur") {
      setFormState((prev) => ({
        touched: { ...prev.touched, [name]: true },
        errors: { ...prev.errors, [name]: validate(name, value) },
      }));
      setFocusedField(null);
      if (validate(name, value)) playError();
    } else if (type === "focus") {
      setFocusedField(name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setFormState({
      touched: { name: true, email: true, phone: true, message: true },
      errors: newErrors,
    });

    if (!isValid) {
      playError();
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const apiCall = api.post("/messages", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      const steps = [
        "INITIALIZING HANDSHAKE...",
        "ENCRYPTING PAYLOAD...",
        "ROUTING TO SERVER...",
        "VERIFYING INTEGRITY...",
      ];
      for (const step of steps) {
        setUploadStep(step);
        playHover();
        await new Promise((r) => setTimeout(r, 400));
      }

      await apiCall;

      playSuccess();
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFormState({ touched: {}, errors: {} });
    } catch (err) {
      playError();
      const msg = err.response?.data?.message || "CONNECTION_RESET_BY_PEER";
      setStatus({ loading: false, success: false, error: msg.toUpperCase() });
    }
  };

  // ✅ FIX: Security Level now requires all 4 fields to reach 100%
  const validFields = Object.keys(formData).filter(
    (k) => !validate(k, formData[k]),
  ).length;
  const securityLevel = Math.min((validFields / 4) * 100, 100);

  return (
    <div className="relative w-full group">
      <div className="absolute transition duration-700 -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl" />

      <div className="relative bg-[#050a14] border border-slate-800/80 rounded-xl p-1 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#020617] border-b border-slate-800 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
              System Ready
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-slate-500 uppercase tracking-wider">
                Integrity
              </span>
              <div className="w-24 h-1 mt-1 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className={`h-full ${securityLevel >= 100 ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : "bg-blue-600"}`}
                  animate={{ width: `${securityLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <Lock
              className={`w-4 h-4 ${securityLevel >= 100 ? "text-emerald-500" : "text-slate-600"}`}
            />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {status.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-24 h-24 bg-[#0B1120] rounded-full border border-emerald-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  </div>
                  <motion.div
                    className="absolute inset-[-10px] border border-emerald-500/30 rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
                <h3 className="mb-2 text-3xl font-black tracking-tighter text-white">
                  TRANSMISSION SENT
                </h3>
                <div className="flex items-center gap-2 px-4 py-1 mb-8 border rounded-full text-emerald-400 bg-emerald-950/30 border-emerald-500/20">
                  <span className="font-mono text-xs tracking-widest uppercase">
                    Secure Connection Confirmed
                  </span>
                </div>
                <button
                  onClick={() => {
                    playHover();
                    setStatus({ ...status, success: false });
                  }}
                  className="px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all border rounded-lg bg-slate-900 border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500"
                >
                  Initialize New Uplink
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormInput
                    name="name"
                    icon={User}
                    placeholder="IDENTITY REQUIRED"
                    value={formData.name}
                    error={formState.errors.name}
                    touched={formState.touched.name}
                    isFocused={focusedField === "name"}
                    onChange={(e) => handleEvent(e, "change")}
                    onBlur={(e) => handleEvent(e, "blur")}
                    onFocus={(e) => handleEvent(e, "focus")}
                  />
                  <FormInput
                    name="email"
                    icon={Mail}
                    placeholder="CONTACT PROTOCOL"
                    type="email"
                    value={formData.email}
                    error={formState.errors.email}
                    touched={formState.touched.email}
                    isFocused={focusedField === "email"}
                    onChange={(e) => handleEvent(e, "change")}
                    onBlur={(e) => handleEvent(e, "blur")}
                    onFocus={(e) => handleEvent(e, "focus")}
                  />
                </div>
                {/* ✅ UPDATED PLACEHOLDER AND REQUIREMENTS */}
                <FormInput
                  name="phone"
                  icon={Phone}
                  placeholder="WHATSAPP / CALL NUMBER"
                  type="tel"
                  value={formData.phone}
                  error={formState.errors.phone}
                  touched={formState.touched.phone}
                  isFocused={focusedField === "phone"}
                  onChange={(e) => handleEvent(e, "change")}
                  onBlur={(e) => handleEvent(e, "blur")}
                  onFocus={(e) => handleEvent(e, "focus")}
                />
                <FormInput
                  name="message"
                  icon={MessageSquare}
                  placeholder="TRANSMISSION CONTENT..."
                  isArea={true}
                  value={formData.message}
                  error={formState.errors.message}
                  touched={formState.touched.message}
                  isFocused={focusedField === "message"}
                  onChange={(e) => handleEvent(e, "change")}
                  onBlur={(e) => handleEvent(e, "blur")}
                  onFocus={(e) => handleEvent(e, "focus")}
                />

                <AnimatePresence>
                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-3 p-3 border rounded-lg bg-red-950/20 border-red-900/50"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0 animate-pulse" />
                      <div>
                        <p className="text-[10px] font-bold text-red-400 tracking-widest uppercase">
                          System Error
                        </p>
                        <p className="text-[10px] font-mono text-red-300/70">
                          {status.error}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status.loading}
                  onMouseEnter={playHover}
                  className={`group relative w-full py-5 font-bold rounded-lg shadow-2xl transition-all duration-300 overflow-hidden ${Object.values(formState.errors).some(Boolean) ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed" : "bg-gradient-to-r from-blue-700 to-indigo-700 text-white border border-blue-500/30"}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {status.loading ? (
                      <>
                        <Cpu className="w-5 h-5 text-blue-200 animate-spin" />
                        <span className="text-xs font-mono tracking-[0.2em]">
                          {uploadStep}
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-blue-100 transition-transform group-hover:translate-x-1" />
                        <span className="text-xs font-bold tracking-[0.25em] uppercase">
                          Execute Transmission
                        </span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-2 bg-[#020617] border-t border-slate-800 rounded-b-lg flex justify-between items-center text-[8px] text-slate-600 font-mono uppercase tracking-widest">
          <span>Encrypted: AES-256</span>
          <span className="flex items-center gap-1">
            <Terminal className="w-3 h-3" /> v.2.4.0
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;