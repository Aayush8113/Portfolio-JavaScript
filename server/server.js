require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

// Import Routes
const projectRoutes = require("./routes/api/projects");
const testimonialRoutes = require("./routes/api/testimonials");
const messageRoutes = require("./routes/api/messages"); 
const geminiRoutes = require("./routes/api/gemini"); 

const app = express();

// =============================================================
// 0. DATABASE CONNECTION (Serverless Optimized)
// =============================================================
// Connect once globally so Vercel can cache the connection
connectDB().catch(err => console.error("DB Connection Failed:", err));

// =============================================================
// 1. VERCEL & PROXY SETTINGS
// =============================================================
app.set('trust proxy', 1);

// =============================================================
// 2. MIDDLEWARE
// =============================================================
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());

// SMART CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (
        origin.startsWith("http://localhost") || 
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 429, error: "Too many requests, please try again later." }
});
app.use("/api", limiter);

// =============================================================
// 3. ROUTES
// =============================================================
app.get("/", (req, res) => {
  res.status(200).json({ status: "Active", message: "Portfolio API is running." });
});

app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/messages", messageRoutes); 
app.use("/api/chat", geminiRoutes); 

// =============================================================
// 4. GLOBAL ERROR HANDLER
// =============================================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false, 
    message: err.message || "Server Error", 
    stack: process.env.NODE_ENV === "production" ? null : err.stack 
  });
});

// =============================================================
// 5. SERVER EXPORT (For Vercel)
// =============================================================
const PORT = process.env.PORT || 5000; 

// Only run app.listen if running locally, not on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => { 
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

// Export for serverless
module.exports = app;