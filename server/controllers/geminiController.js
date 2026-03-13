const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handleAIChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("🔴 AI_CONFIG_ERROR: API Key missing in .env");
      return res.status(500).json({ error: "System Configuration Error" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemContext = `You are the AI of Aayush Tripathi's portfolio. Aayush is a Senior MERN Developer. 
    Be brief, professional, and technical. Under 50 words.`;

    const result = await model.generateContent(`${systemContext}\n\nVisitor: ${prompt}`);
    const text = result.response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("🔴 GEMINI_CRASH:", error.message);
    return res.status(500).json({ 
      error: "Neural link offline.", 
      message: error.message 
    });
  }
};