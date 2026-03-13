require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("../config/db");
const projectRoutes = require("../routes/api/projects");
const testimonialRoutes = require("../routes/api/testimonials");
const contactRoutes = require("../routes/api/contact");

const app = express();

// =============================================================
// 👇 SMART CORS FIX: Allows ANY localhost port automatically 👇
// =============================================================
app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      // 2. Check if the origin matches our allowed patterns
      if (
        origin.startsWith("http://localhost") || // Allows localhost:3000, 5173, 5174, etc.
        origin.endsWith(".vercel.app") // Allows your production site
      ) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin); // Optional: Log blocked origins for debugging
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());

// --- Database Connection ---
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB Connection Failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ status: "Active", message: "Portfolio API is running." });
});

app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/messages", contactRoutes);

// --- Server Start Logic ---
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;
