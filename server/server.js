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
const messageRoutes = require("./routes/api/messages"); // Fixed typo: removed space
const geminiRoutes = require("./routes/api/gemini"); 

const app = express();

// =============================================================
// 0. VERCEL & PROXY SETTINGS
// =============================================================
app.set('trust proxy', 1);

// =============================================================
// 1. MIDDLEWARE
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
  windowMs: 15 * 60 * 1000, // Fixed typo: removed space
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 429, error: "Too many requests, please try again later." }
});
app.use("/api", limiter);

// =============================================================
// 2. DATABASE CONNECTION 
// =============================================================
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB Connection Failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// =============================================================
// 3. ROUTES
// =============================================================
app.get("/", (req, res) => {
  res.status(200).json({ status: "Active", message: "Portfolio API is running." });
});

app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/messages", messageRoutes); // Fixed incomplete line
app.use("/api/chat", geminiRoutes); 

// =============================================================
// 4. GLOBAL ERROR HANDLER
// =============================================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false, 
    message: err.message || "Server Error", // Fixed trailing comma issue
    stack: process.env.NODE_ENV === "production" ? null : err.stack 
  });
});

// =============================================================
// 5. SERVER START
// =============================================================
const PORT = process.env.PORT || 5000; // Fixed typo: removed space

if (require.main === module) {
  app.listen(PORT, () => { // Fixed typo: removed space
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

module.exports = app; // Fixed typo: removed space