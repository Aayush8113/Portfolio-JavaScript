import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Check,
  Cpu,
  Download,
  GitBranch,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Printer,
  Server,
  ShieldCheck,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

// --- 🎬 ANIMATION VARIANTS (Motion System) ---
// Typically stored in src/utils/animations.js, included here for copy-paste readiness
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  },
  line: {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  },
};

// --- 📄 DATA CONFIGURATION ---
const RESUME_DATA = {
  name: "Aayush Tripathi",
  role: "Full Stack MERN Architect",
  location: "Ahmedabad, India",
  phone: "+91 97377 59381",
  email: "aayushtripathi.tech@gmail.com",
  linkedin: "linkedin.com/in/aayushtripathi081103",
  github: "github.com/Aayush8113",
  // Update this path to your actual PDF file in the public folder
  pdfUrl: "/resume.pdf",
};

// --- 🛠️ TECH ARSENAL (System Metrics) ---
const TECH_STACK = [
  {
    category: "Backend Architecture",
    icon: Server,
    color: "text-emerald-400",
    barColor: "bg-emerald-500",
    skills: [
      { name: "Node.js (Event Loop)", level: 95 },
      { name: "Express.js / NestJS", level: 90 },
      { name: "MongoDB Aggregations", level: 92 },
      { name: "Microservices & Redis", level: 80 },
    ],
  },
  {
    category: "Frontend Ecosystem",
    icon: Layout,
    color: "text-blue-400",
    barColor: "bg-blue-500",
    skills: [
      { name: "React (Fiber/Suspense)", level: 95 },
      { name: "Next.js (SSR/ISR)", level: 88 },
      { name: "Tailwind Architecture", level: 98 },
      { name: "State (Redux/Zustand)", level: 90 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: GitBranch,
    color: "text-orange-400",
    barColor: "bg-orange-500",
    skills: [
      { name: "Docker & Kubernetes", level: 75 },
      { name: "AWS (EC2, S3, Lambda)", level: 80 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "System Design", level: 85 },
    ],
  },
];

// --- 🧩 SUB-COMPONENTS ---

// 1. Skill Metric Bar (The "Unique" Experience)
const SkillMetric = ({ name, level, color, barColor }) => {
  const totalSegments = 12; // High-tech segmentation
  const activeSegments = Math.round((level / 100) * totalSegments);

  return (
    <div className="mb-3 group print:mb-2 break-inside-avoid">
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors print:text-black uppercase tracking-wider">
          {name}
        </span>
        <span
          className={`font-mono text-[10px] ${color} print:text-black font-bold`}
        >
          {level}%
        </span>
      </div>

      {/* Visual Bar */}
      <div className="flex gap-[2px] h-1.5 print:gap-0.5 print:h-2">
        {[...Array(totalSegments)].map((_, i) => (
          <div
            key={i}
            className={`
              flex-1 rounded-[1px] transition-all duration-500
              ${
                i < activeSegments
                  ? `${barColor} shadow-[0_0_8px_currentColor] opacity-90` // Screen: Neon Glow
                  : "bg-slate-800 opacity-30" // Screen: Inactive
              }
              print:shadow-none print:opacity-100
              ${i < activeSegments ? "print:bg-gray-800" : "print:bg-gray-200"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

// 2. Experience Timeline Item
const ExperienceItem = ({ title, company, date, achievements, isLast }) => (
  <motion.div
    variants={ANIMATIONS.item}
    className="relative pb-12 pl-8 print:pb-6 print:pl-0 print:border-none break-inside-avoid"
  >
    {/* Connector Line (Screen Only) */}
    {!isLast && (
      <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-slate-800 print:hidden">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full origin-top bg-blue-500/50"
        />
      </div>
    )}

    {/* Timeline Dot (Screen Only) */}
    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-blue-500 bg-[#020617] flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] print:hidden group">
      <div className="w-2 h-2 transition-transform bg-blue-400 rounded-full group-hover:scale-125" />
    </div>

    {/* Content */}
    <div className="group">
      <div className="flex flex-col mb-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-bold text-white transition-colors print:text-black group-hover:text-blue-400">
          {title}
        </h3>
        <span className="px-2 py-0.5 font-mono text-[10px] border rounded text-slate-400 bg-slate-900 border-slate-800 print:text-gray-600 print:border-none print:bg-transparent print:p-0 print:font-semibold">
          {date}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3 text-sm font-medium text-blue-300 print:text-gray-700">
        <Briefcase className="w-3 h-3 print:hidden" /> {company}
      </div>

      <ul className="ml-4 space-y-1.5 text-sm list-disc text-slate-400 print:text-gray-800 marker:text-slate-600">
        {achievements.map((pt, i) => (
          <li key={i} className="leading-relaxed">
            {pt}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

// --- 🚀 MAIN PAGE ---
const ResumePage = () => {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Parallax Scroll Effect for Scanline
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handlePrint = () => window.print();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-12 print:bg-white print:p-0 print:text-black overflow-x-hidden">
      {/* 🛑 CSS FOR PERFECT PRINTING */}
      <style>{`
        @media print {
          @page { margin: 0.5cm; size: auto; }
          body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .resume-container { border: none !important; box-shadow: none !important; background: white !important; padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
          a { text-decoration: none; color: black !important; }
          h1, h2, h3, h4 { color: black !important; }
          p, span, li, div { color: #333 !important; }
          svg { display: none !important; }
          /* Ensure columns don't break awkwardly */
          .break-inside-avoid { break-inside: avoid; }
        }
      `}</style>

      {/* Screen Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none no-print" />

      {/* --- TOP NAV BAR (No Print) --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container flex flex-col items-start justify-between max-w-5xl gap-4 mx-auto mb-8 sm:flex-row sm:items-center no-print"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm transition-colors group text-slate-400 hover:text-white"
        >
          <div className="p-2 transition-colors border rounded-full bg-slate-900 border-slate-700 group-hover:border-blue-500">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>SYSTEM_EXIT</span>
        </Link>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all border rounded-lg bg-slate-900 border-slate-700 hover:bg-slate-800 hover:border-slate-500 text-slate-300"
          >
            <Printer className="w-4 h-4" /> Print Dossier
          </button>
          <a
            href={RESUME_DATA.pdfUrl}
            download
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-500 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-500 transition-all text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          >
            <Download className="w-4 h-4" /> Save PDF
          </a>
        </div>
      </motion.div>

      {/* --- MAIN RESUME PAPER --- */}
      <motion.div
        ref={containerRef}
        variants={ANIMATIONS.container}
        initial="hidden"
        animate="visible"
        className="resume-container relative container mx-auto max-w-5xl bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 rounded-xl p-8 md:p-12 shadow-2xl overflow-hidden print:overflow-visible"
      >
        {/* Animated Scanline */}
        <motion.div
          style={{ top: scanLineY }}
          className="absolute left-0 right-0 h-1 bg-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20 pointer-events-none no-print"
        />

        {/* HEADER SECTION */}
        <header className="flex flex-col justify-between gap-8 pb-8 mb-8 border-b-2 md:flex-row border-slate-800 print:border-gray-300 print:pb-4 print:mb-4">
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-900/30 border border-blue-800 text-blue-300 text-[10px] font-mono mb-2 no-print">
                <ShieldCheck className="w-3 h-3" /> CLEARANCE: LEVEL 5
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-white uppercase md:text-6xl print:text-black">
                {RESUME_DATA.name}
              </h1>
              <p className="mt-1 text-xl font-medium tracking-wide text-blue-400 print:text-gray-700 print:text-lg">
                {RESUME_DATA.role}
              </p>
            </div>

            {/* Contact Grid */}
            <div className="flex flex-wrap font-mono text-sm gap-x-6 gap-y-2 text-slate-400 print:text-black print:text-xs">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 transition-colors hover:text-white group print:cursor-text"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500 no-print" />
                ) : (
                  <Mail className="w-4 h-4 text-blue-500 no-print" />
                )}
                <span className={copied ? "text-emerald-500" : ""}>
                  {RESUME_DATA.email}
                </span>
              </button>

              <a
                href={`tel:${RESUME_DATA.phone}`}
                className="flex items-center gap-2 transition-colors hover:text-white print:cursor-text"
              >
                <Phone className="w-4 h-4 text-blue-500 no-print" />{" "}
                {RESUME_DATA.phone}
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 no-print" />{" "}
                {RESUME_DATA.location}
              </div>
            </div>

            {/* Social Links (Screen) */}
            <div className="flex gap-4 pt-2 text-sm text-slate-400 print:hidden">
              <a
                href={`https://${RESUME_DATA.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-blue-400"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href={`https://${RESUME_DATA.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>

            {/* Social Links (Print) */}
            <div className="hidden text-xs print:block print:text-gray-600">
              <p>LinkedIn: {RESUME_DATA.linkedin}</p>
              <p>GitHub: {RESUME_DATA.github}</p>
            </div>
          </div>

          {/* Holographic ID Badge (Screen Only) */}
          <div className="relative hidden w-48 h-32 p-3 transition-transform duration-500 transform border rounded-lg shadow-xl md:block bg-slate-900 border-slate-700 rotate-2 hover:rotate-0 no-print group">
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-tr from-blue-500/10 to-transparent group-hover:opacity-100" />
            <div className="flex items-start justify-between mb-2">
              <Cpu className="w-6 h-6 text-emerald-500" />
              <div className="text-[8px] font-mono text-slate-500 text-right">
                ID: 884-291-X
                <br />
                STATUS: ACTIVE
              </div>
            </div>
            <div className="flex items-end justify-between mt-6">
              <QRCodeSVG
                value={`https://${RESUME_DATA.linkedin}`}
                size={45}
                bgColor="transparent"
                fgColor="#94a3b8"
              />
              <div className="text-right">
                <div className="text-[9px] text-slate-400">SCAN FOR</div>
                <div className="text-xs font-bold text-white">
                  DIGITAL PROFILE
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* SUMMARY SECTION */}
        <section className="mb-8">
          <h2 className="flex items-center gap-3 pl-4 mb-3 text-2xl font-bold tracking-wider text-white uppercase border-l-4 border-blue-500 print:text-black print:text-lg print:mb-2">
            Mission Profile
          </h2>
          <p className="max-w-4xl text-sm leading-relaxed text-justify text-slate-300 print:text-gray-800">
            Results-driven <strong>Full Stack Developer</strong> with a
            specialization in the MERN ecosystem. Demonstrated capability in
            designing scalable backend architectures and building responsive,
            high-performance frontend interfaces. Passionate about clean code,
            system optimization, and delivering production-ready applications
            that solve real business problems.
          </p>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="mb-10 print:mb-6">
          <h2 className="flex items-center gap-3 pl-4 mb-6 text-2xl font-bold tracking-wider text-white uppercase border-l-4 border-blue-500 print:text-black print:text-lg print:mb-4">
            Operation History
          </h2>

          <div className="pl-2 ml-2 space-y-2 border-l border-slate-800 print:border-none print:ml-0 print:pl-0">
            <ExperienceItem
              title="MERN Stack Developer Intern"
              company="FRANMAXINDIA PVT LTD"
              date="Jul 2024 - Sep 2024"
              achievements={[
                "Engineered RESTful API endpoints using Node.js & Express, optimizing database query response times by 15%.",
                "Developed modular React components with Redux for state management, improving application maintainability.",
                "Implemented secure authentication (JWT) and role-based access control (RBAC) for admin dashboards.",
                "Collaborated with cross-functional teams in an Agile environment, utilizing Git for version control.",
              ]}
            />
            <ExperienceItem
              title="Freelance Full Stack Developer"
              company="Self-Employed"
              date="2024 - Present"
              isLast={true}
              achievements={[
                "Delivered 3+ custom web solutions for clients, handling full lifecycle from requirement gathering to deployment.",
                "Integrated third-party services including Stripe for payments and Cloudinary for media management.",
                "Deployed scalable applications on AWS EC2 and Vercel, configuring CI/CD pipelines for automated testing.",
              ]}
            />
          </div>
        </section>

        {/* TECHNICAL ARSENAL & EDUCATION */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 print:block">
          {/* Skills Grid */}
          <div className="md:col-span-8 print:mb-6">
            <h2 className="flex items-center gap-3 pl-4 mb-6 text-2xl font-bold tracking-wider text-white uppercase border-l-4 border-blue-500 print:text-black print:text-lg print:mb-4">
              Technical Arsenal
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.category}
                  className="p-4 border rounded-xl bg-slate-900/40 border-slate-800/50 print:bg-transparent print:border print:border-gray-300 print:p-3 break-inside-avoid"
                >
                  <div className="flex items-center gap-2 mb-4 print:mb-2">
                    <tech.icon
                      className={`w-5 h-5 ${tech.color} print:hidden`}
                    />
                    <h3 className="text-sm font-bold tracking-widest text-white uppercase print:text-black">
                      {tech.category}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {tech.skills.map((skill) => (
                      <SkillMetric
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={tech.color}
                        barColor={tech.barColor}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="md:col-span-4 print:mt-6 break-inside-avoid">
            <h2 className="flex items-center gap-3 pl-4 mb-6 text-2xl font-bold tracking-wider text-white uppercase border-l-4 border-blue-500 print:text-black print:text-lg print:mb-4">
              Education
            </h2>

            <div className="p-4 border bg-slate-900/50 border-slate-800 rounded-xl print:border-none print:bg-transparent print:p-0">
              <div className="flex items-start gap-3 mb-2 print:block">
                <GraduationCap className="w-5 h-5 text-blue-500 mt-0.5 print:hidden" />
                <div>
                  <h3 className="font-bold text-white print:text-black">
                    Bachelor of Engineering
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 print:text-black">
                    Computer Engineering
                  </p>
                </div>
              </div>
              <div className="pl-8 print:pl-0">
                <p className="mb-1 text-sm text-slate-400 print:text-gray-800">
                  Gandhinagar Institute of Technology
                </p>
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800 print:border-gray-300">
                  <span className="font-mono text-xs text-slate-500 print:text-gray-600">
                    2023 - 2027
                  </span>
                  <span className="text-xs font-bold text-emerald-400 print:text-black">
                    Running (5th Sem)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
