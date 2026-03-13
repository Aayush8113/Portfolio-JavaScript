const express = require("express");
const router = express.Router();
const { handleAIChat } = require("../../controllers/geminiController");

// POST /api/chat - Entry point for the frontend AI bubble
router.post("/", handleAIChat);

module.exports = router;